import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base:'/Delizioso/',
  css: {
    modules: {
      generateScopedName: '[local]_[hash:base64:5]', 
    },
  },
  server: {
    proxy: {
      '/Delizioso/api': {
        target: 'http://localhost:5000', 
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
