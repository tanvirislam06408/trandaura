import Link from 'next/link';
import React from 'react';
import { Leaf } from 'lucide-react';

const Logo = () => {
    return (
         <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#22c55e] text-white shadow-sm">
            <Leaf className="h-6 w-6" />
          </div>

          <span className="text-xl font-bold tracking-tight text-[#0E1F2B]">
            Trand<span className="text-[#22c55e]">Aura</span>
          </span>
        </Link>
    );
};

export default Logo;