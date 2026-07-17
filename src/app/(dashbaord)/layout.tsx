
import { DashboardSidebar } from "@/components/dashboard/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { getSession } from "@/lib/core/session";
import { DropdownMenuAvatar } from "@/components/shared/UserDropDown";
import AiAssistant from "@/components/shared/AiAssistant";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getSession()

  return (
    <SidebarProvider>
      <DashboardSidebar/>
      <main className="flex-1 flex flex-col min-h-screen w-full bg-gray-50/40 overflow-y-auto">
        {/* Sticky Dashboard Header */}
        <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur-md px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="h-9 w-9 text-gray-500 hover:text-gray-850 hover:bg-gray-50 rounded-xl border border-gray-100 cursor-pointer" />
            <div className="h-4 w-px bg-gray-200" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {user?.role === "admin" ? "Admin Workspace" : "User Workspace"}
            </span>
          </div>

          {user && (
            <DropdownMenuAvatar user={user} />
          )}
        </header>

        {/* Dashboard Page Content */}
        <div className="flex-1 w-full">
          {children}
        </div>
      </main>
      <AiAssistant />
    </SidebarProvider>
  )
}