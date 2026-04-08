import trim from 'lodash/trim'
import trimStart from 'lodash/trimStart'

export const url = (pathname: string) => {
  const parts: string[] = []

  const base = trim(import.meta.env.BASE_URL, '/')

  if (base) {
    parts.push(base)
  }

  parts.push(trimStart(pathname, '/'))

  return `/${parts.join('/')}`
}
