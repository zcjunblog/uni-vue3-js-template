<!--
 * @Date: 2022-02-14 11:36:04
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-06-09 16:46:10
 * @FilePath: \uni-vue3-js-template\src\pages\index\index.vue
-->
<template>
    <Layout>
        <u-button @click="$router.push('/pages/demo/index')">路由跳转</u-button>
    </Layout>
</template>

<script setup>
/**
 * @name 页面名称
 * 页面路由接收参数
 * @param paramName     参数名称
 */
import { onMounted, ref } from 'vue'
onMounted(() => {})
</script>

<style lang="scss" scoped></style>
