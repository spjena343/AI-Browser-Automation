"use client"

import { AlertTriangle, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function Error({
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  return (
    <section className="flex min-h-svh bg-[#191919] text-[#f4f4f4]">
      <Empty className="gap-7 rounded-none border-0 p-6">
        <EmptyHeader className="max-w-3xl gap-8">
          <EmptyMedia className="mb-4 size-24 rounded-[18px] bg-[#242424] text-[#f2f2f2]">
            <AlertTriangle className="size-10 stroke-[2.5]" />
          </EmptyMedia>
          <EmptyTitle className="text-[30px] font-semibold leading-none tracking-normal text-[#f4f4f4]">
            Workflow unavailable
          </EmptyTitle>
          <EmptyDescription className="max-w-[680px] text-[30px] font-normal leading-[1.6] tracking-normal text-[#a7a7a7]">
            Something went wrong while opening this workflow.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="max-w-none">
          <Button
            size="sm"
            onClick={unstable_retry}
            className="h-[50px] gap-2 rounded-[16px] bg-[#e7e7e7] px-5 text-[20px] font-semibold tracking-normal text-[#202020] hover:bg-white"
          >
            <RotateCcw className="size-6 stroke-[2.4]" />
            Try again
          </Button>
        </EmptyContent>
      </Empty>
    </section>
  )
}
