import { defineCollection } from 'astro:content'
import { file, glob } from 'astro/loaders'
import { z } from 'astro/zod'

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      topic: z.string(),
      thumbnail: z.object({
        image: image(),
        description: z.string(),
      }),
      author: z.object({
        name: z.string(),
        avatar: image(),
      }),
      readTimeMinutes: z.number(),
      publishedDate: z.coerce.date(),
      featured: z.boolean().optional(),
    }),
})

const faqTopics = defineCollection({
  loader: file('./src/content/faq-topics.json'),
  schema: z.object({
    name: z.string(),
    faqs: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
        featured: z.boolean().optional(),
      }),
    ),
  }),
})

export const collections = { blog, faqTopics }
