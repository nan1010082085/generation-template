import { defineConfig } from 'vite';
import { copy } from 'vite-plugin-copy';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig(() => {
  return {
    publicDir: false,
    build: {
      outDir: './dist',
      assetsDir: 'package',
      lib: {
        entry: './index.mjs',
        name: 'cm',
        fileName: 'cm',
        formats: ['es', 'cjs']
      }
    },
    plugins: [
      nodePolyfills(),
      copy([
        {
          src: './package',
          dest: 'dist/'
        }
      ])
    ]
  };
});
