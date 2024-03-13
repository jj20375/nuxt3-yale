<template>
    <div class="mt-[30px] sm:mt-[60px]">
        <h5 class="bg-gray-50 py-[8px] pl-[16px] w-full YaleSolisW-Bd font-medium mb-[16px] sm:mb-[30px]">發票</h5>
        <el-form
            ref="formRefDom"
            class="custom-form"
            :model="formData"
            :rules="rules"
            require-asterisk-position="right"
        >
            <div class="flex flex-col grid-cols-2 gap-6 md:grid">
                <template
                    v-for="(column, key) in columns"
                    :key="key"
                >
                    <el-form-item
                        :prop="key"
                        :label="column.label"
                    >
                        <div
                            v-show="column.type === 'input'"
                            class="w-full"
                        >
                            <el-input
                                class="w-full"
                                v-model="formData[key]"
                            />
                        </div>
                        <div
                            v-show="column.type === 'select'"
                            class="w-full"
                        >
                            <el-select
                                v-if="column.label"
                                class="w-full"
                                placeholder="請選擇"
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
import { validateDonationCode, validateMobileCarrier, validateNaturalPerson } from "~/service/validator";

const emit = defineEmits(["update:form"]);
const formRefDom = ref<FormInstance>();

interface Column {
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

const formData = ref(props.form);

const columns: ComputedRef<Record<string, Column>> = computed(() => {
    const result = {
        invoiceType: {
            label: "發票類型",
            required: true,
            type: "select",
        },
    };

    if (formData.value.invoiceType === "mobile_carrier" || formData.value.invoiceType === "natural_person_certificate") {
        result["carrierCode"] = {
            label: formData.value.invoiceType === "mobile_carrier" ? "手機載具條碼" : "自然人憑證載具",
            required: true,
            type: "input",
        };
    } else if (formData.value.invoiceType === "donation") {
        result["donationCode"] = {
            label: "愛心碼",
            required: true,
            type: "input",
        };
    } else if (formData.value.invoiceType === "company") {
        result["taxNumber"] = {
            label: "公司統編",
            required: true,
            type: "input",
        };
    }

    return result;
});

const rules = computed(() => {
    return {
        invoiceType: [
            {
                required: true,
                message: "請選擇",
                trigger: ["change", "blur"],
            },
        ],

        // 手機載具驗證
        carrierCode: [
            {
                required: true,
                message: "請輸入",
                trigger: ["blur"],
            },
            {
                required: true,
                validator: formData.value.invoiceType === "mobile_carrier" ? validateMobileCarrier : validateNaturalPerson,
                trigger: ["blur"],
                message: "格式不正確",
            },
        ],

        // 愛心捐贈碼驗證
        donationCode: [
            {
                required: true,
                message: "請輸入",
                trigger: ["blur"],
            },
            {
                required: true,
                validator: validateDonationCode,
                trigger: ["blur"],
                message: "格式不正確",
            },
        ],

        taxNumber: [
            {
                required: true,
                message: "請輸入",
                trigger: ["change", "blur"],
            },
        ],
    };
});

/**
 * 發票類型
 */
const options = ref([
    {
        label: "雲端發票(中獎寄送紙本)",
        value: "cloud",
    },
    {
        label: "公司用戶發票",
        value: "company",
    },
    {
        label: "捐贈發票",
        value: "donation",
    },
    {
        label: "手機條碼載具",
        value: "mobile_carrier",
    },
    {
        label: "自然人憑證載具",
        value: "natural_person_certificate",
    },
]);

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
    console.log("invoiceType =>", val);
    emit("update:form", val);
});

defineExpose({
    validForm,
});
</script>
