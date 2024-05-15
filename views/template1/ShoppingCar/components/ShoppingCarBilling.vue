<template>
    <div class="bg-gray-50 px-5 py-[20px] xl:px-[24px] sm:py-[24px] rounded-[20px]">
        <div class="flex text-gray-800 text-[14px] mb-[4px]">
            <span class="flex-1">小計</span>
            <span>NT$ {{ $utils().formatCurrency(total) }}</span>
        </div>
        <div v-if="userStore.isAuth && discountData.event?.length > 0" v-for="(item, index) in discountData.event.filter(item => item.type !== 'coupon')" :key="index" class="flex text-gray-800 text-[14px] mb-[4px]">
            <span class="flex-1">活動折扣({{ item.name }})</span>
            <span>-NT$ {{ $utils().formatCurrency(item.amount) }}</span>
        </div>
        <div v-else-if="userStore.isAuth" class="flex text-gray-800 text-[14px] mb-[4px]">
            <span class="flex-1">活動折扣</span>
            <span>-NT$ {{ $utils().formatCurrency(discountData.discount_amount) }}</span>
        </div>
        <div v-if="userStore.isAuth" class="flex text-gray-800 text-[14px]">
            <span class="flex-1">優惠券折扣</span>
            <!-- <span v-if="discountData.event.find(item => item.type === 'coupon')">({{ discountData.event.find(item => item.type === 'coupon').name }})</span> -->
            <span>-NT$ {{ $utils().formatCurrency(discountData.coupon_discount_amount) }}</span>
        </div>
        <div v-if="userStore.isAuth && currentTab === 'type1' && currentStep !== 0" class="flex text-gray-800 text-[14px] mt-[4px]">
            <span class="flex-1">運費</span>
            <span>NT$ {{ $utils().formatCurrency(shippingFee) }}</span>
        </div>
        <slot name="other"></slot>
        <div class="my-[20px] border-gray-300 border-b h-[1px] w-full"></div>
        <div
            class="flex text-gray-800"
            :class="currentStep === 0 ? 'text-[24px]' : currentTab === 'type1' ? 'text-[20px]' : 'text-[16px]'"
        >
            <span class="flex-1 font-medium YaleSolisW-Bd">總計</span>
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
        <span v-if="currentTab === 'type1' && currentStep === 1" class="flex text-red-500 text-[14px] mt-[14px] lg:mt-[20px]">買家須於7天内完成付款，若買家逾期未結帳付款，逾期訂單將被取消。</span>
        <span v-if="currentTab === 'type2' && currentStep === 1" class="flex text-red-500 text-[14px] mt-[14px] lg:mt-[20px]">買家須於7天内完成30%訂金付款，若買家逾期未結帳付款，逾期訂單將被取消。</span>
        <slot name="button"></slot>
    </div>
</template>

<script setup lang="ts">
import { ShoppingCarInterface } from "~/interface/shoppingCar";
import { useShoppingCarStore } from "~/store/shoppingCarStore";
import { useUserStore } from "~/store/userStore";

const userStore = useUserStore();

interface Props {
    selectProductIds: number[];
    // 判斷是一般訂單購物車 還是 訂製門扇
    currentTab: string;
    // 訂單狀態
    currentStep: number;
    discountData: {
        original_amount: string;
        after_discount_amount: string;
        coupon_discount_amount: string;
        event: any[];
    }
}

const props = withDefaults(defineProps<Props>(), {
    selectProductIds: () => [],
    currentTab: "type1",
    currentStep: 0,
    discountData: {
        original_amount: 0,
        after_discount_amount: 0,
        coupon_discount_amount: 0,
        event: []
    }
});

const { $utils } = useNuxtApp();

const shoppingCarStore = useShoppingCarStore();

// 一般購物車資料
const shoppingCar = computed(() => shoppingCarStore.shoppingCar);
// 一般購物車資料
const shoppingCustomCar = computed(() => shoppingCarStore.shoppingCustomCar);
// 運費
const shippingFee = computed(() => shoppingCarStore.shippingFee);

// 總價
const total = computed(() => {
    if (props.currentTab === "type1") {
        return _SumBy(
            _Filter(shoppingCar.value, (item: ShoppingCarInterface) => (item.id ? props.selectProductIds.includes(item.id) : false)),
            "totalPrice"
        );
    }
    return _SumBy(
        _Filter(shoppingCustomCar.value, (item: ShoppingCarInterface) => (item.id ? props.selectProductIds.includes(item.id) : false)),
        "totalPrice"
    );
});

// 折扣
const salePrice = computed(() => 0);
</script>
