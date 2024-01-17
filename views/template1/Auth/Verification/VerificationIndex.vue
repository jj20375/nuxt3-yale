<template>
    <section class="min-h-screen mt-[94px] py-[140px] border-t border-gray-300">
        <div class="container flex justify-center">
            <div class="max-w-[500px]">
                <div class="font-bold text-[28px] text-center mt-5 mb-5">{{ userData.verification ? '驗證失敗，已經重新寄送驗證信' : '已經寄送驗證信' }}</div>
                <div class="text-center">請至您的信箱<br/>{{ userData.email }} 中收信完成驗證</div>
                <div class="flex justify-center mt-10">
                    <VerificationButton />
                </div>
                <div class="text-center mt-12">沒有在收件夾中找到認證信件？請先確認您的垃圾郵件。</div>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import VerificationButton from "~/views/template1/Auth/components/VerificationButton.vue";

const route = useRoute();

// 會員資料
const userData = ref({
    email: "ABC@gmail.com",
    verification: false, // 是否為驗證失敗導過來的
})

// TODO 這邊僅供參考畫面用，串接請修改掉

/**
 * 初始化
 */
function init() {
    console.log("route.query.id", route.query.id);
    if(route.query.id){
        userData.value.verification = true;
    }
}

init();

</script>