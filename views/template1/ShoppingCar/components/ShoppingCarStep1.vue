<template>
    <div class="mr-[40px] flex-1">
        <ShoppingCarProducts
            v-if="currentTab === 'type1'"
            v-model:selectProductIds="selectProductIds"
        />
        <ShoppingCarCustomProducts
            v-else
            v-model:selectProductIds="selectProductIds"
        />
        <!-- <ShoppingCarStep2FormAddPriceToBuy
            v-if="currentTab === 'type1'"
            :products="addPriceBuyProducts"
            v-model:form="formAddPriceBuyProducts"
            v-model:selectProudctIds="selectAddPriceProductIds"
        /> -->

        <ShoppingCarSales />
        <div class="flex">
            <NuxtLink
                class="YaleSolisW-Rg text-[16px] flex items-center"
                :to="{ name: 'product-slug', params: { slug: '耶魯產品資訊-電子鎖-主鎖' }, query: { category: 1, tag: 1 } }"
            >
                <NuxtImg
                    class="w-[16px] h-[16px]"
                    src="/img/icons/post/arrow-prev.svg"
                />
                <span class="ml-[8px] leading-none">繼續購物</span>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
// 購物車商品
import ShoppingCarProducts from "~/views/template1/ShoppingCar/components/ShoppingCarProducts.vue";
// 訂製門扇商品
import ShoppingCarCustomProducts from "~/views/template1/ShoppingCar/components/ShoppingCarCustomProducts.vue";
// 折扣優惠
import ShoppingCarSales from "~/views/template1/ShoppingCar/components/ShoppingCarSales.vue";
// 加價購產品
import ShoppingCarStep2FormAddPriceToBuy from "~/views/template1/ShoppingCar/components/Step2Form/ShoppingCarStep2FormAddPriceToBuy.vue";

const emit = defineEmits(["update:selectProductIds"]);

const props = defineProps({
    currentTab: {
        type: String,
        default: "type1",
    },
});

// 購物車選中商品 id
const selectProductIds = ref<number[]>([]);

// 加價購產品
const addPriceBuyProducts = ref([
    {
        id: "id1",
        name: "質感托特包-1",
        colors: [
            {
                label: "紅色",
                value: "red",
            },
            {
                label: "黑色",
                value: "black",
            },
        ],
        // 商品價格
        price: 150,
        // 特價價格
        market_price: 100,
        count: 1,
    },
    {
        id: "id2",
        name: "質感托特包-2",
        colors: [
            {
                label: "紅色",
                value: "red",
            },
            {
                label: "黑色",
                value: "black",
            },
        ],
        // 商品價格
        price: 250,
        // 特價價格
        market_price: 150,
        count: 1,
    },
]);

// 加價購表單
const formAddPriceBuyProducts = ref([
    {
        id: "id1",
        color: "red",
        count: 1,
    },
    {
        id: "id2",
        color: "black",
        count: 2,
    },
]);

// 加價購商品選中 id
const selectAddPriceProductIds = ref<number | string[]>([]);

watch(
    () => selectProductIds.value,
    (val) => {
        emit("update:selectProductIds", val);
    }
);
</script>
