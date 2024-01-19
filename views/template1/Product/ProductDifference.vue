<template>
    <section class="min-h-screen mt-[94px]">
        <nav class="border-t border-b border-gray-300 py-[16px] pl-[122px] bg-white">
            <Breadcrumb :menus="breadcrumbs" />
        </nav>
        <div class="text-center bg-gray-50">
            <div class="container min-h-[200px] flex items-center">
                <h1 class="text-[32px] YaleSolisW-Bd flex-1">主鎖比較</h1>
                <div class="flex items-center">
                    <div class="mr-[20px]">
                        <NuxtLink :to="{ name: 'product-compare-slug', params: { slug: '耶魯產品資訊-主鎖-主鎖比較' }, query: { category: 'id1', tag: 'id1' } }">
                            <button class="text-gray-800 text-[15px]">重新選擇</button>
                        </NuxtLink>
                    </div>
                    <div class="mr-[16px]">
                        <NuxtImg
                            class="w-[28px]"
                            src="/img/icons/medias/icon-black-1.svg"
                        />
                    </div>
                    <div class="mr-[16px]">
                        <NuxtImg
                            class="w-[28px]"
                            src="/img/icons/medias/icon-black-2.svg"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <ProductDifferenceContent
                :products="products"
                :columns="columns"
            />
        </div>
    </section>
</template>

<script lang="ts" setup>
// 麵包屑組件
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
// 產品比較內容頁
import ProductDifferenceContent from "~/views/template1/Product/components/ProductDifferenceContent.vue";
import { useProductCompareStore } from "~/store/productCompareStore";
import type { ProductInterface } from "~/views/template1/Product/interface/Product";

const productCompareStore = useProductCompareStore();

const compareStore = computed(() => {
    return JSON.stringify(productCompareStore.compareStore)
})

const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁",
    },
    {
        name: "product-slug",
        text: "產品資訊",
        params: { slug: "耶魯產品資訊" },
    },
    {
        name: "product-slug",
        text: "電子鎖",
        params: { slug: "耶魯產品資訊-電子鎖" },
        query: { category: "id1" },
    },
    {
        name: "product-slug",
        text: "主鎖",
        params: { slug: "耶魯產品資訊-電子鎖-主鎖" },
        query: { category: "id1", tag: "id1" },
    },
    {
        name: "product-compare-slug",
        text: "主鎖比較",
        params: { slug: "耶魯產品資訊-主鎖比較" },
        query: { category: "id1", tag: "id1" },
    },
    {
        name: "product-compare-difference-slug",
        text: "主鎖規格比較",
        params: { slug: "耶魯產品資訊-主鎖比較-主鎖規格比較" },
        query: { category: "id1", tag: "id1" },
    },
]);

const products = ref<ProductInterface[]>([
    // {
    //     style: "YDM 3109A",
    //     category: "卡片密碼入門款",
    //     imgSrc: "/img/home/product/product1.jpg",
    //     // 顏色
    //     color: "消光霧黑",
    //     // 專利安全按鈕
    //     safeBtn: "有",
    //     // 自動上鎖功能
    //     autoLock: "有",
    //     // 入侵 / 破壞 / 高溫警報功能
    //     feature: "有",
    //     // 節電設計
    //     savePower: "有",
    //     // 低電量提示
    //     lowPower: "9V 緊急後備電源啟動電源",
    //     // 卡片解鎖
    //     cardUnlock: "4張",
    //     // 密碼解鎖
    //     passwordUnlock: "100組",
    //     // 虛位密碼
    //     virtualPassword: "有",
    //     // 指紋解鎖
    //     fingerUnlock: "100組",
    //     // 備用機械鑰匙
    //     copyMachineKey: "2把",
    //     // 語音提示
    //     voiceCheck: "無",
    //     // Yale home 遠端管理
    //     yaleHomeApp: "可",
    //     // 正面尺寸
    //     frontSize: "68.6(W) × 306.6(H) × 27(D)",
    //     // 背面尺寸
    //     backendSize: "72.8(W) × 306.6(H) × 37(D)",
    //     // 鎖體
    //     type: "歐規不鏽鋼",
    //     // 電源
    //     power: "1.5V",
    //     // 保固
    //     warranty: "2 年原廠",
    // },
]);

watch(
    () => compareStore.value,
    (val) => {
        productsCompareData()
    }
);


function productsCompareData () {
    products.value = []
    console.log(productCompareStore.compareStore)
    productCompareStore.compareStore.forEach((item: { model: any; shape: any; main_image: any; attributes: { [x: string]: any; }; }) => {
        console.log(item)
        products.value.push({
            style: item?.model,
            category: item?.shape,
            imgSrc: item?.main_image,
            // 顏色
            color: item?.attributes['顏色'],
            // 專利安全按鈕
            safeBtn: item?.attributes['專利安全按鈕'],
            // 自動上鎖功能
            autoLock: item?.attributes['自動上鎖功能'],
            // 入侵 / 破壞 / 高溫警報功能
            feature: item?.attributes['入侵/破壞/高溫警報功能'],
            // 節電設計
            savePower: item?.attributes['節電設計'],
            // 低電量提示
            lowPower: item?.attributes['低電量提示'],
            // 卡片解鎖
            cardUnlock: item?.attributes['卡片解鎖'],
            // 密碼解鎖
            passwordUnlock: item?.attributes['密碼解鎖'],
            // 虛位密碼
            virtualPassword: item?.attributes['虛位密碼'],
            // 指紋解鎖
            fingerUnlock: item?.attributes['指紋解鎖'],
            // 備用機械 鑰匙
            copyMachineKey: item?.attributes['備用機械 鑰匙'],
            // 語音提示
            voiceCheck: item?.attributes['語音提示'],
            // Yale home 遠端管理
            yaleHomeApp: item?.attributes['Yale home遠端管理'],
            // 正面尺寸
            frontSize: item?.attributes['正面尺寸'],
            // 背面尺寸
            backendSize: item?.attributes['背面尺寸'],
            // 鎖體
            type: item?.attributes['鎖體'],
            // 電源
            power: item?.attributes['電源'],
            // 保固
            warranty: item?.attributes['保固'],
        })
    })
}
productsCompareData()

const columns = ref({
    style: "產品款式",
    category: "產品型號",
    imgSrc: "",
    color: "顏色",
    safeBtn: "專利安全按鈕",
    autoLock: "自動上鎖功能",
    feature: "入侵 / 破壞 / 高溫警報功能",
    savePower: "節電設計",
    lowPower: "低電量提示",
    cardUnlock: "卡片解鎖",
    passwordUnlock: "密碼解鎖",
    virtualPassword: "虛位密碼",
    fingerUnlock: "指紋解鎖",
    copyMachineKey: "備用機械鑰匙",
    voiceCheck: "語音提示",
    yaleHomeApp: "Yale home 遠端管理",
    frontSize: "正面尺寸",
    backendSize: "背面尺寸",
    type: "鎖體",
    power: "電源",
    warranty: "保固",
});
</script>
