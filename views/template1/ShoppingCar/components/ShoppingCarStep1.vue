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
        <ShoppingCarStep2FormGift />
        <ShoppingCarSales
            :event="discountData.event"
            class="block mt-12 lg:hidden"
            v-if="currentTab === 'type1'"
        />
        <div class="flex">
            <NuxtLink
                v-if="currentTab === 'type1'"
                class="YaleSolisW-Rg text-[16px] flex items-center"
                :to="{ name: 'product-slug-category-tag', params: { slug: 'product', category: 1, tag: 1 } }"
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
                :to="{ name: 'custom-product-slug', params: { slug: '1' } }"
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
// 滿額贈
import ShoppingCarStep2FormGift from "~/views/template1/ShoppingCar/components/Step2Form/ShoppingCarStep2FormGift.vue";

const route = useRoute();
const emit = defineEmits(["update:selectProductIds", "productCountUpdate"]);
interface Props {
    currentTab: string;
    discountData: {
        original_amount: string;
        after_discount_amount: string;
        coupon_discount_amount: string;
        event: any[];
    };
}

const props = withDefaults(defineProps<Props>(), {
    currentTab: "type1",
    discountData: {
        original_amount: 0,
        after_discount_amount: 0,
        coupon_discount_amount: 0,
        event: [],
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

watch(
    () => props.currentTab,
    (val) => {
        selectProductIds.value = [];
        emit("update:selectProductIds", []);
    }
);

// 數量更新
const productCountUpdate = () => {
    emit("productCountUpdate");
};
</script>
