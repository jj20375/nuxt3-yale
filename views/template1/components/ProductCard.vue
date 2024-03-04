<template>
    <div>
        <div
            class="relative bg-white cursor-pointer product-card rounded-2xl"
            @mouseover="mouseoverEvent(product.id)"
            @mouseleave="mouseleaveEvent(product.id)"
        >
            <NuxtLink @click="goToDetail({ name: product.name, id: product.id })">
                <NuxtImg
                    class="object-cover w-full h-full rounded-2xl aspect-square"
                    :src="product.main_image"
                />
                <div class="absolute bottom-[15px] sm:bottom-[20px] left-[15px] sm:left-[20px] flex gap-2">
                    <div
                        v-if="product.tags?.includes('new')"
                        class="bg-yellow-500 text-[11px] sm:text-[12px] px-1 sm:px-2 py-0.5 sm:py-1 rounded-md"
                    >
                        NEW
                    </div>
                    <div
                        v-if="product.tags?.includes('discount')"
                        class="bg-pink-400 text-[11px] sm:text-[12px] px-1 sm:px-2 py-0.5 sm:py-1 rounded-md"
                    >
                        SALE
                    </div>
                </div>
            </NuxtLink>
            <div
                :class="currentHover === product.id ? 'opacity-100' : 'opacity-0'"
                class="absolute top-0 z-0 items-end hidden w-full h-full transition-all duration-500 pointer-events-none xl:flex"
            >
                <div class="absolute z-20 bottom-[40px] w-full text-center pointer-events-auto">
                    <div>
                        <button
                            @click="addToShoppingCar(product)"
                            class="yellow-btn btn-sm !py-2"
                        >
                            加入購物車
                        </button>
                    </div>
                    <div>
                        <NuxtLink @click="goToDetail({ name: product.name, id: product.id })">
                            <button class="z-10 mt-2 gray-btn btn-sm !py-2">了解更多</button>
                        </NuxtLink>
                    </div>
                </div>
                <div
                    class="absolute top-0 left-0 z-10 w-full h-full bg-white opacity-80 rounded-2xl"
                    @click="goToDetail({ name: product.name, id: product.id })"
                ></div>
            </div>
            <div
                class="hidden xl:block absolute favorite w-[30px] h-[30px] text-gray-300 top-[16px] right-[16px] cursor-pointer z-50 duration-300 transition-all"
                :class="isFavorite === true ? 'opacity-100' : 'opacity-0'"
                @click="handleFavorite"
            >
                <template v-if="isFavorite">
                    <NuxtImg
                        class="absolute w-[30px] h-[30px] left-0 top-0 z-20"
                        src="/img/icons/favorite-fill.svg"
                    />
                </template>
                <template v-else>
                    <NuxtImg
                        class="absolute w-[30px] h-[30px] left-0 top-0 z-20"
                        src="/img/icons/favorite-hollow.svg"
                    />
                </template>
            </div>
        </div>
        <NuxtLink @click="goToDetail({ name: product.name, id: product.id })">
            <h3 class="pt-[16px] text-[20px] text-center xl:text-start font-medium YaleSolisW-Bd line-clamp-1">{{ product.model }}</h3>
            <h3 class="text-[15px] font-[400] text-center xl:text-start YaleSolisW-Lt mt-1.5 line-clamp-1">{{ product.name }}</h3>
            <div class="flex mt-1.5 md:gap-[8px] flex-col md:flex-row justify-center xl:justify-start items-center">
                <span class="font-medium YaleSolisW-Bd">NT${{ $utils().formatCurrency(product.price) }}</span>
                <span class="text-gray-400 line-through YaleSolisW-Lt">NT${{ $utils().formatCurrency(product.market_price) }}</span>
            </div>
        </NuxtLink>
        <AddToShoppingCarDialog v-model:showDialog="showDialog" />
    </div>
</template>

<script lang="ts" setup>
import AddToShoppingCarDialog from "~/views/template1/components/AddToShoppingCarDialog.vue";
import { useUserStore } from "~/store/userStore";
const userStore = useUserStore();

import { useShoppingCarStore } from "~/store/shoppingCarStore";
const shoppingCarStore = useShoppingCarStore();

import { storeToRefs } from "pinia";
import { ShoppingCarInterface } from "~/interface/shoppingCar";
import { ElMessage } from "element-plus";
const { isAuth } = storeToRefs(userStore);

const router = useRouter();

const { $api, $utils, $shoppingCarService } = useNuxtApp();

interface Props {
    product: { id: number; [key: string]: any };
    // 麵包屑
    breadcrumbs: { name: string; text: string; params?: { slug: string } }[];
}
const props: Props = withDefaults(defineProps<Props>(), {
    product: () => {
        return {
            id: 1,
        };
    },
    // 麵包屑
    breadcrumbs: () => [
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

const emit = defineEmits(["handleFavorite"]);

// 判斷是否為喜愛項目
const isFavorite = computed(() => {
    return props.product.is_favorite;
});

const handleFavorite = async () => {
    if (isAuth.value) {
        emit("handleFavorite", props.product.id);
    } else {
        alert("請先登入或註冊新帳號以便管理您的收藏！");
    }
};

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
    // 判斷有多商品型號時 跳轉商品細節頁
    if (data.is_single_variation === 0) {
        ElMessage({ type: "warning", message: "請選擇商品規格加入購物車" });
        goToDetail({ name: data.name, id: data.id });
        return;
    }
    const input: ShoppingCarInterface = {
        id: null,
        productID: data.id,
        name: data.name,
        imgSrc: data.main_image,
        count: 1,
        price: data.price,
        totalPrice: data.price * 1,
    };
    shoppingCarStore
        .addToCart(input)
        .then(() => {
            showDialog.value = true;
        })
        .catch((err) => {
            console.log("err", err);
            if (err) {
                alert(err);
                return;
            }
        });
}

/**
 * 細節頁
 */
function goToDetail(product: { name: string; id: number }) {
    $utils().saveBreadcrumbsData(JSON.stringify(props.breadcrumbs));
    router.push({
        name: "product-detail-slug",
        params: { slug: product.name },
        query: { id: product.id },
    });
}
</script>

<style>
.product-card:hover {
    .favorite {
        @apply opacity-100 duration-300 transition-all;
    }
}
</style>
