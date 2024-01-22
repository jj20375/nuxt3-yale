<template>
    <section class="min-h-screen mt-[94px] mb-[100px]">
        <nav class="border-t border-b border-gray-300 py-[16px] pl-[122px]">
            <Breadcrumb :menus="breadcrumbs" />
        </nav>
        <div class="container mt-[60px]">
            <div class="grid grid-cols-3">
                <ProductDetailCarousel
                    ref="productDetailCarouselRef"
                    class="pr-[72px] col-span-2"
                    :photos="photos"
                />
                <div class="col-span-1">
                    <h1 class="text-[24px] font-medium text-gray-800 YaleSolisW-Bd">{{ detailData.model }}</h1>
                    <h2 class="mt-[8px] text-[16px] font-medium text-gray-300">{{ detailData.name }}</h2>
                    <div class="flex mt-[8px]">
                        <p class="text-gray-800 text-[20px] font-medium mr-[12px] YaleSolisW-Bd">NT${{ $utils().formatCurrency(detailData.price) }}</p>
                        <p class="text-gray-500 text-[20px] font-light line-through">NT${{ $utils().formatCurrency(detailData.market_price) }}</p>
                    </div>
                    <div class="mt-[16px] text-gray-900 list-disc list-inside text-[16px] mb-1">
                        {{ detailData.description }}
                    </div>
                    <div class="py-[30px] flex items-center">
                        <NuxtLink :to="{ name: 'product-compare-slug', params: { slug: '主鎖比較' }, query: { compareId: detailData.product_type_id, productId: detailData.product_id } }">
                            <div class="mr-[20px] cursor-pointer">規格比較</div>
                        </NuxtLink>
                        <font-awesome-icon
                            class="text-gray-300 text-[20px]"
                            :icon="['far', 'heart']"
                        />
                    </div>
                    <div
                        v-for="(item, index) in productOptions"
                        :key="index"
                    >
                        <h5 class="text-[16px] font-medium text-gray-800 YaleSolisW-Bd">{{ item.name }}</h5>
                        <ul class="flex mt-[20px]">
                            <li
                                v-for="opt in item.options"
                                :key="opt.id"
                                class="mr-[20px] cursor-pointer"
                                @click="optionChange(opt, index)"
                            >
                                <div
                                    class="p-2"
                                    :class="currentColor[index] === opt.id ? 'border border-yellow-600  rounded-full' : ''"
                                >
                                    <NuxtImg
                                        class="w-[32px]"
                                        :src="opt.imgSrc"
                                    />
                                </div>
                                <p
                                    v-if="currentColor[index] === opt.id"
                                    class="text-[14px] text-gray-800 px-2 pt-[8px]"
                                >
                                    {{ opt.text }}
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div class="mt-[30px]">
                        <h5 class="text-[16px] font-medium text-gray-800 mb-[20px] YaleSolisW-Bd">數量</h5>
                        <div class="flex justify-center items-center w-[188px] border border-gray-300 px-[2px] py-[10px] rounded-full">
                            <div
                                class="cursor-pointer"
                                @click="countDelete()"
                            >
                                <el-icon><Minus /></el-icon>
                            </div>
                            <div class="w-[88px] h-[28px] text-center">{{ count }}</div>
                            <div
                                class="cursor-pointer"
                                @click="countAdd()"
                            >
                                <el-icon><Plus /></el-icon>
                            </div>
                        </div>
                    </div>
                    <div class="my-[30px]">
                        <button class="max-w-[387px] w-full text-center py-[11px] border border-gray-600 transition-all duration-500 hover:text-white hover:bg-black rounded-full">加入購物車</button>
                        <div class="mt-[12px]">
                            <button class="max-w-[387px] w-full text-center py-[11px] bg-yellow-500 hover:bg-yellow-600 transition-all duration-500 rounded-full">結帳</button>
                        </div>
                    </div>
                    <div class="bg-gray-50 p-[30px] max-w-[387px] rounded-xl mb-[20px]">
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
                        <ul class="flex">
                            <li class="mr-[16px]">
                                <NuxtImg
                                    class="w-[20px]"
                                    src="/img/icons/medias/icon-black-1.svg"
                                />
                            </li>
                            <li>
                                <NuxtImg
                                    class="w-[20px]"
                                    src="/img/icons/medias/icon-black-3.svg"
                                />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="mt-[80px]">
                <ul class="flex justify-center">
                    <li
                        @click="currentTab = index"
                        v-for="(tab, index) in tabs"
                        :key="index"
                        class="py-[8px] w-[200px] text-[20px] text-center cursor-pointer"
                        :class="currentTab === index ? 'border-b-2 border-gray-800 text-gray-800' : 'text-gray-400'"
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
                        <div class="cursor-pointer" @click.prevent="downloadFile(item)" v-for="(item, index) in detailData.documents" :key="index">
                            <el-icon><Document /></el-icon>
                            {{ item.name }}
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div>
                <h3 class="text-[32px] YaleSolisW-Bd font-medium text-gray-800 text-center">相關產品</h3>
                <ProductSameCarousel :photos="photos" />
            </div> -->
        </div>
    </section>
</template>

<script setup lang="ts">
// 麵包屑組件
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
// 產品描述 幻燈片
import ProductDetailCarousel from "~/views/template1/Product/components/ProductDetailCarousel.vue";
// 相關產品幻燈片
import ProductSameCarousel from "~/views/template1/Product/components/ProductSameCarousel.vue";

const { $api, $utils } = useNuxtApp();
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
    {
        name: "product-slug",
        text: "YDM 4109A",
        params: { slug: "耶魯產品資訊-電子鎖-主鎖-YDM 4109A" },
        query: { category: "id1", tag: "id1" },
    },
]);

const photos = ref<{ id: string | number; imgSrc: string }[]>([]);
const detailData = ref<any>({});

const productOptions = ref<any>([]);
// 預設選中顏色
const currentColor = ref<any>([]);

function optionChange(opt: { id: any }, index: number) {
    currentColor.value[index] = opt.id;
    optionChangePrice();
}

const productDetailCarouselRef = ref<any>(null)

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
            const index = photos.value.findIndex(item => item.imgSrc === detailData.value.productVariations[key].image)
            console.log(index, detailData.value.productVariations[key].image)
            productDetailCarouselRef.value.slideTo(index + 1)
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
function downloadFile (file: { url: string|URL|undefined; }) {
    console.log(file)
    window.open(file.url, "_blank")
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
