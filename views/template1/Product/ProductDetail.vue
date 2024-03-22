<template>
    <section class="mt-headerMb xl:mt-header mb-[80px]">
        <nav class="border-t border-b border-gray-300 py-[16px] bg-white min-h-[43px] xl:min-h-[55px]">
            <div class="container">
                <ClientOnly> <Breadcrumb :menus="breadcrumbs" /></ClientOnly>
            </div>
        </nav>
        <div
            class="md:mt-[60px]"
            :class="isLargePad && !isMobile ? 'container' : ''"
        >
            <div class="w-full xl:w-[950px] mx-auto">
                <div class="flex flex-col md:flex-row gap-[28px] md:gap-[60px] xl:gap-[120px]">
                    <ClientOnly>
                        <ProductDetailCarousel
                            ref="productDetailCarouselRef"
                            :photos="photos"
                        />
                    </ClientOnly>
                    <div
                        class="flex flex-col"
                        :class="isMobile ? 'container' : ''"
                    >
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
                                    <div class="relative favorite w-[30px] h-[30px] text-gray-300 cursor-pointer z-50 duration-300 transition-all">
                                        <div
                                            v-show="is_favorite"
                                            @click="handleDetailFavorite"
                                        >
                                            <NuxtImg
                                                class="absolute w-[30px] h-[30px] left-0 top-0 z-20"
                                                src="/img/icons/favorite-fill.svg"
                                            />
                                        </div>
                                        <div
                                            v-show="!is_favorite"
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
                        <h2 class="mt-[8px] text-[16px] YaleSolisW-Bd font-medium text-gray-400">{{ detailData.name }}</h2>
                        <div class="flex mt-[8px] gap-[12px]">
                            <p class="text-gray-500 text-[20px] font-light line-through">NT${{ $utils().formatCurrency(detailData.market_price) }}</p>
                            <p class="text-gray-800 text-[20px] font-medium YaleSolisW-Bd">NT${{ $utils().formatCurrency(detailData.price) }}</p>
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
                            <ul class="flex flex-wrap gap-[20px] mt-[12px]">
                                <li
                                    v-for="opt in item.options"
                                    :key="opt.id"
                                    class="cursor-pointer group w-[48px]"
                                    @click="optionChange(opt, index)"
                                >
                                    <div
                                        class="p-2 transition-all duration-300 border-2 border-transparent rounded-full"
                                        :class="currentColor[index] === opt.id ? 'border-yellow-600' : 'group-hover:border-gray-100'"
                                    >
                                        <NuxtImg
                                            class="w-[32px] aspect-square"
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
                            <div class="flex justify-center items-stretch w-full lg:w-[180px] border border-gray-300 rounded-full">
                                <button
                                    class="flex items-center justify-center flex-1 h-auto cursor-pointer disabled:cursor-not-allowed"
                                    :disabled="count <= 1"
                                    @click.prevent="countDelete()"
                                >
                                    <el-icon><Minus /></el-icon>
                                </button>
                                <div class="flex items-center justify-center w-[calc(100%-8rem)] lg:w-[80px] py-[10px] h-full">{{ count }}</div>
                                <button
                                    class="flex items-center justify-center flex-1 h-auto cursor-pointer disabled:cursor-not-allowed"
                                    :disabled="detailData.stock < count"
                                    @click.prevent="countAdd()"
                                >
                                    <el-icon><Plus /></el-icon>
                                </button>
                            </div>
                        </div>
                        <div
                            v-if="detailData.stock < count"
                            class="text-red-500"
                        >
                            庫存不足
                        </div>
                        <div class="flex flex-row xl:flex-col gap-[12px] my-[30px]">
                            <button
                                v-if="detailData.stock > 0"
                                class="w-full transparent-btn"
                                :disabled="detailData.stock === 0 || detailData.stock < count"
                                @click="addToShoppingCar(false)"
                            >
                                加入購物車
                            </button>
                            <button
                                v-else
                                class="w-full transparent-btn"
                                disabled
                            >
                                補貨中，貨到通知
                            </button>
                            <button
                                @click="goToShoppingCar"
                                :disabled="detailData.stock === 0 || detailData.stock < count"
                                class="w-full yellow-btn disabled:cursor-not-allowed disabled:bg-gray-100"
                            >
                                結帳
                            </button>
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
                                <li
                                    @click="socialShare('fb')"
                                    class="p-1 cursor-pointer"
                                >
                                    <IconFacebook class="!w-[20px] !h-[20px] transition-all duration-300 hover:text-gray-400 hover:transition-all hover:duration-300" />
                                </li>
                                <li
                                    @click="socialShare('line')"
                                    class="p-1 cursor-pointer"
                                >
                                    <IconLine class="!w-[20px] !h-[20px] transition-all duration-300 hover:text-gray-400 hover:transition-all hover:duration-300" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="mt-[40px] md:mt-[80px]"
                :class="isMobile ? 'container' : isLargePad ? '' : 'container'"
            >
                <ul class="flex justify-center border-b border-gray-200">
                    <li
                        @click="currentTab = index"
                        v-for="(tab, index) in tabs"
                        :key="index"
                        class="py-[12px] px-4 md:px-14 text-[16px] md:text-[20px] text-center cursor-pointer w-[50%] md:w-fit"
                        :class="currentTab === index ? 'border-b-[3px] border-gray-800 text-gray-800' : 'text-gray-400'"
                    >
                        {{ tab }}
                    </li>
                </ul>
                <div
                    v-if="currentTab === 0"
                    class="min-h-[500px] text-center flex items-center justify-center mt-[24px] md:mt-[60px]"
                >
                    <div
                        class="edit-section"
                        v-html="detailData.content"
                    ></div>
                </div>
                <div
                    v-if="currentTab === 1"
                    class="flex flex-col xl:grid grid-cols-2 gap-12 xl:gap-[80px] mt-[24px] md:mt-[60px]"
                >
                    <div>
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
                    <div v-if="detailData.documents.length > 0">
                        <h5 class="text-[18px] font-medium YaleSolisW-Bd text-gray-800 mb-[20px]">檔案下載</h5>
                        <div
                            class="block mb-2 cursor-pointer w-fit group"
                            @click.prevent="downloadFile(item)"
                            v-for="(item, index) in detailData.documents"
                            :key="index"
                        >
                            <div class="flex items-center gap-2 underline underline-offset-2 group-hover:no-underline">
                                <el-icon><Document /></el-icon>
                                {{ item.name }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="container mt-[40px] md:mt-[80px]"
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
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";
import IconFacebook from "~/assets/img/icons/medias/icon-black-1.svg";
import IconLine from "~/assets/img/icons/medias/icon-black-3.svg";
// 麵包屑組件
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
// 產品描述 幻燈片
import ProductDetailCarousel from "~/views/template1/Product/components/ProductDetailCarousel.vue";
// 相關產品幻燈片
import ProductSameCarousel from "~/views/template1/Product/components/ProductSameCarousel.vue";
import AddToShoppingCarDialog from "~/views/template1/components/AddToShoppingCarDialog.vue";

/**
 * ProductListAPIInterface: 產品分頁 api 回應值
 * ProductList: 產品分頁列表內容
 * ProductCarInterface: 產品卡片樣式參數
 */
import { ProductCarInterface } from "~/interface/product.d";

import { useUserStore } from "~/store/userStore";
import { useShoppingCarStore } from "~/store/shoppingCarStore";
import { ShoppingCarInterface } from "~/interface/shoppingCar";

interface ImageItem {
    id: string | number;
    imgSrc: string;
}

interface ProductionOption {
    name: string;
    options: {
        id: number;
        text: string;
        imgSrc: string;
    }[];
}
import { useInitializationStore } from "~/store/initializationStore";

const initializationStore = useInitializationStore();

const { $api, $utils } = useNuxtApp();
const { isLargePad, isMobile } = useWindowResize();

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const { isAuth } = storeToRefs(userStore);

const shoppingCarStore = useShoppingCarStore();

const productDetailCarouselRef = ref<any>(null);

// 預設選中顏色
const currentColor = ref<any>([]);
// 顏色名稱
const colorName = ref("");
// 詳細介紹 產品規格 tab
const tabs = ["詳細介紹", "產品規格"];
// 折扣文案
const salesDetail = ref(["[活動] 滿 NT$1,700 折 NT$560", "[活動] 歡慶十週年，滿 NT$1,700 打 8 折", "[活動] 全站滿千免運"]);
// 數量
const count = ref(1);
// 判斷是否顯示彈窗
const showDialog = ref(false);
// 預設選中 tab
const currentTab = ref(0);

const { data: resProductDetail }: any = await $api().ProductDetailAPI({ productId: route.params.id });

// 詳細資訊 api 回傳
const productDetail = computed(() => {
    console.log("resProductDetail", resProductDetail);
    return resProductDetail ? resProductDetail : {};
});
// 商品資訊
const detailData = computed(() => {
    const product = productDetail.value;
    const result = {
        product_id: product.id,
        model: product.model,
        name: product.name,
        description: product.description,
        content: product.content,
        attributes: product.attributes,
        documents: product.documents,
        product_type_id: product.product_type_id,
        is_favorite: product.is_favorite,
        tags: product.tags,
        is_single_variation: product.is_single_variation,
        productVariations: product.productVariations,
        productOptions: product.productOptions,
        price: product.price,
        market_price: product.market_price,
        stock: product.stock,
        breadcrumbs: product.breadcrumbs,
    };
    if (product.is_single_variation === 1) {
        // 只有一個產品選擇
        return result;
    } else {
        // 有多個產品選擇
        let key = "option";
        currentColor.value.forEach((item: string) => {
            key += `-${item}`;
        });

        return {
            ...result,
            price: product.productVariations[key]?.price,
            market_price: product.productVariations[key]?.marketPrice,
            stock: product.productVariations[key]?.stock,
        };
    }
});
// 圖片
const photos: ComputedRef<ImageItem[]> = computed(() => {
    const product = productDetail.value;
    const result = [{ id: 0, imgSrc: product.main_image }];
    product.other_images.forEach((item: any, index: number) => {
        result.push({ id: index + 1, imgSrc: item });
    });
    return result;
});
// 顏色選項
const productOptions = computed(() => {
    const result: ProductionOption[] = [];
    const product = productDetail.value;
    if (product.is_single_variation === 0) {
        product.productOptions.forEach((item: { values: any[]; name: any }, index: number) => {
            const option: {
                id: any;
                text: any;
                imgSrc: string;
            }[] = [];
            item.values.forEach((opt: { id: number; name: string; icon: string }) => {
                option.push({
                    id: opt.id,
                    text: opt.name,
                    imgSrc: opt.icon,
                });
            });
            result.push({
                name: item.name,
                options: option,
            });
        });
    }
    return result;
});
// breadcrumbs
const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁",
    },
]);
// 相關商品列表
const sameProducts = ref<any>([]);

