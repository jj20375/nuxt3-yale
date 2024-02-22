<template>
    <div class="mt-[60px]">
        <h5 class="bg-gray-50 py-[8px] pl-[16px] w-full font-medium mb-[16px] sm:mb-[30px]">發票</h5>
        <el-form
            ref="formRefDom"
            class="custom-form"
            :model="formData"
            :rules="rules"
            require-asterisk-position="right"
        >
            <div class="grid sm:grid-cols-2 gap-6">
                <template
                    v-for="(column, key) in columns"
                    :key="key"
                >
                    <el-form-item
                        :prop="key"
                        :label="key === 'carrierCode' ? codeLabel : column.label"
                    >
                        <div
                            v-if="column.type === 'input'"
                            class="w-full"
                        >
                            <el-input
                                class="w-full"
                                v-model="formData[key]"
                            />
                        </div>
                        <div
                            v-else-if="column.type === 'select'"
                            class="w-full"
                        >
                            <el-select
                                v-if="column.label"
                                class="w-full"
                                v-model="formData[key]"
                            >
                                <el-option
                                    v-for="option in options"
                                    :key="option"
                                    :label="option.label"
                                    :value="option.value"
                                />
                            </el-select>
                        </div>
                    </el-form-item>
                </template>
            </div>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { FormInstance } from "element-plus";

const emit = defineEmits(["update:form"]);
const formRefDom = ref<FormInstance>();

interface Columns {
    label: string;
    required: boolean;
    type: string;
}

const props = defineProps({
    form: {
        type: Object,
        default() {
            return {
                // 發票類型
                invoiceType: null,
                // 載具編碼 ｜ 統編 ｜ 捐贈單位編碼 等等
                carrierCode: null,
            };
        },
    },
});

const columns: Ref<Record<string, Columns>> = ref({
    invoiceType: {
        label: "發票類型",
        required: true,
        type: "select",
    },
    carrierCode: {
        label: "",
        required: true,
        type: "input",
    },
});

const rules = ref<any>({
    invoiceType: [
        {
            required: true,
            message: "請選擇",
            trigger: ["change", "blur"],
        },
    ],
    carrierCode: [
        {
            required: true,
            message: "請輸入",
            trigger: ["change", "blur"],
        },
    ],
});

/**
 * 發票類型
 */
const options = ref([
    // {
    //     label: "會員載具",
    //     value: "type1",
    // },
    // {
    //     label: "公司用戶發票",
    //     value: "type2",
    // },
    // {
    //     label: "捐贈發票",
    //     value: "type3",
    // },
    {
        label: "手機條碼載具",
        value: "mobile_carrier",
    },
    // {
    //     label: "自然人憑證載具",
    //     value: "type5",
    // },
]);

/**
 * 選擇發票類型
 */
const codeLabel = computed(() => {
    switch (props.form.invoiceType) {
        case "mobile_carrier":
            return "公司統編";
    }
});

const formData = ref(props.form);
const validForm = async () => {
    if (!formRefDom.value) return false;
    const result = await formRefDom.value.validate((valid) => {
        if (valid) {
            return true;
        } else {
            return false;
        }
    });
    return result;
};

watch(formData.value, (val) => {
    emit("update:form", val);
});

defineExpose({
    validForm,
});
</script>
