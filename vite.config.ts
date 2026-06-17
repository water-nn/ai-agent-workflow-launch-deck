import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/ai-agent-workflow-launch-deck/',
  plugins: [react()],
})
