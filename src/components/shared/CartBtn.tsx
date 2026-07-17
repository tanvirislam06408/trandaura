'use client'

import { addToCart } from "@/lib/actions/addProdutctToCart";
import type { Product } from "@/types/product";
import type { User } from "@/types/user";
import toast from "react-hot-toast";

interface CartBtnProps {
  product: Product;
  user?: User;
}

const CartBtn = ({ product, user }: CartBtnProps) => {

    const { _id, ...productData } = product;
    const addProduct = async () => {
        if (!user?.id) {
            toast.error("Please log in to add items to your cart");
            return;
        }

        if (!_id) {
            toast.error("Product not available");
            return;
        }

        const pData = {
            userId: user.id,
            productId: _id,
            ...productData
        }
        const data = await addToCart(pData)
        if(data.acknowledged){
            toast.success(`${product.title} add to card successfully`)
        }
        else{
            toast.error(`${product.title} already in cart`)
        }

    }
    return (
        <button onClick={addProduct} className="btn-primary mt-6 w-full">
            Add to cart
        </button>
    );
};

export default CartBtn;