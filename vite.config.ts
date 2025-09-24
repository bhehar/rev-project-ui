import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { reactRouter } from "@react-router/dev/vite";
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), reactRouter()],
  resolve: {
    alias: {
      'app': path.resolve(__dirname, './app')
    }
  }
})
