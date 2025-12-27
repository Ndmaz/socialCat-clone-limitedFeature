'use client'

import { useRole } from "@/hooks/useRole";
import { useRouter } from "next/navigation";

export default function Home() {
  const router=useRouter()
const {setlocalrole}=useRole()
  return (
    <div className="flex min-h-screen   bg-linear-to-r from-[#9dc472] to-[#e0df84] font-sans dark:bg-black">
      {/*the main page containing choosing a role */}
      <div className="flex flex-col rounded-2xl w-3/4 h-3/4 bg-white p-6 space-y-4 mx-auto mt-6 shadow-2xl">
        <p className="p-6 font-bold">choose a role</p>

        <button className="button" onClick={()=>{
          setlocalrole('Brand')
          router.push('/Campaign')
          }}>Im a Brand</button>
        <button className="button" onClick={()=>{
          setlocalrole('Creator')
          router.push('/Submission')
          }}>Im a Creator</button>


      </div>

    </div>
  );
}
