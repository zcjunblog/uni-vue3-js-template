/*
 * @Date: 2022-02-14 09:13:09
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-02-14 09:58:27
 * @FilePath: \uni-vue3-js-template\vite.config.js
 */
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [uni()],
    css: {
        postcss: {
            plugins: []
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
})
