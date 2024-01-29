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
</template>

<script setup lang="ts">
// 購物車商品
import ShoppingCarProducts from "~/views/template1/ShoppingCar/components/ShoppingCarProducts.vue";
// 訂製門扇商品
import ShoppingCarCustomProducts from "~/views/template1/ShoppingCar/components/ShoppingCarCustomProducts.vue";
// 折扣優惠
import ShoppingCarSales from "~/views/template1/ShoppingCar/components/ShoppingCarSales.vue";

const emit = defineEmits(["update:selectProductIds"]);

const props = defineProps({
    currentTab: {
        type: String,
        default: "type1",
    },
});

// 購物車選中商品 id
const selectProductIds = ref<number[]>([]);

watch(
    () => selectProductIds.value,
    (val) => {
        emit("update:selectProductIds", val);
    }
);
</script>
