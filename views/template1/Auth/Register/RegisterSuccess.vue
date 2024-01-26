<template>
    <section class="min-h-screen mt-[86px] py-[140px] border-t border-gray-300">
        <div class="container flex justify-center">
            <div class="max-w-[500px]">
                <Vue3Lottie
                    animationLink="/json/check.json"
                    :height="100"
                    :width="100"
                />
                <div class="font-bold text-[28px] text-center mt-5 mb-5">帳號註冊成功</div>
                <div class="text-center">您可以至
                    <NuxtLink class="underline font-bold underline-offset-2 cursor-pointer hover:no-underline"
                              :to="{ name: 'auth-panel-slug', params: { slug: '會員中心' }}">會員中心
                    </NuxtLink>
                    編輯您的基本資料，<br/>
                    假如您有任何疑問，請聯繫我們，感謝您的註冊。
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { Vue3Lottie } from "vue3-lottie";
</script>