import { WorkflowShell } from "@/features/workflows/components/workflow-shell"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <section className="size-full min-h-svh bg-[#191919] text-[#f4f4f4]">
      <WorkflowShell workflowId={id} />
    </section>
  )
}
