<template>
    <div class="mt-[88px]">
        <h5 class="bg-gray-50 py-[8px] pl-[16px] w-full mb-[30px]">聯繫人</h5>
        <el-form>
            <div class="grid grid-cols-2 gap-[30px]">
                <div
                    v-for="(column, key) in columns"
                    :key="key"
                >
                    <el-form-item :prop="key">
                        <label class="block w-full text-gray-800 text-[15px]"
                            >{{ column.label
                            }}<span
                                v-if="column.required"
                                class="ml-1 text-red-500"
                                >*</span
                            ></label
                        >
                        <div
                            v-if="column.type === 'input'"
                            class="w-full"
                        >
                            <el-input
                                class="w-full"
                                v-model="formData[key]"
                            ></el-input>
                        </div>
                        <div
                            v-else-if="column.type === 'select'"
                            class="w-full"
                        >
                            <el-select
                                class="w-full"
                                v-model="formData[key]"
                                :placeholder="column.placeholder"
                            >
                                <el-option
                                    v-for="option in 10"
                                    :key="option"
                                    :label="'下拉-' + option"
                                    :value="option"
                                ></el-option>
                            </el-select>
                        </div>
                    </el-form-item>
                </div>
            </div>
            <el-form-item prop="address">
                <label class="block w-full text-gray-800 text-[15px]">
                    地址
                    <span class="ml-1 text-red-500">*</span>
                </label>
                <el-input
                    v-model="formData.address"
                    placeholder="請輸入完整地址"
                ></el-input>
            </el-form-item>
            <el-form-item prop="saveAddress">
                <el-checkbox
                    v-model="formData.saveAddress"
                    :label="'加入常用地址'"
                    size="large"
                />
            </el-form-item>
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
                name: "王小明",
                phone: "0911123123",
                // 縣市
                city: null,
                // 地區
                area: null,
                // 地址
                address: null,
                // 加入常用地址
                saveAddress: false,
            };
        },
    },
});

const columns = ref({
    name: {
        label: "聯繫人姓名",
        required: true,
        type: "input",
    },
    phone: {
        label: "聯繫人電話",
        required: true,
        type: "input",
    },
    city: {
        label: "縣市",
        required: true,
        type: "select",
        placeholder: "請選擇",
    },
    area: {
        label: "地區",
        required: true,
        type: "select",
        placeholder: "請選擇",
    },
});

const formData = ref(props.form);

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
:deep .el-textarea__inner {
    @apply rounded-none;
}
</style>
