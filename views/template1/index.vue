<template>
    <div class="min-h-screen">
        <TopBanner :carousel="schema.carousel" />
        <HomeVideo :videoUrl="schema.video" />
        <HomeCustomProduct :custom_door="schema.custom_door" />
        <HomeSample />
        <HomeProduct />
        <HomeApp :yale_home_app="schema.yale_home_app" />
        <HomeService :four_promises="schema.four_promises" />
        <StoreCarousel />
    </div>
</template>

<script setup lang="ts">
import TopBanner from "~/views/template1/Home/HomeTopBanner.vue";
import StoreCarousel from "~/views/template1/Home/HomeStoreCarousel.vue";
import HomeVideo from "~/views/template1/Home/HomeVideo.tsx";
import HomeCustomProduct from "~/views/template1/Home/HomeCustomProduct.vue";
import HomeSample from "~/views/template1/Home/HomeSample.vue";
import HomeProduct from "~/views/template1/Home/HomeProduct.vue";
import HomeApp from "~/views/template1/Home/HomeApp.vue";
import HomeService from "~/views/template1/Home/HomeService.vue";

const { $api } = useNuxtApp();

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
        const params = { code: "home" };
        const { data } = await $api().getPageAPI(params);
        console.log("getPageData api => ", data.value);

        const pageData = (data.value as any).data.schema;
        schema.value.four_promises = pageData.four_promises;
        schema.value.video = pageData.video ? pageData.video : "/video/homeVideo.mp4";
        schema.value.carousel = pageData.carousel;
        schema.value.custom_door = pageData.custom_door;
        schema.value.yale_home_app = pageData.yale_home_app;

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

onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
            await getPageData();
        }
    });
});
</script>
