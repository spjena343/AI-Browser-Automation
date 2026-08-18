import type { helloWorldTask } from "@/src/trigger/example";
import { tasks } from "@trigger.dev/sdk";

type HelloWorldRequest = {
  message?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as HelloWorldRequest;
  const message = body.message?.trim() || "Hello from my app!";

  const handle = await tasks.trigger<typeof helloWorldTask>("hello-world", {
    message,
  });

  return Response.json({
    id: handle.id,
    publicAccessToken: handle.publicAccessToken,
  });
}
