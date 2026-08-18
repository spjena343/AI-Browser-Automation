"use client"

import { useRealtimeRun } from "@trigger.dev/react-hooks"
import { CheckCircle2Icon, CircleAlertIcon, Loader2Icon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { helloWorldTask } from "@/src/trigger/example"

export type WorkflowRunHandle = {
  id: string
  publicAccessToken: string
}

type RunFeedbackProps = {
  handle: WorkflowRunHandle | null
}

const terminalStatuses = new Set([
  "COMPLETED",
  "FAILED",
  "CANCELED",
  "CRASHED",
  "INTERRUPTED",
  "SYSTEM_FAILURE",
])

function getRunTone(status?: string) {
  if (!status) {
    return "idle"
  }

  if (status === "COMPLETED") {
    return "success"
  }

  if (terminalStatuses.has(status)) {
    return "error"
  }

  return "active"
}

function formatStatus(status?: string) {
  return status ? status.toLowerCase().replaceAll("_", " ") : "idle"
}

export function RunFeedback({ handle }: RunFeedbackProps) {
  const { run, error } = useRealtimeRun<typeof helloWorldTask>(
    handle?.id ?? "",
    {
      accessToken: handle?.publicAccessToken,
      enabled: Boolean(handle),
      skipColumns: ["payload", "output"],
    }
  )

  const progress =
    typeof run?.metadata?.progress === "number" ? run.metadata.progress : 0
  const statusMessage =
    typeof run?.metadata?.status === "string"
      ? run.metadata.status
      : "No task run yet"
  const runTone = getRunTone(run?.status)
  const displayProgress = run?.status === "COMPLETED" ? 100 : progress

  if (error) {
    return (
      <div className="flex size-full flex-col justify-center gap-3 px-4 text-sm text-[#f4f4f4]">
        <div className="flex items-center gap-2 text-[#ff9a9a]">
          <CircleAlertIcon className="size-4" />
          <span className="font-medium">
            Unable to subscribe to task feedback
          </span>
        </div>
        <p className="text-xs leading-5 text-[#a7a7a7]">{error.message}</p>
      </div>
    )
  }

  return (
    <div className="flex size-full flex-col justify-center gap-3 px-4 text-sm text-[#f4f4f4]">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-[#a7a7a7] uppercase">
            Task feedback
          </p>
          <p className="truncate font-medium">{statusMessage}</p>
        </div>
        <Badge
          variant="outline"
          className="shrink-0 border-[#3a3a3a] bg-[#222] text-[#d7d7d7]"
        >
          {runTone === "success" ? (
            <CheckCircle2Icon className="size-3.5" />
          ) : null}
          {runTone === "active" ? (
            <Loader2Icon className="size-3.5 animate-spin" />
          ) : null}
          {runTone === "error" ? (
            <CircleAlertIcon className="size-3.5" />
          ) : null}
          {formatStatus(run?.status)}
        </Badge>
      </div>
      <Progress
        value={displayProgress}
        className="h-1.5 bg-[#2d2d2d] [&_[data-slot=progress-indicator]]:bg-[#7dd3fc]"
      />
      <div className="flex items-center justify-between gap-3 text-xs text-[#a7a7a7]">
        <span className="truncate">
          {handle?.id ?? "Run a workflow to begin"}
        </span>
        <span className="shrink-0 tabular-nums">
          {Math.round(displayProgress)}%
        </span>
      </div>
    </div>
  )
}
