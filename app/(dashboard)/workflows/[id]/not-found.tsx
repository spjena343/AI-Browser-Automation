import { FileQuestion } from "lucide-react"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function NotFound() {
  return (
    <section className="flex min-h-svh bg-[#191919] text-[#f4f4f4]">
      <Empty className="gap-7 rounded-none border-0 p-6">
        <EmptyHeader className="max-w-3xl gap-8">
          <EmptyMedia className="mb-4 size-24 rounded-[18px] bg-[#242424] text-[#f2f2f2]">
            <FileQuestion className="size-10 stroke-[2.5]" />
          </EmptyMedia>
          <EmptyTitle className="text-[30px] font-semibold leading-none tracking-normal text-[#f4f4f4]">
            Workflow not found
          </EmptyTitle>
          <EmptyDescription className="max-w-[680px] text-[30px] font-normal leading-[1.6] tracking-normal text-[#a7a7a7]">
            This workflow does not exist or is no longer available.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </section>
  )
}
