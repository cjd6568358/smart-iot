import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createStyleImportPlugin, VantResolve } from 'vite-plugin-style-import'
import { VitePWA } from 'vite-plugin-pwa';
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
    })
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
