<template>
    <div class="lg:mr-[30px] xl:mr-[40px] flex-1">
        <ShoppingCarProducts
            v-if="currentTab === 'type1' && route.query.tab === 'type1'"
            @productCountUpdate="productCountUpdate"
            v-model:selectProductIds="selectProductIds"
        />
        <ShoppingCarCustomProducts
            v-else-if="currentTab === 'type2' && route.query.tab === 'type2'"
            v-model:selectProductIds="selectProductIds"
        />
        <div
            v-else
            class="flex justify-center"
        >
            <font-awesome-icon
                class="animate-spin text-[40px] text-gray-300"
                :icon="['fas', 'circle-notch']"
            />
        </div>
        <!-- todo 先隱藏 aaron -->
        <ShoppingCarSales v-if="currentTab === 'type1'" />
        <div class="flex">
            <NuxtLink
                v-if="currentTab === 'type1'"
                class="YaleSolisW-Rg text-[16px] flex items-center"
                :to="{ name: 'product-slug-category-tag', params: { slug: '產品資訊-電子鎖-主鎖', category: 1, tag: 1 } }"
            >
                <NuxtImg
                    class="w-[16px] h-[16px]"
                    src="/img/icons/post/arrow-prev.svg"
                />
                <span class="ml-[8px] leading-none">繼續購物</span>
            </NuxtLink>
            <NuxtLink
                v-else
                class="YaleSolisW-Rg text-[16px] flex items-center"
                :to="{ name: 'custom-product-slug', params: { slug: '訂製門扇' } }"
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

const route = useRoute();
const emit = defineEmits(["selectProduct", "productCountUpdate"]);

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
        emit("selectProduct", val);
    }
);

watch(
    () => props.currentTab,
    (val) => {
        selectProductIds.value = [];
        emit("selectProduct", []);
    }
);

// 數量更新
const productCountUpdate = () => {
    emit("productCountUpdate");
}
</script>
