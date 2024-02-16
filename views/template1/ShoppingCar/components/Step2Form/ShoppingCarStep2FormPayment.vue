<template>
    <div class="mt-[60px]">
        <h5 class="bg-gray-50 py-[8px] pl-[16px] font-medium w-full mb-[20px]">付款方式</h5>
        <el-form class="custom-form">
            <el-radio-group
                v-model="formData.paymentType"
            >
                <el-radio
                    v-for="(option, index) in options"
                    :key="index"
                    :label="option.value"
                    size="large"
                    >{{ option.label }}</el-radio
                >
            </el-radio-group>
            <el-form-item
                prop="store"
                v-if="form.paymentType === 'type2'"
            >
                <div class="grid grid-cols-2 gap-[30px] w-full mt-4">
                    <div>
                        <label class="block w-full text-gray-800 text-[15px]">選擇門市/百貨櫃位<span class="ml-1 text-red-500">*</span></label>
                        <el-select
                            class="w-full"
                            v-model="form.store"
                        >
                            <el-option
                                v-for="option in 10"
                                :key="option"
                                :label="'門市-' + option"
                                :value="option"
                            >
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
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
]);

// 只有訂製門才會出現選項
if (route.query.tab === "type2") {
    options.value.push({
        label: "門市付款",
        value: "type2",
    });
}

watch(formData.value, (val) => {
    emit("update:form", val);
});
</script>

<style lang="scss" scoped>
:deep .el-radio-group {
    @apply flex flex-col items-start #{!important};
    .el-radio.el-radio--large {
        @apply mr-[8px] #{!important};

        .el-radio__label {
            @apply font-normal leading-none;
        }
        .el-radio__inner {
            @apply w-[18px] h-[18px];
            &:hover {
                @apply border-yellow-600;
            }
        }
        &.is-checked {
            @apply font-normal #{!important};
            .el-radio__inner {
                @apply border-yellow-600 bg-yellow-600;
            }
        }
    }
}
</style>
