<template>
    <div>
        <h3 class="text-[16px] font-medium YaleSolisW-Bd mb-[20px]">{{ title }}</h3>
        <el-radio-group
            v-model="currentProductData"
            @change="setProduct"
            class="ml-4"
        >
            <div
                v-for="(product, index) in products"
                :key="index"
                class="border-b border-gray-300 py-[16px]"
            >
                <div class="flex items-center">
                    <el-radio
                        :label="product.id"
                        size="large"
                    >
                        {{ product.title }}
                    </el-radio>
                    <div class="flex-1 text-right">
                        <button @click.prevent="showDialog = true">
                            <NuxtImg
                                class="w-[24px]"
                                src="/img/icons/info.svg"
                            />
                        </button>
                    </div>
                </div>
                <div class="flex ml-[25px] mt-[8px]">
                    <div class="mr-[12px]">
                        <NuxtImg
                            class="w-[80px]"
                            :src="product.imgSrc"
                        />
                    </div>
                    <div class="text-[14px]">
                        <p class="text-gray-500">{{ product.style }}</p>
                        <p class="text-gray-500">{{ product.name }}</p>
                        <p class="text-gray-800">+NT$ {{ $utils().formatCurrency(product.price) }}</p>
                    </div>
                </div>
            </div>
        </el-radio-group>
        <el-dialog
            v-model="showDialog"
            :before-close="closeDialog"
            :show-close="false"
        >
            <div class="text-right">
                <button @click="closeDialog">
                    <el-icon :size="30"><Close /></el-icon>
                </button>
            </div>
            <h5 class="text-[20px] text-gray-800 YaleSolisW-Bd mb-[38px]">卡片密碼電子鎖-YDM 3109+</h5>
            <CustomProductDailogCarousel :photos="photos" />
            <p
                class="text-[16px] text-gray-800 mt-[28px]"
                v-html="dialogDetailHtml"
            ></p>
            <div class="flex justify-center mt-[40px]">
                <button class="bg-yellow-600 text-gray-800 rounded-full w-[140px] py-[11px] text-center hover:bg-yellow-700 text-[16px]">加入選擇</button>
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
// 導入細節彈窗 幻燈片
import CustomProductDailogCarousel from "~/views/template1/CustomProduct/components/CustomProductDailogCarousel.vue";

const { $utils } = useNuxtApp();

const emit = defineEmits(["update:currentProductId", "update:currentProductData"]);

interface Props {
    currentProductId: string | number;
    products: {
        imgSrc: string;
        title: string;
        price: number;
        name: string;
        style?: string;
        description?: string | null;
        id: string;
    }[];
    title: string;
}

const props = withDefaults(defineProps<Props>(), {
    // 預設選擇產品
    currentProductId: "id1",
    // 可選擇產品
    products: [
        {
            imgSrc: "/img/custom-product/demo/custom-product-door-demo-1.jpg",
            name: "品牌/ASSA ABLOY",
            style: "YDM3109A",
            price: 2000,
        },
    ],
    // 標題
    titl: "款式",
});

// 預設選擇產品資料
const currentProductData = ref(props.currentProductId);

/**
 * 設定選擇產品資料
 */
function setProduct(val) {
    currentProductData.value = val;
}

watch(
    () => currentProductData.value,
    (val) => {
        emit("update:currentProductId", val);
        emit(
            "update:currentProductData",
            props.products.find((item) => item.id === val)
        );
    }
);

// 細節彈窗幻燈片圖
const photos = ref<{ id: string | number; imgSrc: string }[]>([]);

for (let i = 0; i < 10; i++) {
    photos.value.push({ id: i, imgSrc: "/img/product/demo/product-carousel.jpg" });
}

const dialogDetailHtml = ref(`
經典款式再升級！支援藍芽開門及遠端開門系統整合，手機也可以設定電子鎖。 <br /><br />
 熱感應輕觸式數位鍵盤，美觀便捷，且以手掌觸碰開啟有效避免指紋與密碼外洩。隱藏式機械鑰匙孔，緊急情況下，可以使用備用機械鑰匙。
`);

// 顯示彈窗
const showDialog = ref(false);

/**
 * 關閉彈窗
 */

function closeDialog() {
    showDialog.value = false;
}

onMounted(() => {
    emit("update:currentProductId", props.currentProductId);
    emit(
        "update:currentProductData",
        props.products.find((item) => item.id === props.currentProductId)
    );
});
</script>

<style lang="scss" scoped>
:deep .el-radio__input.is-checked .el-radio__inner {
    @apply bg-yellow-600 border-yellow-600 #{!important};
}

:deep .el-radio-group {
    @apply block #{!important};
}

:deep .el-radio {
    @apply mr-[8px] #{!important};
}

:deep .el-radio__label {
    // @apply hidden #{!important};
}

:deep {
    .el-dialog__body {
        @apply mx-10;
    }
    .el-dialog {
        @apply rounded-[20px];
    }
}
</style>
