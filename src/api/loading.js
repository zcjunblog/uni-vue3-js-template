/*
 * @Date: 2022-02-15 15:07:05
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-04-19 19:20:28
 * @FilePath: \uni-vue3-js-template\src\api\loading.js
 */
/**
 * 加载动画
 * @param tips 提示语句
 * @returns 关闭loading
 */
export default (tips = '加载中...') => {
    uni.showLoading({
        title: tips,
        mask: true
    })
    uni.showNavigationBarLoading()
    return () => {
        uni.hideLoading()
        uni.hideNavigationBarLoading()
        return null
    }
}
