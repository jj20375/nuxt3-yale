<template>
    <section class="mt-headerMb xl:mt-header py-[70px] sm:py-[140px] border-t border-gray-300">
        <div class="container flex justify-center">
            <div class="max-w-[500px] text-gray-800">
                <Vue3Lottie
                    animationLink="/json/setting.json"
                    :height="100"
                    :width="100"
                />
                <div class="font-bold text-[28px] text-center mt-5 mb-5">網站維護中</div>
                <div class="text-center mb-10 text-[16px]">很抱歉，目前正在進行系統維護，請稍後再瀏覽本站。</div>
                <!-- <div class="flex justify-center">
                    <NuxtLink :to="{ name: 'index' }">
                        <button class="yellow-btn btn-md">回首頁</button>
                    </NuxtLink>
                </div> -->
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { Vue3Lottie } from "vue3-lottie";
</script>
