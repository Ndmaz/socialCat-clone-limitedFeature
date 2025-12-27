import { error } from "console"
import { use, useEffect, useState } from "react"
import { json } from "stream/consumers"

//this hook does couple of things
//one it takes model, method, and the arguments presented for generating custom requests
//the model determins the api endpoint, the method detemines the method,
//the fetch function should construct the api
//on the get using the args to create query parameters
//on the post using the args to create the body of the request
//the hook returns data and loading state


export default function useFetching<T = any>({ model, method, args,trigger }: {
    model: 'Campaign' | 'Submission' | 'WalletLedger',
    method: 'GET' | 'POST'|'PUT'
    args: Record<string, any>,
    trigger?:boolean
}) {

    const [Data, setData] = useState<T | null>(null)
    const [Loading, setLoading] = useState(false)
    const [error, seterror] = useState<null | string>(null)

    const fetchingFunction = async <T = any>(overrideArg?: Record<string, any>) => {
        setLoading(true)
        try {
            let finalarg = overrideArg ?? args
            let url = `/api/${model}`
            if (method === 'GET' && finalarg) {
                const queryParams = new URLSearchParams(finalarg).toString()
                url += `?${queryParams}`
            }
            let data = await fetch(
                url,
                {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body: (method === 'POST' || method === 'PUT') ? JSON.stringify(finalarg) : null
                })
            setLoading(false)
            if (!data.ok) {

                seterror(`Error: ${data.status} ${data.statusText}`)
                return
            }
            let parsed = await data.json()
            setData(parsed)
        } catch (err: any) {
            seterror(err.message)
            return
        }}
        useEffect(() => {
            if (method === 'GET') {
                fetchingFunction()
            }

        }, [model, method, JSON.stringify(args),trigger])
        return { Data, Loading, error, mutate: fetchingFunction }
    }