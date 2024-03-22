<template>
    <div class="mt-[24px] md:mt-[40px] mb-[48px] md:mb-[100px]">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-x-[20px] sm:gap-x-0 place-content-center different-wrap">
            <template
                v-for="(column, key, columnIndex) in columns"
                :key="key"
            >
                <template
                    v-for="index in tableColumn"
                    :key="index"
                >
                    <div
                        class="h-full col-span-2 sm:col-span-1"
                        v-if="index === 1"
                    >
                        <div
                            v-if="key === 'imgSrc'"
                            class="hidden sm:block h-[300px] w-[150px]"
                        ></div>
                        <div
                            class="py-[14px] sm:py-[16px] h-full border-b border-gray-300 YaleSolisW-Bd font-medium text-[16px] text-gray-800"
                            :class="columnIndex < 2 ? 'hidden sm:block mr-[10px]' : ''"
                            v-else
                        >
                            {{ column }}
                        </div>
                    </div>
                    <div
                        class="h-full"
                        v-else
                    >
                        <div
                            class="flex flex-col items-center h-[300px] justify-center"
                            v-if="key === 'imgSrc'"
                        >
                            <div v-if="products[index - 2] && products[index - 2][key]">
                                <NuxtImg
                                    class="h-[200px] aspect-square object-cover"
                                    :src="products[index - 2][key]"
                                />
                                <div class="mt-4 text-center">
                                    <button
                                        @click.prevent="goToDetail(products[index - 2])"
                                        class="yellow-btn"
                                        :class="isMobile ? 'btn-sm' : 'btn-md'"
                                    >
                                        立即選購
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div
                            class="sm:mx-[10px]"
                            v-else-if="key === 'style'"
                        >
                            <el-select
                                class="w-full"
                                @change="categoryChange(index - 2)"
                                v-model="form.category[index - 2]"
                                placeholder="選擇分類"
                                clearable
                            >
                                <el-option
                                    v-for="(item, key) in shapeArr"
                                    :key="key"
                                    :label="item"
                                    :value="item"
                                ></el-option>
                            </el-select>
                        </div>
                        <div
                            class="sm:mx-[10px]"
                            v-else-if="key === 'category'"
                        >
                            <el-select
                                class="w-full"
                                @change="modelChange(index - 2)"
                                v-model="form.style[index - 2]"
                                placeholder="選擇型號"
                                clearable
                            >
                                <el-option
                                    v-for="(item, key) in styleArr[index - 2]"
                                    :key="key"
                                    :label="item"
                                    :value="item"
                                ></el-option>
                            </el-select>
                        </div>
                        <div
                            v-else
                            class="py-[14px] sm:py-[16px] h-full sm:border-b border-gray-300 text-[15px] sm:text-[16px] text-gray-800 flex sm:justify-center"
                        >
                            <div class="sm:px-[12px]">
                                {{ products[index - 2] && products[index - 2][key] ? products[index - 2][key] : "-" }}
                            </div>
                        </div>
                    </div>
                </template>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ProductListAPIInterface, ProductCompareList, ProductInterface } from "~/interface/product";
import { useProductCompareStore } from "~/store/productCompareStore";

const { $api, $utils } = useNuxtApp();
const route = useRoute();
const router = useRouter();
const { isMobile } = useWindowResize();
const productCompareStore = useProductCompareStore();

interface Props {
    // 比較產品資料
    products: ProductInterface[];
    // 欄位名稱
    columns: ProductInterface;
    // 產品列表
    datas: ProductCompareList;
    shapeArr: string | number[];
}

const breadcrumbs = ref<any>([]);
// 取得 storage 麵包屑參數值
if (process.client) {
    // breadcrumbs.value = JSON.parse($utils().getBreadcrumbsData()).slice(0, 3);
}

