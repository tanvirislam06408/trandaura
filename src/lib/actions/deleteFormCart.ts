'use server'
import { revalidatePath } from "next/cache"
import { serverMutation } from "../core/serverMutation"

export const deleteFormCart = async (id: string) => {
    const data={
        id : id
    }
    
    const response=await serverMutation('/cart/delete',data,'DELETE');
    revalidatePath('/cart/delete')
    return response;

}