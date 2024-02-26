<template>
    <section>
        <el-checkbox-group
            v-model="checkList"
            @change="selectProduct"
        >
            <div
                v-for="(product, index) in shoppingCar"
                :key="index"
                class="flex border-gray-300 gap-[48px] py-[30px] product-card"
                :class="shoppingCar.length - 1 === index ? '' : index === 0 ? 'pt-0 border-b' : 'border-b'"
            >
                <div class="flex gap-[30px]">
                    <el-checkbox :label="product.id" />
                    <NuxtImg
                        class="w-[180px] h-fit aspect-square object-cover"
                        :src="product.imgSrc"
                    />
                </div>
                <div class="flex-1">
                    <div class="flex w-full text-gray-800 mb-[12px] gap-4">
                        <h3 class="YaleSolisW-Bd font-medium text-[18px] flex-1">訂製-{{ product.name }}</h3>
                        <div class="flex flex-col items-end gap-2 cursor-pointer h-fit">
                            <p class="font-medium YaleSolisW-Bd">NT$ {{ $utils().formatCurrency(product.price) }}</p>
                        </div>
                    </div>
                    <div class="flex items-start justify-between gap-4 mb-4">
                        <div class="flex flex-col flex-1">
                            <div class="grid grid-cols-2 gap-4 text-gray-700 text-[14px]">
                                <template
                                    v-for="(item, key) in shoppingCarDetail[index]"
                                    :key="key"
                                >
                                    <div v-if="item && item.label">
                                        {{ item.label }}
                                    </div>
                                    <template v-if="key === 'doorGroup'">
                                        <template v-for="(item3, index3) in item">
                                            <template v-if="index3 === 'types'">
                                                <template v-for="(item4, index4) in item3">
                                                    <div>{{ item4.label }}</div>
                                                    <div>{{ item4.value ? "是" : "否" }}</div>
                                                </template>
                                            </template>
                                            <template v-if="index3 === 'size'">
                                                <div>{{ item3.label }}</div>
                                                <div class="flex flex-col gap-1">
                                                    <div>{{ item3.name }}</div>
                                                </div>
                                            </template>
                                            <template v-if="index3 === 'door'">
                                                <div>門扇</div>
                                                <div class="flex flex-col gap-1">
                                                    <div>{{ item3.title }}</div>
                                                    <div>{{ item3.style }}</div>
                                                    <div>{{ item3.color.text }}</div>
                                                </div>
                                            </template>
                                        </template>
                                    </template>
                                    <template v-if="item && key === 'doorOut'">
                                        <div class="flex flex-col gap-1">
                                            <div>{{ item.title }}</div>
                                            <div>{{ item.style }}</div>
                                            <div>{{ item.color.text }}</div>
                                        </div>
                                    </template>
                                    <template v-if="key === 'lock'">
                                        <div class="flex flex-col gap-1">
                                            <div>{{ item.name }}</div>
                                            <div>{{ item.model }}</div>
                                        </div>
                                    </template>
                                    <div v-if="item && ['currentTool1', 'currentTool2'].includes(key)">{{ item.title }}</div>
                                    <template v-if="item && ['currentOther1', 'currentOther2', 'otherServices'].includes(key)">
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
                                    </template>
                                </template>
                            </div>
                        </div>
                        <button
                            @click.prevent="setCustomProductOrderData(product)"
                            class="flex items-center"
                        >
                            <NuxtImg
                                class="w-[16px] mr-1"
                                src="img/shopping-car/shopping-car-icon-detail.svg"
                            />
                            <div class="text-[14px] underline underline-offset-2">查看商品詳情</div>
                        </button>
                    </div>
                    <div class="flex gap-[18px] justify-end">
                        <div class="flex justify-center items-stretch w-[150px] border border-gray-300 rounded-full">
                            <button
                                class="flex items-center justify-center flex-1 h-auto cursor-pointer"
                                @click.prevent="countDelete(index)"
                            >
                                <el-icon><Minus /></el-icon>
                            </button>
                            <div class="flex items-center justify-center w-[80px] py-[10px] h-full">{{ product.count }}</div>
                            <button
                                class="flex items-center justify-center flex-1 h-auto cursor-pointer"
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
        const obj: any = { doorGroup: item.doorGroup, doorOut: item.doorOut, lock: item.lock, currentTool1: item.currentTool1, currentTool2: item.currentTool2 };
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
        @apply text-base leading-normal block #{!important};
    }
    .el-checkbox {
        @apply h-[18px];
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

    .product-card {
        .grid {
            grid-template-columns: 120px 1fr;
        }
    }
}
</style>
