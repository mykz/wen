export function getfirstAndLastCharacter(name: string) {
  if (!name) return ''

  const [first, ...rest] = name.split(' ')

  return [first, rest.at(-1)].map((word) => word?.[0] ?? '').join('')
}
