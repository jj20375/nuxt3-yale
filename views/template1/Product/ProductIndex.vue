<template>
    <SideBarDeepLayout :customClass="''">
        <template #breadcrumbs>
            <Breadcrumb :menus="breadcrumbs" />
        </template>

        <template #custom-sidebar>
            <SideBar
                class="col-span-2 bg-white"
                :menus="sidebar"
            >
                <template #sidebar-deep-title>
                    <h1 class="text-[32px] text-gray-800 mb-[23px] mt-[26px] font-medium">產品資訊</h1>
                </template>
                <template #sidebar-deep-sub-title>
                    <div class="border-b border-gray-200 py-[16px]">
                        <h5 class="text-[16px] font-medium">商品分類</h5>
                    </div>
                </template>
            </SideBar>
        </template>
        <template #custom-content>
            <div class="flex items-center mb-[40px] mt-[32px] mr-10">
                <NuxtImg
                    class="max-w-[387px] w-full"
                    src="/img/product/category-1.jpg"
                />
                <div class="ml-[40px]">
                    <h2 class="text-[24px] font-medium">商品分類標題</h2>
                    <p class="mt-[16px] text-[16px]">耶魯電子門鎖系列，門內把手上設有安全按鈕，按下安全按鈕並轉動內把手時，房門才能開啟，防止孩童或大型寵物誤開。以最先進的科技成果，為您免去隨身攜帶鑰匙的不便，用戶可透過自己的智慧型手機確保居家安全。</p>
                </div>
            </div>
            <div class="flex justify-end mr-10 mb-[24px]">
                <NuxtLink :to="{ name: 'product-compare-slug', params: { slug: '主鎖比較' }, query: { category: 'id1', tag: 'id1' } }">
                    <button class="border mr-[30px] border-gray-600 w-[100px] text-center rounded-full h-[36px]">規格比較</button>
                </NuxtLink>
                <div class="flex items-center">
                    <p class="text-[16px] text-gray-800">排序：</p>
                    <el-select
                        class="w-[150px]"
                        v-model="sortBy"
                    >
                        <el-option
                            :label="'定價從高到低'"
                            :value="0"
                        ></el-option>
                    </el-select>
                </div>
            </div>
            <div class="grid grid-cols-3 gap-4 mr-10">
                <div v-for="item in 12">
                    <ProductCard :product="item" />
                </div>
            </div>
        </template>
        <template #custom-pagination>
            <Pagination class="flex justify-center mb-[95px] mt-[80px]" />
        </template>
    </SideBarDeepLayout>
</template>

<script lang="ts" setup>
import SideBarDeepLayout from "~/views/template1/layouts/SideBarDeepLayout.vue";
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
import SideBar from "~/views/template1/components/SideBarByDeep.vue";
// import ListItem from "~/views/template1/Post/components/PostListItem.vue";
import Pagination from "~/views/template1/components/Pagination.vue";
// 產品卡片樣板
import ProductCard from "~/views/template1/components/ProductCard.vue";

const route = useRoute();

const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁",
    },
    {
        name: "product-slug",
        text: "產品資訊",
        params: { slug: "耶魯產品資訊" },
    },
    {
        name: "product-slug",
        text: "電子鎖",
        params: { slug: "耶魯產品資訊-電子鎖" },
        query: { category: "id1" },
    },
    {
        name: "product-slug",
        text: "主鎖",
        params: { slug: "耶魯產品資訊-電子鎖-主鎖" },
        query: { category: "id1", tag: "id1" },
    },
]);

const sidebar = ref([
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
    {
        text: "保險箱",
        categoryId: "id2",
        options: [
            {
                text: "防火系列",
                categoryId: "id1",
                url: {
                    name: "product-slug",
                    query: { category: "id2", tag: "id1" },
                    params: { slug: "耶魯產品資訊-保險箱-防火系列" },
                },
            },
            {
                text: "通用系列",
                categoryId: "id2",
                url: {
                    name: "product-slug",
                    query: { category: "id2", tag: "id2" },
                    params: { slug: "耶魯產品資訊-保險箱-通用系列" },
                },
            },
            {
                text: "認證系列",
                categoryId: "id3",
                url: {
                    name: "product-slug",
                    query: { category: "id2", tag: "id3" },
                    params: { slug: "耶魯產品資訊-保險箱-認證系列" },
                },
            },
        ],
    },
    {
        text: "電子鎖配件",
        categoryId: "id3",
        url: {
            name: "product-slug",
            query: { category: "id3" },
            params: { slug: "耶魯產品資訊-電子鎖配件" },
        },
    },
]);

const datas = ref([]);

const sortBy = ref(0);
</script>

<style lang="scss" scoped>
:deep .el-input__inner {
    @apply border-none text-gray-800 #{!important};
}
:deep .el-input__wrapper {
    @apply shadow-none bg-gray-50 text-gray-800 #{!important};
}

:deep .el-select .el-input .el-select__caret.el-icon {
    @apply text-[20px] font-bold text-gray-800 #{!important};
}
</style>
