import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return (
    <section className="flex min-h-svh items-center justify-center bg-[#191919] text-[#f4f4f4]">
      <Spinner className="size-8 text-[#f4f4f4]" />
    </section>
  )
}
