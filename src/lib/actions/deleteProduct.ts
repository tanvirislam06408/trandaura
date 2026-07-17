'use server'
import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/serverMutation"

export const deleteProduct = async (id : string) => {
   
    
    const result = await serverMutation(`/delete-products/${id}`, null, 'DELETE');
    revalidatePath('/dashboard/admin/products')
    return result;
}