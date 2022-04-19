/*
 * @Date: 2022-04-19 16:22:33
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-04-19 18:26:47
 * @FilePath: \uni-vue3-js-template\vite.config.js
 */
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
// https://vitejs.dev/config/
export default defineConfig({
    build: {
        // minify: 'terser',
        // terserOptions: {
        //     compress: {
        //         // 生产环境时移除console 指定terser编译时有效
        //         drop_console: true,
        //         drop_debugger: true
        //     }
        // }
    },
    plugins: [uni()],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import './src/style/modules/mixin.scss';`
            }
        }
    }
})
