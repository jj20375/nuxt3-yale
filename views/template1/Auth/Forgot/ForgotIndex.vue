<template>
    <section class="min-h-screen mt-[94px] border-t border-gray-300 bg-gray-50 py-[60px]">
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
                            <el-form-item :prop="item.prop" :label="item.label">
                                <el-input :type="item.type" :show-password="item.showPassword"
                                          :placeholder="item.placeholder" v-model="form[item.prop]"></el-input>
                            </el-form-item>
                        </div>
                        <div class="flex gap-4 justify-center mt-6">
                            <NuxtLink
                                :to="{ name: 'auth-login-slug', params: { slug: '會員登入' }}"
                            >
                            <button
                                class="transparent-btn btn-md"
                            >
                                返回登入頁
                            </button>
                            </NuxtLink>
                            <NuxtLink
                                :to="{ name: 'auth-forgot-success-slug', params: { slug: '送出成功' }}"
                            >
                                <button
                                    class="yellow-btn btn-md"
                                >
                                    確認送出
                                </button>
                            </NuxtLink>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
const formRefDom = ref<any>();

const form = ref<any>({
    email: "",
});

const formDatas = ref<any>([
    {
        prop: "email",
        label: "Email(帳號)",
        placeholder: "請輸入電子信箱",
        style: "input"
    },
]);

const rules = ref<any>({
    email: [
        {
            required: true,
            message: "請輸入電子信箱",
            trigger: "blur"
        }
    ],
});
</script>