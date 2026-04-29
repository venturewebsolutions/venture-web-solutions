import range from 'lodash/range'

export function onImagesLoaded(
  images: ArrayLike<HTMLImageElement>,
  cb: () => any,
) {
  let loaded = 0

  for (const image of Array.from(images)) {
    if (image.complete && image.naturalWidth > 0) {
      loaded++

      if (loaded === images.length) {
        cb()
      }
    } else {
      image.addEventListener('load', () => {
        loaded++

        if (loaded === images.length) {
          cb()
        }
      })
    }
  }
}

const LIGHTHOUSE_MOBILE_DPR = 1.75
const LIGHTHOUSE_DESKTOP_DPR = 1
const DEFAULT_STEP = 250

export type ImageWidths = {
  min: number
  max: number
  mobile?: number
  desktop?: number
  step?: number
}

export type ImageSizes = string | string[]

export function getWidths(widths: ImageWidths) {
  const { min, max, mobile, desktop, step = DEFAULT_STEP } = widths

  const result = [...range(min, max * 2, step), max * 2]

  if (mobile) {
    result.push(Math.ceil(mobile * LIGHTHOUSE_MOBILE_DPR))
  }

  if (desktop) {
    result.push(Math.ceil(desktop * LIGHTHOUSE_DESKTOP_DPR))
  }

  return [...new Set(result)].toSorted((a, b) => a - b)
}

export function getSizes(sizes: ImageSizes, widths: ImageWidths) {
  const { mobile, desktop } = widths

  const result = Array.isArray(sizes) ? [...sizes] : [sizes]

  if (desktop) {
    result.unshift(`(width: 1350px) ${widths.desktop}px`)
  }

  if (mobile) {
    result.unshift(`(width: 412px) ${widths.mobile}px`)
  }

  return result.join(', ')
}
