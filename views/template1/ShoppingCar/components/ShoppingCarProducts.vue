<template>
    <section class="mb-6 lg:mb-0">
        <el-checkbox-group
            v-model="checkList"
            @change="selectProduct"
        >
            <div
                v-for="(cart, index) in shoppingCar"
                :key="index"
                class="flex border-gray-300 gap-[12px] sm:gap-4 lg:gap-[48px] py-4 sm:py-6 md:py-[30px]"
                :class="shoppingCar.length - 1 === index ? '' : index === 0 ? 'pt-0 border-b' : 'border-b'"
            >
                <div class="flex gap-2 sm:gap-4">
                    <el-checkbox
                        :key="cart.productID"
                        :label="cart.productID"
                    />
                    <NuxtImg
                        class="w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] lg:w-[180px] lg:h-[180px] aspect-square object-cover cursor-pointer"
                        :src="cart.imgSrc"
                        @click="
                            router.push({
                                name: 'product-detail-slug',
                                params: { slug: cart.name },
                                query: { id: cart.productID },
                            })
                        "
                    />
                </div>
                <div class="flex-1">
                    <div
                        class="flex justify-between w-full gap-4 text-gray-800 cursor-pointer"
                        @click="
                            router.push({
                                path: `/product/detail/${cart.name}`,
                                query: {
                                    id: cart.productID,
                                },
                            })
                        "
                    >
                        <h3 class="YaleSolisW-Bd font-medium text-[16px] sm:text-[18px]">{{ cart.name }}</h3>
                        <p class="hidden sm:block font-medium YaleSolisW-Bd text-[18px] whitespace-nowrap">NT$ {{ $utils().formatCurrency(cart.totalPrice) }}</p>
                    </div>
                    <div
                        v-if="cart.colorName"
                        class="flex gap-4 text-gray-800 items-center mt-[12px]"
                    >
                        <p class="w-[40px] sm:w-[90px] text-[14px]">顏色</p>
                        <p class="text-[14px]">{{ cart.colorName }}</p>
                    </div>
                    <div class="flex gap-4 sm:gap-[18px] justify-end mt-[16px]">
                        <div class="flex flex-1 justify-center items-stretch sm:flex-initial w-[150px] sm:w-[150px] border border-gray-300 rounded-full">
                            <button
                                class="flex items-center text-[16px] justify-center flex-1 h-auto cursor-pointer"
                                @click.prevent="countUpdate(index, cart.id, cart.productID, cart.count - 1, cart.product_variationable_id)"
                            >
                                <el-icon><Minus /></el-icon>
                            </button>
                            <div class="flex items-center justify-center w-[60px] sm:w-[80px] py-[4px] sm:py-[10px] h-full">{{ cart.count }}</div>
                            <button
                                class="flex items-center text-[16px] justify-center flex-1 h-auto cursor-pointer"
                                @click.prevent="countUpdate(index, cart.id, cart.productID, cart.count + 1, cart.product_variationable_id)"
                            >
                                <el-icon><Plus /></el-icon>
                            </button>
                        </div>
                        <button @click.prevent="removeShoppingCar(cart.id, cart.productID, cart.product_variationable_id)">
                            <NuxtImg
                                class="w-[22px] sm:w-[24px]"
                                src="/img/shopping-car/shopping-car-icon-delete.svg"
                            />
                        </button>
                    </div>
                    <div class="sm:hidden mt-[16px] font-medium YaleSolisW-Bd text-[16px]">NT$ {{ $utils().formatCurrency(cart.totalPrice) }}</div>
                </div>
            </div>
        </el-checkbox-group>
    </section>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useShoppingCarStore } from "~/store/shoppingCarStore";
import { useUserStore } from "~/store/userStore";

const emit = defineEmits(["update:selectProductIds"]);

const shoppingCarStore = useShoppingCarStore();
const { updateCart, getUserShopping, deleteCart } = shoppingCarStore;
const { shoppingCar } = storeToRefs(shoppingCarStore);

const userStore = useUserStore();
const { isAuth } = storeToRefs(userStore);

const router = useRouter();

// 選中資料
const checkList: Ref<number[]> = ref([]);

/**
 * 點擊更新數量按鈕
 */
function countUpdate(index: number, cartId: number | null, productID: number, count: number, product_variationable_id?: number | null) {
    if (count < 1) {
        return;
    }
    const apiReq = {
        cart_item_id: cartId ? cartId : 0,
        productID,
        quantity: count,
        product_variationable_id: product_variationable_id ? product_variationable_id : null,
    };
    shoppingCar.value[index].count = count;
    shoppingCar.value[index].totalPrice = shoppingCar.value[index].price * count;
    updateCart(apiReq).catch((err) => {
        console.log("err", err);
        if (err) {
            alert(err);
            return;
        }
    });
}

/**
 * 刪除購物車
 */
function removeShoppingCar(id: number | null, productID: number, product_variationable_id?: number | null) {
    const req = {
        cart_item_id: id ? id : 0,
        productID,
        product_variationable_id: product_variationable_id ? product_variationable_id : null,
    };
    deleteCart(req);
}

/**'
 * 選擇商品事件
 */
const selectProduct = (id: number) => {
    // if (!isAuth.value) {
    //     checkList.value = [];
    //     alert("請先登入");
    //     return;
    // }
    emit("update:selectProductIds", id);
};

const init = async () => {
    await getUserShopping();

    // 設定購物車商品全選
    checkList.value = shoppingCar.value.map((item: any) => {
        return item.productID;
    });
    // 選中商品參數傳給母組件
    emit("update:selectProductIds", checkList.value);
};

init();
onMounted(() => {});
</script>

<style lang="scss" scoped>
:deep {
    .el-checkbox-group {
        @apply text-base leading-normal block #{!important};
    }
    .el-checkbox {
        @apply w-[18px] h-[18px];
        .el-checkbox__label {
            @apply hidden #{!important};
        }
        .el-checkbox__inner {
            @apply w-[18px] h-[18px] #{!important};
            &:hover {
                @apply border-yellow-600;
            }
        }
        .is-checked {
            .el-checkbox__inner {
                @apply bg-yellow-600 border-yellow-600 after:h-[9px] after:left-[6px] after:top-[2px] #{!important};
            }
        }
    }
}
</style>
