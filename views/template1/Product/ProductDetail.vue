<template>
    <section class="mt-[86px] mb-[80px]">
        <nav class="border-t border-b border-gray-300 py-[16px] bg-white min-h-[55px]">
            <div class="container">
                <Breadcrumb :menus="breadcrumbs" />
            </div>
        </nav>
        <div class="mt-[60px]">
            <div class="max-w-[950px] mx-auto">
                <div class="flex gap-[120px]">
                    <ProductDetailCarousel
                        ref="productDetailCarouselRef"
                        :photos="photos"
                    />
                    <div class="flex flex-col">
                        <div class="flex gap-2 mb-4">
                            <div
                                v-if="detailData.tags?.includes('new')"
                                class="bg-yellow-500 text-[12px] px-2 py-1 rounded-md"
                            >
                                NEW
                            </div>
                            <div
                                v-if="detailData.tags?.includes('discount')"
                                class="bg-pink-400 text-[12px] px-2 py-1 rounded-md"
                            >
                                SALE
                            </div>
                        </div>
                        <div class="flex justify-between gap-4">
                            <div>
                                <h1 class="text-[24px] font-medium text-gray-800 YaleSolisW-Bd">{{ detailData.model }}</h1>
                            </div>
                            <div class="whitespace-nowrap">
                                <div class="flex items-center gap-6">
                                    <NuxtLink @click="goToCompare(detailData)">
                                        <div class="underline cursor-pointer underline-offset-2 hover:no-underline">規格比較</div>
                                    </NuxtLink>
                                    <div
                                        class="relative favorite w-[30px] h-[30px] text-gray-300 cursor-pointer z-50 duration-300 transition-all"
                                        @click="handleFavorite"
                                    >
                                        <div
                                            v-show="detailData.is_favorite"
                                            @click="handleDetailFavorite"
                                        >
                                            <NuxtImg
                                                class="absolute w-[30px] h-[30px] left-0 top-0 z-20"
                                                src="/img/icons/favorite-fill.svg"
                                            />
                                        </div>
                                        <div
                                            v-show="!detailData.is_favorite"
                                            @click="handleDetailFavorite"
                                        >
                                            <NuxtImg
                                                class="absolute w-[30px] h-[30px] left-0 top-0 z-20"
                                                src="/img/icons/favorite-hollow.svg"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h2 class="mt-[8px] text-[16px] font-medium text-gray-400">{{ detailData.name }}</h2>
                        <div class="flex mt-[8px]">
                            <p class="text-gray-800 text-[20px] font-medium mr-[12px] YaleSolisW-Bd">NT${{ $utils().formatCurrency(detailData.price) }}</p>
                            <p class="text-gray-500 text-[20px] font-light line-through">NT${{ $utils().formatCurrency(detailData.market_price) }}</p>
                        </div>
                        <div class="mt-[16px] text-gray-900 list-disc list-inside text-[16px] mb-1">
                            {{ detailData.description }}
                        </div>
                        <div
                            v-for="(item, index) in productOptions"
                            :key="index"
                            class="mt-[30px]"
                        >
                            <h5 class="text-[16px] font-medium text-gray-800 YaleSolisW-Bd">{{ item.name }}</h5>
                            <ul class="flex gap-[20px] mt-[12px]">
                                <li
                                    v-for="opt in item.options"
                                    :key="opt.id"
                                    class="cursor-pointer group"
                                    @click="optionChange(opt, index)"
                                >
                                    <div
                                        class="p-2 transition-all duration-300 border-2 border-transparent rounded-full"
                                        :class="currentColor[index] === opt.id ? 'border-yellow-600' : 'group-hover:border-gray-100'"
                                    >
                                        <NuxtImg
                                            class="w-[32px]"
                                            :src="opt.imgSrc"
                                        />
                                    </div>
                                    <p
                                        class="text-[14px] text-center text-gray-800 px-2 pt-[8px] opacity-0 group-hover:opacity-100 duration-300 transition-all"
                                        :class="currentColor[index] === opt.id ? 'opacity-100' : ''"
                                    >
                                        {{ opt.text }}
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div class="mt-[30px]">
                            <h5 class="text-[16px] font-medium text-gray-800 mb-[20px] YaleSolisW-Bd">數量</h5>
                            <div class="flex justify-center items-stretch w-[180px] border border-gray-300 rounded-full">
                                <button
                                    class="flex items-center justify-center flex-1 h-auto cursor-pointer"
                                    @click.prevent="countDelete()"
                                >
                                    <el-icon><Minus /></el-icon>
                                </button>
                                <div class="flex items-center justify-center w-[80px] py-[10px] h-full">{{ count }}</div>
                                <button
                                    class="flex items-center justify-center flex-1 h-auto cursor-pointer"
                                    @click.prevent="countAdd()"
                                >
                                    <el-icon><Plus /></el-icon>
                                </button>
                            </div>
                        </div>
                        <div class="my-[30px]">
                            <button
                                class="w-full transparent-btn"
                                @click="addToShoppingCar(product)"
                            >
                                加入購物車
                            </button>
                            <div class="mt-[12px]">
                                <button class="w-full yellow-btn">結帳</button>
                            </div>
                        </div>
                        <div class="bg-gray-50 p-[30px] w-full rounded-xl mb-[20px]">
                            <ul class="text-[16px]">
                                <li
                                    class="mb-[6px]"
                                    v-for="(sale, index) in salesDetail"
                                    :key="index"
                                >
                                    {{ sale }}
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul class="flex gap-4">
                                <li @click="socialShare('fb')" class="p-1 cursor-pointer">
                                    <IconFacebook class="!w-[20px] !h-[20px] transition-all duration-300 hover:text-gray-400 hover:transition-all hover:duration-300" />
                                </li>
                                <li @click="socialShare('line')" class="p-1 cursor-pointer">
                                    <IconLine class="!w-[20px] !h-[20px] transition-all duration-300 hover:text-gray-400 hover:transition-all hover:duration-300" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-[80px] container">
                <ul class="flex justify-center border-b border-gray-200">
                    <li
                        @click="currentTab = index"
                        v-for="(tab, index) in tabs"
                        :key="index"
                        class="py-[12px] w-[200px] text-[20px] text-center cursor-pointer"
                        :class="currentTab === index ? 'border-b-[3px] border-gray-800 text-gray-800' : 'text-gray-400'"
                    >
                        {{ tab }}
                    </li>
                </ul>
                <div
                    v-if="currentTab === 0"
                    class="min-h-[500px] text-center flex items-center justify-center flex mt-[60px]"
                >
                    <div v-html="detailData.content"></div>
                </div>
                <div
                    v-if="currentTab === 1"
                    class="min-h-[500px] flex mt-[60px]"
                >
                    <div class="flex-1 mr-[80px]">
                        <h5 class="text-[18px] font-medium YaleSolisW-Bd text-gray-800 mb-[20px]">產品規格內容</h5>
                        <div
                            v-for="(attr, key) in detailData.attributes"
                            :key="key"
                            class="flex border-b border-gray-100 text-[15px] py-[8px]"
                        >
                            <div class="flex-1">{{ key }}</div>
                            <div class="flex-1">{{ attr }}</div>
                        </div>
                    </div>
                    <div class="flex-1">
                        <h5 class="text-[18px] font-medium YaleSolisW-Bd text-gray-800 mb-[20px]">檔案下載</h5>
                        <div
                            class="cursor-pointer"
                            @click.prevent="downloadFile(item)"
                            v-for="(item, index) in detailData.documents"
                            :key="index"
                        >
                            <el-icon><Document /></el-icon>
                            {{ item.name }}
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="container mt-[80px]"
                v-if="sameProducts.length > 0"
            >
                <h3 class="text-[32px] YaleSolisW-Bd font-medium text-gray-800 text-center">相關產品</h3>
                <ProductSameCarousel
                    :photos="sameProducts"
                    :breadcrumbs="breadcrumbs"
                    @handleFavorite="handleFavorite"
                />
            </div>
        </div>
        <AddToShoppingCarDialog v-model:showDialog="showDialog" />
    </section>
