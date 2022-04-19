/*
 * @Date: 2022-02-15 09:28:20
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-02-15 09:49:25
 * @FilePath: \uni-vue3-ts-template\src\hooks\useCurrentInstance.ts
 */
/* 
使用方法:
// 先引入文件
import useCurrentInstance from "@/hooks/useCurrentInstance"
// 在setup 中使用
const { $env } = useCurrentInstance()
*/

// 简化vue3 ts使用全局属性的操作
import { getCurrentInstance } from 'vue'
// 暴露useCurrentInstance方法 在页面引入执行获取全局属性
export default function useCurrentInstance() {
    const { appContext } = getCurrentInstance()
    return appContext.config.globalProperties
}
