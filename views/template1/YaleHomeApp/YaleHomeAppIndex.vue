<template>
    <BannerLayout
        :title="'Yale Home App'"
        :banner="'/img/yale-home-app/yale-home-app-banner.jpg'"
    >
        <template #breadcrumbs>
            <Breadcrumb :menus="breadcrumbs" />
        </template>

        <template #content>
            <YaleHomeAppTop :datas="topDatas" />
            <YaleHomeAppCarousel :photos="carouselDatas" />
            <YaleHomeAppProduct />
            <YaleHomeAppProductFeature />
            <YaleHomeAppVideo />
            <YaleHomeAppSpec />
            <YaleHomeAppInfo />
        </template>
    </BannerLayout>
</template>

<script lang="ts" setup>
import BannerLayout from "~/views/template1/layouts/BannerLayout.vue";
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
// 上方區塊
import YaleHomeAppTop from "~/views/template1/YaleHomeApp/components/YaleHomeAppTop.vue";
// 幻燈片區塊
import YaleHomeAppCarousel from "~/views/template1/YaleHomeApp/components/YaleHomeAppCarousel.vue";
// Yale home app 介紹
import YaleHomeAppProduct from "~/views/template1/YaleHomeApp/components/YaleHomeAppProduct.vue";
// Yale home app 功能
import YaleHomeAppProductFeature from "~/views/template1/YaleHomeApp/components/YaleHomeAppProductFeature.vue";
// 影片介紹
import YaleHomeAppVideo from "~/views/template1/YaleHomeApp/components/YaleHomeAppVideo.vue";
// 產品規格
import YaleHomeAppSpec from "~/views/template1/YaleHomeApp/components/YaleHomeAppSpec.vue";
// 注意事項
import YaleHomeAppInfo from "~/views/template1/YaleHomeApp/components/YaleHomeAppInfo.vue";

const route = useRoute();

const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁",
    },
    {
        name: "yale-home-app-slug",
        text: "Yale Home App",
        params: { slug: "Yale Home App" },
    },
]);

// 上方區塊資料
const topDatas = ref([]);

for (let i = 1; i <= 2; i++) {
    topDatas.value.push({
        imgSrc: `/img/yale-home-app/demo/yale-home-app-top-${i}.jpg`,
        title: "測試標題-" + i,
        content: "Yale Home是Yale耶魯提供住宅市場的全球智慧門鎖解決方案，Yale智慧鎖可以透過Yale Home應用程式進行管理，讓您完全控制您的門鎖，亦可藉由您的手機裝置上鎖或解鎖您的大門、允許他人進入，並記錄訪客使用情況。",
    });
}

// 幻燈片區塊資料
const carouselDatas = ref([
    {
        imgSrc: "/img/yale-home-app/demo/yale-home-app-carousel-1.jpg",
    },
    {
        imgSrc: "/img/yale-home-app/demo/yale-home-app-carousel-2.jpg",
    },
    {
        imgSrc: "/img/yale-home-app/demo/yale-home-app-carousel-3.jpg",
    },
    {
        imgSrc: "/img/yale-home-app/demo/yale-home-app-carousel-1.jpg",
    },
]);
</script>
