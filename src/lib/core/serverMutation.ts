'use server'
import { redirect } from "next/navigation";
import { getSession } from "./session";
import { getToken } from "./jwtToken";

const baseUrl = process.env.NEXT_PUBLIC_SERVER
// Record<string, unknown> | null

export const serverMutation = async (url: string, data: object | null = null, method: string = 'POST') => {
    const user = await getSession();
    if (!user) {
        redirect('/login')
    }
    const token = await getToken()
    const res = await fetch(`${baseUrl}${url}`, {
        method: method,
        headers: {
            'authorization': `Bearer ${token.token}`,
            'content-type': 'application/json'
        },
        body: data && JSON.stringify(data)
    })
    const resData = await res.json();
    return resData;
}