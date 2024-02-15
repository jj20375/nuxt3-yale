<template>
    <section>
        <el-checkbox-group
            v-model="checkList"
            @change="selectProduct"
        >
            {{ shoppingCar }}
            <div
                v-for="(product, index) in shoppingCar"
                :key="index"
                class="flex border-gray-300 gap-[48px] py-[30px]"
                :class="shoppingCar.length - 1 === index ? '' : index === 0 ? 'pt-0' : 'border-b'"
            >
                <div class="flex gap-2">
                    <el-checkbox
                        :key="product.id"
                        :label="product.id"
                    />
                    <NuxtImg
                        class="w-[180px] aspect-square object-cover"
                        :src="product.imgSrc"
                    />
                </div>
                <div class="flex-1">
                    <div class="flex gap-4 w-full text-gray-800">
                        <h3 class="YaleSolisW-Bd font-medium text-[18px] flex-1">{{ product.mark + product.name }}-{{ product.id }}</h3>
                        <p class="font-medium YaleSolisW-Bd text-[18px]">NT$ {{ $utils().formatCurrency(product.totalPrice) }}</p>
                    </div>
                    <div
                        v-if="product.color"
                        class="flex gap-4 text-gray-800 items-center mt-[12px]"
                    >
                        <p class="w-[90px] text-[14px]">顏色</p>
                        <p class="text-[14px]">{{ product.color }}</p>
                    </div>
                    <div class="flex gap-[18px] justify-end">
                        <div class="flex justify-center items-stretch w-[150px] border border-gray-300 rounded-full">
                            <button
                                class="flex-1 flex items-center justify-center cursor-pointer h-auto"
                                @click.prevent="countDelete(index)"
                            >
                                <el-icon><Minus /></el-icon>
                            </button>
                            <div class="flex items-center justify-center w-[80px] py-[10px] h-full">{{ product.count }}</div>
                            <button
                                class="flex-1 flex items-center justify-center cursor-pointer h-auto"
                                @click.prevent="countAdd(index)"
                            >
                                <el-icon><Plus /></el-icon>
                            </button>
                        </div>
                        <button @click.prevent="removeShoppingCar(index)">
                            <NuxtImg
                                class="w-[24px]"
                                src="/img/shopping-car/shopping-car-icon-delete.svg"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </el-checkbox-group>
    </section>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useShoppingCarStore } from "~/store/shoppingCarStore";

const emit = defineEmits(["update:selectProductIds"]);

const { $shoppingCarService, $utils } = useNuxtApp();

const shoppingCarStore = useShoppingCarStore();
const { setShoppingCar, getUserShopping } = shoppingCarStore;
const { shoppingCar } = storeToRefs(shoppingCarStore);

// 選中資料
const checkList: Ref<number[]> = ref([]);

/**
 * 點擊刪除數量按鈕
 */
function countDelete(index: number) {
    const item = shoppingCar.value[index];
    if (item.count <= 1) {
        item.count = 1;
        return;
    }

    // 總價除以數量得到 刪除一個數量後的金額
    item.count--;
    item.totalPrice = item.price * item.count;
}

/**
 * 點擊增加數量按鈕
 */
function countAdd(index: number) {
    const item = shoppingCar.value[index];
    item.count++;
    // 總價乘以數量得到 增加一個數量後的金額
    item.totalPrice = item.price * item.count;
}

/**
 * 刪除購物車
 */
function removeShoppingCar(index: number) {
    $shoppingCarService().removeSingleShoppingCarProduct(index);
    init();
}

/**'
 * 選擇商品事件
 */
function selectProduct(id: number) {
    emit("update:selectProductIds", id);
}

const init = () => {
    getUserShopping();
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
