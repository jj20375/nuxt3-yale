<template>
    <section>
        <div class="bg-gray-100 ml-auto w-full relative top-0 right-0 h-[120px]">
            <div class="rounded-tr-[200px] bg-white ml-auto w-full absolute top-0 right-0 h-[120px]"></div>
        </div>
        <div class="container">
            <div class="flex items-center justify-between w-full mx-auto xl:w-5/6">
                <article>
                    <p class="text-[16px] text-center YaleSolisW-Rg font-light">Yale Home App is available on</p>
                    <div class="flex items-center mt-[41px]">
                        <qrcode-vue
                            class="mr-5"
                            :value="value"
                            :size="size"
                            level="H"
                        />
                        <NuxtImg
                            class="min-w-[163.08px]"
                            src="/img/home/app/app-store.png"
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
                            src="/img/home/app/google-play.png"
                        />
                    </div>
                </article>
                <NuxtImg
                    class="ml-[80px] min-w-[267px] max-w-[300px]"
                    src="/img/home/app/phone.png"
                />
                <article>
                    <h2 class="text-gray-100 YaleSolisW-Bd text-[66px] font-medium gradient-title">DOWNLOAD</h2>
                    <h3 class="font-medium text-[45px] YaleSolisW-Bd leading-[56.25px]">Yale Home APP</h3>
                </article>
            </div>
        </div>
        <div class="bg-gray-100 ml-auto w-full relative top-0 right-0 h-[120px]">
            <div class="bg-white rounded-br-[120px] ml-auto w-full absolute top-0 right-0 h-[120px]"></div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import QrcodeVue from "qrcode.vue";

const value = ref("https://google.com");
const size = ref(44);
</script>