</template>

<script setup lang="ts">
import IconFacebook from "~/assets/img/icons/medias/icon-black-1.svg";
import IconLine from "~/assets/img/icons/medias/icon-black-3.svg";
// 麵包屑組件
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
// 產品描述 幻燈片
import ProductDetailCarousel from "~/views/template1/Product/components/ProductDetailCarousel.vue";
// 相關產品幻燈片
import ProductSameCarousel from "~/views/template1/Product/components/ProductSameCarousel.vue";
/**
 * ProductListAPIInterface: 產品分頁 api 回應值
 * ProductList: 產品分頁列表內容
 * ProductCarInterface: 產品卡片樣式參數
 */
import { ProductListAPIInterface, ProductList, ProductCarInterface } from "~/interface/product.d";
import AddToShoppingCarDialog from "~/views/template1/components/AddToShoppingCarDialog.vue";

import { useUserStore } from "~/store/userStore";
import { storeToRefs } from "pinia";
const userStore = useUserStore();
const { isAuth } = storeToRefs(userStore);

import { ElMessage } from "element-plus";

const { $api, $utils, $shoppingCarService } = useNuxtApp();
const route = useRoute();
const router = useRouter();

const breadcrumbs = ref<any>([]);
// 取得 storage 麵包屑參數值
if (process.client) {
    breadcrumbs.value = JSON.parse($utils().getBreadcrumbsData());
}

