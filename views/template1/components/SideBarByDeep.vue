<template>
    <div class="pr-[32px]">
        <slot name="sidebar-deep-title"></slot>
        <slot name="sidebar-deep-sub-title"></slot>
        <nav
            v-for="(menu, index) in menus"
            class="pt-[16px]"
        >
            <NuxtLink
                v-if="menu.options.length === 0"
                :to="menu.url"
            >
                {{ menu.text }}
            </NuxtLink>
            <div
                class="border-b border-gray-200 pb-[16px]"
            >
                <div
                    @click="openSubMenu = menu.categoryId"
                    class="flex items-center text-[16px] cursor-pointer font-medium"
                >
                    <!-- <h5 class="flex-1">
                        {{ menu.text }}
                    </h5> -->
                    <div class="mr-auto">
                        <NuxtLink :to="menu.url">
                            <h5>
                                {{ menu.text }}
                            </h5>
                        </NuxtLink>
                    </div>
                    <span :class="openSubMenu === menu.categoryId ? 'transition duration-[400ms] rotate-90' : ''"><font-awesome-icon :icon="['fas', 'chevron-right']" /></span>
                </div>
                <ul class="flex flex-col gap-2 pt-4 ml-[10px]" v-show="openSubMenu === menu.categoryId">
                    <li
                        v-for="(subMenu, index2) in menu.options"
                        @click="
                            currentActiveTag = subMenu.categoryId;
                            currentActive = menu.categoryId;
                        "
                        class="text-[15px]"
                        :class="[currentActiveTag == subMenu.categoryId && currentActive == menu.categoryId ? 'text-gray-800' : 'text-gray-400', index2 !== 0 ? '' : '']"
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
        </nav>
    </div>
</template>

<script setup lang="ts">
interface Props {
    menus: {
        text: string;
        categoryId: string;
        url?: {
            name: string;
            params?: { [key: string]: any };
            query?: { [key: string]: any };
        };
        options: {
            text: string;
            categoryId: string;
            url: {
                name: string;
                params?: { [key: string]: any };
                query?: { [key: string]: any };
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
                        name: "product-slug",
                        query: { category: "id1", tag: "id1" },
                        params: { slug: "耶魯產品資訊-電子鎖-主鎖" },
                    },
                },
                {
                    text: "輔助鎖",
                    categoryId: "id2",
                    url: {
                        name: "product-slug",
                        query: { category: "id1", tag: "id2" },
                        params: { slug: "耶魯產品資訊-電子鎖-輔助鎖" },
                    },
                },
            ],
        },
    ],
});
const route = useRoute();

const currentActive = ref(route.query.category);
const currentActiveTag = ref(route.query.tag);
const openSubMenu = ref(route.query.category);

defineExpose({
    currentActive,
    currentActiveTag,
    openSubMenu,
})
</script>
