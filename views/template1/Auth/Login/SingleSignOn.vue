<template>
    <section class="mt-[86px] py-[60px] bg-gray-50 border-t border-gray-300">
        <div class="container">
            <div class="w-3/4 p-[60px] bg-white mx-auto rounded-[24px] border-[1px] border-gray-200">
                <h3 class="text-[24px] font-bold mb-6">快速登入</h3>
                <p>歡迎使用FB、Google、Line帳號快速登入，設定完成後可直接使用FB、Google、Line帳號登入</p>
                <div class="border-gray-200 border-b-[1px] my-[30px]"></div>
                <el-form
                    class="custom-form"
                    ref="formRefDom"
                    :model="form"
                    :rules="rules"
                    require-asterisk-position="right"
                >
                    <el-form-item prop="isMember">
                        <el-radio-group v-model="form.isMember">
                            <el-radio
                                :label="true"
                                size="large"
                                border
                            >
                                <div>我已是Yale會員</div>
                            </el-radio>
                            <div class="px-[48px] py-5 w-3/4 flex flex-col gap-6">
                                <div class="flex gap-3 items-center">
                                    <NuxtImg
                                        class="relative w-6 h-fit aspect-square object-cover"
                                        :src="socialIconPath"
                                    />
                                    <div class="text-[15px] text-gray-700">{{ memberData.email }}</div>
                                </div>
                                <el-form-item
                                    prop="email"
                                    label="帳號"
                                >
                                    <el-input
                                        v-model="form.email"
                                        placeholder="請輸入電子信箱"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    prop="password"
                                    label="密碼"
                                >
                                    <el-input
                                        v-model="form.password"
                                        showPassword
                                        type="password"
                                        placeholder="請輸入密碼"
                                    ></el-input>
                                </el-form-item>
                                <NuxtLink :to="{ name: 'auth-forgot-slug', params: { slug: '忘記密碼' } }">
                                    <div class="text-[15px]">忘記密碼?</div>
                                </NuxtLink>
                            </div>
                            <el-radio
                                :label="false"
                                size="large"
                                border
                            >
                                <div>我還不是Yale會員，我要同時成為新會員</div>
                            </el-radio>
                            <div class="px-[48px] py-5 w-3/4 flex flex-col gap-6">
                                <div class="flex gap-3 items-center">
                                    <NuxtImg
                                        class="relative w-6 h-fit aspect-square object-cover"
                                        :src="socialIconPath"
                                    />
                                    <div class="text-[15px] text-gray-700">{{ memberData.email }}</div>
                                </div>
                            </div>
                        </el-radio-group>
                    </el-form-item>
                    <div class="flex justify-center mt-4">
                        <!--  選擇我已是會員需導到進入登入頁前的頁面，選擇我還不是會員需導到會員註冊的頁面    -->
                        <button
                            @click.prevent="onSubmit"
                            class="yellow-btn btn-md"
                        >
                            確認送出
                        </button>
                    </div>
                </el-form>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { validateEmail } from "~/service/validator";
import { ElMessage, ElLoading } from "element-plus";
import Cookies from "js-cookie";
import { useUserStore } from "~/store/userStore";
import { onBeforeRouteLeave } from "vue-router";

const { $api } = useNuxtApp();
const router = useRouter();
const userStore = useUserStore();

const formRefDom = ref<any>();

const form = ref<any>({
    isMember: true,
    email: "",
    password: "",
});

const rules = ref<any>({
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
    password: [
        {
            required: true,
            message: "請輸入密碼",
            trigger: "blur",
        },
    ],
});

// 會員資料
// const memberData = ref({
//     email: "ABC@gmail.com",
//     social: "google",
// })

const memberData = computed(() => {
    let data = {
        email: "ABC@gmail.com",
        social: "google",
    };
    if (userStore.ssoLogingData) {
        const SSOLoginData = userStore.ssoLogingData;
        data = {
            email: SSOLoginData.provider === "google" ? SSOLoginData.user.email : SSOLoginData.user.name,
            social: SSOLoginData.provider,
        };
    }
    return data;
});

// 社群圖片資料
const socialData = ref([
    {
        name: "facebook",
        icon: "/img/icons/medias/facebook.svg",
    },
    {
        name: "google",
        icon: "/img/icons/medias/google.svg",
    },
    {
        name: "line",
        icon: "/img/icons/medias/line.svg",
    },
]);

// 給對應的社群圖片
const socialIconPath = computed(() => {
    const selectedSocial = socialData.value.find((social) => social.name === memberData.value.social);
    return selectedSocial ? selectedSocial.icon : "";
});

async function signin() {
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
                    openid: userStore.ssoLogingData.user.openid,
                    provider: userStore.ssoLogingData.provider,
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

async function onSubmit() {
    if (form.value.isMember) {
        signin();
    } else {
        router.push({ name: "auth-register-slug", params: { slug: "註冊頁" }, query: { provider: userStore.ssoLogingData.provider } });
    }
}

onBeforeRouteLeave((to, from, next) => {
    console.log("to.name", to.name);
    if (to.name !== "auth-register-slug") {
        userStore.ssoLogingData = null;
    }
    next();
});
</script>

<style scoped lang="scss">
.custom-form {
    .el-radio-group {
        @apply w-full;
        .el-radio {
            @apply w-full font-normal mr-0 border-0 bg-gray-50 rounded-[8px];
            &.el-radio--large {
                @apply p-4;
            }
        }
    }
}
</style>
