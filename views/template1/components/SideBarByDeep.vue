<template>
    <div class="sticky xl:relative top-[64px] xl:top-0 z-[1] xl:pr-[40px]">
        <div v-if="!isLargePad">
            <slot name="sidebar-deep-title"></slot>
            <slot name="sidebar-deep-sub-title"></slot>
        </div>
        <div class="relative before:absolute xl:before:content-none before:bottom-0 before:left-0 before:h-[1px] before:bg-gray-200 before:w-full">
            <div
                @click="xPosition -= 350"
                :class="['absolute bottom-0 left-0 h-[48px] w-6 xl:hidden before:absolute before:top-0 before:left-0 before:h-full before:w-16 before:bg-[linear-gradient(90deg,_#FFFFFF_26.14%,_rgb(0_0_0/0)_75.76%)] z-[11]', leftArrived ? 'hidden' : '']"
            >
                <font-awesome-icon
                    class="absolute bottom-4 left-2"
                    :icon="['fas', 'chevron-left']"
                />
            </div>
            <nav
                ref="scrollRef"
                class="relative flex flex-row overflow-x-scroll overflow-y-hidden xl:flex-col flex-nowrap whitespace-nowrap no-scrollbar"
                :class="isLargePad ? 'container' : ''"
            >
                <div v-for="(menu, index) in menus">
                    <NuxtLink
                        v-if="menu.options.length === 0"
                        :to="menu.url"
                    >
                        {{ menu.text }}
                    </NuxtLink>
                    <div
                        class="cursor-pointer xl:border-b border-gray-200 flex xl:block text-[16px] z-[1] pb-3 pt-7 xl:p-0 xl:border-gray-200 xl:py-4"
                        :class="index !== 0 ? 'px-[14px]' : 'pr-[14px]'"
                    >
                        <NuxtLink :to="menu.url">
                            <div
                                @click="openSubMenu = menu.categoryId"
                                class="relative flex items-center text-[16px] cursor-pointer"
                                :class="openSubMenu === menu.categoryId ? 'xl:after:content-none after:absolute after:-bottom-3 after:w-full after:h-[2px] after:bg-gray-800 after:left-0' : ''"
                            >
                                <!-- <h5 class="flex-1">
                                    {{ menu.text }}
                                </h5> -->
                                <div class="mr-auto">
                                    <h5 :class="openSubMenu === menu.categoryId ? 'font-medium YaleSolisW-Bd' : 'font-normal'">
                                        {{ menu.text }}
                                    </h5>
                                </div>
                                <span
                                    class="items-center justify-center hidden w-4 h-4 xl:flex"
                                    :class="openSubMenu === menu.categoryId ? 'transition duration-[300ms] rotate-90' : ''"
                                    ><font-awesome-icon :icon="['fas', 'chevron-right']"
                                /></span>
                            </div>
                        </NuxtLink>
                        <ul
                            class="hidden xl:flex flex-col gap-2 pt-4 ml-[10px]"
                            v-show="openSubMenu === menu.categoryId"
                        >
                            <li
                                v-for="(subMenu, index2) in menu.options"
                                @click="
                                    currentActiveTag = subMenu.categoryId;
                                    currentActive = menu.categoryId;
                                "
                                class="text-[15px]"
                                :class="[currentActiveTag == subMenu.categoryId && currentActive == menu.categoryId ? 'font-medium YaleSolisW-Bd text-gray-800' : 'text-gray-400', index2 !== 0 ? '' : '']"
                            >
                                <NuxtLink
                                    v-if="subMenu.url"
                                    :to="subMenu.url"
                                >
                                    {{ subMenu.text }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div
                @click="xPosition += 350"
                :class="['absolute bottom-0 right-0 h-[48px] w-6 xl:hidden before:absolute before:top-0 before:right-0 before:h-full before:w-16 before:bg-[linear-gradient(270deg,_#FFFFFF_26.14%,_rgb(0_0_0/0)_75.76%)] z-[11]', rightArrived ? 'hidden' : '']"
            >
                <font-awesome-icon
                    class="absolute bottom-4 right-2"
                    :icon="['fas', 'chevron-right']"
                />
            </div>
        </div>
        <!--   手機版次分類選單   -->
        <div
            v-if="openSubMenu && currentSubMenuOptions.length > 0"
            class="relative bg-white before:absolute xl:before:content-none before:bottom-0 before:left-0 before:h-[1px] before:bg-gray-200 before:w-full"
        >
            <div
                @click="subXPosition -= 350"
                :class="['absolute bottom-0 left-0 h-[48px] w-6 xl:hidden before:absolute before:top-0 before:left-0 before:h-full before:w-16 before:bg-[linear-gradient(90deg,_#FFFFFF_26.14%,_rgb(0_0_0/0)_75.76%)] z-[11]', subLeftArrived ? 'hidden' : '']"
            >
                <font-awesome-icon
                    class="absolute bottom-4 left-2"
                    :icon="['fas', 'chevron-left']"
                />
            </div>
            <ul
                ref="subScrollRef"
                class="container relative flex flex-row overflow-x-scroll overflow-y-hidden xl:hidden xl:flex-col flex-nowrap whitespace-nowrap no-scrollbar"
            >
                <li
                    class="cursor-pointer xl:border-b border-gray-200 flex xl:block text-[16px] z-[1] py-3 xl:p-0 xl:border-gray-200 xl:py-4"
                    :class="[currentActiveTag == subMenu.categoryId ? 'font-bold text-gray-800' : 'text-gray-400', index !== 0 ? 'px-[14px]' : 'pr-[14px]']"
                    v-for="(subMenu, index) in currentSubMenuOptions"
                >
                    <NuxtLink :to="subMenu.url">
                        {{ subMenu.text }}
                    </NuxtLink>
                </li>
            </ul>
            <div
                @click="subXPosition += 350"
                :class="['absolute bottom-0 right-0 h-[48px] w-6 xl:hidden before:absolute before:top-0 before:right-0 before:h-full before:w-16 before:bg-[linear-gradient(270deg,_#FFFFFF_26.14%,_rgb(0_0_0/0)_75.76%)] z-[11]', subRightArrived || !isOverflow ? 'hidden' : '']"
            >
                <font-awesome-icon
                    class="absolute bottom-4 right-2"
                    :icon="['fas', 'chevron-right']"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useWindowResize } from "~/composables/window-resize";

