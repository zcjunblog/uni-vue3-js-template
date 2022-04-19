/*
 * @Date: 2022-04-19 16:22:33
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-04-19 18:15:15
 * @FilePath: \uni-vue3-js-template\src\main.js
 */
import { createSSRApp } from 'vue'
import App from './App.vue'
import $vuex from './store/store.utils'
import uView from './uni_modules/uview-ui'
import tools from './utils/tools'
import directive from './directive'
import store from './store'

export function createApp() {
    const app = createSSRApp(App)
    app.use(uView)
    app.use(store)
    directive(app)
    app.config.globalProperties.$tools = tools // 业务方法
    app.config.globalProperties.$vuex = $vuex // vuex方法
    app.config.globalProperties.$staticUrl = import.meta.env.VITE_APP_STATICURL // 网络图片 云存储域名
    return {
        app
    }
}
