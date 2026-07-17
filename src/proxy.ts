import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from './lib/core/session'


// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const user = await getSession();



    const pathname = request.nextUrl.pathname;
    if (!user) {

        return NextResponse.redirect(new URL('/login', request.url))
    }


    if (
        pathname.startsWith("/dashboard/admin") &&
        user.role !== "admin"
    ) {
        return NextResponse.redirect(new URL("/dashboard/user", request.url));
    }

     return NextResponse.next();


}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
    matcher: [ '/dashboard/admin/:path','/dashboard/admin',"/dashboard/user"]
}