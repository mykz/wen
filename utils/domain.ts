export function safeHostname(input: string): string | null {
  const v = input.trim()
  if (!v) return null

  const withScheme = /^https?:\/\//i.test(v) ? v : `https://${v}`

  try {
    return new URL(withScheme).hostname
  } catch {
    return null
  }
}
