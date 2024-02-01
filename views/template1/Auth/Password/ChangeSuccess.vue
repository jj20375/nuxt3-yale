<template>
    <section class="mt-[86px] py-[140px] border-t border-gray-300">
        <div class="container flex justify-center">
            <div class="max-w-[500px]">
                <div class="font-bold text-[28px] text-center mt-5 mb-5">密碼變更成功</div>
                <div class="text-center mb-10">您已成功變更密碼，下次登入請使用新密碼</div>
                <div class="flex justify-center">
                    <NuxtLink
                        :to="{ name: 'auth-panel-slug', params: { slug: '會員中心' }}"
                    >
                        <button class="yellow-btn !py-3">
                            繼續
                        </button>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
</script>