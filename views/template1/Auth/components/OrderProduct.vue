<template>
    <div
        v-for="(product, index) in order"
        :key="index"
        class="flex product-card border-gray-200 gap-4 sm:gap-9 py-[30px]"
    >
        <NuxtImg
            v-if="product.imgUrl"
            class="w-[100px] sm:w-[180px] aspect-square object-cover h-fit"
            :src="product.imgUrl"
        />
        <div class="flex-1">
            <div class="flex gap-2 mb-4">
                <div
                    v-if="product.is_add_on_purchase == 1"
                    class="bg-yellow-500 text-[12px] px-2 py-1 rounded-md"
                >
                    加價購
                </div>
                <div
                    v-if="product.is_discount_gift == 1"
                    class="bg-pink-400 text-[12px] px-2 py-1 rounded-md"
                >
                    滿額贈
                </div>
            </div>
            <div
                class="flex justify-between w-full gap-4 text-gray-800 cursor-pointer"
            >
                <h5 class="text-[18px] font-bold mb-4 YaleSolisW-Bd">{{ product.name }}</h5>
                <p class="hidden sm:block font-medium YaleSolisW-Bd text-[18px] whitespace-nowrap">NT$ {{ $utils().formatCurrency(product.totalPrice) }}</p>
            </div>
            <div class="flex flex-col gap-3">
                <template
                    v-for="(item, index) in product.productVariationable"
                    :key="index"
                >
                    <div
                        class="grid grid-cols-2 gap-4 text-gray-700"
                    >
                        <div>{{ item.label }}</div>
                        <div>
                            {{ item.value }}
                        </div>
                    </div>
                </template>
                <div
                    class="grid grid-cols-2 gap-4 text-gray-700"
                >
                    <div>數量</div>
                    <div>
                        {{ product.quantity }}
                    </div>
                </div>
                <div v-if="product.rule">
                    <div
                        class="inline-block text-gray-500 text-sm px-3 py-1 border-[1px] border-gray-500"
                        v-if="product.rule.needPrice"
                    >
                        NT${{ $utils().formatCurrency(product.rule.needPrice) }}滿額贈
                    </div>
                    <div
                        class="inline-block text-gray-500 text-sm px-3 py-1 border-[1px] border-gray-500"
                        v-if="product.rule.getFree === true"
                    >
                        加價購
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const { isMobile } = useWindowResize();
const { $utils } = useNuxtApp();

interface Props {
    order: {
        name: string;
        productVariationable: any;
        quantity: number;
        rule: {
            needPrice: number;
            getFree: boolean;
        };
    }[];
    dialogData: {
        title: string;
        imgUrl: string;
        data: any;
        type: string;
    };
}

const props = withDefaults(defineProps<Props>(), {
    order: [
        {
            name: "",
            productVariationable: null,
            quantity: 1,
            price: 0,
            rule: {
                needPrice: NaN, // 滿額贈
                getFree: false, // 加價購
            },
        },
    ],
    dialogData: {
        title: "",
        imgUrl: "",
        data: "",
        type: "",
    },
});

// 商品詳情彈窗
const dialogDetail = ref(false);

</script>

<style lang="scss" scoped>
.product-card {
    //&:not(:last-child){
    @apply border-b-[1px] border-gray-200;
    //}
    @media screen and (min-width: 767.98px) {
        .grid {
            grid-template-columns: 150px 1fr;
        }
    }
}
</style>
