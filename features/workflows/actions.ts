"use server";

import { auth } from "@clerk/nextjs/server";
import { tasks } from "@trigger.dev/sdk";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createWorkflow } from "@/features/workflows/data";
import type { helloWorldTask } from "@/src/trigger/example";

export async function createWorkflowAction(name: string) {
  if (!name) {
    throw new Error("Workflow name is required");
  }

  const { orgId } = await auth();

  if (!orgId) {
    throw new Error("No active organizati on");
  }

  const workflow = await createWorkflow(orgId, name);

  revalidatePath("/", "layout");
  redirect(`/workflows/${workflow.id}`);
}

export async function runWorkflowAction() {
  const { orgId } = await auth();

  if (!orgId) {
    throw new Error("No active organization");
  }

  return tasks.trigger<typeof helloWorldTask>("hello-world", {
    message: "Hello from the web app!",
  });
}
