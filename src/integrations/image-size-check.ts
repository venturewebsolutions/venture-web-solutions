import type { AstroIntegration, AstroIntegrationLogger } from 'astro'
import path from 'node:path'

interface Logger {
  warn(message: string): void
}

class ConsoleLogger implements Logger {
  public warn(message: string): void {
    console.warn(message)
  }
}

class ImageRegistry {
  private logger: Logger = new ConsoleLogger()

  private images = new Map<
    string,
    { image: ImageMetadata; maxRenderWidth: number }
  >()

  public add(image: ImageMetadata, maxRenderWidth: number) {
    const filename = this.getFilename(image)

    if (image.width < maxRenderWidth * 2) {
      this.logger.warn(
        `${filename} is ${image.width} only px but needs to be at least ${maxRenderWidth * 2} px (max render width is ${maxRenderWidth} px)`,
      )
    }

    const existing = this.images.get(filename)

    this.images.set(filename, {
      image,
      maxRenderWidth: Math.max(existing?.maxRenderWidth ?? 0, maxRenderWidth),
    })
  }

  public entries() {
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

declare global {
  var __imageRegistry: ImageRegistry | undefined
}

globalThis.__imageRegistry ??= new ImageRegistry()

export const registry = globalThis.__imageRegistry

export default function createIntegration(): AstroIntegration {
  return {
    name: 'image-size-check',
    hooks: {
      'astro:config:setup': ({ logger }) => {
        registry.setLogger(logger)
      },
      'astro:build:done': ({ logger }) => {
        for (const [
          filename,
          { image, maxRenderWidth },
        ] of registry.entries()) {
          const idealWidth = maxRenderWidth * 2

          if (image.width > idealWidth) {
            logger.warn(
              `${filename} is ${image.width} px but only needs to be ${idealWidth} px ` +
                `(largest render width is ${maxRenderWidth} px)`,
            )
          }
        }
      },
    },
  }
}
