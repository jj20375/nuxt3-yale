<template>
    <div>
        <section class="pb-[100px] rounded-tl-[120px] rounded-bl-[120px] bg-gradient-to-r from-yellow-100 from-5% via-yellow-500 via-50% to-yellow-500 to-90%">
            <div class="pt-[100px] text-center">
                <h2 class="font-bold text-white leading-[66px] text-[66px] YaleSolisW-Bd">OUR PROMISE</h2>
                <h3 class="font-medium leading-[50px] mt-[14px] text-[40px] YaleSolisW-Bd">Yale 四大安心宣言</h3>
            </div>
            <article class="flex items-center justify-center mt-[32px]">
                <div
                    v-for="(item, index) in items"
                    :key="index"
                    class="w-[240px] h-[240px] mr-[30px] bg-white rounded-lg flex items-center justify-center transition-all duration-500 hover:mb-10"
                >
                    <div>
                        <NuxtImg
                            class="min-w-[57px] mx-auto"
                            :src="item.imgUrl"
                        />
                        <p class="my-5 text-center text-[16px]">{{ item.text }}</p>
                    </div>
                </div>
            </article>
        </section>
        <div class="bg-gradient-to-r from-yellow-100 from-5% via-yellow-500 via-50% to-yellow-500 to-90% ml-auto w-full relative top-0 right-0 h-[100px]">
            <div class="rounded-tr-[120px] bg-white ml-auto w-full absolute top-0 right-0 h-[100px]"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
const items = [
    {
        text: "專人到府安裝電子鎖",
        imgUrl: "/img/home/service/icon1.svg",
    },
    {
        text: "24 小時免費客服",
        imgUrl: "/img/home/service/icon2.svg",
    },
    {
        text: "電子鎖 2 年原廠保固",
        imgUrl: "/img/home/service/icon3.svg",
    },
    {
        text: "7 天新品不良免費換",
        imgUrl: "/img/home/service/icon3.svg",
    },
];
</script>
