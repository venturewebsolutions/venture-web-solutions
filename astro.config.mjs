// @ts-check
import 'dotenv/config'
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import { fileURLToPath } from 'url'

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE,
  base: process.env.BASE,

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
