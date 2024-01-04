<template>
    <div class="mt-[88px]">
        <h5 class="bg-gray-50 py-[8px] pl-[16px] w-full mb-[30px]">滿額贈品</h5>
        <el-form>
            <div v-for="(gift, index) in gifts"></div>
        </el-form>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:form"]);

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

watch(formData.value, (val) => {
    console.log("work update form => ", val);
    emit("update:form", val);
});

watch(
    () => props.gifts,
    (val) => {
        for (let i = 0; i < val.length; i++) {
            formData.value.push({});
        }
        emit("update:form", formData.value);
    }
);
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
:deep .el-textarea__inner {
    @apply rounded-none;
}
</style>
