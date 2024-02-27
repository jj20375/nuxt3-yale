<template>
    <header
        class="fixed z-[500] items-center w-full duration-500 transition-all"
        :class="[isHomeMenuFixed || isPad ? 'bg-white fixed top-0 border-b border-gray-300' : route.name === 'index' ? 'top-0 border-b border-transparent' : '', route.name !== 'index' ? 'fixed top-0 bg-white border-b border-gray-300' : '']"
    >
        <nav class="xl:mx-[32px] xl:flex items-center xl:text-left text-center h-headerMb xl:h-header">
            <div
                class="absolute flex justify-center items-center !w-[40px] !h-[40px] top-8 left-3 -translate-y-1/2 flex xl:hidden cursor-pointer z-[2]"
                @click="showMenu = !showMenu"
                type="button"
            >
                <IconMenu class="!w-[20px] !h-[20px] transition-all duration-300 hover:text-gray-400 hover:transition-all hover:duration-300" />
            </div>
            <ul
                class="items-center flex-1 text-base leading-5 xl:flex top-[64px] xl:top-0 xl:mb-0"
                :class="isDesktop ? '' : showMenu ? 'py-4 nav-bar-mb' : ''"
            >
                <li class="fixed xl:relative xl:mr-4 2xl:mr-6 3xl:mr-14 w-full xl:w-fit top-0 left-0 z-[1] bg-white xl:bg-transparent py-[8px] xl:py-[10px]">
                    <NuxtLink
                        class="block mx-auto w-fit"
                        :to="{ name: 'index' }"
                    >
                        <NuxtImg
                            class="h-[48px] w-[48px] xl:h-[66px] xl:w-[66px] mx-auto"
                            :src="initializationData.site.site_logo"
                            :alt="$config.public.webSite"
                        />
                    </NuxtLink>
                </li>
                <li
                    :class="isDesktop ? 'opacity-100' : showMenu ? 'opacity-100 h-auto' : 'opacity-0 overflow-hidden h-0'"
                    class="duration-500 transition-all xl:duration-0 xl:transition-none"
                    v-for="(menu, key) in menus"
                    :key="key"
                >
                    <div
                        v-if="menu.submenus.length > 0"
                        @mouseover="isPad ? null : changeMenu(key)"
                        @mouseleave="closeMenu"
                        @click="isPad ? toggleMenu(key) : null"
                        class="xl:px-3 2xl:px-4 3xl:px-5 xl:py-[33px] text-gray-800 cursor-pointer hover:text-gray-500"
                    >
                        <div class="flex justify-center py-5 xl:py-0">
                            {{ menu.title }}
                            <div
                                class="ml-3 xl:ml-0 transition-all duration-300"
                                :class="menuStatus[key] ? 'rotate-180' : 'rotate-0'"
                            >
                                <font-awesome-icon
                                    v-if="isPad"
                                    class=""
                                    :icon="['fas', 'chevron-down']"
                                />
                            </div>
                        </div>
                        <div
                            v-if="!isPad"
                            class="absolute left-0 top-[86px] z-50 bg-white w-full"
                        >
                            <div
                                class="border-t border-gray-300 shadow-header"
                                v-if="currentMenu === key && showSubMenu"
                            >
                                <ul
                                    class="container flex items-center justify-center min-h-[300px] py-[60px] flex-wrap text-center"
                                    :class="menu.marginSize"
                                >
                                    <li
                                        v-for="(submenu, subIndex) in menu.submenus"
                                        :key="subIndex"
                                        class="submenu-item"
                                        :class="[key === 'menu5' || key === 'menu7' ? 'hover-scale' : key === 'menu6' ? 'hover-shadow' : key === 'menu4' ? 'hover-fade' : '']"
                                    >
                                        <NuxtLink :to="submenu.url">
                                            <div class="image-wrap">
                                                <NuxtImg
                                                    :class="key !== 'menu4' ? 'w-[120px] aspect-square object-cover' : 'w-[400px] aspect-[20/9] rounded-xl object-cover'"
                                                    :src="submenu.imgSrc"
                                                />
                                            </div>
                                            <div class="mt-[20px]">{{ submenu.text }}</div>
                                        </NuxtLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div v-else>
                            <Vue3SlideUpDown
                                v-model="menuStatus[key]"
                                :duration="300"
                            >
                                <div class="bg-gray-100 submenu-list">
                                    <ul class="py-[12px] text-center duration-300 delay-150 transition-all">
                                        <li
                                            v-for="(submenu, subIndex) in menu.submenus"
                                            :key="subIndex"
                                            class="py-[12px] submenu-item"
                                        >
                                            <NuxtLink :to="submenu.url">
                                                <div>{{ submenu.text }}</div>
                                            </NuxtLink>
                                        </li>
                                    </ul>
                                </div>
                            </Vue3SlideUpDown>
                        </div>
                    </div>
                    <div v-else>
                        <div
                            class="relative xl:px-3 2xl:px-5 py-5 xl:py-[33px] text-gray-800 hover:text-gray-500 cursor-pointer transition-all duration-300 cursor-pointer"
                            :class="key === 'menu1' ? 'has-door' : ''"
                            @click="router.push(menu.url)"
                        >
                            <template v-if="key === 'menu1'">
                                <div class="flex items-center justify-center text-center xl:justify-start">
                                    <div class="title">{{ menu.title }}</div>
                                    <div class="image-wrap">
                                        <NuxtImg src="/img/icons/door.svg" />
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                {{ menu.title }}
                            </template>
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="absolute xl:relative flex gap-[2px] xl:pr-[16px] 3xl:pr-[20px] top-8 xl:top-0 right-3 xl:right-0 -translate-y-1/2 xl:translate-y-0 xl:before:absolute xl:before:top-1/2 xl:before:-translate-y-1/2 xl:before:right-0 xl:before:bg-gray-400 xl:before:w-[1px] xl:before:h-4 z-[2]">
                <li
                    v-for="(icon, index) in rightIcons"
                    :key="index"
                >
                    <NuxtLink
                        class="flex justify-center items-center !w-[40px] !h-[40px] group"
                        :to="icon.url"
                    >
                        <el-badge
                            :value="icon.badgeCount"
                            class="item"
                            :hidden="!icon.badgeCount"
                        >
                            <component
                                class="!w-[20px] !h-[20px] transition-all duration-300 group-hover:text-gray-400 group-hover:transition-all group-hover:duration-300"
                                :is="icon.name"
                            />
                        </el-badge>
                    </NuxtLink>
                </li>
            </ul>
            <ul class="hidden xl:flex xl:ml-[16px] 3xl:ml-[20px] gap-[2px]">
                <li
                    v-for="(media, index) in socialMedia"
                    :key="index"
                >
                    <div
                        @click="toSocialMedia(media)"
                        class="flex justify-center items-center !w-[40px] !h-[40px] group cursor-pointer"
                    >
                        <component
                            class="!w-[20px] !h-[20px] transition-all duration-300 group-hover:text-gray-400 group-hover:transition-all group-hover:duration-300"
                            :is="media.name"
                        />
                    </div>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script lang="ts" setup>
