import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSharp } from 'vite-plugin-sharp'

export default defineConfig({
  plugins: [
    react(),
    viteSharp({
      presets: {
        optimized: {
          width: 800,
          format: 'webp',
          quality: 75,
        },
      },
    }),
  ],
  base: '/OPTCG-Proxy-Generator/',
})