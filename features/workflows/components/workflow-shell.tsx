"use client"

import { useState } from "react"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Canvas } from "@/features/workflows/components/canvas"
import { RightSidebar } from "@/features/workflows/components/right-sidebar"
import {
  RunFeedback,
  type WorkflowRunHandle,
} from "@/features/workflows/components/run-feedback"

type WorkflowShellProps = {
  workflowId: string
}

export function WorkflowShell({ workflowId }: WorkflowShellProps) {
  const [runHandle, setRunHandle] = useState<WorkflowRunHandle | null>(null)

  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="size-full bg-[#191919] text-[#f4f4f4]"
    >
      <ResizablePanel minSize="30rem" className="size-full">
        <div className="size-full">
          <ResizablePanelGroup orientation="vertical" className="size-full">
            <ResizablePanel minSize="18rem">
              <Canvas />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize="8rem" minSize="6rem">
              <RunFeedback handle={runHandle} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        id={`workflow-${workflowId}-inspector`}
        defaultSize="16rem"
        minSize="14rem"
        maxSize="36rem"
      >
        <RightSidebar onRunStarted={setRunHandle} />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