/**
 * 取得商品分類
 */
async function getType() {
    const { data }: any = await $api().ProductTypeAPI();

    const category = data.value.data.find((item: any) => item.id === detailData.value.product_type_id);
}

/**
 * 取得商品分類詳情
 */
const getData = async () => {
    const product = detailData.value;
    is_favorite.value = product.is_favorite;

    if (product.breadcrumbs[0] && product.breadcrumbs[1]) {
        breadcrumbs.value.push({
            name: "product-slug-category-tag",
            text: product.breadcrumbs[0].name,
            params: { slug: `產品資訊-${product.breadcrumbs[0].name}`, category: product.breadcrumbs[0].id, tag: product.breadcrumbs[1].id },
        });
        breadcrumbs.value.push({
            name: "product-slug-category-tag",
            text: product.breadcrumbs[1].name,
            params: { slug: `產品資訊-${product.breadcrumbs[1].name}`, category: product.breadcrumbs[0].id, tag: product.breadcrumbs[1].id },
        });
    }
    breadcrumbs.value.push({
        name: "product-detail-slug-id",
        text: detailData.value.name,
        params: { slug: `${detailData.value.name}`, id: detailData.value.product_id },
    });

    if (productDetail.value.productRelations) {
        sameProducts.value = productDetail.value.productRelations.map((item: ProductCarInterface) => {
            return {
                id: item.id,
                model: item.model,
                name: item.name,
                shape: item.shape,
                price: item.price,
                market_price: item.market_price,
                main_image: item.main_image,
                is_favorite: item.is_favorite,
                tags: item.tags,
            };
        });
    }

    // 產品規格可多選，設定預設值
    if (product.is_single_variation === 0) {
        product.productOptions.forEach((item: any, idx: number) => {
            currentColor.value[idx] = item.values[0].id;
        });
        optionChangePrice(true);
        optionChange(productOptions.value[0].options[0], 0);
    }

    console.log("productDetail.value =>", productDetail.value);

    if (productDetail.value) {
        console.log("productDetail.value.seoSetting.title", productDetail.value.seoSetting.title);
        useSeoMeta({
            title: productDetail.value.seoSetting.title ? productDetail.value.seoSetting.title : initializationStore.initializationData.site.meta_title,
            description: productDetail.value.seoSetting.description ? productDetail.value.seoSetting.description : initializationStore.initializationData.site.meta_description,
            ogTitle: productDetail.value.seoSetting.title,
            ogDescription: productDetail.value.seoSetting.description,
            ogUrl: () => `${window.location.origin}/product/detail/${productDetail.value.seoSetting.custom_url}`,
            keywords: productDetail.value.seoSetting.keywords.join(),
        });
    }
};

