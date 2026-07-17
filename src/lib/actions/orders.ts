
import { serverMutation } from "../core/serverMutation"

export const addOrders = async (data: Record<string, unknown>) => {
    const result = await serverMutation('/api/orders', data)
    return result;
}