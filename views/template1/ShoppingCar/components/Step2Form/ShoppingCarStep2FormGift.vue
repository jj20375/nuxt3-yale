<template>
    <div class="mt-[88px]">
        <h5 class="bg-gray-50 py-[8px] pl-[16px] w-full mb-[30px]">滿額贈品</h5>
        <el-checkbox-group
            v-model="checkList"
            @change="selectGift"
        >
            <el-form>
                <div
                    v-for="(gift, index) in gifts"
                    class="flex border-b border-gray-300 py-[30px]"
                >
                    <div class="mr-5">
                        <el-checkbox :label="gift.id" />
                    </div>
                    <NuxtImg
                        class="w-[195px] mr-[37px]"
                        src="/img/shopping-car/shopping-gift-demo-1.jpg"
                    />
                    <div class="flex-1">
                        <h5 class="text-[18px] text-gray-800 font-medium mb-[12px]">{{ gift.name }}</h5>
                        <el-select
                            v-model="formData[index].color"
                            class="w-[248px]"
                        >
                            <el-option
                                v-for="option in gift.colors"
                                :key="option"
                                :label="option.label"
                                :value="option.value"
                            ></el-option>
                        </el-select>
                        <div class="flex mt-[20px]">
                            <div class="text-[14px] text-gray-800 mr-[4px]">
                                <span>原價</span><span class="line-through">NT$ {{ $utils().formatCurrency(gift.price) }}</span>
                            </div>
                            <div class="text-red-500 text-[14px]">
                                <span>滿額贈</span>
                                <span>NT$ {{ $utils().formatCurrency(gift.rule.pay) }}</span>
                            </div>
                        </div>
                        <div class="bg-yellow-400 text-gray-800 text-[14px] py-[4px] px-[12px] w-[137px] mt-[16px]">
                            <span>NT$ {{ $utils().formatCurrency(gift.rule.needPrice) }}</span>
                            <span>滿額贈</span>
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
    // 贈品
    gifts: {
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
                    rule: {
                        // 需要多少錢才送
                        needPrice: 3000,
                        // 需付款金額
                        pay: 0,
                    },
                },
                {
                    id: "id2",
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
                    price: 180,
                    rule: {
                        // 需要多少錢才送
                        needPrice: 3000,
                        // 需付款金額
                        pay: 0,
                    },
                },
            ];
        },
    },
});

const formData = ref(props.form);

// 選中資料
const checkList = ref([]);

/**'
 * 選擇商品事件
 */
function selectGift(val) {
    emit("update:selectGiftIds", val);
}

function init() {
    // 設定購物車商品全選
    checkList.value = props.gifts.map((item: any) => item.id);
    emit("update:selectGiftIds", checkList.value);
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
