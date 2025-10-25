import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/mayasan-page/',
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/wp-json/wp/v2/posts': {
        target: 'http://localhost:5173/mock/posts.json',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wp-json\/wp\/v2\/posts/, ''),
      },
      '/wp-json/wc/v3/products': {
        target: 'http://localhost:5173/mock/products.json',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wp-json\/wc\/v3\/products/, ''),
      },
      '/wp-json/wc/v3/products/categories': {
        target: 'http://localhost:5173/mock/categories.json',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wp-json\/wc\/v3\/products\/categories/, ''),
      },
    },
  },
})
