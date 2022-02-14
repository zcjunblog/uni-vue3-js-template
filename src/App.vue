<!--
 * @Date: 2022-02-14 09:13:09
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-02-14 10:59:41
 * @FilePath: \uni-vue3-js-template\src\App.vue
-->
<script>
export default {
    onLaunch: function() {
        console.log('App Launch')
    },
    onShow: function() {
        console.log('App Show')
    },
    onHide: function() {
        console.log('App Hide')
    }
}
</script>

<style lang="scss">
/*每个页面公共css */
@import '@/uni_modules/uview-ui/index.scss';
page {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
}
</style>
