/*
 * @Date: 2022-02-21 16:55:20
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-04-19 17:14:12
 * @FilePath: \uni-vue3-js-template\src\utils\tools.js
 */
import $vuex from '@/store/store.utils'
import { $u } from '@/uni_modules/uview-ui/index'
import { useRoute } from 'vue-router'
export default {
    showToast(title = '加载中...', config = {}) {
        let option = Object.assign(
            {
                title,
                icon: 'none',
                mask: true
            },
            config
        )
        uni.showToast(option)
    },
    alert(config) {
        uni.showModal({
            title: '提示',
            confirmColor: '#32C7A9',
            ...config
        })
    },
    back(delta = 1) {
        uni.navigateBack({
            delta
        })
    },

    toIndex() {
        $u.route({ type: 'redirect', url: '/pages/index/index' })
    },
    // 判断是isIOS
    isIOS() {
        return uni.getSystemInfoSync().platform === 'ios'
    },
    // 判断是android
    isAndroid() {
        return uni.getSystemInfoSync().platform === 'android'
    },
    // 清除用户信息
    clearUserData() {
        // 重置
        $vuex.set('token', '')
    },
    // 获取用户定位
    getUserLocation() {
        console.log('getUserLocation')
        // h5 必须https才能正常获取定位
        // 无 GPS 模块的 PC 设备使用 Chrome 浏览器的时候，位置信息是连接谷歌服务器获取的，国内用户可能获取位置信息失败
        uni.getLocation({
            type: 'gcj02',
            success: location => {},
            fail: err => {
                console.log('获取用户经纬度失败err', err)
            }
        })
    },
    // 浏览器消息通知
    notifyMe() {
        // 先检查设备是否为移动端, 是则不继续执行代码
        if (this.isMobile()) return false

        // 先检查浏览器是否支持
        if (!('Notification' in window)) {
            // alert('你的浏览器不支持桌面通知！')
            return false
        }
        // 检查用户是否同意接受通知
        else if (Notification.permission === 'granted') {
            new Notification('有新消息！')
        }
        // 否则我们需要向用户获取权限
        else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(function (permission) {
                // 如果用户接受权限，我们就可以发起一条消息
                if (permission === 'granted') {
                    new Notification('有新消息！')
                }
            })
        }
    }
}
