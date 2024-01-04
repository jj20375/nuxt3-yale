<template>
    <div class="flex">
        <div class="mr-[40px] flex-1">
            <ShoppingCarProducts v-model:selectProductIds="selectProductIds" />
            <ShoppingCarSales />
            <div class="mb-[100px]">
                <NuxtLink
                    class="YaleSolisW-Rg text-[16px] flex items-center"
                    :to="{ name: 'product-slug', params: { slug: '耶魯產品資訊-電子鎖-主鎖' }, query: { category: 'id1', tag: 'id1' } }"
                >
                    <NuxtImg
                        class="w-[20px]"
                        src="/img/icons/post/arrow-prev.svg"
                    />
                    <span class="ml-[8px]">繼續購物</span>
                </NuxtLink>
            </div>
        </div>
        <div class="mt-[40px]">
            <ShoppingCarInputCoupon />
            <ShoppingCarBilling :selectProductIds="selectProductIds">
                <template #button>
                    <div class="mt-[40px]">
                        <button
                            @click="emit('update:step', '1')"
                            class="bg-yellow-600 w-[339px] py-[17px] rounded-full text-gray-800 text-[16px] text-center"
                        >
                            下一步
                        </button>
                    </div>
                </template>
            </ShoppingCarBilling>
        </div>
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

const emit = defineEmits(["update:step"]);

// 購物車選中商品 id
const selectProductIds = ref<number[]>([]);
</script>
