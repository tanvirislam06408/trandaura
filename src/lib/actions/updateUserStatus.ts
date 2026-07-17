'use server'
import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/serverMutation"

export const updateUserStatus = async(status: string, id: string) => {
    const res=await serverMutation(`/update-status/${status}/${id}`,null,'PATCH');
    revalidatePath('/dashboard/admin/users')
    return res;
}