'use server'
import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/serverMutation"

export const deleteUsers = async (id : string) => {
    const res = await serverMutation(`/packages/${id}`, null, 'DELETE');
    revalidatePath('/dashboard/admin/users');
    return res
}