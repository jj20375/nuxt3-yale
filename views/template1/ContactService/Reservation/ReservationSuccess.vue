<template>
    <section class="min-h-screen mt-[86px] py-[140px] border-t border-gray-300">
        <div class="container flex justify-center">
            <div class="max-w-[500px]">
                <Vue3Lottie
                    animationLink="/json/check.json"
                    :height="100"
                    :width="100"
                />
                <div class="font-bold text-[28px] text-center mt-5 mb-5">安裝預約申請已送出</div>
                <div class="text-center">感謝您的訊息，我們將會在收到信後盡速與您聯繫。</div>
                <div class="flex justify-center mt-10">
                    <NuxtLink :to="{ name: 'index' }">
                        <button class="yellow-btn">繼續</button>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { Vue3Lottie } from "vue3-lottie";
</script>
