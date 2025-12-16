import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'react-typing-text',
      fileName: (format) => `index.${format}.js`,
    },
    outDir: 'dist/module',
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        exports: 'named',
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [
    react(),
    tailwindcss(),
    dts({
      tsconfigPath: './tsconfig.json',
      outDir: 'dist/types',
      insertTypesEntry: true,
    }),
  ],
});
