<template>
    <div class="flex flex-col gap-2 pt-[30px] pb-5 border-b-[1px] border-gray-200">
        <div class="flex justify-between text-sm text-gray-700">
            <div>運費</div>
            <div>NT$ {{ $utils().formatCurrency(order?.deliveryFee) }}</div>
        </div>
        <div  v-for="(item, index) in order?.event" :key="index" class="flex justify-between text-sm text-gray-700">
            <div>活動折扣 ({{item?.name}})</div>
            <div>NT$ {{ $utils().formatCurrency(item?.discountPrice) }}</div>
        </div>
        <div class="flex justify-between text-sm text-gray-700">
            <div>優惠卷折扣</div>
            <div>NT$ {{ $utils().formatCurrency(order?.coupon) }}</div>
        </div>
    </div>
    <div class="flex items-center justify-between mt-5">
        <div class="text-[24px] font-bold">總計</div>
        <div class="flex items-center gap-2 YaleSolisW-Bd">NT$<span class="text-[24px]">{{ $utils().formatCurrency(order?.totalPrice) }}</span></div>
    </div>
    <div v-if="type === 'combination'">
        <div
            class="text-gray-600 text-[14px] flex mt-[4px]"
        >
            <div class="flex-1">訂金(總價{{order?.deposit_ratio}}%)</div>
            <!-- 訂金 -->
            <span class="mr-[4px]">NT$ {{ $utils().formatCurrency(order?.deposit) }}</span>
        </div>
        <div
            class="text-gray-600 text-[14px] flex mt-[4px]"
        >
            <div class="flex-1">尾款(預估總價{{order?.finalPayment_ratio}}%)</div>
            <!-- 訂金 -->
            <span class="mr-[4px]">NT$ {{ $utils().formatCurrency(order?.finalPayment_ori) }}</span>
        </div>
        <div
            class="text-gray-600 text-[14px] flex mt-[4px]"
        >
            <div class="flex-1">實際尾款</div>
            <!-- 訂金 -->
            <span class="mr-[4px]">NT$  {{ $utils().formatCurrency(order?.finalPayment) }}</span>
            <slot name="deposit"></slot>
        </div>
    </div>
    <div class="mt-4" v-if="order?.memo">
        <div class="text-gray-700 text-sm leading-8">備註</div>
        <div class="text-gray-700 text-sm leading-8" v-html="order?.memo"></div>
    </div>
</template>

<script setup lang="ts">
const { $utils } = useNuxtApp();

interface Props {
    order: {
        deliveryFee: number,
        event: [
            {
                name: object,
                discountPrice: number,
            },
        ],
        coupon: number,
        totalPrice: number,
        deposit: number,
        deposit_ratio: number,
        finalPayment_ori: number,
        finalPayment: number,
        finalPayment_ratio: number,
        memo: string,
    }[];
    type: string;
};

const props = withDefaults(defineProps<Props>(), {
    order: [
        {
            deliveryFee: 0,
            event: [
                {
                    name: "母親節520特惠活動",
                    discountPrice: -1000,
                },
                {
                    name: "新會員送好禮",
                    discountPrice: -500,
                }
            ],
            coupon: -1000,
            deposit: 0,
            deposit_ratio: 30,
            finalPayment_ori: 0,
            finalPayment: 0,
            finalPayment_ratio: 70,
            totalPrice: 43399,
            memo: "備註內容備註內容備註內容備註內容備註內容備註內容備註內容備註內容備註內容備註內容備註內容備註內容"
        }
    ],
    type: 'normal'
});
</script>