import { useTemplateStore } from "~/store/templateStore";
import { useInitializationStore } from "~/store/initializationStore";
import { useUserStore } from "~/store/userStore";
import { useShoppingCarStore } from "~/store/shoppingCarStore";
import { storeToRefs } from "pinia";
const $config = useRuntimeConfig();
const router = useRouter();
const route = useRoute();
const templateStore = useTemplateStore();
const initializationStore = useInitializationStore();
const userStore = useUserStore();
const shoppingCarStore = useShoppingCarStore();

const { isAuth } = storeToRefs(userStore);
const { shoppingCar } = storeToRefs(shoppingCarStore);
// icon 路徑
import IconUser from "~/assets/img/icons/user.svg";
import IconCart from "~/assets/img/icons/shop-cart.svg";
import IconFacebook from "~/assets/img/icons/medias/icon-black-1.svg";
import IconInstagram from "~/assets/img/icons/medias/icon-black-2.svg";
import IconLine from "~/assets/img/icons/medias/icon-black-3.svg";
import IconYoutube from "~/assets/img/icons/medias/icon-black-4.svg";
import IconMenu from "~/assets/img/icons/menu.svg";

const { isPad, isDesktop } = useWindowResize();

// 手機版時判斷是否顯示選單
const showMenu = ref(false);

const isHomeMenuFixed = computed(() => templateStore.isHomeMenuFixed);

const initializationData = computed(() => {
    return JSON.parse(JSON.stringify(initializationStore.initializationData));
});

