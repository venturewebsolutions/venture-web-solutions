// @ts-check
import sitemap from '@astrojs/sitemap'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'
import { fileURLToPath } from 'url'
import imageSizeCheck from './src/integrations/image-size-check'

// https://astro.build/config
export default defineConfig({
  vite: {
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          loadPaths: [
            fileURLToPath(new URL('./src/assets/styles/lib/', import.meta.url)),
          ],
        },
      },
    },
  },

  devToolbar: {
    enabled: false,
  },

  integrations: [
    sitemap(),
    icon({
      iconDir: './src/assets/icons/',
      svgoOptions: {
        plugins: [
          'preset-default',
          {
            name: 'convertColors',
            params: { currentColor: true },
          },
        ],
      },
    }),
    imageSizeCheck(),
  ],
})
