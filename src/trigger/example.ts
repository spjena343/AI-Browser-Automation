import { logger, metadata, task, wait } from "@trigger.dev/sdk"

export const helloWorldTask = task({
  id: "hello-world",
  // Set an optional maxDuration to prevent tasks from running indefinitely
  maxDuration: 300, // Stop executing after 300 secs (5 mins) of compute
  run: async (payload: { message?: string }, { ctx }) => {
    logger.log("Hello, world!", { payload, ctx })

    metadata
      .set("status", "Queued browser automation task")
      .set("progress", 10)
      .set("message", payload.message ?? "Hello from my app!")

    await wait.for({ seconds: 1 })
    metadata.set("status", "Opening browser session").set("progress", 35)

    await wait.for({ seconds: 1 })
    metadata.set("status", "Running workflow actions").set("progress", 70)

    await wait.for({ seconds: 1 })
    metadata.set("status", "Finalizing task output").set("progress", 95)

    return {
      message: "Hello, world!",
    }
  },
})
