<template>
    <section>
        <div class="bg-gray-100 ml-auto w-full relative top-0 right-0 h-[100px]">
            <div class="rounded-tr-[200px] bg-white ml-auto w-full absolute top-0 right-0 h-[100px]"></div>
        </div>
        <div class="max-w-[971px] mx-auto">
            <div class="flex items-center justify-center">
                <article class="flex-1 mr-[133px]">
                    <p class="text-[16px] YaleSolisW-Rg font-light">Yale Home App is available on</p>
                    <div class="flex items-center mt-[41px]">
                        <qrcode-vue
                            class="mr-5"
                            :value="value"
                            :size="size"
                            level="H"
                        />
                        <NuxtImg
                            class="min-w-[163.08px]"
                            src="/img/home/app/app-store.jpg"
                        />
                    </div>
                    <div class="flex items-center mt-[24px]">
                        <qrcode-vue
                            class="mr-5"
                            :value="value"
                            :size="size"
                            level="H"
                        />
                        <NuxtImg
                            class="min-w-[163.08px]"
                            src="/img/home/app/google-play.jpg"
                        />
                    </div>
                </article>
                <NuxtImg
                    class="flex-1 min-w-[267px] max-w-[300px] mr-[69px]"
                    src="/img/home/app/phone.png"
                />
                <article class="flex-1">
                    <h2 class="text-gray-100 YaleSolisW-Bd text-[66px]">DOWNLOAD</h2>
                    <h3 class="font-bold text-[45px] YaleSolisW-Bd leading-[56.25px]">Yale Home APP</h3>
                </article>
            </div>
        </div>
        <div class="bg-gradient-to-r from-yellow-100 from-5% via-yellow-500 via-50% to-yellow-500 to-90% ml-auto w-full relative top-0 right-0 h-[100px]">
            <div class="bg-white rounded-br-[120px] ml-auto w-full absolute top-0 right-0 h-[100px]"></div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import QrcodeVue from "qrcode.vue";

const value = ref("https://google.com");
const size = ref(44);
</script>