// 切換商品選擇
const optionChange = (opt: { id: any; text: string }, index: number) => {
    currentColor.value[index] = opt.id;
    colorName.value = opt.text;
    optionChangePrice();
};
const currentImage = computed(() => {
    let key = "option";
    currentColor.value.forEach((item: string) => {
        key += `-${item}`;
    });
    if (currentColor.value.length > 0) {
        const index = photos.value.findIndex((item) => item.imgSrc === detailData.value.productVariations[key].image);
        return index > -1 ? photos.value[index].imgSrc : photos.value[0].imgSrc;
    }
    return photos.value[0].imgSrc;
});

const currentItem = computed(() => {
    let key = "option";
    currentColor.value.forEach((item: string) => {
        key += `-${item}`;
    });
    return currentColor.value.length > 0 ? detailData.value.productVariations[key] : null;
});

// 切換選項變更圖片
const optionChangePrice = (init: boolean = false) => {
    let key = "option";
    currentColor.value.forEach((item: string) => {
        key += `-${item}`;
    });

    if (!init) {
        const index = photos.value.findIndex((item) => item.imgSrc === currentImage.value);

        if (process.client && productDetailCarouselRef.value) {
            productDetailCarouselRef.value.slideTo(index + 1);
        }
    }
};

// 點擊刪除數量按鈕
const countDelete = () => {
    if (count.value <= 1) {
        count.value = 1;
        return;
    }
    count.value--;
};

