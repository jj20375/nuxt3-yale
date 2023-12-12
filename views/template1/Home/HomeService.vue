<template>
    <div>
        <section class="pb-[100px] rounded-tl-[120px] rounded-bl-[120px] bg-gradient-to-r from-yellow-100 from-5% via-yellow-500 via-50% to-yellow-500 to-90%">
            <div class="pt-[100px] text-center">
                <h2 class="font-bold text-white leading-[66px] text-[66px] YaleSolisW-Bd">OUR PROMISE</h2>
                <h3 class="font-medium leading-[50px] mt-[14px] text-[40px] YaleSolisW-Bd">Yale 四大安心宣言</h3>
            </div>
            <article class="container">
                <div class="grid grid-cols-4 items-center justify-center gap-4 lg:gap-[30px] mt-[40px] mx-auto w-full xl:w-5/6">
                    <div
                        v-for="(item, index) in items"
                        :key="index"
                        class="relative aspect-[1/1] p-6 bg-white rounded-lg flex items-center justify-center top-0 transition-all duration-500 hover:-top-2.5 hover:drop-shadow-lg"
                    >
                        <div>
                            <NuxtImg
                                class="min-w-[56px] mx-auto"
                                :src="item.imgUrl"
                            />
                            <p class="mt-3 lg:mt-5 text-center text-[16px]">{{ item.text }}</p>
                        </div>
                    </div>
                </div>
            </article>
        </section>
        <div class="relative bg-gradient-to-r from-yellow-100 from-5% via-yellow-500 via-50% to-yellow-500 to-90% ml-auto w-full relative top-0 right-0 h-[100px]">
            <div class="rounded-tr-[120px] bg-white ml-auto w-full absolute top-0 right-0 h-[120px]"></div>
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
        imgUrl: "/img/home/service/icon4.svg",
    },
];
</script>
