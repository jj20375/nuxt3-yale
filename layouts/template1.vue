<template>
    <div>
        <div
            class="flex flex-col min-h-screen"
            ref="layoutRef"
            :class="customClass"
        >
            <Header />
            <!-- test layout2
        <el-button
            type="primary"
            plain
            >Primary</el-button
        >
        <el-button type="primary">Primary</el-button> -->
            <slot />
            <Footer v-if="showFooter" />
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
import { useTemplateStore } from "~/store/templateStore";
const { $api, $firebaseAuth, $firebaseMessaging, $utils } = useNuxtApp();
const route = useRoute();
const { redirectRightHome, getLineUserProfile, getLineToken, checkUrlQuery } = useLineLogin();
const utilityStore = useUtilityStore();
const userStore = useUserStore();
const initializationStore = useInitializationStore();
const { isMobile } = useDevice();
const $config = useRuntimeConfig();

const templateStore = useTemplateStore();

import { onBeforeRouteUpdate, onBeforeRouteLeave } from "vue-router";

const props = defineProps({
    customClass: {
        type: String,
        default: "",
    },
    showFooter: {
        type: Boolean,
        default: true,
    },
});

// 判斷是否登入
const isAuth = computed(() => userStore.isAuth);

const pageLoading = ref(useState("loading"));

const layoutRef = ref(null);

// 計算螢幕高度
const calculateFullHeight = () => {
    let windowsVH = window.innerHeight / 100;
    if (layoutRef.value) {
        layoutRef.value.style.setProperty("--vh", windowsVH + "px");
    }
};

//
onMounted(() => {
    calculateFullHeight();
    window.addEventListener("resize", calculateFullHeight);
});

onBeforeUnmount(() => {
    window.removeEventListener("resize", calculateFullHeight);
});

function scrollInit() {
    // 判斷滾動高度 大於50px時 固定選單在上方
    if (window.scrollY > 50) {
        templateStore.setMenuFixed(true);
    } else {
        templateStore.setMenuFixed(false);
    }
}

onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
            window.addEventListener("scroll", scrollInit);
        }
    });
});

onBeforeUnmount(() => {
    window.removeEventListener("scroll", scrollInit);
});

onMounted(async () => {
    if (process.client) {
        console.table({ 版本號: $config.public.yaleVersion });
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

onBeforeRouteLeave(() => {
    // 移除手機版選單關閉時 overflow 未消失問題 導致 畫面不能滾動
    if (process.client) {
        document.body.style.overflow = "";
    }
});
</script>