const props = withDefaults(defineProps<Props>(), {
    products: [
        {
            // 產品款式
            style: "id1",
            // 產品型號
            category: "id1",
            // 產品圖
            imgSrc: "/img/home/product/product1.jpg",
            // 顏色
            color: "消光霧黑",
            // 專利安全按鈕
            safeBtn: "有",
            // 自動上鎖功能
            autoLock: "有",
            // 入侵 / 破壞 / 高溫警報功能
            feature: "有",
            // 節電設計
            savePower: "有",
            // 低電量提示
            lowPower: "9V 緊急後備電源啟動電源",
            // 卡片解鎖
            cardUnlock: "4張",
            // 密碼解鎖
            passwordUnlock: "100組",
            // 虛位密碼
            virtualPassword: "有",
            // 指紋解鎖
            fingerUnlock: "100組",
            // 備用機械鑰匙
            copyMachineKey: "2把",
            // 語音提示
            voiceCheck: "無",
            // Yale home 遠端管理
            yaleHomeApp: "可",
            // 正面尺寸
            frontSize: "68.6(W) × 306.6(H) × 27(D)",
            // 背面尺寸
            backendSize: "72.8(W) × 306.6(H) × 37(D)",
            // 鎖體
            type: "歐規不鏽鋼",
            // 電源
            power: "1.5V",
            // 保固
            warranty: "2 年原廠",
        },
    ],
    columns: {
        style: "產品款式",
        category: "產品型號",
        imgSrc: "",
        color: "顏色",
        safeBtn: "專利安全按鈕",
        autoLock: "自動上鎖功能",
        feature: "入侵 / 破壞 / 高溫警報功能",
        savePower: "節電設計",
        lowPower: "低電量提示",
        cardUnlock: "卡片解鎖",
        passwordUnlock: "密碼解鎖",
        virtualPassword: "虛位密碼",
        fingerUnlock: "指紋解鎖",
        copyMachineKey: "備用機械鑰匙",
        voiceCheck: "語音提示",
        yaleHomeApp: "Yale home 遠端管理",
        frontSize: "正面尺寸",
        背面尺寸: "背面尺寸",
        type: "鎖體",
        power: "電源",
        warranty: "保固",
    },
    datas: {
        id: 0,
        model: "",
        name: "",
        shape: "",
        main_image: "",
        attributes: "",
    },
    shapeArr: [],
});

const form = ref<any>({
    category: ["", "", ""],
    style: ["", "", ""],
});

// 表格的行數
const tableColumn = computed(() => (isMobile.value ? 3 : 4));

const styleArr = computed(() => {
    const arr: any[] = [];
    const defaultArr = props.datas.map((item: { model: string }) => item.model);
    for (let i = 0; i < 3; i++) {
        if (form.value.category[i] && form.value.category[i] !== "") {
            const filterArr = props.datas.filter((data: { shape: string }) => data.shape === form.value.category[i]).map((item: { model: string }) => item.model);
            console.log(filterArr);
            arr[i] = filterArr;
        } else {
            arr[i] = defaultArr;
        }
    }
    return arr;
});

const emit = defineEmits(["categorySelect"]);

function categoryChange(index: string | number) {
    form.value.style[index] = null;
    emit("categorySelect", index);
    deleteCompareProduct(index);
}

function deleteCompareProduct(index: string | number) {
    productCompareStore.compareStore[index] = {
        attributes: {},
        id: null,
        main_image: "",
        model: "",
        name: "",
        shape: "",
    };
}

function modelChange(index: string | number) {
    console.log(form.value.style[index]);
    if (form.value.style[index]) {
        form.value.category[index] = props.datas.find((data) => data.model === form.value.style[index]).shape;
        productCompareStore.compareStoreReset();
        form.value.style.forEach((item: string, index: number) => {
            console.log(item, index);
            if (item) {
                productCompareStore.compareStore[index] = props.datas.find((data: { model: string }) => data.model === item);
            }
        });
    } else {
        form.value.category[index] = null;
        deleteCompareProduct(index);
    }
}

function goToDetail(product: any) {
    const routeName = "product-detail-slug-id";

    // 將麵包屑存進 storage
    $utils().saveBreadcrumbsData(JSON.stringify(breadcrumbs.value));

    router.push({
        name: routeName,
        params: { slug: product.name, id: product.id },
    });
}

function getStyleModel() {
    props.products.forEach((item, index) => {
        form.value.category[index] = item.category;
        form.value.style[index] = item.style;
    });
}

/**
 * 初始化
 */

onMounted(() => {
    getStyleModel();
});

defineExpose({
    getStyleModel,
});
</script>

<style lang="scss" scoped>
// 下拉選單
:deep {
    .el-select {
        .el-input {
            .el-input__wrapper {
                @apply shadow-formDefault rounded-none py-[14px] px-0 bg-transparent text-[16px] #{!important};
                &.is-focus {
                    @apply shadow-formFocus #{!important};
                }
                .el-input__inner {
                    @apply text-gray-800 font-medium;
                    font-family: YaleSolisW-Bd;
                    &::placeholder {
                        -webkit-text-fill-color: #ababac;
                    }
                }
            }
        }
    }
}

.different-wrap {
    // 強制斷行
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
    -ms-hyphens: auto;
    -moz-hyphens: auto;
    -webkit-hyphens: auto;
    hyphens: auto;
}
</style>
