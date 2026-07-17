
import { headers } from "next/headers";
import { auth } from "../auth";


export const getSession=async()=>{
    const session = await auth.api.getSession({
        headers:await headers()
    })
    
    console.log(session,'session');
    
    return session?.user
}

