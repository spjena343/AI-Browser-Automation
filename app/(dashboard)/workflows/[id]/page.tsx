import { WorkflowShell } from "@/features/workflows/components/workflow-shell"
import { Room } from "@/features/workflows/components/room"
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <section className="size-full min-h-svh bg-[#191919] text-[#f4f4f4]">
      <Room roomId={id}>
        <WorkflowShell workflowId={id} />
      </Room>
    </section>
  )
}
