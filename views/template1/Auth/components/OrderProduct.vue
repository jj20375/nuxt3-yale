<template>
    <div
        v-for="(product, index) in order"
        :key="index"
        class="flex product-card border-gray-200 gap-9 py-[30px]"
    >
        <NuxtImg
            class="w-[180px] aspect-square object-cover h-fit"
            :src="product.imgUrl"
        />
        <div class="flex-1">
            <h5 class="text-[18px] font-bold mb-4 YaleSolisW-Bd">{{ product.name }}</h5>
            <div class="flex flex-col gap-3">
                <template
                    v-for="(column, columnIndex) in columns"
                    :key="columnIndex"
                >
                    <div
                        class="grid grid-cols-2 gap-4 text-gray-700"
                        v-if="product?.[column.prop]"
                    >
                        <div>{{ column.label }}</div>
                        <div
                            class="flex flex-col gap-1"
                            v-if="column.array === true"
                        >
                            <div
                                v-for="(item, itemIndex) in product[column.prop]"
                                :key="itemIndex"
                            >
                                {{ item }}
                            </div>
                        </div>
                        <div v-else>
                            {{ product[column.prop] }}
                        </div>
                    </div>
                </template>
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
        <div
            v-if="isDoor"
            class="flex items-center gap-2 cursor-pointer h-fit"
        >
            <NuxtImg
                class="w-[20px] aspect-square object-cover"
                src="img/icons/auth/info.svg"
            />
            <div
                class="underline underline-offset-2"
                @click="handleDetail"
            >
                查看商品詳情
            </div>
        </div>
        <client-only>
            <ProductDialog
                v-model="dialogDetail"
                :dialogData="dialogData"
            />
        </client-only>
    </div>
</template>
<script setup lang="ts">
import ProductDialog from "~/views/template1/components/ProductDialog.vue";

const { $utils } = useNuxtApp();

interface Props {
    isDoor: boolean; // 是否為訂製門扇頁面
    order: {
        name: string;
        color: string;
        doorLeaf: string[];
        doorFrame: string[];
        doorLock: string[];
        doorHanging: string[];
        doorSealStrip: string;
        doorGasket: string[];
        doorOperator: string[];
        otherService: string[];
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
    isDoor: false,
    order: [
        {
            name: "",
            color: "",
            doorLeaf: [],
            doorFrame: [],
            doorLock: [],
            doorHanging: [],
            doorSealStrip: "",
            doorGasket: [],
            doorOperator: [],
            otherService: [],
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

// 欄位及變數名稱
const columns = [
    { label: "單價", prop: "price" },
    { label: "規格", prop: "color" },
    { label: "門扇", prop: "doorLeaf", array: true },
    { label: "門框", prop: "doorFrame", array: true },
    { label: "門鎖", prop: "doorLock", array: true },
    { label: "掛門", prop: "doorHanging", array: true },
    { label: "氣密條", prop: "doorSealStrip" },
    { label: "下降壓條", prop: "doorGasket", array: true },
    { label: "門弓器", prop: "doorOperator", array: true },
    { label: "額外施作服務", prop: "otherService", array: true },
    { label: "數量", prop: "quantity" },
];

// 商品詳情彈窗
const dialogDetail = ref(false);

const handleDetail = () => {
    dialogDetail.value = true;
};
</script>

<style lang="scss" scoped>
.product-card {
    //&:not(:last-child){
    @apply border-b-[1px] border-gray-200;
    //}
    .grid {
        grid-template-columns: 150px 1fr;
    }
}
</style>
