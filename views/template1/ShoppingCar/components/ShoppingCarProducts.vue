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
                        v-if="cart.is_add_on_purchase == 0"
                        :key="cart.productID"
                        :label="cart.id"
                    />
                    <div
                        class="w-[18px]"
                        v-else
                    ></div>
                    <NuxtImg
                        class="w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] lg:w-[180px] lg:h-[180px] aspect-square object-cover cursor-pointer"
                        v-if="cart.imgSrc"
                        :src="cart.imgSrc"
                        @click="
                            router.push({
                                name: 'product-detail-slug-id',
                                params: { slug: cart.name, id: cart.productID },
                            })
                        "
                    />
                </div>
                <div class="flex-1">
                    <div
                        class="flex justify-between w-full gap-4 text-gray-800 cursor-pointer"
                        @click="
                            router.push({
                                name: 'product-detail-slug-id',
                                params: { slug: cart.name, id: cart.productID },
                            })
                        "
                    >
                        <div>
                            <div
                                v-if="cart.is_add_on_purchase == 1"
                                class="inline-block mb-2 bg-yellow-500 text-[12px] px-2 py-1 rounded-md"
                            >
                                加價購
                            </div>
                            <h3 class="YaleSolisW-Bd font-medium text-[16px] sm:text-[18px]">{{ cart.name }}</h3>
                        </div>
                        <p
                            v-if="cart.is_add_on_purchase == 0"
                            class="hidden sm:block font-medium YaleSolisW-Bd text-[18px] whitespace-nowrap"
                        >
                            NT$ {{ $utils().formatCurrency(cart.totalPrice) }}
                        </p>
                        <div
                            v-else
                            class="flex mt-[8px] gap-[12px]"
                        >
                            <div class="hidden sm:block font-medium YaleSolisW-Bd text-[18px] whitespace-nowrap line-through">NT${{ $utils().formatCurrency(cart.market_price_total) }}</div>
                            <p class="hidden text-pink-900 sm:block font-medium YaleSolisW-Bd text-[18px] whitespace-nowrap">加購價 NT$ {{ $utils().formatCurrency(cart.totalPrice) }}</p>
                        </div>
                    </div>
                    <template
                        v-for="(item, index) in cart.productVariationable"
                        :key="index"
                    >
                        <div class="flex gap-4 text-gray-800 items-center mt-[12px]">
                            <p class="w-[40px] sm:w-[90px] text-[14px]">{{ item.label }}</p>
                            <p class="text-[14px]">{{ item.value }}</p>
                        </div>
                    </template>
                    <!-- <div
                        v-if="cart.colorName"
                        class="flex gap-4 text-gray-800 items-center mt-[12px]"
                    >
                        <p class="w-[40px] sm:w-[90px] text-[14px]">顏色</p>
                        <p class="text-[14px]">{{ cart.colorName }}</p>
                    </div> -->
                    <div class="flex gap-4 sm:gap-[18px] justify-end mt-[16px]">
                        <div class="flex flex-1 justify-center items-stretch sm:flex-initial w-[150px] sm:w-[150px] border border-gray-300 rounded-full">
                            <button
                                class="flex items-center text-[16px] justify-center flex-1 h-auto cursor-pointer disabled:cursor-not-allowed"
                                :disabled="cart.count <= 1 || loading"
                                @click.prevent="countUpdate(index, cart.id, cart.productID, false, cart.product_variationable_id)"
                            >
                                <el-icon><Minus /></el-icon>
                            </button>
                            <div class="flex items-center justify-center w-[60px] sm:w-[80px] py-[4px] sm:py-[10px] h-full">{{ cart.count }}</div>
                            <button
                                class="flex items-center text-[16px] justify-center flex-1 h-auto cursor-pointer disabled:cursor-not-allowed"
                                :disabled="cart.stock <= cart.count || loading || (cart.max <= cart.count && cart.is_add_on_purchase == 1)"
                                @click.prevent="countUpdate(index, cart.id, cart.productID, true, cart.product_variationable_id)"
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
                    <div
                        v-if="cart.stock <= cart.count"
                        class="mt-1 text-right text-red-500"
                    >
                        庫存數量只剩下{{ cart.stock }}
                    </div>
                    <div
                        v-if="cart.is_add_on_purchase == 0"
                        class="sm:hidden mt-[16px] font-medium YaleSolisW-Bd text-[16px]"
                    >
                        NT$ {{ $utils().formatCurrency(cart.totalPrice) }}
                    </div>
                    <div
                        v-else
                        class="flex mt-[8px] gap-[12px]"
                    >
                        <div class="sm:hidden mt-[16px] font-medium YaleSolisW-Bd text-[16px] line-through">NT${{ $utils().formatCurrency(cart.market_price_total) }}</div>
                        <div class="text-pink-900 sm:hidden mt-[16px] font-medium YaleSolisW-Bd text-[16px]">NT$ {{ $utils().formatCurrency(cart.totalPrice) }}</div>
                    </div>
                </div>
            </div>
        </el-checkbox-group>
    </section>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useShoppingCarStore } from "~/store/shoppingCarStore";
