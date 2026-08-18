import { Plus, Workflow } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function Page() {
  return (
    <section className="flex min-h-svh bg-[#191919] text-[#f4f4f4]">
      <Empty className="gap-7 rounded-none border-0 p-6">
        <EmptyHeader className="max-w-3xl gap-8">
          <EmptyMedia className="mb-4 size-24 rounded-[18px] bg-[#242424] text-[#f2f2f2]">
            <Workflow className="size-10 stroke-[2.5]" />
          </EmptyMedia>
          <EmptyTitle className="text-[30px] font-semibold leading-none tracking-normal text-[#f4f4f4]">
            No workflow selected
          </EmptyTitle>
          <EmptyDescription className="max-w-[680px] text-[30px] font-normal leading-[1.6] tracking-normal text-[#a7a7a7]">
            Select a workflow from the sidebar
            <br />
            or create a new one to get started.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="max-w-none">
          <Button
            size="sm"
            className="h-[50px] gap-2 rounded-[16px] bg-[#e7e7e7] px-5 text-[20px] font-semibold tracking-normal text-[#202020] hover:bg-white"
          >
            <Plus className="size-6 stroke-[2.4]" />
            New workflow
          </Button>
        </EmptyContent>
      </Empty>
    </section>
  )
}
