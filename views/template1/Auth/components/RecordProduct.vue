<template>
<div
    v-for="(product, index) in orderProduct" :key="product.index"
    class="flex product-card border-gray-200 py-[30px]"
>
    <NuxtImg
        class="w-[180px] aspect-1/1 mr-9"
        src="/img/shopping-car/shopping-gift-demo-1.jpg"
    />
    <div class="flex-1">
        <h5 class="text-[18px] font-bold mb-4 YaleSolisW-Bd">{{ product.name }}</h5>
        <div class="flex flex-col gap-3">
            <div class="grid grid-cols-2 gap-4 text-gray-700">
                <div>規格</div>
                <div>{{ product.color }}</div>
            </div>
            <div class="grid grid-cols-2 gap-4 text-gray-700">
                <div>數量</div>
                <div>{{ product.quantity }}</div>
            </div>
            <div v-if="product.rule">
                <div class="inline-block text-gray-500 text-sm px-3 py-1 border-[1px] border-gray-500" v-if="product.rule.needPrice">
                    NT${{ $utils().formatCurrency(product.rule.needPrice) }}滿額贈
                </div>
                <div class="inline-block text-gray-500 text-sm px-3 py-1 border-[1px] border-gray-500" v-if="product.rule.getFree === true">
                    加價購
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script setup lang="ts">

const { $utils } = useNuxtApp();

interface Props {
    orderProduct: {
        name: string;
        color: string;
        quantity: number;
        rule: {
            needPrice: number;
            getFree: boolean;
        }
    }[];
};

const props = withDefaults(defineProps<Props>(), {
    orderProduct: [
        {
            name: "YDM 7216A 指紋卡片密碼鑰匙四合一",
            color: "黑色",
            quantity: 1,
            price: 3000,
            rule: {
                needPrice: 3000, // 滿額贈
                getFree: false, // 加價購
            }
        },
    ]
});
</script>

<style lang="scss" scoped>
.product-card{
    &:not(:last-child){
        @apply border-b-[1px] border-gray-200;
    }
    .grid{
        grid-template-columns: 150px 1fr;
    }
}

</style>