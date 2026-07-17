'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { BadgeCheck, LogOut, ChevronDown } from 'lucide-react'

interface UserAvaterProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
    role?: string | null
  }
  setIsOpen?: (open: boolean) => void
  handleSignOut?: () => void
}

const getInitials = (name: string | null | undefined): string => {
  if (!name) return '?'
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const UserAvater = ({ user, setIsOpen, handleSignOut }: UserAvaterProps) => {
  const [isOpen, setIsOpenLocal] = useState(false)
  const isDropdown = setIsOpen && handleSignOut

  if (!isDropdown) {
    return (
      <div className="flex items-center gap-2.5 cursor-pointer">
        <Avatar size="sm">
          <AvatarImage
            src={user.image || undefined}
            alt={user.name || 'User'}
          />
          <AvatarFallback className="bg-[#14B8A6] text-white font-semibold text-xs">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium text-gray-700 hidden sm:block">
          {user.name || 'User'}
        </span>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpenLocal(!isOpen)}
        className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
      >
        <Avatar size="sm">
          <AvatarImage
            src={user.image || undefined}
            alt={user.name || 'User'}
          />
          <AvatarFallback className="bg-[#14B8A6] text-white font-semibold text-xs">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium text-gray-700 hidden sm:block">
          {user.name || 'User'}
        </span>
        <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl border border-gray-100 shadow-lg py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {user.name || 'User'}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user.email || 'No email'}
            </p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <Link
              href={`/dashboard/${user.role || 'user'}/profile`}
              onClick={() => setIsOpenLocal(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <BadgeCheck size={16} className="text-gray-400" />
              Account
            </Link>

            <button
              onClick={() => {
                setIsOpenLocal(false)
                handleSignOut()
              }}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left cursor-pointer"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserAvater
