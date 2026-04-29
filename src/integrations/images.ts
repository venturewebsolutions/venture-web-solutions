import type { AstroIntegration } from 'astro'
import path from 'node:path'

declare global {
  var __imageRegistry: ImageRegistry | undefined
}

type ImageConfig = {
  maxRenderWidth: number
}

class ImageRegistry {
  private images = new Map<
    string,
    { image: ImageMetadata; config: ImageConfig }
  >()

  public registerImage(image: ImageMetadata, config: ImageConfig) {
    const filename = this.getFilename(image)

    const existing = this.images.get(filename)

    this.images.set(filename, {
      image,
      config: {
        maxRenderWidth: Math.max(
          existing?.config.maxRenderWidth ?? 0,
          config.maxRenderWidth,
        ),
      },
    })
  }

  public getEntries() {
    return this.images.entries()
  }

  private getFilename(image: ImageMetadata) {
    const clean = image.src.split('?')[0]
    return path.basename(clean)
  }
}

export const registry = (globalThis.__imageRegistry ??= new ImageRegistry())

export default function createIntegration(): AstroIntegration {
  return {
    name: 'images',
    hooks: {
      'astro:build:done': ({ logger }) => {
        for (const [filename, { image, config }] of registry.getEntries()) {
          if (image.format === 'svg') {
            continue
          }

          const idealWidth = config.maxRenderWidth * 2

          if (image.width < idealWidth) {
            logger.warn(
              `${filename} is only ${image.width} px but needs to be at least ${idealWidth} px (max render width is ${config.maxRenderWidth} px)`,
            )
          } else if (image.width > idealWidth) {
            logger.warn(
              `${filename} is ${image.width} px but only needs to be ${idealWidth} px ` +
                `(max render width is ${config.maxRenderWidth} px)`,
            )
          }
        }
      },
    },
  }
}
