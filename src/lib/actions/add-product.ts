import { Product } from "@/types/product"
import { serverMutation } from "../core/serverMutation"

export const addProduct = async (data: Product) => {
    const result = await serverMutation('/add-products', data)
    return result
}