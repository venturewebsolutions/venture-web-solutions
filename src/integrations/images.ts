import type { AstroIntegration } from 'astro'
// import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

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

  public registerImage(image: ImageMetadata, config?: ImageConfig) {
    const filename = this.getFilename(image)

    const existing = this.images.get(filename)

    this.images.set(filename, {
      image,
      config: {
        maxRenderWidth: Math.max(
          existing?.config.maxRenderWidth ?? 0,
          config?.maxRenderWidth ?? 0,
        ),
      },
    })
  }

  public getEntries() {
    return this.images.entries()
  }

  private getFilename(image: ImageMetadata) {
    const clean = image.src.split('?')[0]

    if (import.meta.env.DEV) {
      return path.basename(clean)
    }

    const parts = path.basename(clean).split('.')

    if (parts.length >= 2) {
      parts.splice(parts.length - 2, 1)
    }

    return parts.join('.')
  }
}

export const registry = (globalThis.__imageRegistry ??= new ImageRegistry())

export default function createIntegration(): AstroIntegration {
  let projectRoot: string

  return {
    name: 'images',
    hooks: {
      'astro:config:setup': ({ config }) => {
        projectRoot = fileURLToPath(config.root)
      },
      'astro:build:done': ({ logger }) => {
        const entries = registry.getEntries()

        for (const [filename, { image, config }] of entries) {
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

        // const pathToImages = path.resolve(
        //   projectRoot,
        //   'src',
        //   'assets',
        //   'images',
        // )

        // const sourceImages = fs.readdirSync(pathToImages)

        // const imagesInRegistry = new Set([
        //   ...registry.getEntries().map(([filename]) => filename),
        // ])

        // const unusedImages = sourceImages.filter(
        //   (file) => !imagesInRegistry.has(file),
        // )

        // for (const image of unusedImages) {
        //   logger.warn(`${image} is unregistered`)
        // }
      },
    },
  }
}
