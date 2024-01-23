<template>
    <section class="min-h-screen mt-[94px] pb-[60px] bg-gray-50">
        <div class="container overflow-auto">
            <div class="w-[620px] mt-[60px] py-[60px] px-[60px] bg-white mx-auto rounded-[24px] border-[1px] border-gray-200">
                <h3 class="font-medium text-[28px] mb-8">重設密碼</h3>
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
                                    :show-password="item.showPassword"
                                    :placeholder="item.placeholder"
                                    v-model="form[item.prop]"
                                ></el-input>
                            </el-form-item>
                        </div>
                        <div class="flex mt-4 gap-4 justify-center">
                            <NuxtLink :to="{ name: 'auth-panel-slug', params: { slug: '會員中心' } }">
                                <button class="transparent-btn btn-md">返回</button>
                            </NuxtLink>
                            <button @click.prevent="onSubmit" class="yellow-btn btn-md">送出</button>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
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

const formDatas = ref([
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
])

const formRefDom = ref<any>();

const form = ref<any>({
    oldPassword: "",
    newPassword: "",
    new_password_confirmation: "",
});

const rules = ref<any>({
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
                    scene: route.query.scene,
                    email: route.query.email,
                    token: route.query.token,
                    password: form.value.newPassword,
                    password_confirmation: form.value.newPasswordConfirmation,
                };
                const { data, status, error } = await $api().PasswordEmailVerificationAPI(params);
                if (status.value === 'success') {
                    ElMessage({
                        type: "success",
                        message: `重設成功`,
                    });
                    router.push({ name: "auth-forgot-reset-success-slug", params: { slug: "密碼重設成功" } });

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
                    message: "重設失敗",
                });
                loading.close();
                console.log("HomeSampleAPI => ", err);
            }
        }
    });
}
</script>
