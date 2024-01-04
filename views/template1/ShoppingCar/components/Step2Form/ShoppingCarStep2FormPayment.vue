<template>
    <div class="mt-[88px]">
        <h5 class="bg-gray-50 py-[8px] pl-[16px] w-full mb-[30px]">付款方式</h5>
        <el-form>
            <el-radio-group
                v-model="formData.paymentType"
                class="ml-4"
            >
                <el-radio
                    v-for="(option, index) in options"
                    :key="index"
                    :label="option.value"
                    size="large"
                    >{{ option.label }}</el-radio
                >
            </el-radio-group>
        </el-form>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:form"]);

const props = defineProps({
    form: {
        type: Object,
        default() {
            return {
                // 配送方式
                paymentType: "type1",
            };
        },
    },
});

const formData = ref(props.form);

// 付款方式
const options = ref([
    {
        label: "信用卡",
        value: "type1",
    },
    {
        label: "門市付款",
        value: "type2",
    },
]);

watch(formData.value, (val) => {
    emit("update:form", val);
});
</script>

<style lang="scss" scoped>
:deep .el-radio__input.is-checked .el-radio__inner {
    @apply bg-yellow-600 border-yellow-600 #{!important};
}
</style>
