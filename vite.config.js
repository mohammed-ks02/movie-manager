import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  "scripts": {
  "dev": "vite", // Or "vite --host" if you need to access from other devices on the network
  "build": "vite build",
  "preview": "vite preview"
}
})
