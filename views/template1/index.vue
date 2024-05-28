<template>
    <div class="min-h-screen relative">
        <HomeVideo v-if="schema.video" :videoUrl="schema.video" @goAnchor="goAnchor" />
        <HomeCustomProduct ref="customProductRef" :custom_door="schema.custom_door" />
        <TopBanner :carousel="schema.carousel" />
        <HomeProduct />
        <HomeApp :yale_home_app="schema.yale_home_app" />
        <HomeService :four_promises="schema.four_promises" />
        <StoreCarousel />
    </div>
</template>

<script setup lang="ts">
import TopBanner from "~/views/template1/Home/HomeTopBanner.vue";
import StoreCarousel from "~/views/template1/Home/HomeStoreCarousel.vue";
import HomeVideo from "~/views/template1/Home/HomeVideo.vue";
import HomeCustomProduct from "~/views/template1/Home/HomeCustomProduct.vue";
import HomeSample from "~/views/template1/Home/HomeSample.vue";
import HomeProduct from "~/views/template1/Home/HomeProduct.vue";
import HomeApp from "~/views/template1/Home/HomeApp.vue";
import HomeService from "~/views/template1/Home/HomeService.vue";
import { useInitializationStore } from "~/store/initializationStore";

const initializationStore = useInitializationStore();

const { $api } = useNuxtApp();

/**
 * 取得頁面資料
 */
const schema = ref<any>({
    carousel: [],
    custom_door: [],
    video: null,
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
        schema.value.video = pageData.video ? pageData.video : null;
        schema.value.carousel = pageData.carousel;
        schema.value.custom_door = pageData.custom_door;
        schema.value.yale_home_app = pageData.yale_home_app;

        const seoSetting = (data.value as any).data.seoSetting;
        useSeoMeta({
            title: seoSetting.title ? seoSetting.title : initializationStore.initializationData.site.meta_title,
            description: seoSetting.description ? seoSetting.description : initializationStore.initializationData.site.meta_description,
            ogTitle: seoSetting.title,
            ogDescription: seoSetting.description,
            ogUrl: () => `${window.location.origin}/${seoSetting.custom_url}`,
            keywords: seoSetting.keywords.join(),
        });
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

const customProductRef = ref<any>(null);
// console.log(customProductRef.value.domRef)

const goAnchor = () => {
    console.log(customProductRef.value)
    customProductRef.value.domRef.scrollIntoView({ block: "start", behavior: "smooth" });
}

onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
            await getPageData();
        }
    });
});
</script>
