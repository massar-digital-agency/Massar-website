import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import path from 'path'
import { execSync } from 'node:child_process'

function sitemapPlugin() {
  return {
    name: 'generate-sitemap',
    closeBundle() {
      execSync('node scripts/generate-sitemap.mjs', { stdio: 'inherit' })
    },
  }
}

export default defineConfig({
  plugins: [
    mdx({ remarkPlugins: [] }),
    react(),
    tailwindcss(),
    sitemapPlugin(),
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
