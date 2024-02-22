<template>
    <div class="bg-gray-50 px-[24px] pt-[24px] pb-[24px] rounded-[20px]">
        <div class="flex text-gray-800 text-[14px] mb-[4px]">
            <span class="flex-1">小計</span>
            <span>NT$ {{ $utils().formatCurrency(total) }}</span>
        </div>
        <!-- <div class="flex text-gray-800 text-[14px] mb-[4px]">
            <span class="flex-1">活動折扣</span>
            <span>-NT$ {{ $utils().formatCurrency(salePrice) }}</span>
        </div> -->
        <!-- <div class="flex text-gray-800 text-[14px]">
            <span class="flex-1">優惠券折扣</span>
            <span>-NT$ {{ $utils().formatCurrency(salePrice) }}</span>
        </div> -->
        <slot name="other"></slot>
        <div class="my-[20px] border-gray-300 border-b h-[1px] w-full"></div>
        <div
            class="flex text-gray-800"
            :class="currentStep === 0 ? 'text-[24px]' : currentTab === 'type1' ? 'text-[20px]' : 'text-[16px]'"
        >
            <span class="font-medium YaleSolisW-Bd flex-1">總計</span>
            <div class="flex items-center font-medium YaleSolisW-Bd">
                <span class="mr-[4px]">NT$ </span>
                <slot name="total"></slot>
            </div>
        </div>
        <div
            v-if="currentTab === 'type2' && currentStep === 0"
            class="text-gray-600 text-[14px] flex mt-[4px]"
        >
            <div class="flex-1">訂金(總價30%)</div>
            <!-- 訂金 -->
            <span class="mr-[4px]">NT$ </span>
            <slot name="deposit"></slot>
        </div>
        <div
            v-if="currentTab === 'type2' && currentStep === 1"
            class="text-gray-800 text-[20px] font-medium YaleSolisW-Bd flex mt-[4px]"
        >
            <div class="flex-1">支付訂金</div>
            <!-- 訂金 -->
            <span class="mr-[4px]">NT$ </span>
            <slot name="depositBig"></slot>
        </div>
        <slot name="button"></slot>
    </div>
</template>

<script setup lang="ts">
import { ShoppingCarInterface } from "~/interface/shoppingCar";
import { useShoppingCarStore } from "~/store/shoppingCarStore";

interface Props {
    selectProductIds: number[];
    // 判斷是一般訂單購物車 還是 訂製門扇
    currentTab: string;
    // 訂單狀態
    currentStep: number;
}

const props = withDefaults(defineProps<Props>(), {
    selectProductIds: () => [],
    currentTab: "type1",
    currentStep: 0,
});

const { $utils } = useNuxtApp();

const shoppingCarStore = useShoppingCarStore();

// 購物車資料
const shoppingCar = computed(() => shoppingCarStore.shoppingCar);

// 總價
const total = computed(() =>
    _SumBy(
        _Filter(shoppingCar.value, (item: ShoppingCarInterface) => (item.id ? props.selectProductIds.includes(item.id) : false)),
        "totalPrice"
    )
);

// 折扣
const salePrice = computed(() => 1000);
</script>
