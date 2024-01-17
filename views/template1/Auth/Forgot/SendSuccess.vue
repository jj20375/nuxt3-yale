<template>
    <section class="min-h-screen mt-[94px] py-[140px] border-t border-gray-300">
        <div class="container flex justify-center">
            <div class="max-w-[500px]">
                <div class="font-bold text-[28px] text-center mt-5 mb-5">忘記密碼通知信件已送出</div>
                <div class="text-center">系統已發送新密碼至您申請指定的信箱<br/>請使用新密碼重新登入，並修改密碼</div>
                <div class="flex justify-center mt-10">
                    <NuxtLink :to="{ name: 'auth-login-slug', params: { slug: '會員登入' }}">
                        <button class="yellow-btn btn-md">會員登入</button>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
</script>