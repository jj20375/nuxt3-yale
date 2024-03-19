<template>
    <div>
        <div class="flex items-center justify-center w-full h-screen">
            <font-awesome-icon
                class="animate-spin text-[40px] text-gray-300"
                :icon="['fas', 'circle-notch']"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
const route = useRoute();
const router = useRouter();

import { ElMessage, ElLoading } from "element-plus";
const { $api } = useNuxtApp();

/**
 * 初始化
 */
async function init() {
    if (route.query.scene === "reset-password") {
        router.push({ name: "auth-forgot-reset-slug", params: { slug: "密碼重設成功" }, query: { scene: route.query.scene, email: route.query.email, token: route.query.token } });
    } else if (route.query.scene === "register") {
        const params = {
            scene: route.query.scene,
            email: route.query.email,
            token: route.query.token,
        };
        const { data, status, error } = await $api().EmailVerificationAPI(params);
        if (status.value === "success") {
            ElMessage({
                type: "success",
                message: `驗證成功`,
            });
            router.push({ name: "auth-register-success-slug", params: { slug: "註冊成功" } });
        } else {
            ElMessage({
                type: "error",
                message: (error.value as any).data.message,
            });
            router.push({ name: "auth-verification-failed-slug",state: { email: route.query.email }, params: { slug: "驗證失敗" } });
        }
    } else {
        router.push({
            name: "index",
            params: { slug: "home" },
        });
    }
    // const params = {
    //     scene: route.query.scene,
    //     email: route.query.email,
    //     token: route.query.token,
    //     password: form.value.newPassword,
    //     password_confirmation: form.value.newPasswordConfirmation,
    // };
    // const { data, status, error } = await $api().PasswordEmailVerificationAPI(params);
    // if (status.value === 'success') {
    //     ElMessage({
    //         type: "success",
    //         message: `重設成功`,
    //     });
    //     router.push({ name: "auth-forgot-reset-success-slug", params: { slug: "密碼重設成功" } });

    // } else {
    //     ElMessage({
    //         type: "error",
    //         message: (error.value as any).data.message,
    //     });
    // }
}

onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
            await init();
        }
    });
});
</script>
