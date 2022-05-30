import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

 
  resolve: {
    mainFields: [
      'browser', // used for matrix-js-sdk
      'module',
      'jsnext:main',
      'jsnext',
    ]
  }
})
