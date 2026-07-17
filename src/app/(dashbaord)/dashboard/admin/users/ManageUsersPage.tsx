"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Search,
    UserX,
    UserCheck,
    Trash2,
    Check,
    Users,
    AlertTriangle
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AdminUser } from "@/types/user";
import { deleteUsers } from "@/lib/actions/deleteUser";
import { updateUserStatus } from "@/lib/actions/updateUserStatus";

interface ManageUsersPageProps {
    users: AdminUser[];
}
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
} from "@/components/ui/alert-dialog";

export default function ManageUsersPage({ users }: ManageUsersPageProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<{ id: string; name: string } | null>(null);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => {
            setToastMessage(null);
        }, 3000);
    };

    const handleBlockUser = async(id: string) => {
         const result=await updateUserStatus('blocked',id)
        console.log(result);
    };

    const handleUnblockUser = async(id: string) => {
        const result=await updateUserStatus('active',id)
        console.log(result);
    };

    const openDeleteDialog = (id: string, name: string) => {
        setUserToDelete({ id, name });
        setDeleteDialogOpen(true);
    };

    const confirmDeleteUser = async () => {
        if (!userToDelete) return;

        const result = await deleteUsers(userToDelete.id);
        if (result.deletedCount > 0) {
            showToast(`User has been removed.`);
        } else {
            showToast(`Something went wrong!!`);
        }
        setDeleteDialogOpen(false);
        setUserToDelete(null);
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">

            {/* Toast Notification */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4 bg-[#0E1F2B] text-white px-5 py-3.5 rounded-2xl shadow-xl border border-teal-500/20 text-sm animate-in slide-in-from-bottom-5 duration-300">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#14B8A6] text-white">
                        <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="font-medium">{toastMessage}</span>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                <div className="space-y-1">
                    <Link
                        href="/dashboard/admin"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#14B8A6] hover:text-[#0f9488] transition-colors mb-2"
                    >
                        <ArrowLeft size={14} /> Back to Dashboard
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Manage Accounts</h1>
                    <p className="text-gray-500 text-sm">View, block, unblock, or delete registered user accounts.</p>
                </div>

                {/* Search */}
                <div className="relative w-full md:w-80">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 pl-9 pr-4 py-2.5 text-xs outline-none focus:border-[#14B8A6] bg-white shadow-sm"
                    />
                </div>
            </div>

            {users.length === 0 ? (
                <div className="card-base p-12 text-center max-w-md mx-auto space-y-5">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-50 text-gray-400">
                        <Users size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 text-base">No Users Found</h3>
                        <p className="text-xs text-gray-400 mt-1">Try adjusting your search criteria.</p>
                    </div>
                </div>
            ) : (
                /* Responsive Table */
                <div className="card-base overflow-hidden border border-gray-100 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-550 text-[10px] uppercase font-bold tracking-wider">
                                    <th className="py-4 px-6">User</th>
                                    <th className="py-4 px-6">Role</th>
                                    <th className="py-4 px-6">Registered</th>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-xs">
                                {users.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50/30 transition-colors duration-150">
                                        {/* User profile details */}
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9 border border-gray-100 shadow-sm shrink-0">
                                                    <AvatarImage src={user.image ?? undefined} alt={user.name} />
                                                    <AvatarFallback className="text-[11px] font-bold bg-teal-50 text-[#14B8A6]">
                                                        {user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="min-w-0">
                                                    <span className="font-bold text-gray-900 block truncate">{user.name}</span>
                                                    <span className="text-gray-400 text-[10px] block truncate">{user.email}</span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Role */}
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${user.role === "admin"
                                                    ? "bg-purple-50 text-purple-600 border border-purple-100"
                                                    : "bg-blue-50 text-blue-600 border border-blue-100"
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>

                                        {/* Registered Date */}
                                        <td className="py-4 px-6 text-gray-500 font-medium">
                                            {new Date(user.registeredAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                        </td>

                                        {/* Status */}
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold ${user.status === "active"
                                                    ? "bg-emerald-50 text-emerald-600"
                                                    : "bg-red-50 text-red-600"
                                                }`}>
                                                <span className={`h-1.5 w-1.5 rounded-full ${user.status === "active" ? "bg-emerald-500" : "bg-red-500"}`} />
                                                {user.status === "active" ? "Active" : "Blocked"}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {user.status === "active" ? (
                                                    <button
                                                        onClick={() => handleBlockUser(user._id)}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-red-200 text-[10px] font-bold text-red-600 hover:bg-red-50 transition cursor-pointer"
                                                    >
                                                        <UserX size={12} /> Block
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleUnblockUser(user._id)}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-emerald-200 text-[10px] font-bold text-emerald-600 hover:bg-emerald-50 transition cursor-pointer"
                                                    >
                                                        <UserCheck size={12} /> Unblock
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => openDeleteDialog(user._id, user.name)}
                                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl border border-transparent hover:border-red-100 transition cursor-pointer"
                                                    title="Delete User"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogMedia>
                            <AlertTriangle className="text-red-500" />
                        </AlertDialogMedia>
                        <AlertDialogTitle>Delete User</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete <strong>{userToDelete?.name}</strong>? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setUserToDelete(null)}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDeleteUser}
                            className="bg-red-600 text-white hover:bg-red-700"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
