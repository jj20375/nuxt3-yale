<template>
    <div class="mt-[88px]">
        <h5 class="bg-gray-50 py-[8px] pl-[16px] w-full mb-[30px]">加價購</h5>
        <el-checkbox-group
            v-model="checkList"
            @change="selectGift"
        >
            <el-form>
                <div
                    v-for="(product, index) in products"
                    v-show="formData[index]"
                    class="flex border-b border-gray-300 py-[30px]"
                >
                    <div
                        class="mr-5"
                        v-if="formData[index]"
                    >
                        <el-checkbox :label="product.id" />
                    </div>
                    <NuxtImg
                        v-if="formData[index]"
                        class="w-[195px] mr-[37px]"
                        src="/img/shopping-car/shopping-gift-demo-1.jpg"
                    />
                    <div
                        class="flex-1"
                        v-if="formData[index]"
                    >
                        <div class="flex">
                            <h5 class="flex-1 text-[18px] text-gray-800 font-medium mb-[12px]">{{ product.name }}</h5>
                            <div class="flex">
                                <p class="text-gray-400 line-through YaleSolisW-Lt mr-[4px]">NT${{ $utils().formatCurrency(product.price) }}</p>
                                <p class="font-medium YaleSolisW-Bd">NT$ {{ $utils().formatCurrency(product.market_price * formData[index].count) }}</p>
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
                        <div class="flex justify-end mt-[20px]">
                            <div class="flex justify-center items-center w-[150px] border border-gray-300 px-[2px] py-[10px] rounded-full mr-[18px]">
                                <div
                                    class="flex items-center cursor-pointer"
                                    @click="countDelete(index)"
                                >
                                    <el-icon><Minus /></el-icon>
                                </div>
                                <div class="w-[88px] h-[28px] text-center flex items-center justify-center">{{ formData[index].count }}</div>
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
    @apply shadow-none border-b border-gray-200 mx-0 rounded-none #{!important};
}
:deep .el-select {
    .el-input__wrapper {
        @apply mx-0;
    }
}
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
    .el-checkbox {
        @apply h-auto #{!important};
    }
}
</style>
