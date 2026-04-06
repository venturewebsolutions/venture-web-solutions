import { z } from 'astro/zod'

const videos = import.meta.glob<{ default: string }>(
  '@/assets/videos/**/*.mp4',
  { eager: true },
)

export function video() {
  return z.string().transform((path) => videos[path.replace('@/', '/src/')])
}
