'use client'

import SubmissionModal from "@/components/SubmissionModal"
//if submission length is higher than 0 then show a button for the submission or maybe an absolut div that contains the whole page
//with the the submissins list and 

import useFetching from "@/hooks/useFetching"
import useCampaigns from "@/hooks/useFetching"
import { Campaign, Submission } from "@/lib/types"
import Link from "next/link"
import { FormEvent, useEffect, useState } from "react"




export default function Compaigns() {
    const [OpenModal, setOpenModal] = useState(false)
    const [OpensubmissionModal, setOpensubmissionModal] = useState<{ Boolean: boolean, index: number | null }>({ Boolean: false, index: null })


    const [Page, setPage] = useState(1)
    
    const [trigger, setTrigger] = useState(false)

    const { Data, Loading } = useFetching({ method: 'GET', model: "Campaign", args: { page: Page }, trigger })
    const { mutate: mutateCampaigns, Loading: mutateCampaignsLoading } = useFetching({ method: 'POST', model: "Campaign", args: {} })
  
    const [title, setTitle] = useState('')
    const [budget, setBudget] = useState(0)
    const handlecampaignsubmit = (e: FormEvent) => {
        e.preventDefault()
        mutateCampaigns({ title, budget })
        setTrigger(!trigger)
    }
 
    return <div>
        <div className="flex justify-between p-4">
            <h2 className="font-bold">Campaigns</h2>
            <button className="button-default w-fit" onClick={() => setOpenModal(true)}>create new campaign</button>
        </div>

        <div>

            <table className="m-4 table">
                <thead className="font-bold">
                    <td>index</td>
                    <td>title</td>
                    <td>budget</td>
                    <td>submissions</td>
                </thead>
                <tbody>
                    {Loading && <div className="loading">Loading...</div>}
                    {/*JSON.stringify(Data)*/}
                    {Array.isArray(Data?.campaign) && Data?.campaign.map((camp: Campaign, index: number) => {
                        return <tr key={camp.id}>
                            <td>{index + 1}</td>
                            <td >{camp.title}</td>
                            <td >{camp.budget.toString()}</td>
                            <td>{(camp.submissions.length > 0) ? <button className="button" onClick={() => setOpensubmissionModal(() => ({ Boolean: true, index: index }))}>view submissions</button> : <p>no submissions</p>}</td>
                        </tr>
                    })}
                </tbody>
            </table>



        </div>
        <div className="relative">
            {/*create campaign modal */}
            {OpenModal && <div className="fixed w-screen top-0  h-screen bg-[#0000003d] justify-items-center">
                <div className="flex flex-col justify-items-center bg-white w-1/2 h-3/4 mt-16 rounded-3xl p-4">
                    <button className="font-black cursor-pointer mr-auto hover:bg-gray-100 rounded-2xl p-4" onClick={() => setOpenModal(false)}>X</button>
                    <h2 className="mb-4 font-bold ">create a new campaign</h2>
                    <form onSubmit={handlecampaignsubmit} className="p-4">
                        <label className="label" htmlFor="title">title</label>
                        <input className="input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <label className="label" htmlFor="budget">budget</label>
                        <input className="input" type="text" value={budget} onChange={(e) => setBudget(Number(e.target.value))} />
                        <button className="button">submit</button>
                        {mutateCampaignsLoading && <div className="loading">Creating...</div>}
                    </form>
                </div>
            </div>}
            {/* view submission modal*/}
            {OpensubmissionModal.Boolean && <div className="fixed w-screen top-0  h-screen bg-[#0000003d] justify-items-center">
                <div className="flex flex-col justify-items-center bg-white w-3/4 h-3/4 mt-16 rounded-3xl p-4">
                    <button className="font-black cursor-pointer mr-auto hover:bg-gray-100 rounded-2xl p-4" onClick={() => setOpensubmissionModal({ Boolean: false, index: null })}>X</button>
                    <h2 className="mb-4 font-bold ">submissions</h2>
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>note</th>
                                <th>link</th>
                                <th>status</th>
                                <th>confirmation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Data?.campaign[OpensubmissionModal.index!]?.submissions.map((sub: Submission) => {
                                let campid = Data?.campaign[OpensubmissionModal.index!].id

                                return <SubmissionModal
                                    key={sub.id}
                                    campaignId={campid}
                                    subId={sub.id}
                                    note={sub.note as string}
                                    link={sub.link}
                                    status={sub.status}
                                />
                            })}
                        </tbody>
                    </table>
                </div>
            </div>}
        </div>
    </div>
}