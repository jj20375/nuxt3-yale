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
                    v-if="productTypeDetail.media"
                    class="max-w-[387px] w-full"
                    :src="productTypeDetail.media"
                />
                <div class="ml-[40px]">
                    <h2 class="text-[24px] font-medium">{{ productTypeDetail.name }}</h2>
                    <p class="mt-[16px] text-[16px]">{{ productTypeDetail.description }}</p>
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
                <div
                    v-for="(product, index) in datas"
                    :key="index"
                >
                    <ProductCard
                        :breadcrumbs="breadcrumbs"
                        :product="product"
                    />
                </div>
            </div>
        </template>
        <template #custom-pagination>
            <Pagination
                :pagination="pagination"
                @handlePageChange="handlePageChange"
                class="flex justify-center mb-[95px] mt-[80px]"
            />
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
/**
 * ProductListAPIInterface: 產品分頁 api 回應值
 * ProductList: 產品分頁列表內容
 */
import { ProductListAPIInterface, ProductList } from "~/views/template1/Product/interface/Product.d";

const { $api } = useNuxtApp();

const route = useRoute();

const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁",
    },
]);

const sidebar = ref<any>([]);

/**
 * 取得商品分類
 */
async function getType() {
    try {
        const { data } = await $api().ProductTypeAPI();
        sidebar.value = [];
        console.log("home sampleType api => ", data.value);

        const rows = (data.value as any).data;

        sidebar.value = [];
        rows.forEach((item: { name: any; id: any; children: any }) => {
            console.log(item);
            const children: { text: any; categoryId: any; url: { name: string; query: { category: any; tag: any }; params: { slug: any } } }[] = [];
            if (item.id == route.query.category) {
                breadcrumbs.value.push({
                    name: "product-slug",
                    text: "產品資訊",
                    params: { slug: "耶魯產品資訊" },
                    query: { category: route.query.category, tag: route.query.tag },
                });
                breadcrumbs.value.push({
                    name: route.name,
                    text: item.name,
                    params: { slug: item.name },
                    query: { category: route.query.category, tag: route.query.tag },
                });
            }
            item.children.forEach((child: { name: any; id: any }) => {
                children.push({
                    text: child.name,
                    categoryId: child.id,
                    url: {
                        name: "product-slug",
                        query: { category: item.id, tag: child.id },
                        params: { slug: `產品資訊-${item.name}-${child.name}` },
                    },
                });
                if (child.id == route.query.tag) {
                    breadcrumbs.value.push({
                        name: route.name,
                        text: child.name,
                        params: { slug: child.name },
                        query: { category: route.query.category, tag: route.query.tag },
                    });
                }
            });
            sidebar.value.push({
                text: item.name,
                categoryId: item.id,
                options: children,
            });
        });
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

const productTypeDetail = ref<any>({
    media: "",
    description: "",
    name: "",
});
/**
 * 取得商品分類詳情
 */
async function getTypeDetail() {
    try {
        const params = { productCategoryId: route.query.tag };
        const { data } = await $api().ProductTypeDetailAPI(params);
        console.log("home getTypeDetail api => ", data.value);

        const rows = (data.value as any).data;
        console.log(rows);

        productTypeDetail.value = {
            media: rows.media,
            description: rows.description,
            name: rows.name,
        };
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

const pagination = ref<any>({
    page: 1,
    pageSize: 12,
    total: 0,
});

const handlePageChange = (val: any) => {
    getList({ per_page: pagination.value.pageSize, page: val });
};

const datas = ref<ProductList[]>([]);

const sortBy = ref(0);

/**
 * 取得商品列表
 */
async function getList(params: { per_page: number; page: number }) {
    try {
        params = { ...params };
        // 搜尋分類參數時 須帶上 搜尋模式 條件
        params["search_fields"] = "productCategories.product_category_id:in";
        // 搜尋分類參數 ("主鎖｜輔助鎖" 等等...)
        params["search_relations"] = "productCategories.product_category_id:" + route.query.tag;
        const { data } = await $api().ProductListPaginateAPI<ProductListAPIInterface>(params);
        datas.value = [];
        console.log("home sample api => ", data.value);

        const rows = (data.value as any).data.rows;
        const meta = (data.value as any).data.meta;

        rows.forEach((item: { id: any; model: any; name: any; shape: any; price: any; market_price: any; main_image: any; other_images: any }) => {
            datas.value.push({
                id: item.id,
                model: item.model,
                name: item.name,
                shape: item.shape,
                price: item.price,
                market_price: item.market_price,
                main_image: item.main_image,
            });
        });

        pagination.value.total = meta.total;
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

/**
 * 初始化
 */
async function init() {
    await getType();
    await getTypeDetail();
    console.log("route.query.id", route);
    await getList({ per_page: pagination.value.pageSize, page: 1 });
}

onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
            await init();
        }
    });
});
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
