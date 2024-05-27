/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import JSX from '@vitejs/plugin-vue-jsx';
import { fileURLToPath, URL } from 'node:url';

import AutoImport from 'unplugin-auto-import/vite';

// const isCustomElementArrys = [];

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  server: {
    port: 3000,
    host: '0.0.0.0',
    cors: true,
    proxy: {}
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // isCustomElement: (tag) => tag && isCustomElementArrys.includes(tag)
        }
      }
    }),
    JSX({
      // isCustomElement: (tag) => tag && isCustomElementArrys.includes(tag)
    }),
    AutoImport({  })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    'import.meta.vitest': process.env.NODE_ENV === 'development' ? true : false
  },
  test: {
    includeSource: ['src/**/*.test.{js,ts,tsx}']
  }
});
