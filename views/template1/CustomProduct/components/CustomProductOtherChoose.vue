<template>
    <div>
        <h3 class="text-[16px] font-medium YaleSolisW-Bd">{{ title }}</h3>
        <el-checkbox-group
            v-model="selectedProductIdsData"
            @change="selectProduct"
            :disabled="disabled"
            :max="1"
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
                        >{{ product.title }}
                    </el-checkbox>
                    <div class="absolute right-0">
                        <button
                            @click.prevent="
                                showDialog = true;
                                currentDialogProduct = product;
                            "
                        >
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
                        <p class="text-gray-500">
                            {{ product.style }}
                        </p>
                        <p
                            v-if="product.name !== 'null'"
                            class="text-gray-500"
                        >
                            {{ product.name }}
                        </p>
                        <p class="text-gray-800">+NT${{ $utils().formatCurrency(product.price) }}</p>
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
                <h5 class="text-[20px] text-gray-800 YaleSolisW-Bd mb-[38px]">{{ currentDialogProduct.name }}-{{ currentDialogProduct.style }}</h5>
                <CustomProductDailogCarousel
                    v-if="!$utils().isEmpty(currentDialogProduct.detailData.carousel)"
                    :photos="currentDialogProduct.detailData.carousel"
                />
                <div
                    class="text-[16px] text-gray-800 mt-[28px]"
                    v-html="currentDialogProduct.detailData.content"
                ></div>
                <div class="flex justify-center mt-[40px]">
                    <button
                        @click.prevent="
                            addToCar();
                            closeDialog();
                        "
                        :disabled="selectedProductIdsData.includes(currentDialogProduct.id)"
                        class="yellow-btn btn-md btnDisabled"
                    >
                        加入選擇
                    </button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
// 導入細節彈窗 幻燈片
import CustomProductDailogCarousel from "~/views/template1/CustomProduct/components/CustomProductDailogCarousel.vue";

defineExpose({
    reset,
});

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
    selectedProductIds: number[];
    disabled: boolean;
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
    selectedProductIds: [],
    disabled: false,
});

const selectedProductIdsData = ref(props.selectedProductIds);

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

function reset() {
    selectedProductIdsData.value = [];
    emit("update:selectedProductIds", []);
    emit("update:selectedProducts", {});
}

watch(
    () => props.products,
    (val) => {
        selectedProductIdsData.value = [];
    }
);
watch(
    () => props.selectedProductIds,
    (val) => {
        selectedProductIdsData.value = val;
    }
);

// 顯示彈窗
const showDialog = ref(false);

// 彈窗顯示資料
const currentDialogProduct = ref<any>({});

// 彈窗加入選擇
function addToCar() {
    selectedProductIdsData.value[0] = currentDialogProduct.value.id;
    emit("update:selectedProducts", [currentDialogProduct.value]);
}

/**
 * 關閉彈窗
 */

function closeDialog() {
    showDialog.value = false;
}
</script>

<style lang="scss" scoped>
:deep(.el-checkbox-group) {
    @apply text-base leading-normal block #{!important};
}

:deep(.el-checkbox.el-checkbox--large) {
    .el-checkbox__label {
        @apply font-normal #{!important};
    }

    .el-checkbox__inner {
        @apply w-[18px] h-[18px] #{!important};
        &:hover {
            @apply border-yellow-600;
        }
    }

    .is-checked {
        .el-checkbox__inner {
            @apply bg-yellow-600 border-yellow-600 after:h-[9px] after:left-[6px] after:top-[2px] #{!important};
        }
    }
}
</style>
