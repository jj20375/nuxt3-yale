<template>
    <div class="mt-[88px]">
        <h5 class="bg-gray-50 py-[8px] pl-[16px] w-full mb-[30px]">發票</h5>
        <el-form>
            <div
                v-for="(column, key) in columns"
                :key="key"
            >
                <div class="grid grid-cols-2 gap-[30px]">
                    <el-form-item
                        :prop="key"
                        v-if="column.label !== null"
                    >
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
                                @change="changeType"
                            >
                                <el-option
                                    v-for="option in options"
                                    :key="option"
                                    :label="option.label"
                                    :value="option.value"
                                ></el-option>
                            </el-select>
                        </div>
                    </el-form-item>
                </div>
            </div>
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
                // 發票類型
                invoiceType: null,
                // 載具編碼 ｜ 統編 ｜ 捐贈單位編碼 等等
                invoiceCode: null,
            };
        },
    },
});

const columns = ref({
    invoiceType: {
        label: "發票類型",
        required: true,
        type: "select",
    },
    invoiceCode: {
        label: null,
        required: true,
        type: "input",
    },
});

/**
 * 發票類型
 */
const options = ref([
    {
        label: "會員載具",
        value: "type1",
    },
    {
        label: "公司用戶發票",
        value: "type2",
    },
    {
        label: "捐贈發票",
        value: "type3",
    },
    {
        label: "手機條碼載具",
        value: "type4",
    },
    {
        label: "自然人憑證載具",
        value: "type5",
    },
]);

/**
 * 選擇發票類型
 */
function changeType(type: string) {
    switch (type) {
        case "type1":
            columns.value.invoiceCode.label = null;
            return;
        case "type2":
            columns.value.invoiceCode.label = "公司統編";
            return;
        case "type3":
            columns.value.invoiceCode.label = "愛心碼";
            return;
        case "type4":
            columns.value.invoiceCode.label = "手機條碼載具";
            return;
        case "type5":
            columns.value.invoiceCode.label = "自然人憑證載具";
            return;
    }
}

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
