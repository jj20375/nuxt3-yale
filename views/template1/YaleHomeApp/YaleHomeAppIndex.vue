<template>
    <BannerLayout
        :title="'Yale Home App'"
        :banner="'/img/yale-home-app/yale-home-app-banner.jpg'"
        :banner-mobile="'/img/yale-home-app/yale-home-app-banner-m.jpg'"
    >
        <template #breadcrumbs>
            <Breadcrumb :menus="breadcrumbs" />
        </template>

        <template #content>
            <YaleHomeAppTop :datas="topDatas" />
            <YaleHomeAppCarousel :photos="carouselDatas" />
            <YaleHomeAppProduct :products="products" />
            <YaleHomeAppProductFeature :features="features" />
            <YaleHomeAppVideo :tutorial_video="tutorial_video" />
            <YaleHomeAppSpec
                :specifications="specifications"
                :files="files"
                :appData="appData"
            />
            <YaleHomeAppInfo :installation_notes="installation_notes" />
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

const { $api } = useNuxtApp();

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
const topDatas = ref<any>([]);

// 幻燈片區塊資料
const carouselDatas = ref<any>([]);

// 商品區塊
const products = ref<any>({
    content: "",
    image: "",
    title: "",
});

// 商品資訊區塊
const features = ref<any>({
    title: "",
    subtitle: "",
    items: [],
});

// 影片教學區塊
const tutorial_video = ref<any>({
    title: "",
    video: [],
});

// APP資料
const appData = ref<any>({
    android_link: "",
    ios_link: "",
});

// 型號.檔案下載
const specifications = ref<any>([]);

const files = ref<any>([]);

// 安裝注意事項
const installation_notes = ref<any>({
    content: "",
    title: "",
});

/**
 * 取得頁面資料
 */
const schema = ref<any>({
    carousel: [],
    custom_door: [],
    video: "/video/homeVideo.mp4",
    four_promises: [],
    yale_home_app: {},
});

async function getPageData() {
    try {
        const params = { code: "yale_home_app" };
        const { data } = await $api().getPageAPI(params);
        console.log("getPageData api => ", data.value);

        const pageData = (data.value as any).data.schema;
        topDatas.value = [];
        carouselDatas.value = [];

        console.log(pageData);

        pageData.introduction.forEach((item: { banner: any; title: any; content: any }) => {
            topDatas.value.push({
                imgSrc: item.banner,
                title: item.title,
                content: item.content,
            });
        });
        pageData.carousel.forEach((item: any) => {
            carouselDatas.value.push({
                imgSrc: item,
            });
        });
        products.value = pageData.features;

        features.value = pageData.info_cards;

        specifications.value = pageData.specifications;

        installation_notes.value = pageData.installation_notes;

        tutorial_video.value = pageData.tutorial_video;

        files.value = pageData.downloads;

        const seoSetting = (data.value as any).data.seoSetting;
        useSeoMeta({
            ogTitle: seoSetting.title,
            ogDescription: seoSetting.description,
            ogUrl: () => `${window.location.origin}/${seoSetting.custom_url}`,
            keywords: seoSetting.keywords.join(),
        });
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

async function getAppData() {
    try {
        const params = { code: "home" };
        const { data } = await $api().getPageAPI(params);
        console.log("getPageData api => ", data.value);

        const pageData = (data.value as any).data.schema;

        appData.value = pageData.yale_home_app;
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
            await getPageData();
            await getAppData();
        }
    });
});
</script>
