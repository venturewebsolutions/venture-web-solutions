import { video } from '@/lib/schema'
import { file, glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

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

const work = defineCollection({
  loader: glob({ base: './src/content/work/', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) => {
    const media = {
      background: z.xor([z.boolean(), z.string()]),
      border: z.boolean(),
      shadow: z.boolean(),
      padding: z.enum(['s', 'l']).nullable(),
      constrained: z.boolean(),
    }

    return z.object({
      order: z.number(),
      client: z.string(),
      heading: z.string(),
      summary: z.string(),
      highlights: z.array(
        z.object({
          icon: z.string(),
          text: z.string(),
        }),
      ),
      thumbnail: z.object({
        src: image(),
        alt: z.string(),
      }),
      tags: z.array(z.string()),
      url: z.string(),
      mockup: z.object({
        desktop: z.object({
          src: image(),
        }),
        mobile: z.object({
          src: image(),
        }),
      }),
      logo: z.object({
        src: image(),
      }),
      sections: z.array(
        z.object({
          label: z.string(),
          heading: z.string(),
          text: z.array(z.string()),
          bullets: z
            .object({
              heading: z.string().optional(),
              items: z.array(
                z.object({
                  label: z.string().optional(),
                  text: z.string(),
                  icon: z.string().optional(),
                }),
              ),
            })
            .optional(),
          media: z
            .array(
              z.xor([
                z.object({
                  ...media,
                  type: z.enum(['image']),
                  src: image(),
                  alt: z.string(),
                }),
                z.object({
                  ...media,
                  type: z.enum(['video']),
                  src: video(),
                  autoplay: z.boolean().optional(),
                  thumbnail: z.boolean().optional(),
                }),
              ]),
            )
            .optional(),
          testimonial: z
            .object({
              image: z.object({
                src: image(),
                alt: z.string(),
              }),
              quote: z.string(),
              citation: z.string(),
            })
            .optional(),
        }),
      ),
    })
  },
})

const testimonials = defineCollection({
  loader: glob({
    base: './src/content/testimonials/',
    pattern: '**/*.{md,mdx}',
  }),
  schema: ({ image }) =>
    z.object({
      order: z.number(),
      client: z.string(),
      image: image(),
      author: z.string(),
      position: z.string(),
      avatar: image(),
      quote: z.string(),
    }),
})

export const collections = { blog, faqTopics, team, work, testimonials }
