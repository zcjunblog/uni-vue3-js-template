/*
 * @Date: 2022-02-15 15:21:01
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-04-19 17:39:54
 * @FilePath: \uni-vue3-js-template\src\api\modules\area.js
 */

// 该文件仅做测试使用
import { get, post } from '../request'

export const getAreaList = params => get('/doctor-api/area/list', params)

// export const postTest = (params) => post('user-api/doctor/list', params)