import { useUserStore } from "~/store/userStore";
import { ElMessage } from "element-plus";

const emit = defineEmits(["update:selectProductIds", "productCountUpdate"]);

const shoppingCarStore = useShoppingCarStore();
const { updateCart, getUserShopping, deleteCart } = shoppingCarStore;
const { shoppingCar } = storeToRefs(shoppingCarStore);

const userStore = useUserStore();
const { isAuth } = storeToRefs(userStore);

const router = useRouter();

// 選中資料
const checkList: Ref<number[]> = ref([]);
const loading = ref(false);

/**
 * 點擊更新數量按鈕
 */
function countUpdate(index: number, cartId: number | null, productID: number, isAdd: boolean, product_variationable_id?: number | null) {
    if (shoppingCar.value[index].count < 1) {
        return;
    }
    if (isAdd) {
        shoppingCar.value[index].count++;
    } else {
        shoppingCar.value[index].count--;
    }

    console.log(cartId);

    shoppingCar.value.map((item, index2) => {
        console.log(item.parent_id, cartId);
        if (item.is_add_on_purchase == 1 && item.parent_id == cartId) {
            item.max = shoppingCar.value[index].count;
            if (item.count > shoppingCar.value[index].count) {
                item.count = shoppingCar.value[index].count;
                console.log(item);
                const apiReq = {
                    cart_item_id: item.id,
                    productID: item.productID,
                    product_variationable_id: item.product_variationable_id ? item.product_variationable_id : null,
                };
                updateCart({ ...apiReq, quantity: item.count })
                    .then(() => {
                        emit("productCountUpdate");
                        loading.value = false;
                    })
                    .catch((err) => {
                        console.log("err", err);
                        if (err) {
                            ElMessage({
                                type: "error",
                                message: err.message,
                            });
                            loading.value = false;
                            return;
                        }
                    });
            }
            item.totalPrice = item.price * item.count;
            console.log("item.market_price", item.market_price, item.count);
            item.market_price_total = item.market_price * item.count;
        }
        // countUpdate(index2, item.id, item.productID, true, item.product_variationable_id)
    });
    const apiReq = {
        cart_item_id: cartId ? cartId : 0,
        productID,
        product_variationable_id: product_variationable_id ? product_variationable_id : null,
    };
    shoppingCar.value[index].totalPrice = shoppingCar.value[index].price * shoppingCar.value[index].count;
    shoppingCar.value[index].market_price_total = shoppingCar.value[index].market_price * shoppingCar.value[index].count;

    // 防止連續點擊
    if (!loading.value) {
        loading.value = true;
        console.log("work loading", shoppingCar.value[index].count);
        updateCart({ ...apiReq, quantity: shoppingCar.value[index].count })
            .then(() => {
                emit("productCountUpdate");
                loading.value = false;
            })
            .catch((err) => {
                console.log("err", err);
                if (err) {
                    ElMessage({
                        type: "error",
                        message: err.message,
                    });
                    loading.value = false;
                    return;
                }
            });
    }
    // 等待 1秒鐘再更新就好 以防快速點擊
    // setTimeout(async () => {
    //     if (!loading.value) {
    //         loading.value = true;
    //         console.log("work loading", shoppingCar.value[index].count);
    //         await updateCart({ ...apiReq, quantity: shoppingCar.value[index].count }).catch((err) => {
    //             console.log("err", err);
    //             if (err) {
    //                 ElMessage({
    //                     type: "error",
    //                     message: err.message,
    //                 });
    //                 loading.value = false;
    //                 return;
    //             }
    //         });
    //         setTimeout(() => {
    //             emit("productCountUpdate");
    //             loading.value = false;
    //         }, 1000);
    //     }
    // }, 1000);
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
    console.log(id);
    checkList.value = checkList.value.filter((item) => item !== id);
    console.log(checkList.value);
    emit("update:selectProductIds", checkList.value);
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
    const selectIds: number[] = []
    shoppingCar.value.forEach(item => {
        if (item.is_add_on_purchase == 1 && id.includes(item.parent_id)) {
            selectIds.push(item.id)
        } else if (item.is_add_on_purchase == 0 && id.includes(item.id)) {
            selectIds.push(item.id)
        }
    })
    checkList.value = selectIds
    console.log(selectIds)

    emit("update:selectProductIds", selectIds);
};

watch(
    () => isAuth.value,
    async (newval, oldVal) => {
        await getUserShopping();
        await init();
    }
);

const init = async () => {
    await getUserShopping();

    // 設定購物車商品全選
    checkList.value = shoppingCar.value.map((item: any) => {
        return item.id;
    });
    // 選中商品參數傳給母組件
    emit("update:selectProductIds", checkList.value);
};

onMounted(() => {
    if (process.client) {
        init();
    }
});
</script>

<style lang="scss" scoped>
:deep(.el-checkbox-group) {
    @apply text-base leading-normal block #{!important};
}

:deep(.el-checkbox) {
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
</style>
