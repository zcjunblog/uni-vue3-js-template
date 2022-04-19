/*
 * @Date: 2022-02-15 15:31:36
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-04-08 09:35:55
 * @FilePath: \uni-vue3-ts-template\src\api\index.ts
 */
// TODO: 自动导入modules下的所有实体 编辑器无预读联想词 是否有优化途径?
// let Api = <any>{}
// const files = import.meta.glob('./modules/*')
// for (const path in files) {
//     Api = { ...Api, [path.replace(/(.*\/)*([^.]+).*/gi, '$2')]: files[path] }
// }
// export default Api

// 该导入仅做测试使用
import * as area from './modules/area'

export default {
    area
}
