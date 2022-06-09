/*
 * @Date: 2022-04-24 16:20:57
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-06-09 17:03:54
 * @FilePath: \uni-vue3-js-template\src\utils\router.js
 */
import tools from '../utils/tools'
// 打印跳转信息
function sucLog(url, type) {
    console.log(`${type}成功: ${url}  `)
}
// 打印跳转信息
function errLog(url, type, message) {
    console.log(
        `%c 跳转失败 %c ${type} ${url}  `,
        'background: #b31217; color: #fff; border-radius: 3px 0 0 3px;',
        'background: #e52d27; color: #fff; border-radius: 0 3px 3px 0;',
        message
    )
}
// 实现uni-app页面跳转的易用方法
// 传参示例: url: 'test?id=1'

class EasyRouter {
    // navigateTo config.unAuth为true时跳过登录态检查
    push = (url, config = {}) => {
        uni.navigateTo({
            url,
            ...config,
            success: () => sucLog(url, 'navigateTo'),
            fail: err => errLog(url, 'navigateTo', err)
        })
    }
    // redirect
    replace = (url, config = {}) => {
        uni.redirectTo({
            url,
            ...config,
            success: () => sucLog(url, 'redirect'),
            fail: err => errLog(url, 'redirect', err)
        })
    }
    // reLaunch
    reload = url => {
        uni.reLaunch({
            url,
            success: () => sucLog(url, 'reLaunch'),
            fail: err => errLog(url, 'reLaunch', err)
        })
    }
    // switchTab
    switch = url => {
        uni.switchTab({
            url,
            success: () => sucLog(url, 'switchTab'),
            fail: err => errLog(url, 'switchTab', err)
        })
    }
    // navigateBack
    back = (delta = 1, config = {}) => {
        uni.navigateBack({
            delta,
            ...config
        })
    }
    // getCurrentPage获取当前页面实例
    current = () => {
        let pages = getCurrentPages()
        return pages[pages.length - 1]
    }
}
export default new EasyRouter()
