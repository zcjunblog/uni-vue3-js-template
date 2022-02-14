/*
 * @Date: 2022-02-14 09:13:09
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-02-14 09:39:22
 * @FilePath: \uni-vue3-js-template\src\main.js
 */
import { createSSRApp } from 'vue'
import App from './App.vue'
import uView from './uni_modules/uview-ui'
export function createApp() {
    const app = createSSRApp(App)
    app.use(uView)
    return {
        app
    }
}
