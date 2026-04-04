import { defineCollection } from 'astro:content'
import { file, glob } from 'astro/loaders'
import { z } from 'astro/zod'

const blog = defineCollection({
  loader: glob({ base: './src/content/blog/', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
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
    order: z.number(),
  }),
})

const team = defineCollection({
  loader: glob({ base: './src/content/team/', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      meta: z.object({
        description: z.string(),
      }),
      eyebrow: z.string(),
      bio: z.object({
        left: z.array(z.string()),
        right: z.array(z.string()),
      }),
      marquee: z.object({
        images: z.array(
          z.object({
            src: image(),
          }),
        ),
      }),
      roles: z.array(
        z.object({
          heading: z.string(),
          text: z.string(),
        }),
      ),
      photo: z.object({
        src: image(),
      }),
      badge: z.string(),
      position: z.string(),
      socials: z.array(
        z.object({
          platform: z.enum(['facebook', 'instagram', 'linkedin']),
          name: z.string(),
          href: z.string(),
        }),
      ),
      qa: z.array(
        z.object({
          question: z.string(),
          answer: z.string(),
        }),
      ),
    }),
})

export const collections = { blog, faqTopics, team }
