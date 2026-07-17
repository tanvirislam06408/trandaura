import { protectedFetch } from "../core/server"

export const getAllUsers=async()=>{
    const users=await protectedFetch(`/get-users`);
    return users;
}