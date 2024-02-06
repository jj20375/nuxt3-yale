<template>
    <SideBarDeepLayout :customClass="''">
        <template #breadcrumbs>
            <Breadcrumb :menus="breadcrumbs" />
        </template>

        <template #custom-sidebar>
            <SideBar
                ref="sideBarRef"
                class="bg-white w-[250px]"
                :menus="sidebar"
            >
                <template #sidebar-deep-title>
                    <h1 class="text-[32px] text-gray-800 mb-[24px] leading-none mt-[32px] font-medium">產品資訊</h1>
                </template>
                <template #sidebar-deep-sub-title>
                    <div class="border-b border-gray-200 py-[16px]">
                        <h5 class="text-[16px] font-medium">商品分類</h5>
                    </div>
                </template>
            </SideBar>
        </template>

        <template #custom-content>
            <div v-if="loading">
                <div class="flex items-center justify-center w-full h-screen">
                    <font-awesome-icon
                        class="animate-spin text-[100px]"
                        :icon="['fas', 'spinner']"
                    />
                </div>
            </div>
            <div class="flex items-center mb-[40px] mt-[32px] mr-10">
                <NuxtImg
                    v-if="productTypeDetail.media"
                    class="max-w-[387px] w-full aspect-[16/9] object-cover"
                    :src="productTypeDetail.media"
                />
                <div class="ml-[40px]">
                    <h2 class="text-[24px] font-medium">{{ productTypeDetail.name }}</h2>
                    <p class="mt-[16px] text-[16px]">{{ productTypeDetail.description }}</p>
                </div>
            </div>
            <div class="flex justify-end mb-[24px] gap-[30px]">
                <NuxtLink
                    v-if="productTypeDetail.is_compare === 1"
                    @click="goToCompare(productTypeDetail)"
                >
                    <button class="transparent-btn btn-xs">規格比較</button>
                </NuxtLink>
                <div class="flex items-center">
                    <p class="text-[16px] text-gray-800">排序：</p>
                    <el-select
                        class="w-[180px]"
                        v-model="sortBy"
                        @change="sortChange"
                        value-key="label"
                        :suffix-icon="IconArrowDown"
                    >
                        <el-option
                            v-for="(item, key) in sortOptions"
                            :key="key"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </div>
            </div>
            <div class="grid grid-cols-3 gap-x-[20px] gap-y-[40px]">
                <div
                    v-for="(product, index) in datas"
                    :key="index"
                >
                    <ProductCard
                        :breadcrumbs="breadcrumbs"
                        :product="product"
                        @handleFavorite="handleFavorite"
                    />
                </div>
            </div>
        </template>
        <template #custom-pagination>
            <Pagination
                v-if="!loadingWaitPagination"
                :pagination="pagination"
                @handlePageChange="handlePageChange"
                class="flex justify-center mb-[95px] mt-[80px]"
            />
        </template>
    </SideBarDeepLayout>
</template>

<script lang="ts" setup>
import IconArrowDown from "~/assets/img/icons/arrow-down.svg";
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
import { ProductListAPIInterface, ProductList, ProductCarInterface } from "~/interface/product.d";

import { ElMessage } from "element-plus";

const { $api, $utils } = useNuxtApp();

const route = useRoute();
const router = useRouter();

const loading = ref(false);
const loadingWaitPagination = ref(true);

const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁",
    },
]);

const sortOptions = ref([
    {
        label: "上架時間新至舊",
        value: {
            label: "上架時間新至舊",
            order_by: "created_at",
            order_direction: "desc",
        },
    },
    {
        label: "上架時間舊至新",
        value: {
            label: "上架時間舊至新",
            order_by: "created_at",
            order_direction: "asc",
        },
    },
    {
        label: "名稱A-Z",
        value: {
            label: "名稱A-Z",
            order_by: "name",
            order_direction: "desc",
        },
    },
    {
        label: "名稱Z-A",
        value: {
            label: "名稱Z-A",
            order_by: "name",
            order_direction: "asc",
        },
    },
    {
        label: "定價高到低",
        value: {
            label: "定價高到低",
            order_by: "price",
            order_direction: "desc",
        },
    },
    {
        label: "定價低到高",
        value: {
            label: "定價低到高",
            order_by: "price",
            order_direction: "asc",
        },
    },
]);

