<template>
    <div class="mb-6 lg:mb-0">
        <h5 class="bg-gray-50 py-[8px] pl-[16px] w-full">加價購</h5>
        <el-checkbox-group
            v-model="checkList"
            @change="selectGift"
        >
            <el-form>
                <div
                    v-for="(product, index) in products"
                    v-show="formData[index]"
                    class="flex gap-[12px] sm:gap-4 lg:gap-[48px] border-gray-300 py-4 sm:py-6 lg:py-[30px]"
                    :class="{ 'border-b': index !== products.length - 1 }"
                >
                    <div
                        class="flex gap-2 sm:gap-4 lg:gap-[36px]"
                        v-if="formData[index]"
                    >
                        <el-checkbox :label="product.id" />
                        <NuxtImg
                            class="w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] lg:w-[180px] lg:h-[180px] aspect-square object-cover"
                            src="/img/shopping-car/shopping-gift-demo-1.jpg"
                        />
                    </div>

                    <div
                        class="flex-1"
                        v-if="formData[index]"
                    >
                        <div class="flex mb-[12px]">
                            <h5 class="flex-1 text-[16px] sm:text-[18px] text-gray-800 font-medium YaleSolisW-Bd">{{ product.name }}</h5>
                            <div class="hidden sm:flex gap-3">
                                <p class="text-gray-400 line-through YaleSolisW-Lt mr-[4px]">NT${{ $utils().formatCurrency(product.price) }}</p>
                                <p class="font-medium text-[18px] YaleSolisW-Bd">NT$ {{ $utils().formatCurrency(product.market_price * formData[index].count) }}</p>
                            </div>
                        </div>
                        <el-select
                            v-if="product.colors"
                            v-model="formData[index].color"
                            class="w-full sm:w-[248px]"
                        >
                            <el-option
                                v-for="option in product.colors"
                                :key="option"
                                :label="option.label"
                                :value="option.value"
                            />
                        </el-select>
                        <div class="flex gap-4 sm:gap-[18px] justify-end mt-[16px]">
                            <div class="flex flex-1 sm:flex-initial justify-center items-stretch w-[150px] border border-gray-300 rounded-full">
                                <button
                                    class="flex items-center text-[16px] justify-center flex-1 h-auto cursor-pointer"
                                    @click.prevent="countDelete(index)"
                                >
                                    <el-icon>
                                        <Minus />
                                    </el-icon>
                                </button>
                                <div class="flex items-center justify-center w-[60px] sm:w-[80px] py-[4px] sm:py-[10px] h-full">{{ product.count }}</div>
                                <button
                                    class="flex items-center text-[16px] justify-center flex-1 h-auto cursor-pointer"
                                    @click.prevent="countAdd(index)"
                                >
                                    <el-icon><Plus /></el-icon>
                                </button>
                            </div>
                            <button @click.prevent="removeShoppingCar(index)">
                                <NuxtImg
                                    class="w-[22px] sm:w-[24px]"
                                    src="/img/shopping-car/shopping-car-icon-delete.svg"
                                />
                            </button>
                        </div>
                        <div class="flex flex-col sm:hidden mt-[16px]">
                            <p class="text-gray-400 text-[16px] line-through YaleSolisW-Lt">NT${{ $utils().formatCurrency(product.price) }}</p>
                            <p class="font-medium text-[16px] YaleSolisW-Bd">NT$ {{ $utils().formatCurrency(product.market_price * formData[index].count) }}</p>
                        </div>
                    </div>
                </div>
            </el-form>
        </el-checkbox-group>
    </div>
</template>

<script setup lang="ts">
const { $utils } = useNuxtApp();

const emit = defineEmits(["update:form", "update:selectGiftIds"]);

const props = defineProps({
    form: {
        type: Array,
        default() {
            return [
                {
                    id: "id1",
                    color: "red",
                    count: 1,
                },
                {
                    id: "id2",
                    color: "black",
                    count: 2,
                },
            ];
        },
    },
    // 加價購產品
    products: {
        type: Array,
        default() {
            return [
                {
                    id: "id1",
                    name: "質感托特包-1",
                    colors: [
                        {
                            label: "紅色",
                            value: "red",
                        },
                        {
                            label: "黑色",
                            value: "black",
                        },
                    ],
                    // 商品價格
                    price: 150,
                    // 特價價格
                    market_price: 100,
                    count: 1,
                },
                {
                    id: "id1",
                    name: "質感托特包-2",
                    colors: [
                        {
                            label: "紅色",
                            value: "red",
                        },
                        {
                            label: "黑色",
                            value: "black",
                        },
                    ],
                    // 商品價格
                    price: 250,
                    // 特價價格
                    market_price: 150,
                    count: 1,
                },
            ];
        },
    },
});

const formData = ref(props.form);

// 選中資料
const checkList = ref([]);

/**
 * 選擇商品事件
 */
function selectGift(val) {
    emit("update:selectProductIds", val);
}

function init() {
    // 設定購物車商品全選
    checkList.value = props.products.map((item: any) => item.id);
    emit("update:selectProductIds", checkList.value);
}

/**
 * 點擊刪除數量按鈕
 */
function countDelete(index: number) {
    if (formData.value[index].count <= 1) {
        formData.value[index].count = 1;
    } else {
        formData.value[index].count--;
    }
}
/**
 * 點擊增加數量按鈕
 */
function countAdd(index: number) {
    formData.value[index].count++;
}

/**
 * 刪除購物車
 */
function removeShoppingCar(index: number) {
    formData.value.splice(index, 1);
}

init();

watch(formData.value, (val) => {
    console.log("work update form => ", val);
    emit("update:form", val);
});
</script>

<style lang="scss" scoped>
:deep .el-input__wrapper {
    @apply px-2;
}
// 輸入框
:deep .el-select {
    .el-input {
        .el-input__wrapper {
            @apply shadow-formDefault rounded-none py-1.5 px-0 bg-transparent text-[16px] #{!important};
            &.is-focus {
                @apply shadow-formFocus #{!important};
            }
            .el-input__inner {
                @apply text-gray-800;

                &::placeholder {
                    -webkit-text-fill-color: #ababac;
                }
            }
        }
    }
}

:deep {
    .el-checkbox-group {
        @apply text-base leading-normal block #{!important};
    }
    .el-checkbox {
        @apply h-[18px] #{!important};
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
