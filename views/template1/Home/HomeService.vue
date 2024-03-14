<template>
    <div>
        <section class="pb-[60px] md:pb-[90px] xl:pb-[120px] rounded-tl-[60px] md:rounded-tl-[90px] xl:rounded-tl-[120px] rounded-bl-[60px] md:rounded-bl-[90px] xl:rounded-bl-[120px] bg-gray-100">
            <div class="pt-[60px] md:pt-[90px] xl:pt-[120px] text-center">
                <h2 class="font-medium text-white leading-none text-[32px] sm:text-[48px] xl:text-[66px] YaleSolisW-Bd">OUR PROMISE</h2>
                <h3 class="font-medium leading-[50px] md:mt-[14px] text-[28px] sm:text-[32px] xl:text-[40px] YaleSolisW-Bd">Yale 四大安心宣言</h3>
            </div>
            <article class="container">
                <div class="grid grid-cols-2 md:grid-cols-4 items-center justify-center gap-4 lg:gap-[30px] mt-8 md:mt-[52px] mx-auto w-full px-4 md:px-0 2xl:w-[85%]">
                    <div
                        v-for="(item, index) in four_promises"
                        :key="index"
                        class="promise-card"
                    >
                        <div>
                            <NuxtImg
                                class="w-[40px] md:w-[56px] mx-auto"
                                :src="item.image"
                            />
                            <p class="mt-3 lg:mt-5 text-center text-[10px] md:text-[16px]">{{ item.title }}</p>
                        </div>
                    </div>
                </div>
            </article>
        </section>
        <div class="relative bg-gray-100 ml-auto w-full relative top-0 right-0 h-[60px] md:h-[90px] xl:h-[120px]">
            <div class="rounded-tr-[60px] md:rounded-tr-[90px] xl:rounded-tr-[120px] bg-white ml-auto w-full absolute top-0 right-0 h-[60px] md:h-[90px] xl:h-[120px]"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    four_promises: {
        title: string;
        image: string;
    }[];
}

const props = withDefaults(defineProps<Props>(), {
    four_promises: [],
});

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

<style lang="scss" scoped>
.promise-card {
    @apply relative aspect-square object-cover p-4 md:p-6 bg-white rounded-lg flex items-center justify-center top-0 transition-all duration-300;
    @apply before:absolute before:top-0 before:left-0 before:rounded-lg before:w-full before:h-full before:opacity-0 before:-z-[1] before:bg-[linear-gradient(296deg,_#FFD500_0.13%,_#FFF1C4_99.63%)] before:transition-all before:duration-300;
    @include res(nb) {
        &:hover {
            @apply -top-2.5 drop-shadow-lg;
            &::before {
                @apply opacity-100 transition-all transition-all duration-300;
            }
        }
    }
}
</style>
