<template>
    <section class="mt-headerMb xl:mt-header py-[140px] border-t border-gray-300">
        <div class="container flex justify-center">
            <div class="max-w-[500px] text-gray-800">
                <NuxtImg
                    class="w-[150px] mx-auto"
                    src="img/icons/404.gif"
                />
                <div class="font-bold text-[28px] text-center mt-5 mb-5">頁面不存在</div>
                <div class="text-center mb-10 text-[16px]">很抱歉，您所訪問之頁面不存在，可能網址錯誤或失效。</div>
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
