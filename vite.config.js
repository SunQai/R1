import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/R1/', // ВАЖНО!!!
  plugins: [react()],
})