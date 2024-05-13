<template>
    <div class="z-[300] relative mt-auto">
        <footer class="flex justify-center w-full text-white bg-gray-400">
            <div class="container">
                <section class="mt-[56px] xl:mt-[100px]">
                    <ul class="grid grid-cols-2 xl:flex justify-between w-full gap-x-[24px] gap-y-[40px] xl:gap-[40px]">
                        <li class="col-span-2 mr-[24px] xl:mr-[24px] 2xl:mr-[88px]">
                            <NuxtImg
                                class="w-[80px] xl:w-[136px] aspect-square object-contain"
                                :src="initializationData.site.site_logo"
                                alt=""
                            />
                        </li>
                        <li
                            class="flex-1"
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
                        <li class="flex-1 col-span-2">
                            <ul class="flex gap-4">
                                <li
                                    v-for="(icon, index) in contact.icons"
                                    :key="index"
                                >
                                    <div
                                        @click="toSocialMedia(icon)"
                                        class="flex justify-center items-center !w-[32px] !h-[32px] cursor-pointer group cursor-pointer"
                                    >
                                        <component
                                            class="!w-[24px] !h-[24px] transition-all duration-300 group-hover:text-yellow-500 group-hover:transition-all group-hover:duration-300"
                                            :is="icon.iconName"
                                        />
                                    </div>
                                </li>
                            </ul>
                            <div class="flex xl:flex-col gap-2 mt-[30px] text-[14px] xl:text-[16px]">
                                <div>{{ contact.name }}</div>
                                <div>{{ contact.phone }}</div>
                            </div>
                        </li>
                    </ul>
                    <aside class="flex flex-col justify-between mt-2 mb-10 text-sm font-light xl:flex-row xl:mt-20 xl:mb-6">
                        <div class="order-2 mt-2 xl:order-1 xl:mt-0">{{ copyright.text }}</div>
                        <ul class="flex order-1 gap-5 xl:order-2">
                            <li
                                v-for="(caluse, index) in copyright['caluses']"
                                :key="index"
                            >
                                <NuxtLink
                                    class="hover:text-yellow-500"
                                    :to="caluse.url"
                                >
                                    {{ caluse.text }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </aside>
                </section>
            </div>
        </footer>
        <div class="w-full h-[10px] bg-yellow-500"></div>
    </div>
</template>

<script setup lang="ts">
import { useInitializationStore } from "~/store/initializationStore";

// icon 路徑
import IconFacebook from "~/assets/img/icons/medias/icon-black-1.svg";
import IconInstagram from "~/assets/img/icons/medias/icon-black-2.svg";
import IconLine from "~/assets/img/icons/medias/icon-black-3.svg";
import IconYoutube from "~/assets/img/icons/medias/icon-black-4.svg";

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
            params: { slug: item.name, id: item.id },
            name: "sample-slug-id",
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
            params: { slug: item.name, id: item.id },
            name: item.id === 2 ? "store-e-commerce-slug-id" : "store-slug-id",
        },
    });
});

// 產品資訊
const product_categories: { id: any; imgSrc: any; text: any; url: { params: { slug: any }; query: { tag: any; category: any }; name: string } }[] = [
    {
        text: "訂製您的專屬門扇",
        url: {
            name: "custom-product-slug",
            params: { slug: "1" },
        },
    },
];

initializationData.value.site.product_categories.forEach((item: { id: any; menu_image: any; name: any }) => {
    product_categories.push({
        id: item.id,
        imgSrc: item.menu_image,
        text: item.name,
        url: {
            params: { slug: `產品資訊-${item.name}`, category: item.id, tag: item.id },
            name: "product-slug-category-tag",
        },
    });
});

const footerDatas = ref({
    footer1: {
        title: "PRODUCTS",
        menus: product_categories,
    },
    footer2: {
        title: "STORE",
        menus: stronghold_categories,
    },

    footer3: {
        title: "SUPPORT",
        menus: [
            {
                text: "服務中心",
                url: {
                    name: "faq-page-slug",
                    params: { slug: "faq" },
                },
            },
            {
                text: "維修與保固",
                url: {
                    name: "repair-slug",
                    params: { slug: "維修與保固" },
                },
            },
            {
                text: "檔案下載",
                url: {
                    name: "file-download-slug-id",
                    params: { slug: "檔案下載", id: "1" },
                },
            },
            {
                text: "預約安裝",
                url: {
                    name: "reservation-slug",
                    params: { slug: "預約安裝" },
                },
            },
            {
                text: "聯絡我們",
                url: {
                    name: "contact-slug",
                    params: { slug: "聯絡我們" },
                },
            },
        ],
    },
    footer4: {
        title: "ABOUT US",
        menus: [
            {
                text: "關於我們",
                url: {
                    name: "about-slug",
                    params: { slug: "關於我們" },
                },
            },
            {
                text: "最新消息",
                url: {
                    name: "news-page-slug",
                    params: { slug: "slug" },
                },
            },
            {
                text: "裝修實績",
                url: {
                    name: "sample-page-slug",
                    params: { slug: "slug" },
                },
            },
            {
                text: "Yale Home App",
                url: {
                    name: "yale-home-app-slug",
                    params: { slug: "Yale-Home-App下載" },
                },
            },
        ],
    },
});

const contact = computed(() => {
    const arr = []

    if (initializationData.value.site.social_facebook) {
        arr.push({
            iconName: IconFacebook,
            alt: "耶魯電子鎖粉絲專頁",
            url: initializationData.value.site.social_facebook,
        })
    }
    if (initializationData.value.site.social_line) {
        arr.push({
            iconName: IconLine,
            alt: "耶魯電子鎖LINE",
            url: initializationData.value.site.social_line,
        })
    }
    if (initializationData.value.site.social_instagram) {
        arr.push({
            iconName: IconInstagram,
            alt: "耶魯電子鎖IG",
            url: initializationData.value.site.social_instagram,
        })
    }
    if (initializationData.value.site.social_youtube) {
        arr.push({
            iconName: IconYoutube,
            alt: "耶魯電子鎖Youtube",
            url: initializationData.value.site.social_youtube,
        })
    }

    return {
        icons: arr,
        name: initializationData.value.site.site_name,
        phone: initializationData.value.site.contact_phone,
    }
})

function toSocialMedia(socialMedia: { url: string | URL | undefined }) {
    if (socialMedia.url) {
        open(socialMedia.url, "_blank");
    }
}

const copyright = {
    text: `${initializationData.value.site.site_name} © Copyright All Rights Reserved. Powerd by 可思科技-網站架設`,
    caluses: [
        {
            text: "隱私權政策",
            url: {
                name: "other-privacy-page-slug",
                params: { slug: "slug" },
            },
        },
        {
            text: "網站服務條款",
            url: {
                name: "other-terms-page-slug",
                params: { slug: "slug" },
            },
        },
    ],
};
</script>
