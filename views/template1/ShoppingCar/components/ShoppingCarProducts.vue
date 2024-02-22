<template>
    <section>
        <el-checkbox-group
            v-model="checkList"
            @change="selectProduct"
        >
            <div
                v-for="(product, index) in shoppingCar"
                :key="index"
                class="flex border-gray-300 gap-[12px] sm:gap-[48px] py-[16px] sm:py-[30px]"
                :class="shoppingCar.length - 1 === index ? '' : index === 0 ? 'pt-0 border-b' : 'border-b'"
            >
                <div class="flex gap-[8px] sm:gap-2">
                    <el-checkbox
                        :key="product.id"
                        :label="product.id"
                    />
                    <NuxtImg
                        class="w-[100px] h-[100px] sm:w-[180px] sm:h-[180px] aspect-square object-cover"
                        :src="product.imgSrc"
                    />
                </div>
                <div class="flex-1">
                    <div class="flex w-full gap-4 text-gray-800">
                        <h3 class="YaleSolisW-Bd font-medium text-[16px] sm:text-[18px] flex-1">{{ product.name }}-{{ product.id }}</h3>
                        <p class="hidden sm:block font-medium YaleSolisW-Bd text-[18px]">NT$ {{ $utils().formatCurrency(product.totalPrice) }}</p>
                    </div>
                    <div
                        v-if="product.color"
                        class="flex gap-4 text-gray-800 items-center mt-[12px]"
                    >
                        <p class="w-[90px] text-[14px]">顏色</p>
                        <p class="text-[14px]">{{ product.color }}</p>
                    </div>
                    <div class="flex gap-[36px] sm:gap-[18px] justify-end mt-[16px]">
                        <div class="flex flex-1 justify-center items-stretch sm:flex-initial w-[150px] sm:w-[150px] border border-gray-300 rounded-full">
                            <button
                                class="flex items-center text-[16px] justify-center flex-1 h-auto cursor-pointer"
                                @click.prevent="countUpdate(product.id, product.count - 1)"
                            >
                                <el-icon><Minus /></el-icon>
                            </button>
                            <div class="flex items-center justify-center w-[80px] py-[4px] sm:py-[10px] h-full">{{ product.count }}</div>
                            <button
                                class="flex items-center text-[16px] justify-center flex-1 h-auto cursor-pointer"
                                @click.prevent="countUpdate(product.id, product.count + 1)"
                            >
                                <el-icon><Plus /></el-icon>
                            </button>
                        </div>
                        <button @click.prevent="removeShoppingCar(product.id)">
                            <NuxtImg
                                class="w-[22px] sm:w-[24px]"
                                src="/img/shopping-car/shopping-car-icon-delete.svg"
                            />
                        </button>
                    </div>
                    <div class="sm:hidden mt-[16px] font-medium YaleSolisW-Bd text-[16px]">NT$ {{ $utils().formatCurrency(product.totalPrice) }}</div>
                </div>
            </div>
        </el-checkbox-group>
    </section>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ReqCart } from "~/api/cart";
import { useShoppingCarStore } from "~/store/shoppingCarStore";

const emit = defineEmits(["update:selectProductIds"]);

const shoppingCarStore = useShoppingCarStore();
const { updateCart, getUserShopping, deleteCart } = shoppingCarStore;
const { shoppingCar } = storeToRefs(shoppingCarStore);

// 選中資料
const checkList: Ref<number[]> = ref([]);

/**
 * 點擊更新數量按鈕
 */
function countUpdate(cartId: number | null, count: number) {
    if (count < 1) {
        return;
    }
    const apiReq = {
        cart_item_id: cartId ? cartId : 0,
        quantity: count,
    };
    updateCart(apiReq);
}

/**
 * 刪除購物車
 */
function removeShoppingCar(id: number | null) {
    const req: ReqCart = {
        cart_item_id: id ? id : 0,
    };
    deleteCart(req);
}

/**'
 * 選擇商品事件
 */
function selectProduct(id: number) {
    emit("update:selectProductIds", id);
}

const init = async () => {
    await getUserShopping();
    // const storageShoppingCart = $shoppingCarService().getShoppingCar();
    // // 當購物車不為空時執行
    // if (storageShoppingCart !== null) {
    //     // 購物車資料(過濾購物車重複資料)
    //     setShoppingCar(storageShoppingCart);
    //     // 設定購物車商品全選
    //     checkList.value = shoppingCar.value.map((item) => item.id);
    //     // 選中商品參數傳給母組件
    //     emit("update:selectProductIds", checkList.value);
    // } else {
    //     shoppingCarStore.setShoppingCar([]);
    // }
};

onMounted(() => {
    init();
});
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
