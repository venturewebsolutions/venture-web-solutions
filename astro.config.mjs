// @ts-check
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'
import { fileURLToPath } from 'url'

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

  integrations: [sitemap()],
})
