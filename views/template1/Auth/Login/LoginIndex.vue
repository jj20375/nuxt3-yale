<template>
    <section class="mt-[94px] border-t border-gray-300 bg-gray-50 flex items-center justify-center py-[60px]">
        <div class="w-[504px] py-[60px] px-[72px] bg-white mx-auto rounded-[24px] border-[1px] border-gray-200">
            <h3 class="font-medium text-[28px] text-center mb-8">會員登入</h3>
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
                    <div class="flex justify-between">
                        <el-form-item class="!mb-0"
                                      prop="saveInfo"
                        >
                            <el-checkbox
                                class="!h-fit text-[15px]"
                                v-model="form.saveInfo"
                                :label="'記住我'"
                                size="large"
                            />
                        </el-form-item>
                        <div class="text-[15px]">忘記密碼?</div>
                    </div>
                    <button
                        class="yellow-btn !py-3 !w-full"
                    >
                        登入
                    </button>
                </div>
            </el-form>
            <div class="relative px-5 mt-[30px]">
                <div
                    class="relative divide-text text-center before:absolute before:absolute before:top-1/2 before:left-0 before:h-px before:w-full before:bg-gray-400 before:z-0">
                    <span class="relative px-3 text-gray-400 text-[15px] bg-white z-[2]">使用其他帳號登入</span>
                </div>
                <div class="flex gap-[30px] justify-center mt-4">
                    <NuxtImg
                        class="w-10 aspect-1/1 object-cover cursor-pointer transition-all duration-400 hover:opacity-80 hover:transition-all hover:duration-400"
                        src="/img/icons/medias/google.svg"
                    />
                    <NuxtImg
                        class="w-10 aspect-1/1 object-cover cursor-pointer transition-all duration-400 hover:opacity-80 hover:transition-all hover:duration-400"
                        src="/img/icons/medias/line.svg"
                    />
                    <NuxtImg
                        class="w-10 aspect-1/1 object-cover cursor-pointer transition-all duration-400 hover:opacity-80 hover:transition-all hover:duration-400"
                        src="/img/icons/medias/facebook.svg"
                    />
                </div>
                <div class="flex justify-center gap-3 mt-[30px]">
                    <div class="text-gray-400 text-[15px]">還不是會員?</div>
                    <NuxtLink
                        :to="{ name: 'auth-register-slug', params: { slug: '註冊頁' }}"
                    >
                        <div class="text-[15px] underline underline-offset-2 cursor-pointer hover:no-underline">立即註冊</div>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
const formRefDom = ref<any>();

const form = ref<any>({
    email: "",
    password: "",
    saveInfo: false
});

const formDatas = ref<any>([
    {
        prop: "email",
        label: "帳號",
        placeholder: "請輸入電子信箱",
        style: "input"
    },
    {
        prop: "password",
        label: "密碼",
        placeholder: "請輸入密碼",
        style: "input",
        type: "password",
        showPassword: true
    }
]);

const rules = ref<any>({
    email: [
        {
            required: true,
            message: "請輸入email",
            trigger: "blur"
        }
    ],
    password: [
        {
            required: true,
            message: "請輸入密碼",
            trigger: "blur"
        }
    ]
});
</script>