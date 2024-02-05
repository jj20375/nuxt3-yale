<template>
    <div>
        <h3 class="text-[16px] font-medium YaleSolisW-Bd">{{ title }}</h3>
        <el-checkbox-group
            v-model="selectedProducts"
            @change="selectProduct"
        >
            <div
                v-for="(product, index) in products"
                :key="index"
                class="border-gray-300 py-[16px]"
                :class="{ 'border-b': index !== products.length - 1 }"
                type="button"
            >
                <div class="relative flex items-center">
                    <el-checkbox
                        :label="product.id"
                        size="large"
                        class="flex-1"
                    >{{ product.title }}</el-checkbox>
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
        </el-checkbox-group>
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
                <h5 class="text-[20px] text-gray-800 YaleSolisW-Bd mb-[38px]">卡片密碼電子鎖-YDM 3109+</h5>
                <CustomProductDailogCarousel :photos="photos" />
                <p
                    class="text-[16px] text-gray-800 mt-[28px]"
                    v-html="dialogDetailHtml"
                ></p>
                <div class="flex justify-center mt-[40px]">
                    <button class="bg-yellow-600 text-gray-800 rounded-full w-[140px] py-[11px] text-center hover:bg-yellow-700 text-[16px]">加入選擇</button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
// 導入細節彈窗 幻燈片
import CustomProductDailogCarousel from "~/views/template1/CustomProduct/components/CustomProductDailogCarousel.vue";

const { $utils } = useNuxtApp();

const emit = defineEmits(["update:selectedProductIds", "update:selectedProducts"]);

interface Props {
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
    // 可選擇產品
    products: [
        {
            imgSrc: "/img/custom-product/demo/custom-product-door-demo-1.jpg",
            title: "品牌/ASSA ABLOY",
            style: "YDM3109A",
            price: 2000,
        },
    ],
    // 標題
    title: "款式",
});

const selectedProducts = ref([]);

/**
 * 選擇服務
 */
function selectProduct(val: any) {
    emit("update:selectedProductIds", val);
    emit(
        "update:selectedProducts",
        props.products.filter((item) => val.includes(item.id))
    );
}

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
</script>

<style lang="scss" scoped>
:deep {
    .el-checkbox-group {
        @apply text-base leading-normal block #{!important};
    }
    .el-checkbox.el-checkbox--large {
        .el-checkbox__label {
            @apply font-normal #{!important};
        }
        .el-checkbox__inner {
            @apply w-[18px] h-[18px] #{!important};
            &:hover{
                @apply border-yellow-600;
            }
        }
        .is-checked{
            .el-checkbox__inner {
                @apply bg-yellow-600 border-yellow-600 after:h-[9px] after:left-[6px] after:top-[2px] #{!important};
            }
        }
    }
}
</style>
