<template>
    <section class="mt-[86px]">
        <nav class="border-t border-b border-gray-300 py-[16px] bg-white min-h-[43px] xl:min-h-[55px]">
            <div class="container">
                <Breadcrumb :menus="breadcrumbs" />
            </div>
        </nav>
        <div class="bg-gray-50">
            <div class="flex justify-center">
                <div class="container text-center">
                    <h1 class="text-[32px] font-medium YaleSolisW-Bd mt-[58px]">{{ route.params.slug }}</h1>
                    <p class="text-[16px] mt-[13px]">請選擇產品進行規格比較</p>
                    <div class="mt-[20px]">
                        <button
                            @click.prevent="goToDifference()"
                            class="btn-md"
                            :class="selectProducts.length === 0 ? 'gray-btn pointer-events-none cursor-not-allowed' : 'yellow-btn'"
                        >
                            <span v-if="selectProducts.length === 1">查看規格</span>
                            <span v-else-if="selectProducts.length > 1">規格比較</span>
                            <span v-else>選擇一個產品</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="container grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-4 sm:gap-x-[20px] gap-y-4 sm:gap-y-[40px] mt-[30px] pb-[100px]">
                <div
                    @click="selectProduct(item)"
                    v-for="(item, index) in datas"
                    :key="index"
                    class="bg-white p-4 sm:p-[30px] rounded-[16px] cursor-pointer outline -outline-offset-2 outline-2 duration-200 transition-all"
                    :class="[selectProducts.includes(item.id) ? 'outline-yellow-600' : 'outline-transparent', selectProducts.length === 3 && !selectProducts.includes(item.id) && !isMobile ? 'opacity-50 pointer-events-none cursor-not-allowed' : selectProducts.length === 2 && !selectProducts.includes(item.id) && isMobile ? 'opacity-50 pointer-events-none cursor-not-allowed' : '']"
                >
                    <NuxtImg
                        class="object-cover w-full rounded-2xl aspect-square"
                        :src="item.main_image"
                    />
                    <h5 class="text-[18px] YaleSolisW-Bd font-medium">{{ item.model }}</h5>
                    <p class="text-[14px] text-gray-800">{{ item.name }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
// 麵包屑組件
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
import { ProductCompareList, ProductListAPIInterface } from "~/interface/product.d";
import { useProductCompareStore } from "~/store/productCompareStore";

const { $api, $utils } = useNuxtApp();
const route = useRoute();
const router = useRouter();
const productCompareStore = useProductCompareStore();
const { isMobile } = useWindowResize();

const breadcrumbs = ref([]);
// 取得 storage 麵包屑參數值
if (process.client) {
    breadcrumbs.value = JSON.parse($utils().getBreadcrumbsData());
}

// 選中產品
const selectProducts = ref<string | number[]>([]);

// 斷斷是否可以選擇產品
const cnaSelected = ref(false);

/**
 * 選擇事件
 * @param { type String or Number(字串或數字) } val 選中地區值
 */
function selectProduct(val: { id: string | number; model: any; name: any; shape: any; price: any; market_price: any; main_image: any; attributes: any }) {
    productCompareStore.compareStoreReset();
    if (selectProducts.value.includes(val.id)) {
        // 將可選擇狀態改為 true
        cnaSelected.value = true;

        // 取得選擇區域 index索引位置
        const arrIndex = _FindIndex(selectProducts.value, function (item: any) {
            // 尋找與 val 相同位置的值
            return item == val.id;
        });
        console.log("arrIndex", arrIndex);
        // 刪除選中的地區值
        selectProducts.value.splice(arrIndex, 1);
    } else {
        // 如果選擇區域超過或等於3個時 直接回傳 不給選擇(手機版為2個)
        if(isMobile.value){
            if (selectProducts.value.length >= 2) {
                // 將可選擇狀態改為 false
                cnaSelected.value = false;
                return;
            }
        }else{
            if (selectProducts.value.length >= 3) {
                // 將可選擇狀態改為 false
                cnaSelected.value = false;
                return;
            }
        }
        // 新增選中的地區值
        selectProducts.value.push(val.id);
    }
    selectProducts.value.forEach((item: string | number, index: number) => {
        productCompareStore.compareStore[index] = datas.value.find((data) => data.id === item);
    });
}

// 商品列表
const datas = ref<ProductCompareList[]>([]);

/**
 * 取得商品列表
 */
async function getList(params: { product_type_id: string }) {
    try {
        productCompareStore.compareStoreReset();
        const { data } = await $api().ProductLisAPI<ProductListAPIInterface>(params);
        datas.value = [];

        const rows = (data.value as any).data;

        rows.forEach((item: { id: any; model: any; name: any; shape: any; price: any; market_price: any; main_image: any; attributes: any }) => {
            datas.value.push({
                id: item.id,
                model: item.model,
                name: item.name,
                main_image: item.main_image,
                attributes: item.attributes,
                shape: item.shape,
            });
        });

        if (route.query.productId) {
            selectProduct(datas.value.find((item) => item.id == route.query.productId));
        }
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

/**
 * 跳轉規格比較
 */
function goToDifference() {
    const setBreadcrumbs = [...breadcrumbs.value.slice(0, 4)];
    const comparisonText = breadcrumbs.value[3].text;
    const productName = comparisonText.replace("比較", "");
    setBreadcrumbs.push({
        name: "product-compare-slug",
        text: `${productName}規格比較`,
        params: { slug: `${productName}規格比較` },
        query: { compareId: route.query.compareId },
    });
    $utils().saveBreadcrumbsData(JSON.stringify(setBreadcrumbs));
    router.push({ 
        name: "product-compare-difference-slug",
        params: { slug: `${productName}規格比較` },
        query: { compareId: route.query.compareId }
    });
}

/**
 * 初始化
 */
async function init() {
    await getList({ product_type_id: route.query.compareId });
}

onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
            await init();
        }
    });
});
</script>
