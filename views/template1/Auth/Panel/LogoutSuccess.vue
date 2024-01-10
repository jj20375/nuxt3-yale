<template>
    <section class="mt-[94px] py-[140px] border-t border-gray-300">
        <div class="container flex justify-center">
            <div class="max-w-[500px]">
                <div class="font-bold text-[28px] text-center mt-5 mb-5">登出成功</div>
                <div class="text-center mb-10">您的帳號已成功登出</div>
                <NuxtLink
                    :to="{ name: 'index', params: { slug: '' }}"
                >
                    <button class="yellow-btn !py-3">
                        回首頁
                    </button>
                </NuxtLink>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { Vue3Lottie } from "vue3-lottie";
</script>