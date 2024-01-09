<template>
    <div>
        <h3 class="text-[16px] font-medium YaleSolisW-Bd mb-[20px]">{{ title }}</h3>
        <el-checkbox-group
            v-model="selectedProducts"
            @change="selectProduct"
        >
            <div
                v-for="(product, index) in products"
                :key="index"
                class="border-b border-gray-300 py-[16px]"
            >
                <div class="flex items-center">
                    <el-checkbox
                        :label="product.id"
                        size="large"
                    ></el-checkbox>
                    <h5 class="ml-[10px]">{{ product.title }}</h5>
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
        </el-checkbox-group>
    </div>
</template>

<script setup lang="ts">
const { $utils } = useNuxtApp();

const emit = defineEmits(["update:selectedProducts"]);

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
            name: "品牌/ASSA ABLOY",
            style: "YDM3109A",
            price: 2000,
        },
    ],
    // 標題
    titl: "款式",
});

const selectedProducts = ref([]);

/**
 * 選擇服務
 */
function selectProduct(val: any) {
    emit("update:selectedProducts", val);
}
</script>

<style lang="scss" scoped>
:deep {
    .el-checkbox-group {
        @apply text-base leading-normal block #{!important};
    }
    .is-checked {
        .el-checkbox__inner {
            @apply bg-yellow-600 border-yellow-600 #{!important};
        }
    }
    .el-checkbox {
        @apply block #{!important};
    }
    .el-checkbox__label {
        @apply text-gray-800 hidden #{!important};
    }
    .el-checkbox.el-checkbox--large {
        @apply h-auto #{!important};
    }
}
</style>
