"use client"

import { Plus, Workflow } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTransition } from "react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { createWorkflowAction } from "@/features/workflows/actions"
import { generateSlug } from "@/features/workflows/lib/generate-slug"
import type { Workflow as WorkflowRecord } from "@/lib/db/schema"

type WorkflowNavProps = {
  workflows: WorkflowRecord[]
}

export function WorkflowNav({ workflows }: WorkflowNavProps) {
  const { state } = useSidebar()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  function handleCreateWorkflow() {
    startTransition(() => {
      void createWorkflowAction(
        generateSlug(workflows.map((workflow) => workflow.name)),
      )
    })
  }

  if (state === "collapsed") {
    return (
      <SidebarGroup>
        <Popover>
          <PopoverTrigger asChild>
            <SidebarMenuButton aria-label="Open workflows" tooltip="Workflows">
              <Workflow />
            </SidebarMenuButton>
          </PopoverTrigger>
          <PopoverContent align="start" side="right">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  disabled={isPending}
                  onClick={handleCreateWorkflow}
                >
                  <Plus />
                  <span>New workflow</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarSeparator />
            <SidebarMenu>
              {workflows.map((workflow) => (
                <SidebarMenuItem key={workflow.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === `/workflows/${workflow.id}`}
                  >
                    <Link href={`/workflows/${workflow.id}`}>
                      <span>{workflow.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </PopoverContent>
        </Popover>
      </SidebarGroup>
    )
  }

  return (
    <SidebarGroup className="px-5 py-7">
      <SidebarGroupLabel className="h-auto px-0 pb-6 text-[30px] font-semibold leading-none tracking-normal text-[#a7a7a7]">
        Workflows
      </SidebarGroupLabel>
      <SidebarGroupAction
        aria-label="Create workflow"
        className="right-5 top-7 size-10 text-[#f4f4f4] hover:bg-[#262626] hover:text-white"
        disabled={isPending}
        onClick={handleCreateWorkflow}
        title="Create workflow"
      >
        <Plus />
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu className="gap-2">
          {workflows.map((workflow) => (
            <SidebarMenuItem key={workflow.id}>
              <SidebarMenuButton
                asChild
                className="h-14 rounded-xl px-4 text-[28px] font-normal leading-none tracking-normal text-[#f4f4f4] hover:bg-[#252525] hover:text-white data-[active=true]:bg-[#252525] data-[active=true]:font-normal data-[active=true]:text-white"
                isActive={pathname === `/workflows/${workflow.id}`}
              >
                <Link href={`/workflows/${workflow.id}`}>
                  <span>{workflow.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