const photos = ref<{ id: string | number; imgSrc: string }[]>([]);
const detailData = ref<any>({});
// 相關商品列表
const sameProducts = ref<ProductList[]>([]);

const productOptions = ref<any>([]);
// 預設選中顏色
const currentColor = ref<any>([]);

function optionChange(opt: { id: any }, index: number) {
    currentColor.value[index] = opt.id;
    optionChangePrice();
}

const productDetailCarouselRef = ref<any>(null);

function optionChangePrice(init: boolean = false) {
    let key = "option";
    currentColor.value.forEach((item: string) => {
        key += `-${item}`;
    });
    detailData.value.price = detailData.value.productVariations[key].price;
    detailData.value.market_price = detailData.value.productVariations[key].marketPrice;
    detailData.value.stock = detailData.value.productVariations[key].stock;
    if (!init) {
        if (detailData.value.productVariations[key].image) {
            const index = photos.value.findIndex((item) => item.imgSrc === detailData.value.productVariations[key].image);
            console.log(index, detailData.value.productVariations[key].image);
            productDetailCarouselRef.value.slideTo(index + 1);
        }
    }
}

// 折扣文案
const salesDetail = ref(["[活動] 滿 NT$1,700 折 NT$560", "[活動] 歡慶十週年，滿 NT$1,700 打 8 折", "[活動] 全站滿千免運"]);

// 數量
const count = ref(1);

/**
 * 點擊刪除數量按鈕
 */
function countDelete() {
    if (count.value <= 1) {
        count.value = 1;
        return;
    }
    count.value--;
}
/**
 * 點擊增加數量按鈕
 */
function countAdd() {
    if (count.value >= detailData.value.stock) {
        count.value = detailData.value.stock;
        return;
    }
    count.value++;
}

/**
 * 詳細介紹 產品規格 tab
 */
const tabs = ["詳細介紹", "產品規格"];
/**
 * 預設選中 tab
 */
const currentTab = ref(0);

/**
 * 取得商品分類詳情
 */
