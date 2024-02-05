<template>
    <div>
        <h5 class="bg-gray-50 py-[8px] font-medium pl-[16px] w-full mb-[30px]">訂購人</h5>
        <el-form
            class="custom-form"
            ref="formRefDom"
            :model="form"
            :rules="rules"
            require-asterisk-position="right">
            <div class="grid grid-cols-2 gap-6 mb-[30px]">
                <template
                    v-for="(item, index) in formDatas"
                    :key="index"
                >
                    <div :class="item.span ? `col-span-${item.span}` : ''">
                        <el-form-item :prop="item.prop" :label="item.label">
                            <el-input v-if="item.style === 'input'" :type="item?.type" :show-password="item.showPassword" :disabled="item.disabled"
                                      :placeholder="item.placeholder" v-model="form[item.prop]"></el-input>
                            <el-input
                                v-if="item.style === 'textarea'"
                                type="textarea"
                                rows="5"
                                resize="none"
                                :placeholder="item.placeholder"
                                v-model="form[item.prop]"
                            ></el-input>
                        </el-form-item>
                    </div>
                    <template v-if="item.space">
                        <div v-for="index in item.space" :key="index"></div>
                    </template>
                </template>
            </div>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { validateTWMobileNumber } from "~/service/validator";

const emit = defineEmits(["update:form"]);

const props = defineProps({
    form: {
        type: Object,
        default() {
            return {
                name: "王小明",
                email: "123@gmail.cpm",
                phone: "0911123123",
                note: null,
            };
        },
    },
});

const form = ref(props.form);

watch(form.value, (val) => {
    emit("update:form", val);
});

const formRefDom = ref<any>();

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
        }
    ],
    email: [
        {
            required: true,
            message: "請輸入電子信箱",
            trigger: ["change", "blur"],
        }
    ],
    phone: [
        {
            required: true,
            message: "請輸入聯絡電話",
            trigger: ["change", "blur"],
        }
    ],
});

</script>

<style lang="scss" scoped>
:deep .el-textarea__inner {
    @apply rounded-none;
}
</style>
