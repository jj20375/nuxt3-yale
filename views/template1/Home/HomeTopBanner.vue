<template>
    <div class="h-screen">
        <Swiper
            ref="swiper"
            :slidesPerView="1"
            :navigation="true"
            :modules="modules"
            :loop="true"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
        >
            <SwiperSlide
                v-for="item in 10"
                :key="item"
            >
                <div
                    class="flex items-center h-screen bg-center bg-cover"
                    style="background-image: url('/img/banner/banner1.jpg')"
                >
                    <article class="container">
                        <div class="w-full lg:w-1/2">
                            <div class="text-[48px] YaleSolisW-Bd font-medium">Yale Link 智能鎖{{ item }}<br />家居保護，安心無憂</div>
                            <div class="text-[16px] mt-[20px]">我們不僅讓家保持安全，更讓人們感到安全。</div>
                            <div class="mt-[40px]">
                                <button class="animation-btn btn-lg">了解更多</button>
                            </div>
                        </div>
                    </article>
                    <!-- <NuxtImg
                        src="/img/banner/banner1.png"
                        class="min-h-[600px]"
                    /> -->
                </div>
            </SwiperSlide>
        </Swiper>
    </div>
</template>

<script setup lang="ts">
// import required modules
import { Navigation } from "swiper/modules";

function onSwiper(swiper: any) {
    console.log("swiper => ", swiper);
}

function onSlideChange() {
    console.log("slide change");
}

const modules = ref([Navigation]);
</script>

<style lang="scss" scoped>
:deep(.swiper) {
    &:hover {
        .swiper-button-next,
        .swiper-button-prev {
            @apply opacity-100;
        }
    }
    .swiper-button-next {
        @apply opacity-0;
        @apply h-8 w-8;
        @apply bg-no-repeat bg-center;
        @apply transition-all duration-300 ease-in-out;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMjMiIHZpZXdCb3g9IjAgMCAxNyAyMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIuNjk5NjcgMjIuOTg2TDAuMzMzMDA4IDIwLjk0NkwxMS4yOTk3IDExLjQ5M0wwLjMzMzAwOCAyLjA0MDAxTDIuNjk5NjcgMEwxNi4wMzMgMTEuNDkzTDIuNjk5NjcgMjIuOTg2WiIgZmlsbD0iIzRFNEU1MSIvPgo8L3N2Zz4=");
        @apply after:content-none;
        @apply hover:opacity-80;
        @apply hover:transition-all hover:duration-300 hover:ease-in-out;
    }

    .swiper-button-prev {
        @apply opacity-0;
        @apply h-8 w-8;
        @apply bg-no-repeat bg-center;
        @apply transition-all duration-300 ease-in-out;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMjMiIHZpZXdCb3g9IjAgMCAxNiAyMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTMuMzMzMyAyMi45ODZMMCAxMS40OTNMMTMuMzMzMyAwTDE1LjcgMi4wNDAwMUw0LjczMzMzIDExLjQ5M0wxNS43IDIwLjk0NkwxMy4zMzMzIDIyLjk4NloiIGZpbGw9IiM0RTRFNTEiLz48L3N2Zz4=");
        @apply after:content-none;
        @apply hover:opacity-80;
        @apply hover:transition-all hover:duration-300 hover:ease-in-out;
    }
    .swiper-button-prev {
        @apply left-[44px];
    }
    .swiper-button-next {
        @apply right-[44px];
    }
}
</style>