async function getData() {
    try {
        const params = { productId: route.query.id };
        const { data } = await $api().ProductDetailAPI(params);

        const rows = (data.value as any).data;

        photos.value = [];
        photos.value.push({ id: 0, imgSrc: rows.main_image });
        rows.other_images.forEach((item: any, index: number) => {
            photos.value.push({ id: index + 1, imgSrc: item });
        });
        detailData.value.product_id = rows.id;
        detailData.value.model = rows.model;
        detailData.value.name = rows.name;
        detailData.value.description = rows.description;
        detailData.value.content = rows.content;
        detailData.value.attributes = rows.attributes;
        detailData.value.documents = rows.documents;
        detailData.value.product_type_id = rows.product_type_id;
        detailData.value.is_favorite = rows.is_favorite;
        detailData.value.tags = rows.tags;

        sameProducts.value = [];

        console.log(detailData.value.productRelations);
        rows.productRelations.forEach((item: ProductCarInterface) => {
            sameProducts.value.push({
                id: item.id,
                model: item.model,
                name: item.name,
                shape: item.shape,
                price: item.price,
                market_price: item.market_price,
                main_image: item.main_image,
                is_favorite: item.is_favorite,
                tags: item.tags,
            });
        });

        if (!breadcrumbs.value.map((item: any) => item.text).includes(rows.model)) {
            breadcrumbs.value.push({
                name: route.name,
                text: rows.model,
                params: { slug: `${rows.model}-${rows.name}` },
                query: { id: route.query.id },
            });
        }

        if (rows.is_single_variation === 0) {
            productOptions.value = [];
            detailData.value.productVariations = rows.productVariations;
            rows.productOptions.forEach((item: { values: any[]; name: any }, index: number) => {
                const option: {
                    id: any;
                    text: any;
                    imgSrc: string;
                }[] = [];
                currentColor.value[index] = item.values[0].id;
                item.values.forEach((opt: { id: any; name: any; icon: any }) => {
                    option.push({
                        id: opt.id,
                        text: opt.name,
                        imgSrc: opt.icon,
                    });
                });
                productOptions.value.push({
                    name: item.name,
                    options: option,
                });
            });
            optionChangePrice(true);
        } else {
            detailData.value.price = rows.price;
            detailData.value.market_price = rows.market_price;
            detailData.value.stock = rows.stock;
        }
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

// 下載檔案
function downloadFile(file: { url: string | URL | undefined }) {
    console.log(file);
    window.open(file.url, "_blank");
}

// 判斷是否顯示彈窗
const showDialog = ref(false);

/**
 * 加入購物車
 */
function addToShoppingCar(data: any) {
    showDialog.value = true;
    console.log("addToShoppingCar => ", data);
    if (process.client) {
        $shoppingCarService().addToShoppingCar({ ...data, mark: "YDM 4109A", name: "指紋密碼鑰匙三合一", color: "黑色", imgSrc: "/img/home/product/product1.jpg", count: 1, singlePrice: 1760 });
    }
}

/**
 * 加入收藏
 */
async function handleDetailFavorite() {
    if (isAuth.value) {
        try {
            const params = { productId: detailData.value.product_id };
            const { data } = await $api().ProductFavoriteAPI(params);
            const message = (data.value as any).message;
            const handleMessge = detailData.value.is_favorite ? "取消收藏" : "加入收藏";
            if (message === "請求成功") {
                ElMessage({
                    type: "success",
                    message: handleMessge,
                });
                detailData.value.is_favorite = !detailData.value.is_favorite;
            } else {
                ElMessage({
                    type: "error",
                    message: handleMessge + "失敗",
                });
            }
        } catch (err) {
            ElMessage({
                type: "error",
                message: "加入失敗",
            });
        }
    } else {
        alert("請先登入或註冊新帳號以便管理您的收藏！");
    }
}

async function handleFavorite(id: any) {
    const params = { productId: id };
    const { data } = await $api().ProductFavoriteAPI(params);
    const message = (data.value as any).message;
    const is_favorite = sameProducts.value.find((item) => item.id === id).is_favorite;
    const handleMessge = is_favorite ? "取消收藏" : "加入收藏";

    if (message === "請求成功") {
        sameProducts.value.find((item) => item.id === id).is_favorite = !is_favorite;
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
    const setBreadcrumbs: any = [...breadcrumbs.value.slice(0, 3)];
    setBreadcrumbs.push({
        name: "product-compare-slug",
        text: `${breadcrumbs.value[2].text}比較`,
        params: { slug: `${breadcrumbs.value[2].text}比較` },
        query: { compareId: data.product_type_id, productId: data.product_id },
    });

    $utils().saveBreadcrumbsData(JSON.stringify(setBreadcrumbs));
    router.push({ name: "product-compare-slug", params: { slug: `${breadcrumbs.value[2].text}比較` }, query: { compareId: data.product_type_id, productId: data.product_id } });
}

// 分享
function socialShare (type:string) {
    if (type === 'line') {
        let path =  window.location.origin + encodeURIComponent(route.path) + '?'
        Object.keys(route.query).forEach(key => {
            path  = path + `${key}=${route.query[key]}`
        })
        const url = 'https://social-plugins.line.me/lineit/share?url=' + path

        $utils().openNewWindow(url)
    }
    if (type === 'fb') {
        let path =  window.location.origin + encodeURIComponent(route.path) + '?'
        Object.keys(route.query).forEach(key => {
            path  = path + `${key}=${route.query[key]}`
        })
        const url = 'https://www.facebook.com/sharer/sharer.php?u=' + path

        $utils().openNewWindow(url)
    }
}

/**
 * 初始化
 */
async function init() {
    await getData();
}

onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
            await init();
        }
    });
});
</script>

<style>
.product-card:hover {
    .favorite {
        @apply opacity-100 duration-300 transition-all;
    }
}
</style>
