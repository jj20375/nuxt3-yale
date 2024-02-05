<template>
    <section class="mt-[86px] border-t border-gray-300">
        <nav class="border-b border-gray-300 py-[16px] bg-white">
            <div class="container">
                <Breadcrumb :menus="breadcrumbs" />
            </div>
        </nav>
        <div class="container">
            <div class="my-[80px] w-4/5 mx-auto">
                <div class="flex items-end justify-between">
                    <div class="flex items-end gap-7">
                        <h3 class="text-[32px] font-bold">會員中心</h3>
                        <div class="mb-1.5">您好，{{ user.name }}</div>
                    </div>
                    <NuxtLink
                        :to="{ name: 'auth-panel-logout-slug', params: { slug: '登出成功' } }"
                        @click="logout"
                    >
                        <div class="flex gap-2 mb-1.5 cursor-pointer transition-all duration-400 hover:text-gray-500 hover:transition-all hover:duration-400">
                            <NuxtImg
                                class="w-[20px] aspect-square object-cover"
                                src="img/icons/auth/logout.svg"
                                alt=""
                            />
                            <div>登出</div>
                        </div>
                    </NuxtLink>
                </div>
                <div class="grid grid-cols-3 gap-5 mt-10">
                    <div
                        v-for="(item, index) in panelDatas"
                        :key="index"
                    >
                        <NuxtLink :to="item.url">
                            <div
                                class="relative flex flex-col gap-3 items-center bg-gray-100 transition-all duration-300 hover:bg-transparent hover:transition-all hover:duration-300 rounded-[8px] py-12 after:absolute after:w-full after:h-full after:top-0 after:left-0 after:from-yellow-100 after:to-yellow-500 after:rounded-[8px] after:bg-gradient-[296deg] after:bg-gradient-to-br after:opacity-0 after:-z-[1] after:transition-all after:duration-300 hover:after:opacity-100"
                            >
                                <NuxtImg
                                    class="w-[32px] aspect-square object-cover"
                                    :src="item.imgSrc"
                                />
                                <h4>
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
            params: { slug: "slug" },
        },
        imgSrc: "img/icons/auth/password.svg",
    },
    {
        title: "常用聯繫人",
        url: {
            name: "auth-contact-slug",
            params: { slug: "slug" },
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
