import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Dev server — proxies /api and /images to local Express backend
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true
      },
      '/images': {
        target: 'http://localhost:4000',
        changeOrigin: true
      }
    }
  },
  // Production build
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
