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
    </div>
</template>

<script setup lang="ts">
const { $utils } = useNuxtApp();

const emit = defineEmits(["update:currentProduct"]);

interface Props {
    currentProduct: string | number;
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
    currentProduct: "id1",
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
const currentProductData = ref(props.currentProduct);

/**
 * 設定選擇產品資料
 */
function setProduct(val) {
    currentProductData.value = val;
}

watch(
    () => currentProductData.value,
    (val) => {
        emit("update:currentProduct", val);
    }
);
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
</style>
