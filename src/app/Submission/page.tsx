'use client'
import useFetching from "@/hooks/useFetching"
import { Campaign } from "@/lib/types"
import { FormEvent, useState } from "react"




export default function submissions() {

    const [submitModal, setsubmitModal] = useState({ Boolean: false, index: -1 })
    const [Link, setLink] = useState('')
    const [Note, setNote] = useState('')
    const { Data: campaigns, Loading } = useFetching({ method: 'GET', model: "Campaign", args: { page: 1 } })
    const { mutate: SubmissionMutation, Loading: SubmissionLoading } = useFetching({ method: 'POST', model: "Submission", args: {} })
    function handlesubmit(e: FormEvent) {
        e.preventDefault()
        SubmissionMutation({ link: Link, note: Note, campaignId: campaigns.campaign[submitModal.index!].id })
    }
    return <div className="m-6">
        <h2>submissions page</h2>
        <div>
            <p>list of Campaigns to submit will be here</p>
            <table className="table m-6">
                <thead>
                    <tr>
                        <th>index</th>
                        <th>title</th>
                        <th>budget</th>
                        <th>submiting</th>
                    </tr>

                </thead>
                <tbody>
                    {Loading && <div className="loading">Loading...</div>}
                    {Array.isArray(campaigns?.campaign) && campaigns.campaign.map((camp: Campaign, index: number) => {
                        return <tr key={camp.id}>
                            <td>{index}</td>
                            <td>{camp.title}</td>
                            <td>{camp.budget}</td>
                            <td><button className="button" onClick={() => setsubmitModal({ Boolean: true, index: index })}>submit your offer</button></td>
                        </tr>
                    })}
                </tbody>
            </table>
            <div className="">
                {submitModal.Boolean && <div className="fixed top-0 left-0 w-full h-full bg-[#00000067] bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <button className="font-bold cursor-pointer hover:bg-gray-200 rounded-2xl p-4" onClick={() => setsubmitModal((prev) => ({ ...prev, Boolean: false }))}>X</button>
                        <h3 className="text-lg font-bold mb-4">Submit Your Offer</h3>
                        <form onSubmit={handlesubmit} className="flex flex-col gap-4">
                            <label htmlFor="link" className="lable">link</label>
                            <input type="text" className="input" value={Link} onChange={(e) => setLink(e.target.value)} />
                            <label htmlFor="note" className="lable">note</label>
                            <textarea name="note" className="input" value={Note} onChange={(e) => setNote(e.target.value)}></textarea>
                            <button className="button">submit</button>
                            {SubmissionLoading && <div className="loading">Submitting...</div>}
                        </form>

                    </div>
                </div>
                }
            </div>
        </div>
    </div>
}