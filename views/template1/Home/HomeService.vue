<template>
    <section class="bg-gradient-to-r from-yellow-200 to-yellow-500">
        <div class="pt-20 text-center">
            <h2 class="font-bold text-white md:text-[80px] text-3xl">OUR PROMISE</h2>
            <h3 class="font-medium md:text-[60px] text-2xl md:mt-[60px]">Yale 四大安心宣言</h3>
        </div>
        <article class="flex items-center justify-center min-h-[500px]">
            <div
                v-for="(item, index) in items"
                :key="index"
                class="min-w-[250px] min-h-[250px] mr-5 bg-white rounded-lg flex items-center justify-center transition-all duration-500 hover:mb-10"
            >
                <div>
                    <NuxtImg
                        class="min-w-[50px] mx-auto"
                        :src="item.imgUrl"
                    />
                    <p class="my-5 text-center">{{ item.text }}</p>
                </div>
            </div>
        </article>
        <div class="bg-gradient-to-r from-yellow-200 to-yellow-500 ml-auto w-full relative top-0 right-0 h-[200px]">
            <div class="rounded-tr-[200px] bg-white ml-auto w-full absolute top-0 right-0 h-[200px]"></div>
        </div>
    </section>
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
