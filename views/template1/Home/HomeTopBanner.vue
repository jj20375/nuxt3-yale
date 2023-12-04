<template>
    <div class="bg-gradient-to-br from-yellow-300 from-40% via-yellow-600 to-yellow-700">
        <Swiper
            :slidesPerView="1"
            :navigation="true"
            :modules="modules"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
        >
            <SwiperSlide
                class="mx-2"
                v-for="item in 10"
                :key="item"
            >
                <div class="flex items-center justify-center">
                    <article>
                        <div class="text-[50px] font-bold mr-10">Yale Link 智能鎖{{ item }} 家居保護，安心無憂</div>
                        <div class="font-light">我們不僅讓家保持安全，更讓人們感到安全。</div>
                        <div class="mt-5">
                            <button class="font-light text-black bg-white rounded-full min-w-[300px] min-h-[50px] text-center">暸解更多</button>
                        </div>
                    </article>
                    <NuxtImg
                        src="/img/banner/banner1.png"
                        class="min-h-[660px]"
                    />
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
