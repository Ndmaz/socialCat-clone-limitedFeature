'use client'
import useFetching from '@/hooks/useFetching'
import Link from 'next/link'
import React, { useState } from 'react'

export default function SubmissionModal({campaignId, subId, note, link, status}: {campaignId:number, subId:number, note:string, link:string, status:string}) {
    const [StatusState, setStatusState] = useState('')
    const { mutate: mutateWalletLedger, Loading: mutateWalletLedgerLoading } = useFetching({ method: 'POST', model: "WalletLedger", args: {} })
    const { mutate: SubmissionMutation, Loading: SubmissionLoading } = useFetching({ method: 'PUT', model: "Submission", args: {} })

    const handleSubmissionChange = () => {
        if (StatusState === 'APPROVED') {
            let confirmBoolean = confirm('confirming this will create a WalletLedger with ON-HOLD status. are you sure you want to proceed?')
            if (!confirmBoolean) return;
            mutateWalletLedger({
                campaignId: campaignId,
                status: 'ON-HOLD',
                submissionId: subId,
            })



        }
        SubmissionMutation({ id: subId, status: StatusState })
    }
    return (
        <tr className="border p-2 m-2 ">
            <td> {note}</td>
            <td><Link href={'/'}>the link:{link}</Link></td>
            <td>
                <select name="status" id="status" value={StatusState} defaultValue={status} onChange={(e) => setStatusState(e.target.value)}>
                    <option value='PENDING'>PENDING</option>
                    <option value='APPROVED'>APPROVED</option>
                    <option value='REJECTED'>REJECTED</option>
                </select>
            </td>
            <td><button disabled={(StatusState === status)} className="button w-fit" onClick={handleSubmissionChange}>confirm change</button>
                {mutateWalletLedgerLoading && <div className="loading">Processing walletLedger creation...</div>}
                {SubmissionLoading && <div className="loading">Updating submission...</div>}
            </td>

        </tr>
    )
}

