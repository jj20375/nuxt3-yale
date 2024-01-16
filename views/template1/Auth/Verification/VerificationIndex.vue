<template>
    <section class="min-h-screen mt-[94px] py-[140px] border-t border-gray-300">
        <div class="container flex justify-center">
            <div class="max-w-[500px]">
                <div class="font-bold text-[28px] text-center mt-5 mb-5">{{ memberData.verification ? '驗證失敗，已經重新寄送驗證信' : '已經寄送驗證信' }}</div>
                <div class="text-center">請至您的信箱<br/>{{ memberData.email }} 中收信完成驗證</div>
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
// 會員資料
const memberData = ref({
    email: "ABC@gmail.com",
    verification: false, // 是否為驗證失敗倒過來的
})

// 發送驗證信按鈕

</script>