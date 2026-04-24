import type { AstroIntegration } from 'astro'
import path from 'node:path'

declare global {
  var __imageRegistry: ImageRegistry | undefined
}

interface Logger {
  warn(message: string): void
}

class ConsoleLogger implements Logger {
  public warn(message: string): void {
    console.warn(message)
  }
}

type ImageConfig = {
  maxRenderWidth: number
}

class ImageRegistry {
  private logger: Logger = new ConsoleLogger()

  private images = new Map<
    string,
    { image: ImageMetadata; config: ImageConfig }
  >()

  public registerImage(image: ImageMetadata, config: ImageConfig) {
    const filename = this.getFilename(image)

    if (image.width < config.maxRenderWidth * 2) {
      this.logger.warn(
        `${filename} is ${image.width} only px but needs to be at least ${config.maxRenderWidth * 2} px (max render width is ${config.maxRenderWidth} px)`,
      )
    }

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

  public setLogger(logger: Logger) {
    this.logger = logger
  }

  private getFilename(image: ImageMetadata) {
    const clean = image.src.split('?')[0]
    return path.basename(clean)
  }
}

export const registry = (globalThis.__imageRegistry ??= new ImageRegistry())

export default function createIntegration(): AstroIntegration {
  return {
    name: 'image-size-check',
    hooks: {
      'astro:config:setup': ({ logger }) => {
        registry.setLogger(logger)
      },
      'astro:build:done': ({ logger }) => {
        for (const [filename, { image, config }] of registry.getEntries()) {
          const idealWidth = config.maxRenderWidth * 2

          if (image.width > idealWidth) {
            logger.warn(
              `${filename} is ${image.width} px but only needs to be ${idealWidth} px ` +
                `(largest render width is ${config.maxRenderWidth} px)`,
            )
          }
        }
      },
    },
  }
}
