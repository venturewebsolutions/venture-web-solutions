export function cn(...classNames: (string | null | undefined)[]): string[] {
  const classes = classNames
    .flatMap((className) => (className ?? '').split(' '))
    .filter(Boolean)

  return [...new Set(classes)]
}
