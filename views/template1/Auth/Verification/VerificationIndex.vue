<template>
    <div v-if="!userData.verification">
        <div class="flex items-center justify-center w-full h-screen">
            <font-awesome-icon
                class="animate-spin text-[40px] text-gray-300"
                :icon="['fas', 'circle-notch']"
            />
        </div>
    </div>
    <section
        v-if="userData.verification"
        class="mt-[86px] py-[140px] border-t border-gray-300"
    >
        <div class="container flex justify-center">
            <div class="max-w-[500px]">
                <div class="font-bold text-[28px] text-center mt-5 mb-5">{{userData.title}}</div>
                <div class="text-center">請至您的信箱<br />{{ userData.email }} 中收信完成驗證</div>
                <div class="flex justify-center mt-10">
                    <VerificationButton @resendVerification="resendVerification" />
                </div>
                <div class="mt-12 text-center">沒有在收件夾中找到認證信件？請先確認您的垃圾郵件。</div>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import VerificationButton from "~/views/template1/Auth/components/VerificationButton.vue";

const router = useRouter();
const { $api } = useNuxtApp();

// 會員資料
const userData = ref({
    title: '已經寄送驗證信',
    email: "ABC@gmail.com",
    verification: false, // 是否為驗證失敗導過來的
});

const resendVerification = async () => {
    const params = {
        scene: 'register',
        email: history.state.email,
    };
    await $api().EmailVerificationResendAPI(params);
}

/**
 * 初始化
 */
function init() {
    if (history.state.email) {
        userData.value.verification = true;
        userData.value.email = history.state.email;
        if (history.state.state === '會員尚未完成驗證') {
            userData.value.title = '會員尚未完成驗證'
        }
    } else {
        router.push({
            name: "index",
            params: { slug: "home" },
        });
    }
}

onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
            await init();
        }
    });
});
</script>
