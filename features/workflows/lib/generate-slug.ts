const adjectives = [
  "bright",
  "calm",
  "clear",
  "fresh",
  "gentle",
  "lively",
  "nimble",
  "steady",
  "swift",
  "vivid",
]

const nouns = [
  "canvas",
  "engine",
  "flow",
  "grid",
  "launch",
  "path",
  "signal",
  "spark",
  "thread",
  "vector",
]

export function generateSlug(existingSlugs: string[] = []) {
  const existing = new Set(existingSlugs)

  for (let attempt = 0; attempt < 20; attempt++) {
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
    const noun = nouns[Math.floor(Math.random() * nouns.length)]
    const slug = `${adjective}-${noun}`

    if (!existing.has(slug)) {
      return slug
    }
  }

  return `workflow-${Date.now().toString(36)}`
}
