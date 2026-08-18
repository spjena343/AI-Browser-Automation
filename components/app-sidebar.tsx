import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { WorkflowNav } from "@/features/workflows/components/workflow-nav"
import { listWorkflows } from "@/features/workflows/data"

export async function AppSidebar() {
  const { orgId } = await auth()
  const workflows = orgId ? await listWorkflows(orgId) : []

  return (
    <Sidebar
      collapsible="icon"
      className="border-[#2b2b2b] [&_[data-slot=sidebar-inner]]:bg-[#191919] [&_[data-slot=sidebar-inner]]:text-[#f4f4f4]"
    >
      <SidebarHeader className="flex-row items-center justify-between gap-3 p-6">
        <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
          <OrganizationSwitcher />
        </div>
        <SidebarTrigger className="text-[#f4f4f4] hover:bg-[#262626] hover:text-white" />
      </SidebarHeader>
      <SidebarContent>
        <WorkflowNav workflows={workflows} />
      </SidebarContent>
      <SidebarSeparator className="bg-[#2b2b2b]" />
      <SidebarFooter className="border-t border-[#2b2b2b] p-6">
        <UserButton />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