interface Props {
    menus: {
        text: string;
        categoryId: string;
        url?: {
            name: string;
            params?: { [key: string]: any };
        };
        options: {
            text: string;
            categoryId: string;
            url: {
                name: string;
                params?: { [key: string]: any };
            };
        }[];
    }[];
}
const props = withDefaults(defineProps<Props>(), {
    menus: [
        {
            text: "電子鎖",
            categoryId: "id1",
            options: [
                {
                    text: "主鎖",
                    categoryId: "id1",
                    url: {
                        name: "product-slug-category-tag",
                        params: { slug: "耶魯產品資訊-電子鎖-主鎖", category: "id1", tag: "id1" },
                    },
                },
                {
                    text: "輔助鎖",
                    categoryId: "id2",
                    url: {
                        name: "product-slug-category-tag",
                        params: { slug: "耶魯產品資訊-電子鎖-輔助鎖", category: "id1", tag: "id2" },
                    },
                },
            ],
        },
    ],
});
const route = useRoute();

const currentActive = ref(route.params.category);
const currentActiveTag = ref(route.params.tag);
const openSubMenu = ref(route.params.category);

defineExpose({
    currentActive,
    currentActiveTag,
    openSubMenu,
});

// 找到目前開啟的大類裡面的小類選項
const currentSubMenuOptions = computed(() => {
    const currentMenu = props.menus.find((menu) => menu.categoryId === openSubMenu.value);
    return currentMenu ? currentMenu.options : [];
});

// 大類箭頭是否顯示
const scrollRef = ref(null);
const { x: xPosition, arrivedState: mainArrivedState } = useScroll(scrollRef, {
    behavior: "smooth",
});
const { right: rightArrived, left: leftArrived } = toRefs(mainArrivedState);

// 小類箭頭是否顯示
const subScrollRef: Ref<HTMLElement | null> = ref(null);
const { x: subXPosition, arrivedState: subArrivedState } = useScroll(subScrollRef, {
    behavior: "smooth",
    offset: { right: 30, left: 30 },
});
const { right: subRightArrived, left: subLeftArrived } = toRefs(subArrivedState);

// 為了修正subArrivedState在一開始會判斷錯誤
const isOverflow = ref(false);
const checkOverflow = async () => {
    await nextTick(); // 確保DOM已更新

    if (subScrollRef.value) {
        const ulWidth = subScrollRef.value.offsetWidth;
        let totalLiWidth = 0;

        // 計算所有li的寬度總和
        subScrollRef.value.querySelectorAll("li").forEach((li) => {
            totalLiWidth += li.offsetWidth;
        });

        // 判斷是否超過
        isOverflow.value = totalLiWidth > ulWidth;
    }
};

watch(currentSubMenuOptions, () => {
    checkOverflow();
});

const { isLargePad } = useWindowResize();
</script>
