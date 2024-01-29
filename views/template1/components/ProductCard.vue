<template>
    <div>
        <div
            class="relative bg-white rounded-2xl"
            @mouseover="mouseoverEvent(product.id)"
            @mouseleave="mouseleaveEvent(product.id)"
        >
            <div class="flex justify-center items-center h-[441px]">
                <NuxtImg
                    class="max-w-[441px] px-5 h-full object-contain w-full rounded-2xl aspect-1/1"
                    :src="product.main_image"
                />
            </div>
            <div
                :class="currentHover === product.id ? 'opacity-100' : 'opacity-0'"
                class="absolute top-0 flex items-end w-full h-full transition-all duration-500"
            >
                <div class="absolute text-3xl text-gray-300 top-[12px] right-[20px]">
                    <font-awesome-icon :icon="['far', 'heart']" />
                </div>
                <div class="absolute z-50 mb-[40px] w-full text-center">
                    <div>
                        <button
                            @click="addToShoppingCar(product)"
                            class="yellow-btn btn-sm"
                        >
                            加入購物車
                        </button>
                    </div>
                    <div>
                        <NuxtLink :to="{ name: 'product-detail-slug', params: { slug: product.name }, query: { id: product.id, breadcrumbs: JSON.stringify(breadcrumbs) } }">
                            <button class="z-10 mt-2 gray-btn btn-sm">了解更多</button>
                        </NuxtLink>
                    </div>
                </div>
                <div class="absolute top-0 left-0 z-10 w-full h-full bg-white opacity-30 rounded-2xl"></div>
            </div>
        </div>
        <h3 class="mt-[16px] text-[20px] font-medium YaleSolisW-Bd">{{ product.model }}</h3>
        <h3 class="text-[14px] font-[400] YaleSolisW-Lt mt-1">{{ product.name }}</h3>
        <div class="flex mt-3">
            <span class="mr-[8px] font-medium YaleSolisW-Bd">NT${{ $utils().formatCurrency(product.price) }}</span>
            <span class="text-gray-400 line-through YaleSolisW-Lt">NT${{ $utils().formatCurrency(product.market_price) }}</span>
        </div>
        <AddToShoppingCarDialog v-model:showDialog="showDialog" />
    </div>
</template>

<script lang="ts" setup>
import AddToShoppingCarDialog from "~/views/template1/components/AddToShoppingCarDialog.vue";

const { $utils, $shoppingCarService } = useNuxtApp();
interface Props {
    product: { id: number; [key: string]: any };
    // 麵包屑
    breadcrumbs: { name: string; text: string; params?: { slug: string } }[];
}
const props: Props = withDefaults(defineProps<Props>(), {
    product: {
        id: 1,
    },
    // 麵包屑
    breadcrumbs: [
        {
            name: "index",
            text: "首頁",
        },
        {
            name: "product-slug",
            text: "產品資訊",
            params: { slug: "耶魯產品資訊" },
        },
    ],
});

// 判斷是否顯示彈窗
const showDialog = ref(false);

const currentHover = ref<null | number>(null);

function mouseoverEvent(index: number) {
    currentHover.value = index;
}

function mouseleaveEvent(index: number) {
    currentHover.value = null;
}
/**
 * 加入購物車
 */
function addToShoppingCar(data: any) {
    showDialog.value = true;
    console.log("addToShoppingCar => ", data);
    if (process.client) {
        $shoppingCarService().addToShoppingCar({ ...data, mark: "YDM 4109A", name: "指紋密碼鑰匙三合一", color: "黑色", imgSrc: "/img/home/product/product1.jpg", count: 1, singlePrice: 1760 });
    }
}
</script>
