/*
 * @Date: 2022-02-15 14:56:05
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-06-09 16:42:22
 * @FilePath: \uni-vue3-js-template\src\api\request.js
 * @Description: 默认请求器
 */

import showLoading from './loading'
import tools from '../utils/tools'
import $vuex from '@/store/store.utils'
/**
 * 根据访问路径和data生成key
 * @param path 路径
 * @param data 请求数据
 */
const createKey = (path, data) => `${JSON.stringify(data)}${path}`

// 储存request请求map
const requestList = new Map()

// 是否正在加载中
let loadingBox = null

/**
 * request请求
 * @param param0 必要参数
 * @param param1 配置
 */
const RequestMethod = (
    { methodType = 'GET', data = {}, url = '' },
    { baseUrl = import.meta.env.VITE_BASE_URL, header = {}, loading = true, dataType = 'json', errTip = true } = {}
) => {
    //加载动画
    if (loading && loadingBox === null) {
        //开启加载动画
        loadingBox = showLoading()
    }

    // 请求头加上channel_id(写死)、user_agent(写死)
    header['channel_id'] = 11 // 渠道id
    header['user_agent'] = 3 // 3 - 小程序

    const location = $vuex.get('$location.userLocation.ad_info.location')
    // 请求头加上位置信息
    if (location) {
        header['lng'] = location.lng // 经度
        header['lat'] = location.lat // 纬度
    }
    // 携带token
    const token = $vuex.get('$user.token')
    if (token) {
        header['Authorization'] = 'Bearer' + ' ' + token
    }
    return new Promise((resolve, reject) => {
        //生成key
        const requestKey = createKey(url, data)
        // 加载动画
        const requestClose = uni.request({
            /** 服务器接口地址 */
            url: `${baseUrl}${url}`,
            /** 请求的参数 */
            data: data,
            /** 请求头 */
            header: header,
            /** 请求类型 */
            method: methodType,
            /** 超时时间 */
            timeout: 6000,
            /** 返回数据类型 */
            dataType: dataType,
            // 成功
            success: res => {
                //返回数据
                const { statusCode: status } = res
                switch (status) {
                    case 400:
                        reject(res)
                        errTip && tools.showToast(res.data.message)
                        break
                    case 401:
                        //  跳转登录页
                        handleLogin()
                        reject(res)
                        break
                    case 500:
                        reject(res)
                        errTip && tools.showToast('服务出错')
                        break
                    case 502:
                        reject(res)
                        errTip && tools.showToast('服务器错误！')
                        break
                    case 504:
                        reject(res)
                        errTip && tools.showToast('服务器内部连接超时')
                        break
                    default:
                        console.log(
                            `%c ${methodType} ${url} %c 请求返回===> `,
                            'background: #606060; color: #fff; border-radius: 3px 0 0 3px;',
                            'background: #1475B2; color: #fff; border-radius: 0 3px 3px 0;',
                            res.data,
                            '参数===>',
                            data
                        )
                        break
                }
                resolve(res.data)
            },
            // 失败
            fail: err => {
                tools.showToast('请求失败')
                reject(err)
            },
            // 最终执行
            complete: () => {
                // 移除request请求
                requestList.delete(requestKey)
                // 如果加载
                if (loadingBox !== null && requestList.size === 0) {
                    // 关闭提示
                    loadingBox = loadingBox()
                }
            }
        })
        //先关闭上一个同路径同参数请求
        requestList.get(requestKey)?.abort()
        //存储请求
        requestList.set(requestKey, requestClose)
    })
}

// 跳转登录页
let isToLogin = true // 解决重复跳转
const handleLogin = async () => {
    if (isToLogin) {
        // 清除用户登录态
        isToLogin = false
        tools.clearUserData()
        tools.toLogin('replace')
        await tools.sleep(3000)
        // 3s内不再跳转
        isToLogin = true
    }
}

// 创建请求
const request = (url, data, config, methodType) => {
    const params = { methodType, url, data }
    if ($vuex.get('$user.token')) {
        return RequestMethod(params, config)
    }
    // 如果没有token，则调一次查询用户登录态接口
    return $vuex.dispatch('$user/checkLogin').then(() => {
        return RequestMethod(params, config)
    })
}

// get请求
export const get = (url, data, config) => request(url, data, config, 'GET')

// post请求
export const post = (url, data, config) => request(url, data, config, 'POST')
