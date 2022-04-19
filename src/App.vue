<!--
 * @Date: 2022-02-14 11:36:04
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-04-19 19:23:03
 * @FilePath: \uni-vue3-js-template\src\App.vue
-->
<script setup>
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
onLaunch(() => {
    console.log('App Launch')
})
onShow(() => {
    console.log('App Show')
})
onHide(() => {
    console.log('App Hide')
})
</script>
<style lang="scss">
/*每个页面公共css */
@import './uni_modules/uview-ui/index.scss';
@import './style/global.scss';
</style>
