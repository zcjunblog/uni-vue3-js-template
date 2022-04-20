<!--
 * @Date: 2022-02-14 10:45:27
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-04-19 17:39:33
 * @FilePath: \uni-vue3-js-template\src\components\layout\layout.vue
-->
<template>
    <div class="main" :style="{ backgroundColor: bgColor }">
        <slot></slot>
        <u-no-network></u-no-network>
    </div>
</template>

<script setup>
const props = defineProps({
    bgColor: String
})
</script>

<style scoped lang="scss">
.main {
    min-height: 100%;
    width: 100%;
    color: #313131;
    box-sizing: border-box;
    background-color: #fff;
    overflow-x: hidden; /* 防止ios出现横向滚动轴 */
    font-family: PingFang SC, Helvetica Neue, Arial, sans-serif;
}
</style>
