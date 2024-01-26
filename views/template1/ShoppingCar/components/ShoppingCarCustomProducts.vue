<template>
    <section>
        <el-checkbox-group
            v-model="checkList"
            @change="selectProduct"
        >
            <div
                v-for="(product, index) in shoppingCar"
                :key="index"
                class="flex items-center border-gray-300 py-[40px]"
                :class="shoppingCar.length - 1 === index ? '' : 'border-b'"
            >
                <div class="flex">
                    <el-checkbox :label="product.id" />
                    <NuxtImg
                        class="w-[180px]"
                        :src="product.imgSrc"
                    />
                    {{ isMobile }}
                </div>
                <div class="flex-1 ml-[48px]">
                    <div class="flex w-full text-gray-800">
                        <h3 class="YaleSolisW-Bd font-medium text-[18px] flex-1">訂製-{{ product.name }}</h3>
                        <p class="font-medium YaleSolisW-Bd">NT$ {{ $utils().formatCurrency(product.price) }}</p>
                    </div>
                    <div
                        class="flex"
                        v-for="(item, key) in shoppingCar[index]"
                    >
                        <div class="w-[90px]">
                            {{ item.label }}
                        </div>
                        <div v-show="['door', 'doorOut', 'currentTool1', 'currentTool2'].includes(key)">
                            {{ item.title }}
                        </div>
                        <div v-show="['currentOther1', 'currentOther2', 'otherServices'].includes(key)">
                            <ul class="ml-2">
                                <li
                                    v-for="(item2, index2) in shoppingCar[index][key]"
                                    class="list-disc list-inside"
                                >
                                    {{ item2.name }}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="flex justify-end">
                        <div class="flex justify-center items-center w-[150px] border border-gray-300 px-[2px] py-[10px] rounded-full mr-[18px]">
                            <div
                                class="flex items-center cursor-pointer"
                                @click="countDelete(index)"
                            >
                                <el-icon><Minus /></el-icon>
                            </div>
                            <div class="w-[88px] h-[28px] text-center flex items-center justify-center">{{ product.count }}</div>
                            <div
                                class="flex items-center cursor-pointer"
                                @click="countAdd(index)"
                            >
                                <el-icon><Plus /></el-icon>
                            </div>
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
import { useShoppingCarStore } from "~/store/shoppingCarStore";

const emit = defineEmits(["update:selectProductIds"]);

const { isMobile } = useWindowResize();

const { $shoppingCarService, $utils } = useNuxtApp();

const shoppingCarStore = useShoppingCarStore();

// 購物車資料
const shoppingCar = computed(() => shoppingCarStore.shoppingCar);

// 選中資料
const checkList = ref([]);

/**
 * 點擊刪除數量按鈕
 */
function countDelete(index: number) {
    if (shoppingCar.value[index].count <= 1) {
        shoppingCar.value[index].count = 1;
        return;
    }

    // 總價除以數量得到 刪除一個數量後的金額
    shoppingCar.value[index].count--;
    shoppingCar.value[index].price = shoppingCar.value[index].singlePrice * shoppingCar.value[index].count;
    $shoppingCarService().setCustomProductShoppingCar(shoppingCar.value);
    shoppingCarStore.setShoppingCar($shoppingCarService().getCustomProductShoppingCar());
}
/**
 * 點擊增加數量按鈕
 */
function countAdd(index: number) {
    shoppingCar.value[index].count++;
    // 總價乘以數量得到 增加一個數量後的金額
    shoppingCar.value[index].price = shoppingCar.value[index].singlePrice * shoppingCar.value[index].count;
    $shoppingCarService().setCustomProductShoppingCar(shoppingCar.value);
    shoppingCarStore.setShoppingCar($shoppingCarService().getCustomProductShoppingCar());
}

/**
 * 刪除購物車
 */
function removeShoppingCar(index: number) {
    $shoppingCarService().removeCustomProductSingleShoppingCarProduct(index);
    init();
}

/**'
 * 選擇商品事件
 */
function selectProduct(val) {
    emit("update:selectProductIds", val);
}

function init() {
    // 瀏覽器才執行
    if (process.client) {
        // 當購物車不為空時執行
        if ($shoppingCarService().getCustomProductShoppingCar() !== null) {
            // 購物車資料(過濾購物車重複資料)
            shoppingCarStore.setShoppingCar($shoppingCarService().getCustomProductShoppingCar());
            // 設定購物車商品全選
            checkList.value = shoppingCar.value.map((item: any) => item.id);
            // 選中商品參數傳給母組件
            emit("update:selectProductIds", checkList.value);
        } else {
            shoppingCarStore.setShoppingCar([]);
        }
    }
}

init();
</script>

<style lang="scss" scoped>
:deep {
    .el-checkbox-group {
        @apply text-base leading-normal #{!important};
    }
    .is-checked {
        .el-checkbox__inner {
            @apply bg-yellow-600 border-yellow-600 #{!important};
        }
    }
    .el-checkbox__label {
        @apply hidden #{!important};
    }
}
</style>
