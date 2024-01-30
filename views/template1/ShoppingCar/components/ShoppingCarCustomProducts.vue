<template>
    <section>
        <el-checkbox-group
            v-model="checkList"
            @change="selectProduct"
        >
            <div
                v-for="(product, index) in shoppingCar"
                :key="index"
                class="flex border-gray-300 py-[40px]"
                :class="shoppingCar.length - 1 === index ? '' : 'border-b'"
            >
                <div class="relative w-[200px]">
                    <el-checkbox
                        class="absolute top-0"
                        :label="product.id"
                    />
                    <NuxtImg
                        class="ml-[36px] w-[180px] absolute top-0 h-auto inline-block"
                        :src="product.imgSrc"
                    />
                </div>
                <div class="flex-1 ml-[48px]">
                    <div class="flex w-full text-gray-800 mb-[13px]">
                        <h3 class="YaleSolisW-Bd font-medium text-[18px] flex-1">訂製-{{ product.name }}</h3>
                        <div>
                            <p class="font-medium YaleSolisW-Bd">NT$ {{ $utils().formatCurrency(product.price) }}</p>
                            <button
                                @click.prevent="setCustomProductOrderData(product)"
                                class="text-[14px] flex items-center underline"
                            >
                                <NuxtImg
                                    class="w-[16px] mr-1"
                                    src="img/shopping-car/shopping-car-icon-detail.svg"
                                />查看商品詳情
                            </button>
                        </div>
                    </div>
                    <div
                        class="flex text-gray-800 text-[14px] mb-[12px]"
                        v-for="(item, key) in shoppingCarDetail[index]"
                        :key="key"
                    >
                        <div
                            v-if="item.label"
                            class="w-[90px] mr-[8px]"
                        >
                            {{ item.label }}
                        </div>
                        <div v-if="key === 'doorGloup'">
                            <div
                                v-for="(item3, index3) in item"
                                class="mb-[12px]"
                            >
                                <div
                                    v-if="index3 === 'types'"
                                    class="flex"
                                >
                                    <div
                                        v-for="(item4, index4) in item3"
                                        class="flex"
                                    >
                                        <div class="w-[90px] mr-[8px]">{{ item4.label }}:</div>
                                        <div class="w-[90px] mr-[8px]">{{ item4.value ? "是" : "否" }}</div>
                                    </div>
                                </div>
                                <div
                                    v-if="index3 === 'size'"
                                    class="flex"
                                >
                                    <div class="w-[90px] mr-[8px]">{{ item3.label }}:</div>
                                    <div>
                                        <div>門高: {{ item3["height"] }}</div>
                                        <div>門寬: {{ item3["width"] }}</div>
                                        <div>門厚: {{ item3["bold"] }}</div>
                                    </div>
                                </div>
                                <div
                                    v-if="index3 === 'door'"
                                    class="flex"
                                >
                                    <div class="w-[90px] mr-[8px]">門扇:</div>
                                    <div>
                                        <div>{{ item3.title }}</div>
                                        <div>{{ item3.style }}</div>
                                        <div>{{ item3.color.text }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="key === 'doorOut'">
                            <div>
                                <div>{{ item.title }}</div>
                                <div>{{ item.style }}</div>
                                <div>{{ item.color.text }}</div>
                            </div>
                        </div>
                        <div v-if="['currentTool1', 'currentTool2'].includes(key)">{{ item.title }}</div>
                        <div v-show="['currentOther1', 'currentOther2', 'otherServices'].includes(key)">
                            <ul
                                v-if="item"
                                class="ml-2"
                            >
                                <li
                                    v-for="(item2, index2) in item.datas"
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
        <ShoppingCarCustomProductDetail
            ref="shoppingCarCustomProductDetailRefDom"
            :products="customProductOrderData"
        />
    </section>
</template>

<script setup lang="ts">
import { useShoppingCarStore } from "~/store/shoppingCarStore";
import ShoppingCarCustomProductDetail from "~/views/template1/ShoppingCar/components/ShoppingCarCustomProductDetail.vue";

const emit = defineEmits(["update:selectProductIds"]);

const { $shoppingCarService, $utils } = useNuxtApp();

const shoppingCarStore = useShoppingCarStore();

// 商品詳情 彈窗dom
const shoppingCarCustomProductDetailRefDom = ref<any>(null);

// 購物車資料
const shoppingCar = computed(() => shoppingCarStore.shoppingCar);
// 購物車資料連動造成效能問題 多一個變數儲存固定資料
const shoppingCarDetail = computed(() =>
    shoppingCarStore.shoppingCar.map((item: any) => {
        const obj: any = { doorGloup: item.doorGloup, doorOut: item.doorOut, currentTool1: item.currentTool1, currentTool2: item.currentTool2 };
        if (item.currentOther1) {
            obj.currentOther1 = item.currentOther1;
        }
        if (item.currentOther2) {
            obj.currentOther2 = item.currentOther2;
        }
        if (item.otherServices) {
            obj.otherServices = item.otherServices;
        }
        return obj;
    })
);
// 選中商品資料
const customProductOrderData = ref({});

/**
 * 設定選中商品詳情訂單資料
 * @param order 訂單資料
 */
function setCustomProductOrderData(order: any) {
    customProductOrderData.value = order;
    shoppingCarCustomProductDetailRefDom.value.openDialog();
}

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
    const count = shoppingCar.value[index].count;
    const singlePrice = shoppingCar.value[index].singlePrice;
    // 總價乘以數量得到 增加一個數量後的金額
    const price = singlePrice * count;
    shoppingCar.value[index].price = price;
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
