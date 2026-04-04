import trim from 'lodash/trim'
import trimStart from 'lodash/trimStart'
import { BASE } from '@/config'

export const url = (pathname: string) => {
  const parts: string[] = []

  const base = trim(BASE, '/')

  parts.push('/')

  if (base) {
    parts.push(base)
    parts.push('/')
  }

  parts.push(trimStart(pathname, '/'))

  return parts.join('')
}
