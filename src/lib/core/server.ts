import { getToken } from "./jwtToken";

const serverUrl = process.env.NEXT_PUBLIC_SERVER!;

export const serverFetch = async <T>(path: string): Promise<T> => {
  const res = await fetch(`${serverUrl}${path}`);

  
  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`);
  }

  return res.json() as Promise<T>;
};



export const protectedFetch = async (path:string) => {
    const token=await getToken()
   
    
    const res = await fetch(`${serverUrl}${path}`,{
        method: 'GET',
        headers:{
            authorization: `Bearer ${token.token}`,
            'content-type':'application/json'

        },

    });
    const resData = await res.json()
    return resData;

}