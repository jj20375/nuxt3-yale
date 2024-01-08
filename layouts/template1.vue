<template>
    <div>
        <div class="min-h-screen">
            <Header />
            <!-- test layout2
        <el-button
            type="primary"
            plain
            >Primary</el-button
        >
        <el-button type="primary">Primary</el-button> -->
            <slot />
            <Footer />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useUtilityStore } from "~/store/utilityStore";
import { useUserStore } from "~/store/userStore";
import { useInitializationStore } from "~/store/initializationStore";
import { ElMessage } from "element-plus";
import { onMessage } from "firebase/messaging";
import { useLineLogin } from "./hooks/template1Hook";
// 標題選單區塊
import Header from "~/layouts/tmp1Components/Header.vue";
// footer 區塊
import Footer from "~/layouts/tmp1Components/Footer.vue";
import Cookies from "js-cookie";

definePageMeta({
    middleware: [],
});

const { $api, $firebaseAuth, $firebaseMessaging, $utils } = useNuxtApp();
const route = useRoute();
const { redirectRightHome, getLineUserProfile, getLineToken, checkUrlQuery } = useLineLogin();
const utilityStore = useUtilityStore();
const userStore = useUserStore();
const initializationStore = useInitializationStore();
const { isMobile } = useDevice();
const $config = useRuntimeConfig();

import { onBeforeRouteUpdate, onBeforeRouteLeave } from "vue-router";

// 判斷是否登入
const isAuth = computed(() => userStore.isAuth);

const pageLoading = ref(useState("loading"));

// 預先加載初始化資料
const { data, pending, error, refresh } = await useAsyncData("bootstrap", () => getInitializationData());

useHead({
    title: "耶魯電子鎖",
    meta: [
        {
            hid: "description",
            name: "description",
            content: "耶魯電子鎖描述",
        },
        { name: "keywords", content: "citybanana" },
        { hid: "og:url", property: "og:url", content: `${$config.public.hostURL}` },
        { hid: "og:type", property: "og:type", content: "website" },
        {
            hid: "og:title",
            property: "og:title",
            content: "耶魯電子鎖",
        },
        {
            hid: "og:description",
            property: "og:description",
            content: "耶魯電子鎖描述",
        },
        {
            hid: "og:image",
            property: "og:image",
            content: "/img/ogCover/home.jpg",
        },
        { property: "al:ios:app_store_id", content: "284882215" },
        { property: "al:ios:app_name", content: "Facebook" },
    ],
});

async function getInitializationData() {
    try {
        const { data } = await $api().GetInitializationDatasAPI();
        console.log("GetInitializationDatasAPI => ", data.value);
        const initialData = (data.value as any).data;

        initializationStore.initializationData = initialData;
    } catch (err) {
        console.log(err);
    }
}

onMounted(async () => {
    if (process.client) {
        // const dataLayer = window.dataLayer || [];
        // function gtag() {
        //     dataLayer.push(arguments);
        // }
        // gtag("js", new Date());
        // gtag("config", "G-R8MLETTSC3");
        // gtag("config", "AW-10969628264");
    }
});

onBeforeUnmount(() => {});
</script>
