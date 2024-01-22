<template>
    <div class="z-[300] relative">
        <footer class="flex justify-center w-full text-white bg-gray-800">
            <section class="w-full pl-[158px] pr-[160px] mt-[98px]">
                <ul class="flex justify-between w-full">
                    <li class="mr-[128px]">
                        <NuxtImg
                            class="min-w-[136px] max-w-[136px] w-full"
                            :src="initializationData.site.site_logo"
                            alt=""
                        />
                    </li>
                    <li
                        class="flex-1 mr-[40px]"
                        v-for="(data, key) in footerDatas"
                        :key="key"
                    >
                        <h6 class="font-medium text-[14px] YaleSolisW-Bd">{{ data.title }}</h6>
                        <ul>
                            <li
                                class="my-[17px] text-[14px] hover:text-yellow-400 duration-500 transition-all"
                                v-for="(menu, index) in data.menus"
                                :key="index"
                            >
                                <NuxtLink :to="menu.url">{{ menu.text }}</NuxtLink>
                            </li>
                        </ul>
                    </li>
                    <li class="flex-1">
                        <ul class="flex gap-6">
                            <li
                                v-for="(icon, index) in contact.icons"
                                class="text-[24px]"
                                :key="index"
                            >
                                <a
                                    :href="icon.url"
                                    class="transition-all hover:text-yellow-400"
                                    ><font-awesome-icon :icon="['fab', icon.iconName]" />
                                </a>
                            </li>
                        </ul>
                        <div class="mt-[30px]">{{ contact.name }}</div>
                        <div class="mt-[8px]">{{ contact.phone }}</div>
                    </li>
                </ul>
                <aside class="flex justify-between mt-20 text-sm font-light mb-[23px]">
                    <div>{{ copyright.text }}</div>
                    <ul class="flex">
                        <li
                            v-for="(caluse, index) in copyright['caluses']"
                            :key="index"
                            class="mr-5"
                        >
                            <NuxtLink :to="caluse.url">
                                {{ caluse.text }}
                            </NuxtLink>
                        </li>
                    </ul>
                </aside>
            </section>
        </footer>
        <div class="w-full h-[10px] bg-yellow-500"></div>
    </div>
</template>

<script setup lang="ts">
import { useInitializationStore } from "~/store/initializationStore";

const initializationStore = useInitializationStore();

const initializationData = computed(() => {
    return JSON.parse(JSON.stringify(initializationStore.initializationData));
});

// 裝修實績
const renovation_categories: { id: any; imgSrc: any; text: any; url: { params: { slug: any }; query: { id: any }; name: string } }[] = [];

initializationData.value.site.renovation_categories.forEach((item: { id: any; image: any; name: any }) => {
    renovation_categories.push({
        id: item.id,
        imgSrc: item.image,
        text: item.name,
        url: {
            params: { slug: item.name },
            query: { id: item.id },
            name: "sample-slug",
        },
    });
});

// 展示門市
const stronghold_categories: { id: any; imgSrc: any; text: any; url: { params: { slug: any }; query: { id: any }; name: string } }[] = [];

initializationData.value.site.stronghold_categories.forEach((item: { id: any; icon: any; name: any }) => {
    stronghold_categories.push({
        id: item.id,
        imgSrc: item.icon,
        text: item.name,
        url: {
            params: { slug: item.name },
            query: { id: item.id },
            name: item.id === 2 ? "store-e-commerce-slug" : "store-slug",
        },
    });
});

const footerDatas = ref({
    footer1: {
        title: "PRODUCTS",
        menus: [
            {
                text: "訂製您的專屬門扇",
                url: "",
            },
            {
                text: "Yale 電子鎖",
                url: "",
            },
            {
                text: "保險箱",
                url: "",
            },
            {
                text: "電子鎖配件",
                url: "",
            },
        ],
    },
    footer2: {
        title: "STORE",
        menus: stronghold_categories,
    },

    footer3: {
        title: "SUPPORT",
        menus: [
            {
                text: "常見問答",
                url: {
                    name: "faq-slug",
                    params: { slug: "耶魯服務中心" },
                    query: { id: "1" },
                },
            },
            {
                text: "維修與保固",
                url: {
                    name: "repair-slug",
                    params: { slug: "耶魯維修與保固" },
                    query: { id: "1" },
                },
            },
            {
                text: "檔案下載",
                url: {
                    name: "file-download-slug",
                    params: { slug: "耶魯檔案下載" },
                    query: { id: "1" },
                },
            },
            {
                text: "預約安裝",
                url: {
                    name: "reservation-slug",
                    params: { slug: "耶魯預約安裝" },
                    query: { id: "1" },
                },
            },
            {
                text: "聯絡我們",
                url: {
                    name: "contact-slug",
                    params: { slug: "耶魯聯絡我們" },
                    query: { id: "1" },
                },
            },
        ],
    },
    footer4: {
        title: "ABOUT US",
        menus: [
            {
                text: "關於我們",
                url: "",
            },
            {
                text: "最新消息",
                url: {
                    name: "news-slug",
                    params: { slug: "slug" },
                    query: { id: "4" },
                },
            },
            {
                text: "裝修實績",
                url: {
                    name: "sample-slug",
                    params: { slug: "耶魯裝修實績" },
                    query: { id: "3" },
                },
            },
            {
                text: "Yale Home APP",
                url: "",
            },
        ],
    },
});

const contact = ref({
    icons: [
        {
            iconName: "facebook",
            alt: "耶魯電子鎖粉絲專頁",
            url: "",
        },
        {
            iconName: "line",
            alt: "耶魯電子鎖LINE",
            url: "",
        },
        {
            iconName: "instagram",
            alt: "耶魯電子鎖IG",
            url: "",
        },
        {
            iconName: "youtube",
            alt: "耶魯電子鎖Youtube",
            url: "",
        },
    ],
    name: initializationData.value.site.site_name,
    phone: initializationData.value.site.contact_phone,
});

const copyright = {
    text: `${initializationData.value.site.site_name} © Copyright All Rights Reserved. Powerd by 可思科技-網站架設`,
    caluses: [
        {
            text: "隱私權政策",
            url: {
                name: "other-privacy-slug",
                params: { slug: "耶魯隱私權政權" },
            },
        },
        {
            text: "網站服務條款",
            url: {
                name: "other-terms-slug",
                params: { slug: "耶魯網站服務條款" },
            },
        },
    ],
};
</script>