// 手機版時展開選單固定畫面
watch(showMenu, (newVal) => {
    // sidebar展開時
    if (newVal) {
        // body設定為 overflow: hidden
        document.body.style.overflow = "hidden";
    } else {
        // 清空設定
        document.body.style.overflow = "";
    }
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

// 產品資訊
const product_categories: { id: any; imgSrc: any; text: any; url: { params: { slug: any }; query: { tag: any; category: any }; name: string } }[] = [];

initializationData.value.site.product_categories.forEach((item: { id: any; menu_image: any; name: any }) => {
    product_categories.push({
        id: item.id,
        imgSrc: item.menu_image,
        text: item.name,
        url: {
            params: { slug: `產品資訊-${item.name}` },
            query: { category: item.id, tag: item.id },
            name: "product-slug",
        },
    });
});

const menus = ref<any>({
    menu1: {
        title: "訂製您的專屬門扇",
        url: {
            name: "custom-product-slug",
            params: { slug: "訂製門扇" },
        },
        submenus: [],
    },
    menu2: {
        title: "關於我們",
        url: {
            name: "about-slug",
            params: { slug: "關於我們" },
        },
        submenus: [],
    },
    menu3: {
        title: "最新消息",
        url: {
            name: "news-slug",
            params: { slug: "slug" },
            query: { id: "4" },
        },
        submenus: [],
    },
    menu6: {
        title: "產品資訊",
        url: {
            name: "product-slug",
            params: { slug: "產品資訊-電子鎖-主鎖" },
            query: { category: "id1", tag: "id1" },
        },
        marginSize: "gap-x-[40px] gap-y-[20px]",
        submenus: product_categories,
    },
    menu5: {
        title: "展售門市",
        url: {
            name: "store-slug",
            params: { slug: "耶魯展售門市" },
            query: { id: "id1" },
        },
        marginSize: "gap-x-[80px] gap-y-[20px]",
        submenus: stronghold_categories,
    },
    menu4: {
        title: "裝修實績",
        url: {
            name: "sample-slug",
            params: { slug: "裝修實績" },
            query: { id: "1" },
        },
        marginSize: "gap-x-[40px] gap-y-[20px]",
        submenus: renovation_categories,
    },
    menu7: {
        title: "服務支援",
        url: {},
        marginSize: "gap-x-[80px] gap-y-[20px]",
        submenus: [
            {
                id: "id1",
                text: "服務中心",
                imgSrc: "/img/menu/service/menu-service-icon-1.svg",
                url: {
                    name: "faq-slug",
                    params: { slug: "服務中心" },
                    query: { id: "1" },
                },
            },
            {
                id: "id2",
                text: "維修與保固",
                imgSrc: "/img/menu/service/menu-service-icon-2.svg",
                url: {
                    name: "repair-slug",
                    params: { slug: "維修與保固" },
                    query: { id: "1" },
                },
            },
            {
                id: "id3",
                text: "檔案下載",
                imgSrc: "/img/menu/service/menu-service-icon-3.svg",
                url: {
                    name: "file-download-slug",
                    params: { slug: "檔案下載" },
                    query: { id: "1" },
                },
            },
            {
                id: "id4",
                text: "預約安裝",
                imgSrc: "/img/menu/service/menu-service-icon-4.svg",
                url: {
                    name: "reservation-slug",
                    params: { slug: "預約安裝" },
                    query: { id: "1" },
                },
            },
            {
                id: "id5",
                text: "聯絡我們",
                imgSrc: "/img/menu/service/menu-service-icon-5.svg",
                url: {
                    name: "contact-slug",
                    params: { slug: "聯絡我們" },
                    query: { id: "1" },
                },
            },
        ],
    },
    menu8: {
        title: "Yale Home App",
        url: {
            name: "yale-home-app-slug",
            params: { slug: "Yale-Home-App下載" },
            query: { id: "1" },
        },
        submenus: [],
    },
});

// 右側 icon
const rightIcons = computed(() => {
    let userUrl = {
        name: "auth-panel-slug",
        params: {
            slug: "會員中心",
        },
    };
    if (!isAuth.value) {
        userUrl = {
            name: "auth-login-slug",
            params: {
                slug: "會員登入",
            },
        };
    }
    return [
        {
            name: IconUser,
            url: userUrl,
        },
        {
            name: IconCart,
            url: {
                name: "shopping-car-slug",
                params: {
                    slug: "電子鎖購物車",
                },
                query: {
                    tab: "type1",
                },
            },
            badgeCount: shoppingCar.value.length,
        },
    ];
});

// 社群資料
const socialMedia = ref([
    {
        name: shallowRef(IconFacebook),
        url: initializationData.value.site.social_facebook,
    },
    {
        name: shallowRef(IconLine),
        url: initializationData.value.site.social_line,
    },
    {
        name: shallowRef(IconInstagram),
        url: initializationData.value.site.social_instagram,
    },
    {
        name: shallowRef(IconYoutube),
        url: initializationData.value.site.social_youtube,
    },
]);

function toSocialMedia(socialMedia: { url: string | URL | undefined }) {
    if (socialMedia.url) {
        open(socialMedia.url, "_blank");
    }
}

// 預設選擇的 menu 判斷是否呈現 submenu
const currentMenu = ref<null | string>(null);
const menuStatus = ref<{ [key: string]: boolean }>({});
const showSubMenu = ref<boolean>(false);
const active = ref(false);

function changeMenu(key: string) {
    currentMenu.value = key;
    showSubMenu.value = true;
}

function closeMenu() {
    currentMenu.value = null;
    showSubMenu.value = false;
}

// 預設下拉選單為關閉狀態
Object.keys(menus.value).forEach((key) => {
    menuStatus.value[key] = false;
});

// 手機版下拉選單
function toggleMenu(key: string) {
    const menuKey = key;
    menuStatus.value[menuKey] = !menuStatus.value[menuKey];
}
</script>

<style lang="scss" scoped>
:deep {
    .el-dropdown {
        @apply text-gray-800 text-base leading-5;
    }
}

// 有黃色背景的特效
.hover-scale {
    .image-wrap {
        @apply relative;
        @apply before:absolute before:bg-white before:top-0 before:left-0 before:h-full before:w-full before:rounded-full before:bg-yellow-400 before:scale-0 before:opacity-0 before:-z-[1] before:transition-all before:duration-300;
        @apply after:absolute after:bg-gray-50 after:top-0 after:left-0 after:h-full after:w-full after:rounded-full after:-z-[2];
    }
    &:hover {
        .image-wrap {
            @apply before:opacity-100 before:scale-100 before:transition-all before:duration-300;
        }
    }
}

// 有陰影的特效
.hover-shadow {
    .image-wrap {
        @apply relative before:w-[150px] before:h-[10px] before:absolute before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:-z-[1] before:opacity-0 before:transition-all before:duration-300;
        &::before {
            background-image: radial-gradient(rgba(0, 0, 0, 0.5) 5%, #ffffff 35%);
            filter: blur(3px);
        }
        img {
            @apply relative top-0;
            transition: all 0.3s ease-in-out;
        }
    }
    &:hover {
        .image-wrap {
            @apply before:opacity-100 before:transition-all before:duration-300;
            img {
                @apply -top-3;
                transition: all 0.5s cubic-bezier(0.04, 0.64, 0.35, 1.58);
            }
        }
    }
}

// 淡入的特效
.hover-fade {
    img {
        @apply opacity-100 transition-all duration-300;
    }
    &:hover {
        img {
            @apply opacity-80 transition-all duration-300;
        }
    }
}

// hover會多門的標題
.has-door {
    .title {
        @apply mr-0 transition-all duration-300;
    }
    .image-wrap {
        @apply xl:max-w-0 h-[20px] xl:overflow-hidden xl:transition-all xl:duration-300 xl:opacity-0;
        img {
            @apply ml-2 xl:ml-0 h-[20px] w-[20px] max-w-none;
        }
    }
    @media screen and (min-width: 1280px) {
        &:hover {
            @apply px-1 xl:px-2 2xl:px-3 transition-all duration-300;
            .image-wrap {
                @apply max-w-[24px] transition-all duration-300 opacity-100;
            }

            .title {
                @apply mr-2 transition-all duration-300;
            }
        }
    }
}

// 副標題列表
.submenu-list {
    transition: max-height 0.5s ease-in-out;
    // 副標題類別
    .submenu-item {
        @apply text-gray-800;
        &:hover {
            @apply text-gray-600;
        }
    }
}

// 手機版的下拉選單
.nav-bar-mb {
    @apply relative overflow-auto bg-white border-t shadow-header;
    max-height: calc(var(--vh, 1vh) * 100 - #{$navbar-height-mb});
}
</style>
