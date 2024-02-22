<template>
    <div>
        <h5 class="bg-gray-50 py-[8px] font-medium pl-[16px] w-full mb-[30px]">訂購人</h5>
        <el-form
            ref="formRefDom"
            class="custom-form"
            :model="formInput"
            :rules="rules"
            require-asterisk-position="right"
        >
            <div class="grid grid-cols-2 gap-6 mb-[30px]">
                <template
                    v-for="(item, index) in formDatas"
                    :key="index"
                >
                    <div :class="item.span ? `col-span-${item.span}` : ''">
                        <el-form-item
                            :prop="item.prop"
                            :label="item.label"
                        >
                            <el-input
                                v-if="item.style === 'input'"
                                :type="item?.type"
                                :show-password="item.showPassword"
                                :disabled="item.disabled"
                                :placeholder="item.placeholder"
                                v-model="formInput[item.prop]"
                            />
                            <el-input
                                v-if="item.style === 'textarea'"
                                type="textarea"
                                rows="5"
                                resize="none"
                                :placeholder="item.placeholder"
                                v-model="formInput[item.prop]"
                            />
                        </el-form-item>
                    </div>
                    <template v-if="item.space">
                        <div
                            v-for="index in item.space"
                            :key="index"
                        />
                    </template>
                </template>
            </div>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { FormInstance } from "element-plus";
import { validateTWMobileNumber } from "~/service/validator";

const emit = defineEmits(["update:form"]);
const formRefDom = ref<FormInstance>();

interface Props {
    form: {
        name: string;
        email: string;
        phone: string;
        note: string;
    };
    formRef: FormInstance | null;
}

const props = withDefaults(defineProps<Props>(), {
    form: () => {
        return {
            name: "",
            email: "",
            phone: "",
            note: "",
        };
    },
    formRef: null,
});

const formInput = ref(props.form);

watch(formInput.value, (val) => {
    emit("update:form", val);
});

const formDatas = ref<any>([
    {
        prop: "name",
        label: "會員名稱",
        placeholder: "",
        style: "input",
        disabled: true,
    },
    {
        prop: "email",
        label: "電子信箱",
        placeholder: "",
        style: "input",
        disabled: true,
    },
    {
        prop: "phone",
        label: "聯絡電話",
        placeholder: "",
        style: "input",
        space: 1,
    },
    {
        prop: "note",
        label: "訂單備註",
        placeholder: "有什麼話想告訴賣家嗎?",
        style: "textarea",
        span: 2,
    },
]);

const rules = ref<any>({
    name: [
        {
            required: true,
            message: "請輸入會員名稱",
            trigger: ["change", "blur"],
        },
    ],
    email: [
        {
            required: true,
            message: "請輸入電子信箱",
            trigger: ["change", "blur"],
        },
    ],
    phone: [
        {
            required: true,
            message: "請輸入聯絡電話",
            trigger: ["change", "blur"],
        },
        {
            required: true,
            validator: validateTWMobileNumber,
            trigger: ["change", "blur"],
            message: "格式不正確",
        },
    ],
});

const validForm = async () => {
    if (!formRefDom.value) return false;
    const userValid = await formRefDom.value.validate((valid) => {
        if (valid) {
            return true;
        } else {
            return false;
        }
    });
    return userValid;
};

defineExpose({
    validForm,
});

onMounted(() => {
    formInput.value = { ...props.form };
});
</script>

<style lang="scss" scoped>
:deep .el-textarea__inner {
    @apply rounded-none;
}
</style>
