/*
 * @Date: 2022-02-21 16:55:20
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-06-09 16:43:44
 * @FilePath: \uni-vue3-js-template\src\utils\tools.js
 * @Description: 跟项目逻辑有关的工具方法 与其他项目不通用
 */
import dayjs from 'dayjs'
import $vuex from '@/store/store.utils'
import $router from './router'
import to from 'await-to-js'
import { $u } from '@/uni_modules/uview-ui/index'

export default {
    /* ------------------------------#二次封装api start---------------------------------- */

    showToast(title = '加载中...', config = {}, delay = 2000) {
        return new Promise(resolve => {
            this.sleep(delay).then(() => {
                let option = Object.assign(
                    {
                        title,
                        icon: 'none',
                        mask: true
                    },
                    config
                )
                uni.showToast(option)
                resolve()
            })
        })
    },
    alert(config) {
        uni.showModal({
            title: '提示',
            confirmColor: '#32C7A9',
            ...config
        })
    },
    // 订阅消息
    subscribeMessage(tmplIds) {
        return new Promise((resolve, reject) => {
            if (uni.requestSubscribeMessage && tmplIds.length) {
                uni.requestSubscribeMessage({
                    // 就微信支持
                    tmplIds,
                    success: res => {
                        resolve(res)
                    },
                    fail: err => {
                        reject(err)
                    }
                })
            } else {
                reject(new Error(tmplIds.length ? '版本过低不能支持消息订阅' : '没有消息模板'))
            }
        })
    },
    // 选择图片
    chooseImage(count = 1) {
        return new Promise((resolve, reject) => {
            uni.chooseImage({
                count,
                success: res => {
                    resolve(res)
                },
                fail: err => {
                    reject(err)
                }
            })
        })
    },
    /* ------------------------------#二次封装api end---------------------------------- */

    /* ------------------------------#登录,跳转,路由,数据请求相关 start---------------------------------- */

    // 用户信息中存在userId则认为已登录
    isLogin() {
        return !!$vuex.get('$user.userInfo.userId')
    },
    // 重登 检查到登录态后端会直接返回登录信息
    reLogin() {
        $vuex.dispatch('$user/checkLogin')
    },
    // 环信登录
    imReLogin() {
        if ($vuex.get('$im.easemobUsername')) {
            onImLogin()
        }
    },
    // 清除用户信息
    clearUserData() {
        // 清除用户信息
        $vuex.set('$user.userInfo', {})
        // 清除token
        $vuex.set('$user.token', '')
        // 清除环信账号
        $vuex.set('$im.easemobUsername', '')
        // 清除宠物列表
        $vuex.set('$pet.petList', [])
    },
    // 刷新宠物列表
    refreshPetList() {
        if (this.isLogin()) {
            $vuex.dispatch('$pet/fetchPetList')
        }
    },
    // 用户登录后存入环信账号供环信登陆使用
    setEasemobUsername(userId) {
        $vuex.set('$im.easemobUsername', import.meta.env.VITE_APP_IM_PREFIX + '_' + userId)
    },
    // 跳转登录页 type: push, replace, reload
    toLogin(type = 'push') {
        if (type === 'replace') {
            // 401拦截到登录页的
            $router.replace('/app/user/login')
            return
        }
        $router.push('/app/user/login?userClick=1', { unAuth: true }) // 用户主动点击拦截到登录页
    },
    // 跳转首页
    toIndex() {
        // $router.switch('/pages/index/index')
        $router.reload('/pages/index/index')
    },
    /* ------------------------------#登录,跳转,路由相关 end---------------------------------- */

    /* ------------------------------#工具类 start---------------------------------- */

    // 进行延时，以达到可以简写代码的目的 比如: await this.$tools.sleep(20)将会阻塞20ms
    sleep(delay = 30) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, delay)
        })
    },
    // 保留小数点后几位
    toFixed(num, decimal) {
        num = num.toString()
        let index = num.indexOf('.')
        if (index !== -1) {
            num = num.substring(0, decimal + index + 1)
        } else {
            num = num.substring(0)
        }
        return parseFloat(num).toFixed(decimal)
    },
    // 判断是isIOS
    isIOS() {
        return uni.getSystemInfoSync().platform === 'ios'
    },
    // 判断是android
    isAndroid() {
        return uni.getSystemInfoSync().platform === 'android'
    },
    // 参数校验
    validateField(form, rules) {
        return new Promise((resolve, reject) => {
            for (let field in form) {
                if (rules[field]) {
                    if (form[field] instanceof Array) {
                        if (!form[field].length) {
                            this.showToast(rules[field])
                            reject(rules[field])
                            break
                        }
                    } else {
                        if (!form[field]) {
                            this.showToast(rules[field])
                            reject(rules[field])
                            break
                        }
                    }
                }
            }
            resolve()
        })
    },
    /* ------------------------------#工具类 end---------------------------------- */

    /* ------------------------------#耦合项目逻辑的方法 start---------------------------------- */
    setMsgCountBadge() {
        // 获取当前页
        let pages = getCurrentPages()
        let currentPage = pages[pages.length - 1].route
        if (currentPage.slice(0, 5) === 'pages') {
            // app首次加载getters拿到的count可能为0
            this.sleep(500).then(() => {
                let count = $vuex.getters('$im/unreadNumTotal')
                if (count <= 0) {
                    uni.removeTabBarBadge({ index: 1 })
                    return
                }
                uni.setTabBarBadge({ index: 1, text: count + '' })
            })
        }
    },
    // 针对golang的项目整理金钱格式
    formatMoney(money, decimal = 2) {
        return this.toFixed(money / 100, decimal)
    },
    /**
     * @param {number} lastIndex 路由数组中从尾部(1)开始数，要获取的路由所在的位置
     * @returns {string}
     */
    getLastPageUrl() {
        const pages = getCurrentPages()
        console.log('pages', pages)
        if (pages.length > 0 && pages.length >= 2) {
            const lastPage = pages.splice(-2, 1)[0]
            console.log('pages', lastPage)
            return this.splicePageUrlWithParams(lastPage)
        }
        console.log('页面栈数量小于2')
        return ''
    },
    /* 获取当前页带参数的url */
    splicePageUrlWithParams(obj) {
        const { route, options } = obj
        // 拼接url的参数
        let params = '/' + route + '?'
        for (let key in options) {
            const value = options[key]
            params += key + '=' + value + '&'
        }
        return params.substring(0, params.length - 1)
    },
    // 记录用户进入小程序时的页面
    recordLaunchPageUrl(launch) {
        const { path: route, query: options } = launch
        const pageUrl = this.splicePageUrlWithParams({ route, options })
        $vuex.set('$user.launchPageUrl', pageUrl)
        console.log('$user.launchPageUrl', $vuex.get('$user.launchPageUrl'))
    },
    // 查询城市地名
    reverseGeocoder(location, config = {}) {
        return new Promise((resolve, reject) => {
            __QQMap.reverseGeocoder({
                location,
                ...config,
                success: res => {
                    resolve(res.result)
                },
                fail: err => {
                    reject(err)
                    console.log('获取用户城市位置失败err', err)
                }
            })
        })
    },
    // TODO: 微信公众平台添加腾讯地图域名白名单
    // 获取用户当前定位
    getUserLocation() {
        return new Promise((resolve, reject) => {
            uni.getLocation({
                type: 'gcj02',
                success: location => {
                    resolve(location)
                },
                fail: err => {
                    reject(err)
                    console.log('获取用户经纬度失败err', err)
                }
            })
        })
    },
    // 定位用户当前城市信息
    getUserCityInfo() {
        return new Promise(resolve => {
            this.getUserLocation().then(location => {
                this.reverseGeocoder(location).then(info => {
                    // 返回城市信息
                    resolve(info)
                })
            })
        })
    },
    // 存下用户城市信息
    async setUserCityInfo() {
        const [err, res] = await to(uni.getSetting())
        if (err) return
        const auth = res.authSetting['scope.userLocation']
        if (auth === false) {
            // 已拒绝授权
            this.alert({
                content: '检测到您没有授权地址信息，是否去设置打开？',
                success: e => e.confirm && uni.openSetting()
            })
            return
        }
        if (auth === undefined) {
            // 没有授权过
            this.alert({
                title: '“好兽医”想使用您的位置信息',
                content:
                    '我们将通过调用位置权限的方式获取您的精准定位信息，用于提供地理位置服务功能，包括推荐附近的宠物医院，快速填写收货地址。您可以随时通过微信小程序的设置功能，选择是否允许我们获取，以及在何种情况下获取您的地理位置信息。如果您拒绝提供地理位置信息，您将无法使用上述功能，但不影响您使用小程序的其他功能。',
                confirmText: '去设置',
                success: e => {
                    if (e.confirm) {
                        this.getUserCityInfo().then(res => {
                            $vuex.set('$location.userLocation', res)
                            console.log('初次授权用户城市信息获取成功', $vuex.get('$location.userLocation'))
                        })
                    }
                }
            })
            return
        }
        // 已授权过
        this.getUserCityInfo().then(res => {
            $vuex.set('$location.userLocation', res)
            console.log('用户城市信息获取成功', $vuex.get('$location.userLocation'))
        })
    },
    // 获取设备信息
    getSystemInfo() {
        uni.getSystemInfo({
            success: res => {
                $vuex.set('$system.systemInfo', res)
                console.log('获取设备信息成功', $vuex.get('$system.systemInfo'))
            },
            fail: err => {
                console.log('获取设备信息失败err', err)
            }
        })
    },
    /** 微信订阅消息
     * @param tempKey {String} 订阅消息模板对应名称key
     * @param
     */
    wxSubMessage(tempKey) {
        return new Promise(async resolve => {
            // 订阅消息模板id合集
            const templates = wxSubTempIds[tempKey]
            if (!templates) {
                throw new Error('订阅消息模板不存在请核实:', tempKey)
            }
            const tempIds = templates.map(item => item.id)
            // 判断用户是否点过【总是保持以上选择，不再询问】
            const [err, res] = await to(uni.getSetting({ withSubscriptions: true }))
            if (!err) {
                if (!res.subscriptionsSetting.mainSwitch) {
                    // 订阅消息总开关,关了都是弹不起来的 提醒用户开启
                    this.alert({
                        content: '检测到您没打开订阅消息通知，是否去设置打开？',
                        success: e => e.confirm && uni.openSetting()
                    })
                    return
                }
                // 取出设置项
                const settings = res.subscriptionsSetting
                // 已订阅的模板id合集
                const hasSubTempIds = Object.keys(settings)
                // 多个模板, 有一个没选择, 就是flase, 可以弹
                let isAlways = !(templates.filter(el => !hasSubTempIds.includes(el.id)).length > 0)
                console.log('isAlways', isAlways)
                // 无需弹窗
                if (isAlways) {
                    // 返回后端接口所需的参数
                    return resolve(this.getSubscribeAccept(settings, templates))
                }
                // 需要弹出授权弹窗
                this.subscribeMessage(tempIds).then(result => {
                    // 返回后端接口所需的参数
                    resolve(this.getSubscribeAccept(result, templates))
                })
                return
            }
            this.showToast('获取设置信息失败')
            console.log('获取设置信息失败', err)
        })
    },
    /** 返回订阅消息已勾选的模板id和模板type 数组 提供给后端接口
     * @param {Object} ids 已订阅消息的id合集
     * @param {Array} subscribeTemplates 消息订阅模板数组
     * @return {Object} 返回订阅消息已勾选的模板id和模板type 数组
     */
    getSubscribeAccept(ids, subscribeTemplates = []) {
        // 筛出已勾选的订阅消息模板
        let tempArr = []
        for (let key in ids) {
            ids[key] === 'accept' && tempArr.push(key)
        }
        // 已勾选的模板id
        let idsArr = []
        // 已勾选的模板type
        let typeArr = []
        // 循环模板数组，查找已勾选的模板id和模板type
        subscribeTemplates.forEach(item => {
            if (tempArr.includes(item.id)) {
                idsArr.push(item.id)
                typeArr.push(item.type)
            }
        })
        console.log('订阅成功', idsArr, typeArr)
        return { idsArr, typeArr }
    },

    /* ------------------------------#耦合项目逻辑的方法 end---------------------------------- */

    /* ------------------------------#其他 start---------------------------------- */
    // 应用更新
    updateApp() {
        if (uni.canIUse('getUpdateManager')) {
            const updateManager = uni.getUpdateManager()
            updateManager.onCheckForUpdate(res => {
                // 请求完新版本信息的回调
                if (res.hasUpdate) {
                    updateManager.onUpdateReady(() => {
                        this.alert({
                            title: '更新提示',
                            content: '新版本已准备好，是否重启应用？',
                            success: res => {
                                if (res.confirm) {
                                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                    updateManager.applyUpdate()
                                }
                            }
                        })
                    })
                    updateManager.onUpdateFailed(() => {
                        // 新的版本下载失败
                        this.alert({
                            title: '更新提示',
                            content: '新版本下载失败！请您删除当前小程序，重新搜索打开~',
                            showCancel: false,
                            confirmText: '知道了'
                        })
                    })
                }
            })
            return
        }
        this.alert({
            title: '更新提示',
            content: '当前版本过低，请您删除当前小程序，重新搜索打开~',
            showCancel: false,
            confirmText: '知道了'
        })
    }
}

/* ------------------------------#其他 end---------------------------------- */
