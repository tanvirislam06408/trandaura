'use server';

import { serverMutation } from "../core/serverMutation";

type CartPayload = {
  userId: string;
  productId: string;
  [key: string]: unknown;
}

export const addToCart = async (data: CartPayload) => {
  const resData = await serverMutation("/add-to-cart", data);
  return resData;
};