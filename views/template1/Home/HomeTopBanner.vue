<template>
    <div class="min-h-[800px] max-h-[800px]">
        <Swiper
            :slidesPerView="1"
            :navigation="true"
            :modules="modules"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
        >
            <SwiperSlide
                v-for="item in 10"
                :key="item"
            >
                <div
                    class="flex items-center min-h-[800px] bg-cover"
                    style="background-image: url('/img/banner/banner1.jpg')"
                >
                    <article class="max-w-[440px] ml-[271px] mr-[126px]">
                        <div class="text-[48px] YaleSolisW-Bd font-bold">Yale Link 智能鎖{{ item }} 家居保護，安心無憂</div>
                        <div class="text-[16px] mt-[20px]">我們不僅讓家保持安全，更讓人們感到安全。</div>
                        <div class="mt-[40px]">
                            <button class="font-light text-gray-600 bg-white rounded-full min-w-[300px] min-h-[60px] text-center">暸解更多</button>
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
    console.log(swiper);
}
function onSlideChange() {
    console.log("slide change");
}

const modules = ref([Navigation]);
</script>

<style lang="scss" scoped>
::v-deep {
    .swiper-button-next {
        color: #000;
    }
    .swiper-button-prev {
        color: #000;
    }
}
</style>
