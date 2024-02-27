<template>
    <div class="sm:rounded-[24px] rounded-[12px] border border-gray-200 p-[24px] sm:p-[60px]">
        <h2 class="text-[24px] mb-[30px] font-medium">填寫您的聯絡資訊</h2>
        <el-form
            ref="formRefDom"
            :model="form"
            :rules="rules"
            class="flex flex-col gap-6"
        >
            <template
                v-for="(item, index) in formDatas"
                :key="index"
            >
                <template v-if="!item.isHide">
                    <el-form-item
                        v-if="item.type !== 'inline'"
                        :prop="item.prop"
                    >
                        <div
                            class="flex-1"
                            v-if="item.type !== 'inline'"
                        >
                            <label
                                v-if="!item.isHide"
                                class="block w-full text-[15px] text-gray-800"
                            >
                                {{ item.label }} <span class="text-red-500">*</span>
                            </label>
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
                                value-key="id"
                                @change="item.function ? item.function(form) : null"
                            >
                                <el-option
                                    v-for="(option, index) in item.options"
                                    :key="index"
                                    :label="option.label"
                                    :value="option.value"
                                />
                            </el-select>
                            <el-input
                                v-if="item.style === 'textarea'"
                                type="textarea"
                                rows="5"
                                resize="none"
                                :placeholder="item.placeholder"
                                v-model="form[item.prop]"
                            />
                            <FileUpload
                                v-if="item.style === 'file' && !item.isHide"
                                :prop="item.prop"
                                @tempPath="handlefile"
                            />
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
                                    @change="item2.function ? item2.function(form) : null"
                                >
                                    <el-option
                                        v-for="(option, index) in item2.options"
                                        :key="index"
                                        :label="option.label"
                                        :value="option.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                </template>
            </template>
        </el-form>
        <div class="flex justify-start mt-[30px] mb-[40px]">
            <GoogleReCaptchaV2 v-model="form.recaptchaToken" />
        </div>

        <div class="flex justify-center">
            <button
                @click="onSubmit"
                class="yellow-btn btn-md"
            >
                確認送出
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
// google recaptcha2
import vueRecaptcha from "vue3-recaptcha2";
import GoogleReCaptchaV2 from "@/components/GoogleRecaptchaV2.vue";
import { ElMessage, ElLoading } from "element-plus";
import type { FormInstance, UploadProps, FormRules } from "element-plus";
import FileUpload from "./ContactWebFileUpload.vue";
import { validateEmail, validateTWMobileNumber } from "~/service/validator";
import { useInitializationStore } from "~/store/initializationStore";
const router = useRouter();

const { $api, $utils } = useNuxtApp();

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

const formRefDom = ref<any>();

const form = ref<any>({
    name: "",
    phone: "",
    email: "",
    title: "",
    photo: [],
    content: "",
    recaptchaToken: "",
});

const rules = ref<any>({
    name: [
        {
            required: true,
            message: "請輸入姓名",
            trigger: "blur",
        },
    ],
    email: [
        {
            required: true,
            message: "請輸入電子信箱",
            trigger: "blur",
        },
        {
            required: true,
            validator: validateEmail,
            trigger: ["change", "blur"],
            message: "格式不正確",
        },
    ],
    phone: [
        {
            required: true,
            message: "請輸入聯絡電話",
            trigger: "blur",
        },
        {
            required: true,
            validator: validateTWMobileNumber,
            trigger: ["change", "blur"],
            message: "格式不正確",
        },
    ],
    title: [
        {
            required: true,
            message: "請選擇主旨",
            trigger: ["change", "blur"],
        },
    ],
    photo: [
        {
            required: false,
            message: "請上傳圖片",
            trigger: ["change", "blur"],
        },
    ],
    content: [
        {
            required: true,
            message: "請輸入詢問內容",
            trigger: ["change", "blur"],
        },
    ],
});

const formDatas = ref<any>([
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
        prop: "title",
        label: "主旨",
        placeholder: "請選擇",
        options: [],
        style: "select",
        function: (e: any) => {
            if (e.title.allow_attachments === 1) {
                formDatas.value.forEach((item: any) => {
                    if (item.prop === "photo") {
                        item.isHide = false;
                    }
                });
                rules.value.photo[0].required = true;
            } else {
                formDatas.value.forEach((item: any) => {
                    if (item.prop === "photo") {
                        item.isHide = true;
                    }
                });
                rules.value.photo[0].required = false;
            }
        },
    },
    {
        prop: "photo",
        label: "上傳照片",
        placeholder: "請上傳照片",
        type: "photo",
        style: "file",
        isHide: true,
    },
    {
        prop: "content",
        label: "詢問內容",
        placeholder: "請輸入詢問內容",
        style: "textarea",
    },
]);

// 取得主旨options
async function getSubjectType() {
    try {
        const { data } = await $api().WorkTypeAPI();
        console.log("home sampleType api => ", data.value);

        const rows = (data.value as any).data;

        formDatas.value.forEach((item: any) => {
            if (item.prop === "title") {
                rows.forEach((opt: any) => {
                    item.options.push({
                        id: opt.id,
                        label: opt.name,
                        value: opt,
                    });
                });
            }
        });
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

function handlefile(tempPath: any, prop: string) {
    form.value[prop] = tempPath;
    formRefDom.value.validateField("photo");
}

async function onSubmit() {
    if (!form.value.recaptchaToken) {
        ElMessage({
            type: "error",
            message: `請勾選我不是機器人`,
        });
        return;
    }
    formRefDom.value.validate(async (valid: any) => {
        if (!valid) {
            ElMessage({
                type: "error",
                message: `尚有欄位未填`,
            });
        } else {
            const loading = ElLoading.service({
                lock: true,
                text: "送出中...",
                background: "rgba(0, 0, 0, 0.7)",
            });
            try {
                const params = {
                    work_order_category_id: form.value.title.id,
                    name: form.value.name,
                    phone: form.value.phone,
                    email: form.value.email,
                    city: form.value.city,
                    area: form.value.area,
                    content: form.value.content,
                    attachments: form.value.photo,
                    captcha: form.value.recaptchaToken,
                };
                await $api().WorkOrderCreateAPI(params);
                ElMessage({
                    type: "success",
                    message: `送出成功`,
                });
                router.push({ name: "contact-success-slug", params: { slug: "聯絡我們表單已送出" } });
                loading.close();
            } catch (err) {
                loading.close();
                console.log("HomeSampleAPI => ", err);
            }
        }
    });
}

/**
 * 初始化
 */
async function init() {
    await getSubjectType();
}

onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
            await init();
        }
    });
});
</script>
