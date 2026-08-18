"use client"

import { Loader2Icon, PlayIcon } from "lucide-react"
import { useTransition } from "react"

import { Button } from "@/components/ui/button"
import { runWorkflowAction } from "@/features/workflows/actions"
import type { WorkflowRunHandle } from "@/features/workflows/components/run-feedback"

type RightSidebarProps = {
  onRunStarted: (handle: WorkflowRunHandle) => void
}

export function RightSidebar({ onRunStarted }: RightSidebarProps) {
  const [isPending, startTransition] = useTransition()

  function handleRunWorkflow() {
    startTransition(() => {
      void runWorkflowAction().then(onRunStarted)
    })
  }

  return (
    <div className="flex size-full flex-col items-center justify-center gap-3 px-4">
      <Button disabled={isPending} onClick={handleRunWorkflow} type="button">
        {isPending ? (
          <Loader2Icon className="animate-spin" data-icon="inline-start" />
        ) : (
          <PlayIcon data-icon="inline-start" />
        )}
        {isPending ? "starting" : "run"}
      </Button>
      <p className="max-w-48 text-center text-xs leading-5 text-[#a7a7a7]">
        Live task feedback appears in the logs panel.
      </p>
    </div>
  )
}
