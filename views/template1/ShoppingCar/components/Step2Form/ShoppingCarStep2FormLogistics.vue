<template>
    <div class="mt-[30px] sm:mt-[60px]">
        <h5 class="bg-gray-50 py-[8px] pl-[16px] w-full YaleSolisW-Bd font-medium mb-[16px] sm:mb-[30px]">配送方式</h5>
        <el-form
            ref="formRefDom"
            class="custom-form"
            :model="formData"
            :rules="rules"
            require-asterisk-position="right"
        >
            <div class="flex flex-col md:grid grid-cols-2 gap-[16px] sm:gap-6">
                <el-form-item
                    :prop="'logistics'"
                    :label="'配送方式'"
                >
                    <el-select
                        v-model="formData.logistics"
                        class="w-full"
                        placeholder="請選擇"
                    >
                        <el-option
                            v-for="option in logisticsOptions"
                            :key="option.code"
                            :label="option.name"
                            :value="option.code"
                        />
                    </el-select>
                </el-form-item>
            </div>
            <p class="text-[15px] text-gray-500 mt-6">運費說明文字運費說明文字運費說明文字運費說明文字運費說明文字運費說明文字</p>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { FormInstance } from "element-plus";
const emit = defineEmits(["update:form"]);
const { $api } = useNuxtApp();

const formRefDom = ref<FormInstance>();
const { data } = await $api().GetShippingMethodApi();

const props = defineProps({
    form: {
        type: Object,
        default() {
            return {
                // 配送方式
                logistics: "",
            };
        },
    },
});

const formData = ref(props.form);

const rules = ref<any>({
    logistics: [
        {
            required: true,
            message: "請選擇配送方式",
            trigger: ["change", "blur"],
        },
    ],
});

// 配送選項
const logisticsOptions = computed(() => {
    return (data.value as any)?.data;
});

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
