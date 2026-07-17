'use client'
import { Trash2, Trash2Icon } from "lucide-react"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { deleteFormCart } from "@/lib/actions/deleteFormCart"
import toast from "react-hot-toast"

export function AlertDialogDestructive({ itemId: id }: { itemId: string }) {
    console.log(id);

    const hanldeDeleteProduct = async (id: string) => {
        const result = await deleteFormCart(id)
        if (result.deletedCount > 0) {
            toast.success("Product delete from cart successfully")
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger
                render={<Button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition cursor-pointer" variant="destructive">
                    <Trash2 size={16} />
                </Button>}
            />
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Delete form cart?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete this product from cart.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => hanldeDeleteProduct(id)} variant="destructive">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
