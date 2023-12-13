<template>
    <header
        class="min-h-[94px] flex z-[500] items-center w-full duration-500 transition-all"
        :class="[isHomeMenuFixed ? ' bg-white fixed top-0' : route.name === 'index' ? 'absolute top-0' : '', route.name !== 'index' ? 'fixed top-0 bg-white' : '']"
    >
        <nav class="mx-10">
            <ul class="flex items-center text-base leading-5">
                <li class="mr-5">
                    <NuxtLink :to="{ name: 'index' }">
                        <NuxtImg
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
                    <el-dropdown
                        v-if="menu.submenus.length > 0"
                        trigger="click"
                    >
                        <span class="el-dropdown-link">
                            {{ menu.title }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item v-for="(submenu, index) in menu.submenus">
                                    {{ submenu.text }}
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
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
        submenus: [],
    },
    menu5: {
        title: "產品資訊",
        url: {},
        submenus: [
            {
                text: "Yale 電子鎖",
                imgUrl: "/",
                url: "/",
            },
        ],
    },
    menu6: {
        title: "展示門市",
        url: {},
        submenus: [
            {
                text: "Yale 承德門市",
                imgUrl: "/",
                url: "/",
            },
            {
                text: "Yale 百貨門市",
                imgUrl: "/",
                url: "/",
            },
        ],
    },
    menu7: {
        title: "服務支援",
        url: {},
        submenus: [
            {
                text: "服務中心",
                imgUrl: "/",
                url: "/",
            },
            {
                text: "維修與保固",
                imgUrl: "/",
                url: "/",
            },
            {
                text: "檔按下載",
                imgUrl: "/",
                url: "/",
            },
            {
                text: "預約安裝",
                imgUrl: "/",
                url: "/",
            },
            {
                text: "聯絡我們",
                imgUrl: "/",
                url: "/",
            },
        ],
    },
});
</script>

<style lang="scss" scoped>
::v-deep {
    .el-dropdown {
        @apply text-gray-800 text-base leading-5;
    }
}
</style>
