/*
 * @Date: 2022-02-14 09:13:09
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-02-14 10:43:09
 * @FilePath: \uni-vue3-js-template\vite.config.js
 */
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [uni()],
    resolve: {
        alias: {
            //  @指向src 无需再配置
            // '@': path.resolve(__dirname, 'src')
        }
    }
})
