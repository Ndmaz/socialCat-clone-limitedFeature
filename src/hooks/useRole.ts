import { GETlocalStorage, SETlocalStorage } from "@/lib/localStorage";
import { useEffect, useState } from "react";

export function useRole() {
    const [role, setRole] =useState<string|null>('')

    //get role and set role
    useEffect(()=>{
       const localrole= GETlocalStorage('role')
       setRole(localrole)
    },[role])

    function setlocalrole(value:string){
        SETlocalStorage('role', value)
        setRole(value)
    }
    return{role,setlocalrole}
}