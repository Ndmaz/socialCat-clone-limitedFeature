'use client'
import { useRole } from "@/hooks/useRole";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function navigation() {
    const { role, setlocalrole } = useRole()
    const router = useRouter()
    return (
        <div className="flex bg-blue-100 h-16 ">
            <p className="font-bold p-4">SOCIAL-CAT</p>
            <div className="flex ml-8">
                <Link className="p-2  hover:bg-blue-200  " href='/Campaign'>Campaigns</Link>
                <Link className="p-2  hover:bg-blue-200 " href='/Submission'>Submissions</Link>
                <Link className="p-2  hover:bg-blue-200 " href='/WalletLedger'>Walletledgers</Link>
            </div>
            <div className="ml-auto flex font-semibold">
                <p className="p-2 m-2">role:{role}</p>
                
                <button className="button-default from-[#a170b8] to-[#cc9c74]" onClick={() => {
                    if (role === 'Brand') {
                        setlocalrole('Creator')
                        router.push('/Submission')
                    } else{
                        setlocalrole('Brand')
                        router.push('/Campaign')}
                    }}> switch role</button>
            </div>
        </div>
    )
}

