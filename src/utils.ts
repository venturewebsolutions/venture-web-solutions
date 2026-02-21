import _ from 'lodash'
import { SITE, BASE } from './config'

export const url = (pathname: string) => {
  const parts: string[] = []

  const site = _.trim(SITE, '/')
  const base = _.trim(BASE, '/')

  if (site) {
    parts.push(site)
  }

  parts.push('/')

  if (base) {
    parts.push(base)
    parts.push('/')
  }

  parts.push(_.trimStart(pathname, '/'))

  return parts.join('')
}
