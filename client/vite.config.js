import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration for React frontend
export default defineConfig({
  plugins: [react()],
  // Proxy API requests to backend server
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
