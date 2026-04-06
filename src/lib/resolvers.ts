import type { HTMLAttributes } from 'astro/types'

const icons = import.meta.glob<{ default(_props: HTMLAttributes<'svg'>): any }>(
  '@/components/icons/**/*.astro',
  { eager: true },
)

export function icon(name: string) {
  return icons[`/src/components/icons/${name}.astro`]?.default
}
