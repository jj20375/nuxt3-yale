<template>
    <section class="min-h-screen mt-[86px] py-[140px] border-t border-gray-300">
        <div class="container flex justify-center">
            <div class="max-w-[500px] text-gray-800">
                <div class="font-bold text-[28px] text-center mt-5 mb-5">網站維護中</div>
                <div class="text-center mb-10 text-[16px]">很抱歉，目前正在進行系統維護，請稍後再瀏覽本站。</div>
                <div class="flex justify-center">
                    <NuxtLink :to="{ name: 'index' }">
                        <button class="yellow-btn !py-3">回首頁</button>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts"></script>
