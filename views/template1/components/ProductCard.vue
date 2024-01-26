<template>
    <div>
        <div
            class="relative product-card bg-white rounded-2xl"
            @mouseover="mouseoverEvent(product.id)"
            @mouseleave="mouseleaveEvent(product.id)"
        >
            <div class="flex justify-center items-center">
                <NuxtLink :to="{ name: 'product-detail-slug', params: { slug: product.name }, query: { id: product.id, breadcrumbs: JSON.stringify(breadcrumbs) } }">
                    <NuxtImg
                        class="object-cover h-full w-full rounded-2xl aspect-square"
                        :src="product.main_image"
                    />
                </NuxtLink>
            </div>
            <div
                :class="currentHover === product.id ? 'opacity-100' : 'opacity-0'"
                class="absolute top-0 flex items-end w-full h-full transition-all duration-500 pointer-events-none z-0"
            >

                <div class="absolute z-20 mb-[40px] w-full text-center pointer-events-auto">
                    <div>
                        <button
                            @click="addToShoppingCar(product)"
                            class="yellow-btn btn-sm !py-2"
                        >
                            加入購物車
                        </button>
                    </div>
                    <div>
                        <NuxtLink :to="{ name: 'product-detail-slug', params: { slug: product.name }, query: { id: product.id, breadcrumbs: JSON.stringify(breadcrumbs) } }">
                            <button class="z-10 mt-2 gray-btn btn-sm !py-2">了解更多</button>
                        </NuxtLink>
                    </div>
                </div>
                <div class="absolute top-0 left-0 z-10 w-full h-full bg-white opacity-20 rounded-2xl"></div>
            </div>
            <div class="absolute favorite w-[30px] h-[30px] text-gray-300 top-[16px] right-[16px] cursor-pointer z-50 duration-300 transition-all" :class="isFavorite === true ? 'opacity-100': 'opacity-0' " @click="handleFavorite">
                <template v-if="isFavorite">
                    <NuxtImg class="absolute w-[30px] h-[30px] left-0 top-0 z-20" src="/img/icons/favorite-fill.svg"/>
                </template>
                <template v-else>
                    <NuxtImg class="absolute w-[30px] h-[30px] left-0 top-0 z-20" src="/img/icons/favorite-hollow.svg"/>
                </template>
            </div>
        </div>
        <NuxtLink :to="{ name: 'product-detail-slug', params: { slug: product.name }, query: { id: product.id, breadcrumbs: JSON.stringify(breadcrumbs) } }">
            <h3 class="pt-[16px] text-[20px] font-medium YaleSolisW-Bd">{{ product.model }}</h3>
            <h3 class="text-[15px] font-[400] YaleSolisW-Lt mt-1.5 truncate">{{ product.name }}</h3>
            <div class="flex mt-1.5">
                <span class="mr-[8px] font-medium YaleSolisW-Bd">NT${{ $utils().formatCurrency(product.price) }}</span>
                <span class="text-gray-400 line-through YaleSolisW-Lt">NT${{ $utils().formatCurrency(product.market_price) }}</span>
            </div>
        </NuxtLink>
        <AddToShoppingCarDialog v-model:showDialog="showDialog" />
    </div>
</template>

<script lang="ts" setup>
import AddToShoppingCarDialog from "~/views/template1/components/AddToShoppingCarDialog.vue";

const { $utils } = useNuxtApp();
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

const { $shoppingCarService } = useNuxtApp();

// 判斷是否為喜愛項目
const isFavorite = ref(false);

// TODO 待完成
const handleFavorite = () => {
    isFavorite.value =!isFavorite.value;
}

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
        $shoppingCarService().addToShoppingCar({ ...data, mark: "YDM 4109A", name: "指紋密碼鑰匙三合一", price: 1760, color: "黑色", imgSrc: "/img/home/product/product1.jpg", count: 1, singlePrice: 1760 });
    }
}
</script>

<style>
.product-card{
    &:hover{
        .favorite{
            @apply opacity-100 duration-300 transition-all;
        }
    }
}
</style>