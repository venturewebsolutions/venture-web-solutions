import trim from 'lodash/trim'
import trimStart from 'lodash/trimStart'
import { SITE, BASE } from '@/config'

export const url = (pathname: string) => {
  const parts: string[] = []

  const site = trim(SITE, '/')
  const base = trim(BASE, '/')

  if (site) {
    parts.push(site)
  }

  parts.push('/')

  if (base) {
    parts.push(base)
    parts.push('/')
  }

  parts.push(trimStart(pathname, '/'))

  return parts.join('')
}
