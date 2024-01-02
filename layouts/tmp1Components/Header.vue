<template>
    <header
        class="fixed py-3 z-[500] items-center w-full duration-500 transition-all"
        :class="[isHomeMenuFixed ? ' bg-white fixed top-0' : route.name === 'index' ? 'top-0' : '', route.name !== 'index' ? 'fixed top-0 bg-white' : '']"
    >
        <nav class="mx-[50px] flex items-center">
            <ul class="flex items-center flex-1 text-base leading-5">
                <li class="mr-14">
                    <NuxtLink :to="{ name: 'index' }">
                        <NuxtImg
                            class="h-[66px] w-[66px]"
                            src="/img/logo/logo-1.svg"
                            :alt="$config.public.webSite"
                        />
                    </NuxtLink>
                </li>
                <li
                    v-for="(menu, key) in menus"
                    class="mr-5 text-gray-800"
                    :key="key"
                >
                    <div v-if="menu.submenus.length > 0">
                        <div
                            @click=""
                            class="cursor-pointer"
                        >
                            {{ menu.title }}
                        </div>
                        <ul class="flex">
                            <li
                                v-for="(submenu, index) in menus.submenus"
                                :key="index"
                                :class="menu.marginSize"
                            >
                                <NuxtLink :to="submenu.url">
                                    <NuxtImg :src="submenu.imgSrc" />
                                    {{ submenu.text }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>

                    <div v-else>
                        <div
                            class="cursor-pointer"
                            @click="router.push(menu.url)"
                        >
                            {{ menu.title }}
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="flex border-r border-gray-400">
                <li
                    v-for="(icon, index) in rightIcons"
                    :key="index"
                    :class="index === 0 ? 'mr-[22px]' : 'mr-[26px]'"
                >
                    <NuxtLink :to="icon.url">
                        <NuxtImg
                            class="w-[20px]"
                            :src="icon.imgSrc"
                        />
                    </NuxtLink>
                </li>
            </ul>
            <ul class="flex ml-[26px]">
                <li
                    v-for="socialMedia in 4"
                    :key="socialMedia"
                    class="mr-[22px]"
                    :class="socialMedia !== 1 ? '' : ''"
                >
                    <NuxtImg
                        class="w-[20px]"
                        :src="`/img/icons/medias/icon-black-${socialMedia}.svg`"
                    />
                </li>
            </ul>
        </nav>
    </header>
</template>

<script lang="ts" setup>
import { useTemplateStore } from "~/store/templateStore";

const $config = useRuntimeConfig();
const router = useRouter();
const route = useRoute();
const templateStore = useTemplateStore();

const isHomeMenuFixed = computed(() => templateStore.isHomeMenuFixed);

const menus = ref<any>({
    menu1: {
        title: "訂製您的專屬門扇",
        url: {
            name: "custom-slug",
            params: { slug: "slug" },
        },
        submenus: [],
    },
    menu2: {
        title: "關於我們",
        url: {
            name: "about-slug",
            params: { slug: "slug" },
            query: { id: "id1" },
        },
        submenus: [],
    },
    menu3: {
        title: "最新消息",
        url: {
            name: "news-slug",
            params: { slug: "slug" },
            query: { id: "id1" },
        },
        submenus: [],
    },
    menu4: {
        title: "裝修實績",
        url: {
            name: "sample-slug",
            params: { slug: "耶魯裝修實績" },
            query: { id: "id2" },
        },
        marginSize: "mr-[80px]",
        submenus: [],
    },
    menu5: {
        title: "展示門市",
        url: {
            name: "store-slug",
            params: { slug: "耶魯展示門市" },
            query: { id: "id1" },
        },
        marginSize: "mr-[80px]",
        submenus: [
            {
                id: "id1",
                imgSrc: "/img/menu/store/menu-store-icon-1.svg",
                text: "直營門市",
                url: {
                    params: { slug: "直營門市" },
                    query: { id: "id1" },
                    name: "store-slug",
                },
            },
            {
                id: "id2",
                imgSrc: "/img/menu/store/menu-store-icon-2.svg",
                text: "授權展售店",
                url: {
                    params: { slug: "授權展售店" },
                    query: { id: "id2" },
                    name: "store-slug",
                },
            },
            {
                id: "id3",
                imgSrc: "/img/menu/store/menu-store-icon-2.svg",
                text: "全國電子通路",
                url: {
                    params: { slug: "全國電子通路" },
                    query: { id: "id3" },
                    name: "store-slug",
                },
            },
            {
                id: "id4",
                imgSrc: "/img/menu/store/menu-store-icon-2.svg",
                text: "電商通路",
                url: {
                    params: { slug: "電商通路" },
                    query: { id: "id4" },
                    name: "store-e-commerce-slug",
                },
            },
        ],
    },
    menu6: {
        title: "產品資訊",
        url: {
            name: "product-slug",
            params: { slug: "耶魯產品資訊-電子鎖-主鎖" },
            query: { category: "id1", tag: "id1" },
        },
        marginSize: "mr-[40px]",
        submenus: [],
    },
    menu7: {
        title: "服務支援",
        url: {},
        marginSize: "mr-[80px]",
        submenus: [
            {
                text: "服務中心",
                imgSrc: "/",
                url: {
                    name: "faq-slug",
                    params: { slug: "耶魯服務中心" },
                    query: { id: "id1" },
                },
            },
            {
                text: "維修與保固",
                imgSrc: "/",
                url: "/",
            },
            {
                text: "檔案下載",
                imgSrc: "/",
                url: {
                    name: "file-download-slug",
                    params: { slug: "耶魯檔案下載" },
                    query: { id: "id1" },
                },
            },
            {
                text: "預約安裝",
                imgSrc: "/",
                url: "/",
            },
            {
                text: "聯絡我們",
                imgSrc: "/",
                url: {
                    name: "contact-slug",
                    params: { slug: "耶魯聯絡我們" },
                    query: { id: "id1" },
                },
            },
        ],
    },
});

// 右側 icon
const rightIcons = ref([
    {
        imgSrc: "/img/icons/user.svg",
        url: {
            path: "/",
        },
    },
    {
        imgSrc: "/img/icons/shop-card.svg",
        url: {
            name: "shopping-car-slug",
            params: {
                slug: "耶魯電子鎖購物車",
            },
        },
    },
]);
</script>

<style lang="scss" scoped>
::v-deep {
    .el-dropdown {
        @apply text-gray-800 text-base leading-5;
    }
}
</style>
