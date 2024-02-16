<template>
    <div>
        <h5 class="bg-gray-50 py-[8px] pl-[16px] w-full">加價購</h5>
        <el-checkbox-group
            v-model="checkList"
            @change="selectGift"
        >
            <el-form>
                <div
                    v-for="(product, index) in products"
                    v-show="formData[index]"
                    class="flex gap-[48px] border-gray-300 py-[30px]"
                    :class="{ 'border-b': index !== products.length - 1 }"
                >
                    <div class="flex gap-[36px]"
                        v-if="formData[index]"
                    >
                        <el-checkbox :label="product.id" />
                        <NuxtImg
                            class="w-[180px] aspect-square object-cover"
                            src="/img/shopping-car/shopping-gift-demo-1.jpg"
                        />
                    </div>

                    <div
                        class="flex-1"
                        v-if="formData[index]"
                    >
                        <div class="flex mb-[12px]">
                            <h5 class="flex-1 text-[18px] text-gray-800 font-medium">{{ product.name }}</h5>
                            <div class="flex gap-4">
                                <p class="text-gray-400 line-through YaleSolisW-Lt mr-[4px]">NT${{ $utils().formatCurrency(product.price) }}</p>
                                <p class="font-medium text-[18px] YaleSolisW-Bd">NT$ {{ $utils().formatCurrency(product.market_price * formData[index].count) }}</p>
                            </div>
                        </div>
                        <el-select
                            v-if="product.colors"
                            v-model="formData[index].color"
                            class="w-[248px]"
                        >
                            <el-option
                                v-for="option in product.colors"
                                :key="option"
                                :label="option.label"
                                :value="option.value"
                            ></el-option>
                        </el-select>
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
:deep .el-select{
    .el-input{
        .el-input__wrapper {
            @apply shadow-formDefault rounded-none py-1.5 px-0 bg-transparent text-[16px] #{!important};
            &.is-focus{
                @apply shadow-formFocus #{!important};
            }
            .el-input__inner {
                @apply text-gray-800;

                &::placeholder {
                    -webkit-text-fill-color: #ABABAC;
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
            &:hover{
                @apply border-yellow-600;
            }
        }
        .is-checked{
            .el-checkbox__inner {
                @apply bg-yellow-600 border-yellow-600 after:h-[9px] after:left-[6px] after:top-[2px] #{!important};
            }
        }
    }
}
</style>
