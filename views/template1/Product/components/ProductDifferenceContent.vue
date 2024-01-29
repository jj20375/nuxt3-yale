<template>
    <div class="mt-[40px] mb-[100px]">
        <div class="grid grid-cols-4 place-content-center">
            <div class="flex flex-col">
                <div
                    v-for="(column, key) in columns"
                    :key="key"
                >
                    <div
                        v-if="key === 'imgSrc'"
                        class="h-[300px] w-[150px]"
                    ></div>
                    <div
                        class="py-[12px] border-b border-gray-300 text-[16px] text-gray-800"
                        v-else
                    >
                        {{ column }}
                    </div>
                </div>
            </div>
            <div
                v-for="(product, index) in products"
                :key="index"
                class="flex flex-col"
            >
                <div
                    v-for="(productData, productKey) in product"
                    :key="productKey"
                >
                    <div
                        class="flex flex-col items-center h-[300px] justify-center"
                        v-if="productKey === 'imgSrc'"
                    >
                        <NuxtImg
                            v-if="productData"
                            class="h-[200px]"
                            :src="productData"
                        />
                        <div v-if="productData">
                            <button class="py-[9px] px-[33px] bg-yellow-600 rounded-full text-gray-800 hover:bg-yellow-700 duration-500 transition-all">立即選購</button>
                        </div>
                    </div>
                    <div
                        class="ml-[50px]"
                        v-else-if="productKey === 'style'"
                    >
                        <el-select
                            class="w-full"
                            @change="categoryChange(index)"
                            v-model="form.category[index]"
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
                        class="ml-[50px]"
                        v-else-if="productKey === 'category'"
                    >
                        <el-select
                            class="w-full"
                            @change="modelChange(index)"
                            v-model="form.style[index]"
                            placeholder="選擇型號"
                            clearable
                        >
                            <el-option
                                v-for="(item, key) in styleArr[index]"
                                :key="key"
                                :label="item"
                                :value="item"
                            ></el-option>
                        </el-select>
                    </div>
                    <div
                        v-else
                        class="py-[12px] border-b border-gray-300 text-[16px] text-gray-800 flex justify-center"
                    >
                        <div
                            :title="productData"
                            class="truncate"
                        >
                            {{ productData ? productData : "-" }}
                        </div>
                    </div>
                </div>
            </div>
            <div
                v-show="products.length < 3"
                v-for="(item, index) in 3 - products.length"
                :key="index"
                class="flex flex-col"
            >
                <div
                    v-for="(column, key) in columns"
                    :key="key"
                >
                    <div
                        v-if="key === 'imgSrc'"
                        class="h-[300px] w-[150px]"
                    ></div>
                    <div
                        class="ml-[50px]"
                        v-else-if="key === 'style'"
                    >
                        <el-select
                            class="w-full"
                            v-model="form.category[index + products.length]"
                            @change="categoryChange(index + products.length)"
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
                        class="ml-[50px]"
                        v-else-if="key === 'category'"
                    >
                        <el-select
                            class="w-full"
                            v-model="form.style[index + products.length]"
                            @change="modelChange(index + products.length)"
                            placeholder="選擇型號"
                            clearable
                        >
                            <el-option
                                v-for="(item, key) in styleArr[index + products.length]"
                                :key="key"
                                :label="item"
                                :value="item"
                            ></el-option>
                        </el-select>
                    </div>
                    <div
                        class="py-[12px] border-b border-gray-300 text-[16px] text-gray-800 flex justify-center"
                        v-else
                    >
                        -
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ProductListAPIInterface, ProductCompareList, ProductInterface } from "~/interface/product";
import { useProductCompareStore } from "~/store/productCompareStore";

const { $api } = useNuxtApp();
const route = useRoute();
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
    category: [],
    style: [],
});

const styleArr = computed(() => {
    const arr: any[] = [];
    const defaultArr = props.datas.map((item: { model: string }) => item.model);
    form.value.category.forEach((item, index) => {
        if (item && item !== "") {
            const filterArr = props.datas.filter((data: { shape: string }) => data.shape === item).map((item: { model: string }) => item.model);
            console.log(filterArr);
            arr[index] = filterArr;
        } else {
            arr[index] = defaultArr;
        }
    });
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
        productCompareStore.compareStore = [];
        form.value.style.forEach((item: string) => {
            productCompareStore.compareStore.push(props.datas.find((data) => data.model === item));
        });
    } else {
        form.value.category[index] = null;
        deleteCompareProduct(index);
    }
}

/**
 * 初始化
 */

onMounted(() => {
    console.log("props.products => ", props.products);
    props.products.forEach((item, index) => {
        form.value.category.push(item.category);
        form.value.style.push(item.style);
    });
});
</script>

<style lang="scss" scoped>
:deep .el-input__wrapper {
    font-family: "YaleSolisW-Bd";
    @apply bg-none border-b shadow-none w-[300px] rounded-none h-[49px] font-bold;
}

:deep .el-select .el-input .el-select__caret {
    @apply font-bold text-gray-800;
}
</style>
