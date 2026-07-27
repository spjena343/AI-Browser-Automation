
export default async function TestPage() {

  return (
    <main className="mx-auto flex min-h-[calc(100svh-3.5rem)] w-full max-w-5xl flex-col justify-center gap-3 px-6 py-12">
      <p className="text-sm font-medium text-muted-foreground">Protected route</p>
      <h1 className="text-2xl font-semibold tracking-normal">Test page</h1>
      <p className="max-w-lg text-sm leading-6 text-muted-foreground">
        You can only see this page after signing in with Clerk.
      </p>
    </main>
  )
}
