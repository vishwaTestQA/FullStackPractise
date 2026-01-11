// import { defineConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   test: {                //error here so installed npm install -D vitest and updated the import
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts",
  },
})
