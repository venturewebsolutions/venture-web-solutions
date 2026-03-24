import type { DataEntryMap, InferEntrySchema } from 'astro:content'

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

export type CollectionItem<C extends keyof DataEntryMap> = {
  id: string
} & InferEntrySchema<C>
