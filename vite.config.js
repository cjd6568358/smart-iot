import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createStyleImportPlugin, VantResolve } from 'vite-plugin-style-import'
import { VitePWA } from 'vite-plugin-pwa';
import fs from 'fs';
import path from 'path';
const INVALID_CHAR_REGEX = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g;
const DRIVE_LETTER_REGEX = /^[a-z]:/i;
// https://vitejs.dev/config/
export default defineConfig({
  base: "/smart-iot/",
  build: {
    outDir: "docs",
    rollupOptions: {
      output: {
        // https://github.com/rollup/rollup/blob/master/src/utils/sanitizeFileName.ts
        sanitizeFileName (fileName) {
          const match = DRIVE_LETTER_REGEX.exec(fileName);
          const driveLetter = match ? match[0] : "";
          return (
            driveLetter +
            fileName.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, "")
          );
        },
      },
    },
  },
  plugins: [
    // VitePWA({
    //   includeAssets: ['favicon.ico', 'iot.png'],
    //   manifest: {
    //     name: 'Smart IoT App',
    //     short_name: 'SmartIoT',
    //     description: 'control family IoT device',
    //     theme_color: '#ffffff',
    //     icons: [
    //       {
    //         src: 'iot.png',
    //         sizes: '128x128',
    //         type: 'image/png',
    //       },
    //     ],
    //   },
    // }),
    vue(),
    vueJsx(),
    createStyleImportPlugin({
      resolves: [
        VantResolve()
      ],
      libs: [
        {
          libraryName: "vant",
          esModule: true,
          resolveStyle: (name) => `../es/${name}/style` // 注意这里的路径适用于vite-plugin-style-import 2.0版本
        },
      ]
    }),
    {
      name: 'copy-404',
      closeBundle () {
        const srcPath = path.resolve(__dirname, 'docs', 'index.html');
        const destPath = path.resolve(__dirname, 'docs', '404.html');

        // 复制 index.html 到 404.html
        fs.copyFile(srcPath, destPath, (err) => {
          if (err) {
            console.error('生成 404.html 失败:', err);
          } else {
            console.log('成功生成 404.html');
          }
        });
      },
    },
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ejs", '.mjs'], // 之前忽略了 .mjs
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler" // or 'modern'
      }
    }
  },
})
