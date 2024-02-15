<template>
    <section class="mt-[86px] border-t border-gray-300 py-[60px]">
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
                    <div class="flex justify-between">
                        <el-form-item
                            class="!mb-0"
                            prop="saveInfo"
                        >
                            <el-checkbox
                                class="!h-fit text-[15px]"
                                v-model="form.saveInfo"
                                :label="'記住我'"
                                size="large"
                            />
                        </el-form-item>
                        <NuxtLink :to="{ name: 'auth-forgot-slug', params: { slug: '忘記密碼' } }">
                            <div class="text-[15px]">忘記密碼?</div>
                        </NuxtLink>
                    </div>
                    <button
                        class="yellow-btn !py-3 !w-full"
                        @click.prevent="onSubmit"
                    >
                        登入
                    </button>
                </div>
            </el-form>
            <div class="relative px-5 mt-[30px]">
                <div class="relative text-center divide-text before:absolute before:top-1/2 before:left-0 before:h-px before:w-full before:bg-gray-400 before:z-0">
                    <span class="relative px-3 text-gray-400 text-[15px] bg-white z-[2]">使用其他帳號登入</span>
                </div>
                <div class="flex gap-[30px] justify-center mt-4">
                    <div
                        v-if="ssoLogingSite.google"
                        @click="ssoLogin('google')"
                    >
                        <NuxtImg
                            class="object-cover w-10 transition-all cursor-pointer aspect-1/1 duration-400 hover:opacity-80 hover:transition-all hover:duration-400"
                            src="/img/icons/medias/google.svg"
                        />
                    </div>
                    <div
                        v-if="ssoLogingSite.line"
                        @click="ssoLogin('line')"
                    >
                        <NuxtImg
                            class="object-cover w-10 transition-all cursor-pointer aspect-1/1 duration-400 hover:opacity-80 hover:transition-all hover:duration-400"
                            src="/img/icons/medias/line.svg"
                        />
                    </div>
                    <div
                        v-if="ssoLogingSite.facebook"
                        @click="ssoLogin('facebook')"
                    >
                        <NuxtImg
                            class="object-cover w-10 transition-all cursor-pointer aspect-1/1 duration-400 hover:opacity-80 hover:transition-all hover:duration-400"
                            src="/img/icons/medias/facebook.svg"
                        />
                    </div>
                </div>
                <div class="flex justify-center gap-3 mt-[30px]">
                    <div class="text-gray-400 text-[15px]">還不是會員?</div>
                    <NuxtLink :to="{ name: 'auth-register-slug', params: { slug: '註冊頁' } }">
                        <div class="text-[15px] underline underline-offset-2 cursor-pointer hover:no-underline">立即註冊</div>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { validateEmail } from "~/service/validator";
import { ElMessage, ElLoading } from "element-plus";
import { useUserStore } from "~/store/userStore";
import { useInitializationStore } from "~/store/initializationStore";
import Cookies from "js-cookie";

const { $api } = useNuxtApp();
const userStore = useUserStore();
const router = useRouter();
const formRefDom = ref<any>();
const initializationStore = useInitializationStore();

const form = ref<any>({
    email: "",
    password: "",
    saveInfo: false,
});

const ssoLogingSite = computed(() => {
    return JSON.parse(JSON.stringify(initializationStore.initializationData.site.socialite_providers));
});

const formDatas = ref<any>([
    {
        prop: "email",
        label: "帳號",
        placeholder: "請輸入電子信箱",
        style: "input",
    },
    {
        prop: "password",
        label: "密碼",
        placeholder: "請輸入密碼",
        style: "input",
        type: "password",
        showPassword: true,
    },
]);

const rules = ref<any>({
    email: [
        {
            required: true,
            message: "請輸入email",
            trigger: "blur",
        },
        {
            required: true,
            validator: validateEmail,
            trigger: ["change", "blur"],
            message: "格式不正確",
        },
    ],
    password: [
        {
            required: true,
            message: "請輸入密碼",
            trigger: "blur",
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
                text: "登入中...",
                background: "rgba(0, 0, 0, 0.7)",
            });
            try {
                const params = {
                    password: form.value.password,
                    email: form.value.email,
                };
                const { data, status, error } = await $api().LoginAPI(params);
                if (status.value === "success") {
                    ElMessage({
                        type: "success",
                        message: `登入成功`,
                    });
                    console.log((data.value as any).data.token);
                    const token = (data.value as any).data.token;
                    Cookies.set("token", token);
                    userStore.getUserProfile();
                    router.push({ name: "auth-panel-slug", params: { slug: "會員中心" } });
                } else {
                    ElMessage({
                        type: "error",
                        message: (error.value as any).data.message,
                    });
                }

                loading.close();
            } catch (err) {
                loading.close();
                console.log("LoginAPI => ", err);
            }
        }
    });
}

async function ssoLogin(site: string) {
    let ssoSite = "";
    if (site === "google") {
        ssoSite = ssoLogingSite.value.google;
    } else if (site === "line") {
        ssoSite = ssoLogingSite.value.line;
    } else if (site === "facebook") {
        ssoSite = ssoLogingSite.value.facebook;
    }
    console.log(ssoSite);
    window.open(ssoSite);
}

// window.addEventListener("message", getMessage, false);

function getMessage(e: any) {
    if (e.origin === 'https://yale-third-party.mrjin.me') {
        console.log(e, 'getMessage', e.data);
        const SSOLoginData = e.data
        if (!SSOLoginData.registered) {
            userStore.ssoLogingData = SSOLoginData
            router.push({ name: 'auth-login-sso-slug', params: { slug: '快速登入' } });
        } else {
            const token = SSOLoginData.token;
            Cookies.set("token", token);
            userStore.getUserProfile();
            router.push({ name: "auth-panel-slug", params: { slug: "會員中心" } });
        }
        // router.push({ name: 'auth-login-sso-slug', params: { slug: '快速登入' } });
    }
}

onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
            window.addEventListener("message", getMessage, false);
        }
    });
});
</script>
