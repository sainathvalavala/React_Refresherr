import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vitest reads this block. jsdom gives tests a fake browser DOM, and
  // globals lets Testing Library clean up between tests automatically.
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
