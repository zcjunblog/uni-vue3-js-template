/*
 * @Date: 2022-04-19 16:22:33
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-06-09 16:45:02
 * @FilePath: \uni-vue3-js-template\src\main.js
 */
import { createSSRApp } from 'vue'
import App from './App.vue'
import $vuex from './store/store.utils'
import $router from './utils/router'
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
    app.config.globalProperties.$router = $router // router方法
    return {
        app
    }
}
