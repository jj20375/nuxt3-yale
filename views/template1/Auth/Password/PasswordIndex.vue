<template>
    <section class="min-h-screen mt-[94px] pb-[60px] bg-gray-50">
        <nav v-if="!userData" class="border-t border-b border-gray-300 py-[16px] bg-white">
            <div class="grid grid-cols-7 gap-0">
                <div class="col-span-7 ml-[122px]">
                    <Breadcrumb :menus="breadcrumbs" />
                </div>
            </div>
        </nav>
        <div class="container overflow-auto">
            <div class="w-[620px] mt-[60px] py-[60px] px-[60px] bg-white mx-auto rounded-[24px] border-[1px] border-gray-200">
                <h3 class="font-medium text-[28px] mb-8">{{ userData ? '重設密碼' : '變更密碼'}}</h3>
                <el-form
                    class="custom-form"
                    ref="formRefDom"
                    :model="form"
                    :rules="rules"
                    require-asterisk-position="right"
                >
                    <div class="grid gap-6">
                        <div
                            v-for="(item, index) in formDatas"
                            :key="index"
                        >
                            <el-form-item
                                v-if="item.style === 'input'"
                                :prop="item.prop"
                                :label="item.label"
                            >
                                <el-input
                                    :type="item.type"
                                    :show-password="item.showPassword"
                                    :disabled="item.disabled"
                                    :placeholder="item.placeholder"
                                    v-model="form[item.prop]"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                v-else-if="item.style === 'radio'"
                                :prop="item.prop"
                                :label="item.label"
                            >
                                <el-radio-group v-model="form[item.prop]">
                                    <el-radio
                                        v-for="(option, radio_index) in item.radioData"
                                        :key="radio_index"
                                        :label="option.value"
                                        size="large"
                                        >{{ option.label }}</el-radio
                                    >
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item
                                v-else-if="item.style === 'datepicker'"
                                :prop="item.prop"
                            >
                                <div class="el-form-item w-full">
                                    <div class="el-form-item__label">
                                        {{ item.label
                                        }}<span
                                            class="ml-[2px] text-red-500"
                                            v-if="item.required"
                                            >*</span
                                        >
                                    </div>
                                    <el-date-picker
                                        v-model="form[item.prop]"
                                        type="date"
                                        valueFormat="YYYY-MM-DD"
                                        :placeholder="item.placeholder"
                                        popper-class="date-box"
                                    />
                                </div>
                            </el-form-item>
                        </div>
                        <div class="flex mt-4 gap-4 justify-center">
                            <NuxtLink :to="{ name: 'auth-panel-slug', params: { slug: '會員中心' } }">
                                <button class="transparent-btn btn-md">返回</button>
                            </NuxtLink>
                            <button @click.prevent="onSubmit" class="yellow-btn btn-md">儲存</button>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
import { InternalRuleItem } from "async-validator/dist-types/interface";
import { validatePassword } from "~/service/validator";
import { ElMessage, ElLoading } from "element-plus";
const { $api } = useNuxtApp();
const router = useRouter();

const route = useRoute();

const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁",
    },
    {
        name: "auth-panel-slug",
        text: "會員中心",
        params: { slug: "會員中心" },
    },
    {
        name: "auth-password-slug",
        text: "變更密碼",
        params: { slug: "變更密碼" },
    },
]);

const formRefDom = ref<any>();

const form = ref<any>({
    oldPassword: "",
    newPassword: "",
    new_password_confirmation: "",
});

const formDatas = ref<any>([
    {
        prop: "oldPassword",
        label: "舊密碼",
        placeholder: "請輸入舊密碼",
        style: "input",
        showPassword: true,
        isVisible: computed(() => !userData.value),
    },
    {
        prop: "newPassword",
        label: "新密碼",
        placeholder: "請輸入新密碼",
        style: "input",
        showPassword: true,
    },
    {
        prop: "newPasswordConfirmation",
        label: "確認密碼",
        placeholder: "請再次輸入密碼",
        style: "input",
        showPassword: true,
    },
]);

const formDatas:any = computed(() => initFormDatas.value.filter(item => item.isVisible !== false));

const rules = ref<any>({
    oldPassword: [
        {
            required: true,
            message: "請輸入舊密碼",
            trigger: ["change", "blur"],
        },
        {
            required: true,
            validator: validatePassword,
            trigger: ["change", "blur"],
            message: "必須包含至少一個大寫字母、一個小寫字母和一個數字，並且長度至少為 8 個字元。",
        },
    ],
    newPassword: [
        {
            required: true,
            message: "請輸入新密碼",
            trigger: ["change", "blur"],
        },
        {
            required: true,
            validator: validatePassword,
            trigger: ["change", "blur"],
            message: "必須包含至少一個大寫字母、一個小寫字母和一個數字，並且長度至少為 8 個字元。",
        },
    ],
    newPasswordConfirmation: [
        {
            required: true,
            message: "請輸入確認密碼",
            trigger: ["change", "blur"],
        },
        {
            required: true,
            message: "密碼不一致",
            validator: (rule: InternalRuleItem, value: string, callback: (error?: string | Error) => void) => {
                if (value !== form.value.newPassword) {
                    callback(new Error());
                } else {
                    callback();
                }
            },
            trigger: ["change", "blur"],
        },
    ],
});

async function onSubmit() {
    formRefDom.value.validate(async (valid: any) => {
        if (!valid) {
            ElMessage({
                type: "error",
                message: `尚有欄位未填`,
            });
        } else {
            const loading = ElLoading.service({
                lock: true,
                text: "儲存中...",
                background: "rgba(0, 0, 0, 0.7)",
            });
            try {
                const params = {
                    old_password: form.value.oldPassword,
                    new_password: form.value.newPassword,
                    new_password_confirmation: form.value.newPasswordConfirmation,
                };
                const { data, status, error } = await $api().ChangePassewordAPI(params);
                if (status.value === 'success') {
                    ElMessage({
                        type: "success",
                        message: `變更成功`,
                    });
                    router.push({ name: "auth-password-success-slug", params: { slug: "密碼變更成功" } });

                } else {
                    ElMessage({
                        type: "error",
                        message: (error.value as any).data.message,
                    });
                }
                loading.close();
            } catch (err) {
                ElMessage({
                    type: "error",
                    message: "變更失敗",
                });
                loading.close();
                console.log("HomeSampleAPI => ", err);
            }
        }
    });
}
</script>
