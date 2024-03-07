<template>
    <section class="mt-headerMb xl:mt-header border-t border-gray-300">
        <nav class="border-b border-gray-300 py-[16px] bg-white">
            <div class="container">
                <Breadcrumb :menus="breadcrumbs" />
            </div>
        </nav>
        <div class="container">
            <div class="mb-[40px] sm:mb-[80px] mt-[40px] sm:mt-[80px] xl:w-4/5 mx-auto">
                <div class="flex sm:items-end justify-between">
                    <div class="flex flex-col sm:flex-row justify-center sm:items-end gap-1 sm:gap-7">
                        <h3 class="text-[20px] sm:text-[32px] font-bold">會員中心</h3>
                        <div class="text-[16px] mt-1 sm:mt-0 sm:mb-1.5">您好，{{ user.name }}</div>
                    </div>
                    <NuxtLink
                        :to="{ name: 'auth-panel-logout-slug', params: { slug: '登出成功' } }"
                        @click="logout"
                        class="group"
                    >
                        <div class="flex gap-2 mt-1 sm:mt-0 sm:mb-1.5 cursor-pointer transition-all duration-400 hover:text-gray-500 hover:transition-all hover:duration-400">
                            <IconLogout
                                class="!w-[24px] !h-[24px] text-gray-800 transition-all duration-300 group-hover:text-gray-400 group-hover:transition-all group-hover:duration-300"
                            />
                            <div class="group-hover:text-gray-400 transition-all duration-300 group-hover:transition-all group-hover:duration-300">登出</div>
                        </div>
                    </NuxtLink>
                </div>
                <div class="grid grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 mt-[24px] sm:mt-[32px] sm:mt-10">
                    <div
                        v-for="(item, index) in panelDatas"
                        :key="index"
                    >
                        <NuxtLink :to="item.url">
                            <div
                                class="sm:h-[150px] relative flex flex-col gap-3 justify-center items-center bg-gray-100 transition-all duration-300 hover:bg-transparent hover:transition-all hover:duration-300 rounded-[8px] py-[32px] sm:py-12 after:absolute after:w-full after:h-full after:top-0 after:left-0 after:from-yellow-100 after:to-yellow-500 after:rounded-[8px] after:bg-gradient-[296deg] after:bg-gradient-to-br after:opacity-0 after:-z-[1] after:transition-all after:duration-300 hover:after:opacity-100"
                            >
                                <NuxtImg
                                    class="w-[32px] aspect-square object-cover"
                                    :src="item.imgSrc"
                                />
                                <h4 class="text-[15px] sm:text-[16px] px-[6px]">
                                    {{ item.title }}
                                </h4>
                            </div>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
import { useUserStore } from "~/store/userStore";
import { storeToRefs } from "pinia";

// icon 路徑
import IconLogout from "~/assets/img/icons/auth/logout.svg";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

function logout() {
    userStore.logOutUser();
}

const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁",
    },
    {
        name: "auth-panel-slug",
        text: "會員中心",
        params: { slug: "會員中心" },
    },
]);

const panelDatas = ref([
    {
        title: "會員資料",
        url: {
            name: "auth-info-slug",
            params: { slug: "會員資料" },
        },
        imgSrc: "img/icons/auth/info.svg",
    },
    {
        title: "變更密碼",
        url: {
            name: "auth-password-slug",
            params: { slug: "變更密碼" },
        },
        imgSrc: "img/icons/auth/password.svg",
    },
    {
        title: "常用聯繫人",
        url: {
            name: "auth-contact-slug",
            params: { slug: "常用聯繫人" },
        },
        imgSrc: "img/icons/auth/home.svg",
    },
    {
        title: "一般產品-訂單記錄",
        url: {
            name: "auth-order-slug",
            params: { slug: "訂單記錄" },
        },
        imgSrc: "img/icons/auth/order-record.svg",
    },
    {
        title: "訂製門扇-訂單記錄",
        url: {
            name: "auth-door-slug",
            params: { slug: "訂製門扇-訂單記錄" },
        },
        imgSrc: "img/icons/auth/door-record.svg",
    },
    {
        title: "產品收藏清單",
        url: {
            name: "auth-favorite-slug",
            params: { slug: "產品收藏清單" },
        },
        imgSrc: "img/icons/auth/favorite.svg",
    },
]);
</script>