// 點擊增加數量按鈕
const countAdd = () => {
    if (count.value > detailData.value.stock) {
        count.value = detailData.value.stock;
        return;
    }
    count.value++;
};

// 下載檔案
const downloadFile = (file: { url: string | URL | undefined }) => {
    window.open(file.url, "_blank");
};

/**
 * 加入購物車
 * @param isGoToShoppingCarPage 判斷是點選結帳按鈕 不跳 alert 錯誤
 */
const addToShoppingCar = (isGoToShoppingCarPage: boolean = false) => {
    const input: ShoppingCarInterface = {
        id: detailData.value.product_id,
        productID: detailData.value.product_id,
        name: detailData.value.name,
        imgSrc: currentImage.value,
        count: count.value,
        price: detailData.value.price,
        totalPrice: Number(detailData.value.price) * count.value,
        product_variationable_id: currentItem.value ? currentItem.value.id : undefined,
        colorName: colorName.value ? colorName.value : undefined,
        stock: detailData.value.stock,
    };
    console.log("isGoToShoppingCarPage =>", isGoToShoppingCarPage);
    shoppingCarStore
        .addToCart(input)
        .then(() => {
            showDialog.value = true;
        })
        .catch((err) => {
            console.log("err", err, isGoToShoppingCarPage);
            if (err) {
                if (isGoToShoppingCarPage) {
                    return;
                }
                ElMessage({
                    type: "error",
                    message: err,
                });
                return;
            }
        });
};

/**
 * 導頁至購物車
 */
function goToShoppingCar() {
    addToShoppingCar(true);
    router.push({
        name: "shopping-car-slug",
        params: { slug: "一般商品購物車" },
        query: {
            tab: "type1",
        },
    });
}

const is_favorite = ref(false);
/**
 * 加入收藏
 */
const handleDetailFavorite = async () => {
    if (isAuth.value) {
        try {
            const params = { productId: detailData.value.product_id };
            const { data } = await $api().ProductFavoriteAPI(params);
            const message = (data.value as any).message;
            const handleMessge = is_favorite.value ? "取消收藏" : "加入收藏";
            if (message === "請求成功") {
                ElMessage({
                    type: "success",
                    message: handleMessge,
                });
                is_favorite.value = !is_favorite.value;
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
        ElMessage({
            type: "error",
            message: "請先登入或註冊新帳號以便管理您的收藏！",
        });
    }
};

const handleFavorite = async (id: any) => {
    const params = { productId: id };
    const { data } = await $api().ProductFavoriteAPI(params);
    const message = (data.value as any).message;
    const item = sameProducts.value.find((item: ProductCarInterface) => item.id === id);
    const is_favorite = item?.is_favorite ? item?.is_favorite : false;
    const handleMessge = is_favorite ? "取消收藏" : "加入收藏";

    if (message === "請求成功" && item) {
        item.is_favorite = !is_favorite;
    } else {
        ElMessage({
            type: "error",
            message: handleMessge + "失敗",
        });
    }
};

/**
 * 前往規格比較
 */
const goToCompare = (data: any) => {
    router.push({ name: "product-compare-slug", params: { slug: breadcrumbs.value[2].text + "比較" }, query: { compareId: data.product_type_id, productId: data.product_id } });
};

// 分享
function socialShare(type: string) {
    if (type === "line") {
        let path = window.location.origin + encodeURIComponent(route.path);
        const url = "https://social-plugins.line.me/lineit/share?url=" + path;

        $utils().openNewWindow(url);
    }
    if (type === "fb") {
        console.log("route.params =>", route.params);
        let path = window.location.origin + encodeURIComponent(route.path);
        const url = "https://www.facebook.com/sharer/sharer.php?u=" + path;

        $utils().openNewWindow(url);
    }
}

onMounted(async () => {
    await getData();
    await getType();
});
</script>
