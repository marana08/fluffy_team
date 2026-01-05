import path from 'path';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import FullReload from 'vite-plugin-full-reload';
import handlebars from 'vite-plugin-handlebars';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig(() => {
  return {
    root: 'src',
    input: 'main.js',
    output: {
      dir: 'dist',
      format: 'es',
    },

    server: {
      port: 5410,
      open: true,
      watch: {
        ignored: ['**/.stylelintcache', '**/.eslintcache'],
      },
    },

    build: {
      outDir: '../dist',
      emptyOutDir: true,
      sourcemap: true,
      assetsInlineLimit: 51200,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'src/index.html'),
        },
      },
    },

    plugins: [
      handlebars({
        partialDirectory: path.resolve(__dirname, 'src/partials'),
      }),

      createHtmlPlugin({ minify: true }),

      FullReload(['./src/**/**.html', './src/partials/**/**.hbs']),

      viteCompression({
        algorithm: 'brotliCompress',
        ext: '.br',
        verbose: false,
      }),
    ],
  };
});
