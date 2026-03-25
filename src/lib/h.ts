import type { HeadingLevel, HeadingTag } from './types'

export function h(level: HeadingLevel): HeadingTag {
  return `h${Math.max(Math.min(level, 6), 1)}` as HeadingTag
}
