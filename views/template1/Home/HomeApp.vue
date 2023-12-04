<template>
    <section>
        <div class="bg-gray-100 ml-auto w-full relative top-0 right-0 h-[200px]">
            <div class="rounded-tr-[200px] bg-white ml-auto w-full absolute top-0 right-0 h-[200px]"></div>
        </div>
        <div class="flex items-center justify-center">
            <article class="flex-1 pl-[100px]">
                <p class="text-xl font-light">Yale Home App is available on</p>
                <div class="flex items-center mt-5">
                    <qrcode-vue
                        class="mr-5"
                        :value="value"
                        :size="size"
                        level="H"
                    />
                    <NuxtImg
                        class="min-w-[200px]"
                        src="/img/home/app/app-store.jpg"
                    />
                </div>
                <div class="flex items-center mt-5">
                    <qrcode-vue
                        class="mr-5"
                        :value="value"
                        :size="size"
                        level="H"
                    />
                    <NuxtImg
                        class="min-w-[200px]"
                        src="/img/home/app/google-play.jpg"
                    />
                </div>
            </article>
            <NuxtImg
                class="flex-1 max-w-[300px]"
                src="/img/home/app/phone.png"
            />
            <article class="flex-1">
                <h2 class="text-gray-100 md:text-[80px] text-3xl font-bold">DOWNLOAD</h2>
                <h3 class="font-medium md:text-[30px] text-2xl md:mt-[30px]">Yale Home APP</h3>
            </article>
        </div>
        <div class="bg-gradient-to-r from-yellow-200 to-yellow-500 ml-auto w-full relative top-0 right-0 h-[200px]">
            <div class="bg-white rounded-br-[200px] ml-auto w-full absolute top-0 right-0 h-[200px]"></div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import QrcodeVue from "qrcode.vue";

const value = ref("https://google.com");
const size = ref(100);
</script>
