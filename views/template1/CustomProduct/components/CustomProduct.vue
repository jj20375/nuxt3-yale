<template>
    <div class="custom-form">
        <h3 class="text-[16px] font-medium YaleSolisW-Bd">{{ title }}</h3>
        <el-radio-group
            v-model="currentProductData"
            @change="setProduct"
        >
            <div
                v-for="(product, index) in products"
                :key="index"
                class="border-gray-300 pt-2 pb-4"
                :class="{ 'border-b': index !== products.length - 1 }"
                type="button"
            >
                <div class="relative flex items-center">
                    <el-radio
                        :label="product.id"
                        size="large"
                        class="flex-1"
                    >
                        {{ product.title }}
                    </el-radio>
                    <div class="absolute right-0">
                        <button @click.prevent="showDialog = true">
                            <NuxtImg
                                class="w-[24px]"
                                src="/img/icons/info.svg"
                            />
                        </button>
                    </div>
                </div>
                <div class="flex ml-[26px] mt-1 gap-3">
                    <NuxtImg
                        class="w-[80px] aspect-square object-cover"
                        :src="product.imgSrc"
                    />
                    <div class="flex flex-col gap-1 text-[14px]">
                        <p class="text-gray-500">{{ product.style }}</p>
                        <p class="text-gray-500">{{ product.name }}</p>
                        <p class="text-gray-800">+NT$ {{ $utils().formatCurrency(product.price) }}</p>
                    </div>
                </div>
            </div>
        </el-radio-group>
        <el-dialog
            class="custom-dialog h-[600px]"
            v-model="showDialog"
            :before-close="closeDialog"
            close-on-click-modal
            lock-scroll
            show-close
            :width="800"
            center
            align-center
            append-to-body
        >
            <div class="w-3/4 mx-auto">
                <h5 class="text-[20px] text-gray-800 YaleSolisW-Bd mt-[20px] mb-[30px]">卡片密碼電子鎖-YDM 3109+</h5>
                <CustomProductDailogCarousel :photos="photos" />
                <p
                    class="text-[16px] text-gray-800 mt-[28px]"
                    v-html="dialogDetailHtml"
                ></p>
                <div class="flex justify-center mt-[40px]">
                    <button class="yellow-btn btn-md">加入選擇</button>
                </div>
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
    title: "款式",
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
    .el-radio.el-radio--large {
        @apply mr-[8px] #{!important};

        .el-radio__label {
            @apply font-normal leading-none;
        }
        .el-radio__inner{
            @apply w-[18px] h-[18px];
            &:hover{
                @apply border-yellow-600;
            }
        }
        &.is-checked{
            @apply font-normal #{!important};
            .el-radio__inner {
                @apply border-yellow-600 bg-yellow-600;
            }
        }
    }
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
