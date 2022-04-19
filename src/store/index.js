/*
 * @Date: 2022-02-14 17:16:13
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-04-19 17:32:13
 * @FilePath: \uni-vue3-js-template\src\store\index.js
 */
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

let modules = {}
const modulesFiles = import.meta.globEager('./modules/*.js')
for (const path in modulesFiles) {
    modules = { ...modules, [path.replace(/(.*\/)*([^.]+).*/gi, '$2')]: modulesFiles[path].default }
}
console.log(modules, '结果')

export default createStore({
    // 公共store
    state: {
        token: '',
        channel_code: 0,
        h5_channel_id: 0
    },
    // 公共mutations前加$符号区分
    mutations: {
        $changeStore(state, payload) {
            // 判断是否为多层级调用，state中为对象存在的情况，诸如user.info.name = 'xxx'
            const nameArr = payload.name.split('.')
            const len = nameArr.length
            if (len >= 2) {
                let obj = state[nameArr[0]]
                for (let i = 1; i < len - 1; i++) {
                    obj = obj[nameArr[i]]
                }
                obj[nameArr[len - 1]] = payload.value
            } else {
                state[payload.name] = payload.value
            }
        }
    },
    // 公共actions
    actions: {},
    // 公共getters
    getters: {},
    // 导入模块
    modules,
    // 持久化数据配置
    plugins: [
        createPersistedState({
            paths: ['$order.orderCount', 'token'],
            storage: {
                getItem: key => uni.getStorageSync(key),
                setItem: (key, value) => uni.setStorageSync(key, value),
                removeItem: key => uni.removeStorageSync(key)
            }
        })
    ]
})
