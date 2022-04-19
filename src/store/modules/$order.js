/*
 * @Date: 2022-02-14 17:58:22
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-04-08 09:34:49
 * @FilePath: \uni-vue3-ts-template\src\store\modules\$order.ts
 */
// 该文件仅做测试使用
export default {
    // 通过添加 namespaced: true 的方式使其成为带命名空间的模块
    namespaced: true,

    state: {
        orderCount: 5
    },

    getters: {},

    mutations: {
        orderCountReduce(state) {
            state.orderCount--
        }
    },

    actions: {}
}
