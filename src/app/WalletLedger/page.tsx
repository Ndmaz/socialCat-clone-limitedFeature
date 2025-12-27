'use client'
import useFetching from "@/hooks/useFetching"
import { WalletLedger } from "@/lib/types";




export default function walletledgers() {

    const { Data, Loading } = useFetching({ method: 'GET', model: "WalletLedger", args: { page: 1 } })
    return <div>
        <h2>walletledgers page</h2>
        <table className="table">
            <thead>
                <tr>
                    <th>index</th>
                    <th>campaignId</th>
                    <th>status</th>
                    <th>submissionId</th>
                </tr>
            </thead>
            <tbody>
                {Loading && <div className="loading">Loading...</div>}
                {Array.isArray(Data?.walletLedger) && Data?.walletLedger.map((ledger: WalletLedger, index: number) => {
                    return <tr key={ledger.id}>
                        <td>{index + 1}</td>
                        <td>{ledger.campaignId}</td>
                        <td>{ledger.status}</td>
                        <td>{ledger.submissionId}</td>
                    </tr>;
                })}
            </tbody>
        </table>

    </div>
}