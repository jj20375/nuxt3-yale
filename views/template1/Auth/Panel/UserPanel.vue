<template>
    <section class="min-h-screen mt-[94px] border-t border-gray-300">
        <nav class="border-t border-b border-gray-300 py-[16px] bg-white">
            <div class="grid grid-cols-7 gap-0">
                <div class="col-span-7 ml-[122px]">
                    <Breadcrumb :menus="breadcrumbs" />
                </div>
            </div>
        </nav>
        <div class="container">
            <div class="my-[80px] w-4/5 mx-auto">
                <div class="flex justify-between items-end">
                    <div class="flex gap-7 items-end">
                        <h3 class="text-[32px] font-bold">會員中心</h3>
                        <div class="mb-1.5">您好，王小明</div>
                    </div>
                    <NuxtLink
                        :to="{ name: 'auth-panel-logout-slug', params: { slug: '登出成功' }}"
                    >
                        <div
                            class="flex gap-2 mb-1.5 cursor-pointer transition-all duration-400 hover:text-gray-500 hover:transition-all hover:duration-400">
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
                                class="relative flex flex-col gap-3 items-center bg-gray-100 transition-all duration-300 hover:bg-transparent hover:transition-all hover:duration-300 rounded-[8px] py-12 after:absolute after:w-full after:h-full after:top-0 after:left-0 after:from-yellow-100 after:to-yellow-500 after:rounded-[8px] after:bg-gradient-[296deg] after:bg-gradient-to-br after:opacity-0 after:-z-[1] after:transition-all after:duration-300 hover:after:opacity-100">
                                <NuxtImg
                                    class="w-[24px] aspect-square object-cover"
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

const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁"
    },
    {
        name: "auth-panel-slug",
        text: "會員中心",
        params: { slug: "會員中心" }
    }
]);

const panelDatas = ref([
    {
        title: "會員資料",
        url: {
            name: "",
            params: { slug: "slug" }
        },
        imgSrc: "img/icons/auth/info.svg"
    },
    {
        title: "變更密碼",
        url: {
            name: "",
            params: { slug: "slug" }
        },
        imgSrc: "img/icons/auth/password.svg"
    },
    {
        title: "常用聯繫人",
        url: {
            name: "",
            params: { slug: "slug" }
        },
        imgSrc: "img/icons/auth/home.svg"
    },
    {
        title: "一般產品-訂單記錄",
        url: {
            name: "auth-order-slug",
            params: { slug: "訂單記錄" }
        },
        imgSrc: "img/icons/auth/order-record.svg"
    },
    {
        title: "訂製門扇-訂單記錄",
        url: {
            name: "auth-door-slug",
            params: { slug: "slug" }
        },
        imgSrc: "img/icons/auth/door-record.svg"
    },
    {
        title: "產品收藏清單",
        url: {
            name: "",
            params: { slug: "slug" }
        },
        imgSrc: "img/icons/auth/favorite.svg"
    }
]);
</script>