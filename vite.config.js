import path from 'path';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import FullReload from 'vite-plugin-full-reload';
import handlebars from 'vite-plugin-handlebars';
import { createHtmlPlugin } from 'vite-plugin-html';
import critical from 'rollup-plugin-critical';

export default defineConfig(() => {
  return {
    root: 'src',

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

      critical({
        criticalUrl: 'dist/',
        criticalBase: 'dist/',
        criticalPages: [{ uri: 'index.html', template: 'index' }],
        criticalConfig: {
          inline: true,
          dimensions: [
            { width: 375, height: 667 }, // Mobile
            { width: 1300, height: 900 }, // Desktop
          ],
        },
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
