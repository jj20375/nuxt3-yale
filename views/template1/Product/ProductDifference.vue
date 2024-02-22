<template>
    <section class="mt-[86px]">
        <nav class="border-t border-b border-gray-300 py-[16px] bg-white min-h-[43px] xl:min-h-[55px]">
            <div class="container">
                <Breadcrumb :menus="breadcrumbs" />
            </div>
        </nav>
        <div class="text-center bg-gray-50">
            <div class="container min-h-[200px] flex items-center">
                <div class="w-[164px]"></div>
                <h1 class="text-[32px] font-medium YaleSolisW-Bd flex-1">{{ route.params.slug }}</h1>
                <div class="flex items-center">
                    <div class="mr-[20px]">
                        <NuxtLink :to="{ name: 'product-compare-slug', params: { slug: '耶魯產品資訊-主鎖-主鎖比較' }, query: { compareId: route.query.compareId } }">
                            <button class="text-blue-500 underline underline-offset-2 hover:no-underline">重新選擇</button>
                        </NuxtLink>
                    </div>
                    <ul class="flex gap-4">
                        <li class="p-1 cursor-pointer">
                            <IconFacebook class="!w-[24px] !h-[24px] transition-all duration-300 hover:text-gray-400 hover:transition-all hover:duration-300" />
                        </li>
                        <li class="p-1 cursor-pointer">
                            <IconLine class="!w-[24px] !h-[24px] transition-all duration-300 hover:text-gray-400 hover:transition-all hover:duration-300" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="container">
            <ProductDifferenceContent
                :products="products"
                :columns="columns"
                :datas="datas"
                :shapeArr="shapeArr"
            />
        </div>
    </section>
</template>

<script lang="ts" setup>
// 麵包屑組件
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
// 產品比較內容頁
import ProductDifferenceContent from "~/views/template1/Product/components/ProductDifferenceContent.vue";
import { useProductCompareStore } from "~/store/productCompareStore";
import type { ProductListAPIInterface, ProductCompareList, ProductInterface } from "~/interface/product";
import IconLine from "assets/img/icons/medias/icon-black-3.svg";
import IconFacebook from "assets/img/icons/medias/icon-black-1.svg";

const { $api, $utils } = useNuxtApp();
const route = useRoute();
const productCompareStore = useProductCompareStore();

const compareStore = computed(() => {
    return JSON.stringify(productCompareStore.compareStore);
});

const breadcrumbs = ref([]);
// 取得 storage 麵包屑參數值
if (process.client) {
    breadcrumbs.value = JSON.parse($utils().getBreadcrumbsData());
}

const products = ref<any>([]);

watch(
    () => compareStore.value,
    (val) => {
        productsCompareData();
    }
);

/**
 * 取得商品列表
 */
const datas = ref<ProductCompareList[]>([]);
const shapeArr = ref<string | number[]>([]);
const attributes = ref<any>({});
const keys = ref<any>([]);
async function getList(params: { product_type_id: string }) {
    try {
        const { data } = await $api().ProductLisAPI<ProductListAPIInterface>(params);
        datas.value = [];

        const rows = (data.value as any).data;

        rows.forEach((item: { id: any; model: any; name: any; shape: any; main_image: any; attributes: any }) => {
            datas.value.push({
                id: item.id,
                model: item.model,
                name: item.name,
                shape: item.shape,
                main_image: item.main_image,
                attributes: item.attributes,
            });
        });
        shapeArr.value = rows.map((item: { shape: string }) => item.shape);

        if (rows[0]?.attributes) {
            keys.value = [];
            Object.keys(rows[0]?.attributes).forEach((item) => {
                keys.value.push(item);
            });
            const obj = {};
            keys.value.forEach((key: string | number) => {
                obj[key] = key;
            });
            attributes.value = obj;
        }
        await productsCompareData();
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

function productsCompareData() {
    products.value = [];
    if (productCompareStore.compareStore[0]?.attributes) {
        Object.keys(productCompareStore.compareStore[0]?.attributes).forEach((item) => {
            keys.value.push(item);
        });
    }
    productCompareStore.compareStore.forEach((item: { model: any; shape: any; main_image: any; attributes: { [x: string]: any } }) => {
        const obj = {};
        keys.value.forEach((key: string | number) => {
            obj[key] = item?.attributes[key];
        });
        products.value.push({
            id: item.id,
            name: item.name,
            style: item?.model,
            category: item?.shape,
            imgSrc: item?.main_image,
            ...obj,
        });
    });
}

productsCompareData();

const columns = computed(() => {
    return {
        style: "產品款式",
        category: "產品型號",
        imgSrc: "",
        ...attributes.value,
    };
});

/**
 * 初始化
 */
async function init() {
    await getList({ product_type_id: route.query.compareId });
}

onMounted(() => {
    nextTick(async () => {
        if (process.client) {
            await init();
        }
    });
});
</script>
