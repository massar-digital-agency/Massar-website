import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import path from 'path'
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'

function sitemapPlugin() {
  return {
    name: 'generate-sitemap',
    closeBundle() {
      execSync('node scripts/generate-sitemap.mjs', { stdio: 'inherit' })
    },
  }
}

function criticalCSSPlugin(): Plugin {
  return {
    name: 'critical-css',
    closeBundle: {
      sequential: true,
      order: 'post',
      handler: async () => {
        const { default: Critters } = await import('critters')
        const distDir = path.resolve(__dirname, 'dist')
        const htmlPath = path.resolve(distDir, 'index.html')
        const html = readFileSync(htmlPath, 'utf-8')

        const critters = new Critters({
          path: distDir,
          reduceInlineStyles: true,
          preload: 'media',
          logLevel: 'warn',
        })

        const inlined = await critters.process(html)
        writeFileSync(htmlPath, inlined)
      },
    },
  }
}

export default defineConfig({
  plugins: [
    mdx({ remarkPlugins: [] }),
    react(),
    tailwindcss(),
    sitemapPlugin(),
    criticalCSSPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'react-helmet-async': path.resolve(__dirname, './src/lib/react-helmet-async.tsx'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) return 'vendor-react'
          if (id.includes('node_modules/react-router')) return 'vendor-router'
          if (id.includes('node_modules/framer-motion')) return 'vendor-animation'
          if (id.includes('node_modules/i18next')) return 'vendor-i18n'
          if (id.includes('node_modules/lucide-react')) return 'vendor-icons'
          if (id.includes('node_modules/react-helmet-async')) return 'vendor-helmet'
        },
      },
    },
  },
})
