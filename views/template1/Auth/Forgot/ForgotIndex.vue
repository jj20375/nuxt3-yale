<template>
    <section class="mt-[86px] border-t border-gray-300 py-[60px]">
        <div class="container">
            <div class="w-3/4 py-[60px] px-[72px] bg-white mx-auto rounded-[24px] border-[1px] border-gray-200">
                <h3 class="font-medium text-[28px] mb-5">忘記密碼</h3>
                <p class="mb-7">請輸入您註冊帳號時填寫的 Email 信箱，並點擊「確認送出」以發送變更密碼的訊息到您的 Email 信箱！</p>
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
                                :prop="item.prop"
                                :label="item.label"
                            >
                                <el-input
                                    :type="item.type"
                                    :show-password="item.showPassword"
                                    :placeholder="item.placeholder"
                                    v-model="form[item.prop]"
                                ></el-input>
                            </el-form-item>
                        </div>
                        <div class="flex gap-4 justify-center mt-6">
                            <NuxtLink :to="{ name: 'auth-login-slug', params: { slug: '會員登入' } }">
                                <button class="transparent-btn btn-md">返回登入頁</button>
                            </NuxtLink>
                            <button @click.prevent="onSubmit" class="yellow-btn btn-md">確認送出</button>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { validateEmail } from "~/service/validator";
import { ElMessage, ElLoading } from "element-plus";
const { $api } = useNuxtApp();
const router = useRouter();

const formRefDom = ref<any>();

const form = ref<any>({
    email: "",
});

const formDatas = ref<any>([
    {
        prop: "email",
        label: "Email(帳號)",
        placeholder: "請輸入電子信箱",
        style: "input",
    },
]);

const rules = ref<any>({
    email: [
        {
            required: true,
            message: "請輸入電子信箱",
            trigger: ["change", "blur"],
        },
        {
            required: true,
            validator: validateEmail,
            trigger: ["change", "blur"],
            message: "格式不正確",
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
                text: "送出中...",
                background: "rgba(0, 0, 0, 0.7)",
            });
            try {
                const params = {
                    email: form.value.email
                };
                const { data, status, error } = await $api().ForgotPasswordAPI(params);
                if (status.value === 'success') {
                    ElMessage({
                        type: "success",
                        message: `送出成功`,
                    });
                    router.push({ name: "auth-forgot-success-slug", params: { slug: "送出成功" } });

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
                    message: "送出失敗",
                });
                loading.close();
                console.log("HomeSampleAPI => ", err);
            }
        }
    });
}
</script>