function sortChange() {
    getList({ per_page: pagination.value.pageSize, page: 1 });
}

const sidebar = ref<any>([]);
const sideBarRef = ref<any>(null);

const product_category_id = ref(route.query.tag);
/**
 * 取得商品分類
 */
async function getType() {
    try {
        const { data } = await $api().ProductTypeAPI();
        sidebar.value = [];

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
                url: {
                    name: "product-slug",
                    query: { category: item.id, tag: item.id },
                    params: { slug: `產品資訊-${item.name}` },
                },
                options: children,
            });
        });

        if (route.query.tag === route.query.category) {
            const children_id = rows.find((item: { id: any }) => item.id == route.query.category).children.map((child: { id: any }) => child.id);
            console.log(children_id);
            product_category_id.value = children_id.join();
        }
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
            is_compare: rows.is_compare,
            compare_id: rows.compare_id,
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

const sortBy = ref({
    label: "上架時間新至舊",
    order_by: "created_at",
    order_direction: "desc",
});

/**
 * 取得商品列表
 */
async function getList(params: { per_page: number; page: number }) {
    loading.value = true;
    loadingWaitPagination.value = true;
    try {
        params = { ...params };
        // 搜尋分類參數時 須帶上 搜尋模式 條件
        params["search_fields"] = "productCategories.product_category_id:in";
        // 搜尋分類參數 ("主鎖｜輔助鎖" 等等...)
        params["search_relations"] = "productCategories.product_category_id:" + product_category_id.value;
        params["order_by"] = sortBy.value.order_by;
        params["order_direction"] = sortBy.value.order_direction;
        const { data } = await $api().ProductListPaginateAPI<ProductListAPIInterface>(params);
        datas.value = [];
        console.log("home sample api => ", data.value);

        const rows = (data.value as any).data.rows;
        const meta = (data.value as any).data.meta;

        rows.forEach((item: ProductCarInterface) => {
            datas.value.push({
                id: item.id,
                model: item.model,
                name: item.name,
                shape: item.shape,
                price: item.price,
                market_price: item.market_price,
                is_favorite: item.is_favorite,
                main_image: item.main_image,
                tags: item.tags,
            });
        });

        pagination.value.total = meta.total;
        loading.value = false;
        setTimeout(() => {
            loadingWaitPagination.value = false;
        }, 20);
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
        loading.value = false;
        loadingWaitPagination.value = false;
    }
}

async function handleFavorite(id: any) {
    const params = { productId: id };
    const { data } = await $api().ProductFavoriteAPI(params);
    const message = (data.value as any).message;
    const is_favorite = datas.value.find((item) => item.id === id).is_favorite;
    const handleMessge = is_favorite ? "取消收藏" : "加入收藏";

    if (message === "請求成功") {
        ElMessage({
            type: "success",
            message: handleMessge,
        });
        datas.value.find((item) => item.id === id).is_favorite = !is_favorite;
    } else {
        ElMessage({
            type: "error",
            message: handleMessge + "失敗",
        });
    }
}

/**
 * 前往規格比較
 */
function goToCompare(data: any) {
    const setBreadcrumbs = [
        ...breadcrumbs.value,
        {
            name: "product-compare-slug",
            text: `${data.name}比較`,
            params: { slug: `${data.name}比較` },
            query: { compareId: data.compare_id },
        },
    ];
    $utils().saveBreadcrumbsData(JSON.stringify(setBreadcrumbs));
    router.push({ name: "product-compare-slug", params: { slug: `${data.name}比較` }, query: { compareId: data.compare_id } });
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
            console.log(sideBarRef.value.openSubMenu);
            sideBarRef.value.openSubMenu = Number(route.query.category);
        }
    });
});
</script>

<style lang="scss" scoped>
:deep .el-input {
    @apply relative flex flex-col justify-stretch flex-wrap mb-0 bg-transparent text-base;
    .el-input__wrapper {
        @apply shadow-none rounded-none p-1.5 bg-transparent text-[16px] #{!important};
        &.is-focus {
            @apply shadow-none #{!important};
        }
        .el-input__inner {
            @apply text-gray-800;

            &::placeholder {
                -webkit-text-fill-color: #ababac;
            }
        }
    }
    .el-select__caret.el-icon {
        @apply text-[16px] text-gray-800 #{!important};
    }
}
</style>
