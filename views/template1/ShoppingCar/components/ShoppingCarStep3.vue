<template>
    <div class="flex">
        <div>step3</div>
    </div>
</template>

<script setup lang="ts">
// 購物車商品
import ShoppingCarProducts from "~/views/template1/ShoppingCar/components/ShoppingCarProducts.vue";
// 折扣優惠
import ShoppingCarSales from "~/views/template1/ShoppingCar/components/ShoppingCarSales.vue";
// 輸入優惠券
import ShoppingCarInputCoupon from "~/views/template1/ShoppingCar/components/ShoppingCarInputCoupon.vue";
// 訂單金額
import ShoppingCarBilling from "~/views/template1/ShoppingCar/components/ShoppingCarBilling.vue";

// 購物車選中商品 id
const selectProductIds = ref<number[]>([]);
</script>
