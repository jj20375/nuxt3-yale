<template>
    <div class="rounded-[24px] border border-gray-200 p-[60px]">
        <h2 class="text-[24px] mb-[30px] font-medium">填寫您的聯絡資訊</h2>
        <el-form
            ref="formRefDom"
            :model="form"
            :rules="rules"
        >
            <div
                v-for="(item, index) in formDatas"
                :key="index"
            >
                <el-form-item
                    v-if="item.type !== 'inline'"
                    :prop="item.prop"
                >
                    <div
                        class="flex-1"
                        v-if="item.type !== 'inline'"
                    >
                        <label class="block w-full text-[15px] text-gray-800"> {{ item.label }} <span class="text-red-500">*</span> </label>
                        <el-input
                            v-if="item.style === 'input'"
                            :placeholder="item.placeholder"
                            v-model="form[item.prop]"
                        ></el-input>
                        <el-select
                            v-if="item.style === 'select'"
                            class="w-full"
                            v-model="form[item.prop]"
                            :placeholder="item.placeholder"
                        >
                            <el-option
                                v-for="option in 10"
                                :key="option"
                                :label="'下拉-' + option"
                                :value="option"
                            ></el-option>
                        </el-select>
                        <el-input
                            v-if="item.style === 'textarea'"
                            type="textarea"
                            rows="10"
                            :placeholder="item.placeholder"
                            v-model="form[item.prop]"
                        ></el-input>
                        <FileUpload v-if="item.style === 'file'" />
                    </div>
                </el-form-item>

                <div
                    v-if="item.type === 'inline'"
                    class="flex flex-1"
                >
                    <div
                        v-for="(item2, index2) in item.datas"
                        class="flex-1"
                        :key="index2"
                        :class="index2 === 0 ? 'mr-[30px]' : ''"
                    >
                        <el-form-item :prop="item2.prop">
                            <label class="block w-full text-[15px] text-gray-800"> {{ item2.label }} <span class="text-red-500">*</span> </label>
                            <el-select
                                class="w-full"
                                v-model="form[item2.prop]"
                                :placeholder="item2.placeholder"
                            >
                                <el-option
                                    v-for="option in 10"
                                    :key="option"
                                    :label="'下拉-' + option"
                                    :value="option"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
            </div>
        </el-form>
        <div class="flex justify-start mt-[30px] mb-[40px]">
            <vue-recaptcha
                ref="reCaptcha2Dom"
                @verify="isVerify"
                @error="isVerifyError"
                :sitekey="sitekey"
            >
            </vue-recaptcha>
        </div>

        <div class="flex justify-center">
            <button class="bg-yellow-600 text-[16px] rounded-full w-[160px] text-center py-[11px]">確認送出</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
// google recaptcha2
import vueRecaptcha from "vue3-recaptcha2";
import { ElMessage } from "element-plus";
import type { FormInstance, UploadProps, FormRules } from "element-plus";
import FileUpload from "./ContactWebFileUpload.vue";

const {
    public: { googleRecaptcha2Key },
} = useRuntimeConfig();

// gooogle recaptcha dom
const reCaptcha2Dom = ref<any>(null);

// 判斷是否有驗證 google recaptcha
const isRecaptchaVerify = ref<boolean>(false);

// google recaptcha key
const sitekey = googleRecaptcha2Key;

// 驗證 recaptcha 通過時 回傳的 token
function isVerify(token: string) {
    // 判斷是否有取得token
    if (!$utils().isEmpty(token)) {
        // 將是否有驗證過google recaptcha 驗證改為 true
        isRecaptchaVerify.value = true;
    }
    form.value["g-recaptcha-response"] = token;
}
// 驗證 recaptcha 失敗時 回傳的 error
function isVerifyError(error: any) {
    // 將是否有驗證過google recaptcha 驗證改為 false
    console.log(error);
    isRecaptchaVerify.value = false;
}

const formRefDom = ref<FormInstance | undefined>();

const form = ref({
    name: "",
    phone: "",
    email: "",
    city: "",
    location: "",
    title: "",
    photo: null,
    content: "",
});

const rules = ref<FormRules>({
    name: [
        {
            required: true,
            message: "請輸入姓名",
            trigger: "blur",
        },
    ],
});

const formDatas = ref([
    {
        prop: "name",
        label: "姓名",
        placeholder: "請輸入姓名",
        style: "input",
    },
    {
        prop: "phone",
        label: "聯絡電話",
        placeholder: "請輸入電話",
        style: "input",
    },
    {
        prop: "email",
        label: "電子信箱",
        placeholder: "請輸入信箱",
        style: "input",
    },
    {
        type: "inline",
        datas: [
            {
                prop: "city",
                label: "縣市",
                placeholder: "請選擇",
                type: "inline",
                style: "select",
            },
            {
                prop: "location",
                label: "地區",
                placeholder: "請選擇",
                type: "inline",
                style: "select",
            },
        ],
    },
    {
        prop: "title",
        label: "主旨",
        placeholder: "請選擇",
        style: "select",
    },
    {
        prop: "photo",
        label: "上傳照片",
        placeholder: "請上傳照片",
        type: "photo",
        style: "file",
    },
    {
        prop: "content",
        label: "詢問內容",
        placeholder: "請輸入詢問內容",
        style: "textarea",
    },
]);

async function onSubmit(formEl: FormInstance | undefined) {
    if (!formEl) {
        ElMessage({
            type: "error",
            message: "資訊資訊",
        });
        return;
    }
}
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
