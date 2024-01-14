<template>
<div
    v-for="(product, index) in order" :key="product.index"
    class="flex product-card border-gray-200 gap-9 py-[30px]"
>
    <NuxtImg
        class="w-[180px] aspect-square object-cover h-fit"
        :src="product.image"
    />
    <div class="flex-1">
        <h5 class="text-[18px] font-bold mb-4 YaleSolisW-Bd">{{ product.name }}</h5>
        <div class="flex flex-col gap-3">
            <template v-for="(column, index) in columns" :key="product.index">
                <div class="grid grid-cols-2 gap-4 text-gray-700" v-if="product?.[column.prop]">
                    <div>{{ column.label }}</div>
                    <div class="flex flex-col gap-1" v-if="column.prop === 'doorFrame' || column.prop === 'doorLeaf' || column.prop === 'doorLock' || column.prop ==='otherService'">
                        <div  v-for="(item, itemIndex) in product[column.prop]" :key="itemIndex">
                            {{ item }}
                        </div>
                    </div>
                    <div v-else>
                        {{ product[column.prop] }}
                    </div>
                </div>
            </template>
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
    <div v-if="isDoor" class="flex gap-2 items-center h-fit cursor-pointer">
        <NuxtImg
            class="w-[20px] aspect-square object-cover"
            src="img/icons/auth/info.svg"
        />
        <div class="underline underline-offset-2">查看商品詳情</div>
    </div>
</div>
</template>
<script setup lang="ts">

const { $utils } = useNuxtApp();

interface Props {
    isDoor: boolean; // 是否為訂製門扇頁面
    order: {
        name: string;
        color: string;
        fireproof: string;
        size: string;
        doorLeaf: string[];
        doorFrame: string[];
        doorLock: string[];
        doorHanging: string;
        doorSealStrip: string;
        doorGasket: string;
        doorOperator: string;
        otherService: string[];
        quantity: number;
        rule: {
            needPrice: number;
            getFree: boolean;
        }
    }[];
};

const props = withDefaults(defineProps<Props>(), {
    isDoor: false,
    order: [
        {
            name: "",
            color: "",
            fireproof: "",
            size: "",
            doorLeaf: [],
            doorFrame: [],
            doorLock: [],
            doorHanging: "",
            doorSealStrip: "",
            doorGasket: "",
            doorOperator: "",
            otherService: "",
            quantity: 1,
            price: 0,
            rule: {
                needPrice: NaN, // 滿額贈
                getFree: false, // 加價購
            }
        },
    ]
});

// 欄位及變數名稱
const columns = [
    { label: '規格', prop: 'color' },
    { label: '防火功能', prop: 'fireproof' },
    { label: '尺寸', prop: 'size' },
    { label: '門扇', prop: 'doorLeaf' },
    { label: '門框', prop: 'doorFrame' },
    { label: '門鎖', prop: 'doorLock' },
    { label: '掛門', prop: 'doorHanging' },
    { label: '氣密條', prop: 'doorSealStrip' },
    { label: '下降壓條', prop: 'doorGasket' },
    { label: '門弓器', prop: 'doorOperator' },
    { label: '額外施作服務', prop: 'otherService' },
    { label: '數量', prop: 'quantity' },
]
</script>

<style lang="scss" scoped>
.product-card{
    //&:not(:last-child){
        @apply border-b-[1px] border-gray-200;
    //}
    .grid{
        grid-template-columns: 150px 1fr;
    }
}

</style>