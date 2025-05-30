// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/my-portfolio/', // <- coloque exatamente o nome do repositório aqui
  plugins: [react()],
})

