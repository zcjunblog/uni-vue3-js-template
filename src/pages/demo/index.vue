<!--
 * @Date: 2022-02-14 11:36:04
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-04-20 09:25:17
 * @FilePath: \uni-vue3-js-template\src\pages\demo\index.vue
-->
<template>
    <Layout>
        <u-row gutter="16">
            <u-col span="4">
                <u-button @click="test">网络请求</u-button>
            </u-col>
            <u-col span="4">
                <u-button type="primary">主要按钮</u-button>
            </u-col>
            <u-col span="4">
                <u-button @click="show = true">打开timepicker</u-button>
            </u-col>
        </u-row>
        <u-row gutter="16">
            <u-col span="4">
                <u-button @click="showToast">tools-taost</u-button>
            </u-col>
            <u-col span="4"></u-col>
            <u-col span="4">
                <u-button></u-button>
            </u-col>
        </u-row>
        <u-row gutter="16">
            <u-col span="4">
                <u-button @click="add">vuex值加</u-button>
            </u-col>
            <u-col span="4">
                {{ $vuex.get('$order.orderCount') }}
            </u-col>
            <u-col span="4">
                <u-button @click="reduce">vuex值减</u-button>
            </u-col>
        </u-row>
        <u-row gutter="16">
            <u-col span="4">
                <u-button @click="countChange('add')">响应式数据加</u-button>
            </u-col>
            <u-col span="4">
                {{ count }}
            </u-col>
            <u-col span="4">
                <u-button @click="countChange('reduce')">响应式数据加减</u-button>
            </u-col>
        </u-row>
        <u-picker v-model="show" mode="time"></u-picker>

        <view class="text-area">
            <text class="title no-touch">{{ title }}</text>
        </view>
        <view v-for="item in area" :key="item.area_id">{{ item.city_name }}</view>
    </Layout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Api from '@/api/index'
import to from 'await-to-js'
import useCurrentInstance from '@/hooks/useCurrentInstance'
const { $vuex, $tools, $staticUrl } = useCurrentInstance()
console.log('useCurrentInstance()', useCurrentInstance())
console.log('$staticUrl', $staticUrl)
// 路由信息
let title = 'Hello'
let show = ref(false)
let count = ref(0)
const countChange = type => {
    if (type === 'add') {
        count.value++
    } else {
        count.value--
    }
}

const add = () => {
    let count = $vuex.get('$order.orderCount')
    $vuex.set('$order.orderCount', count + 1)
}
const reduce = () => {
    $vuex.commit('$order/orderCountReduce') // 带命名空间
}

let area = ref([])
const test = async () => {
    const [err, res] = await to(Api.area.getAreaList())
    if (!err) {
        area.value = res?.data
    }
}
const showToast = () => {
    console.log($tools)

    $tools.showToast('这 是 toast')
}

onMounted(() => {})

console.log($vuex.get('$order.orderCount')) // 获取模块内属性
</script>

<style lang="scss">
.content {
    width: 200px;
    height: 200px;
    background-color: aqua;
}

.logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
}

.text-area {
    display: flex;
    justify-content: center;
}

.title {
    font-size: 36rpx;
    color: #8f8f94;
    @include text-overflow(1);
}
.slot-content {
    padding: 30rpx;
    text-align: center;
}
</style>
