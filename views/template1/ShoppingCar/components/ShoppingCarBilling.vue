<template>
    <div class="bg-gray-50 px-[24px] pt-[24px] pb-[49px] rounded-[20px] mt-[20px]">
        <div class="flex text-gray-800 text-[14px] mb-[4px]">
            <span class="flex-1">小計</span>
            <span>NT$ {{ $utils().formatCurrency(total) }}</span>
        </div>
        <div class="flex text-gray-800 text-[14px] mb-[4px]">
            <span class="flex-1">活動折扣</span>
            <span>-NT$ {{ $utils().formatCurrency(salePrice) }}</span>
        </div>
        <div class="flex text-gray-800 text-[14px]">
            <span class="flex-1">優惠券折扣</span>
            <span>-NT$ {{ $utils().formatCurrency(salePrice) }}</span>
        </div>
        <div class="my-[20px] border-gray-300 border-b h-[1px] w-full"></div>
        <div class="flex text-gray-800">
            <span class="font-medium YaleSolisW-Bd text-[24px] flex-1">總計</span>
            <div class="flex items-center font-medium YaleSolisW-Bd">
                <span class="text-[16px] mr-[4px]">NT$ </span>
                <span class="text-[24px]">
                    {{ $utils().formatCurrency(total - salePrice - salePrice) }}
                </span>
            </div>
        </div>
        <div class="mt-[40px]">
            <button class="bg-yellow-600 w-[339px] py-[17px] rounded-full text-gray-800 text-[16px] text-center">下一步</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useShoppingCarStore } from "~/store/shoppingCarStore";

interface Props {
    selectProductIds: number[];
}

const props = withDefaults(defineProps<Props>(), {
    selectProductIds: [],
});

const { $utils } = useNuxtApp();

const shoppingCarStore = useShoppingCarStore();

// 購物車資料
const shoppingCar = computed(() => shoppingCarStore.shoppingCar);

// 總價
const total = computed(() =>
    _SumBy(
        _Filter(shoppingCar.value, (item) => props.selectProductIds.includes(item.id)),
        "price"
    )
);

// 折扣
const salePrice = computed(() => 1000);
</script>
