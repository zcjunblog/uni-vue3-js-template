<!--
 * @Date: 2022-02-14 10:45:27
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-02-14 10:54:27
 * @FilePath: \uni-vue3-js-template\src\components\layout\layout.vue
-->
<template>
    <div class="main" :style="{ backgroundColor: bgColor }">
        <slot></slot>
        <u-no-network></u-no-network>
    </div>
</template>

<script>
export default {
    props: ['bgColor'],
    data() {
        return {}
    }
}
</script>

<style scoped lang="scss">
.main {
    min-height: 100%;
    width: 100%;
    color: $u-main-color;
    box-sizing: border-box;
    background-color: $u-bg-color;
    overflow-x: hidden; /* 防止ios出现横向滚动轴 */
    font-family: PingFang SC, Helvetica Neue, Arial, sans-serif;
}
</style>
