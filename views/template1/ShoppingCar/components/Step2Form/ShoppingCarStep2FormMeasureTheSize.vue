<template>
    <div class="mt-[88px]">
        <h5 class="bg-gray-50 py-[8px] pl-[16px] w-full mb-[30px]">預約丈量時間</h5>
        <el-form>
            <el-form-item prop="measureSizeTime">
                <div class="grid grid-cols-2 gap-[30px] w-full">
                    <div>
                        <label class="block w-full text-gray-800 text-[15px]">選擇丈量時間<span class="text-red-500">*</span></label>
                        <el-select
                            class="w-full"
                            placeholder="請輸入..."
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
                // 預約丈量時間
                measureSizeTime: "type1",
            };
        },
    },
});

const formData = ref(props.form);

watch(formData.value, (val) => {
    emit("update:form", val);
});
</script>

<style lang="scss" scoped>
:deep {
    .el-radio-group {
        @apply block;
    }
}

:deep {
    .el-radio {
        @apply block;
    }
}

:deep .el-radio__input.is-checked .el-radio__inner {
    @apply bg-yellow-600 border-yellow-600 #{!important};
}

:deep .el-input__wrapper {
    @apply shadow-none border-b border-gray-200 mx-0 rounded-none #{!important};
}
:deep .el-select {
    .el-input__wrapper {
        @apply mx-0;
    }
}
</style>
