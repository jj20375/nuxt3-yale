<template>
    <section class="bg-white">
        <div class="pl-[158px] pb-[100px]">
            <div class="min-h-[200px] flex items-center">
                <div>
                    <h2 class="text-gray-100 text-[66px] font-bold YaleSolisW-Bd leading-none">STORE</h2>
                    <h3 class="text-[40px] mt-[14px] YaleSolisW-Bd font-bold">直營門市</h3>
                </div>
            </div>

            <Swiper
                :slidesPerView="4.2"
                :spaceBetween="30"
                :freeMode="true"
                :modules="modules"
                :scrollbar="{ draggable: true, dragSize: 100, horizontalClass: 'horizontalClass', dragClass: 'dragClass' }"
                @swiper="onSwiper"
                @slideChange="onSlideChange"
            >
                <SwiperSlide
                    class="p-2 mb-[60px] bg-white"
                    v-for="item in 10"
                    :key="item"
                >
                    <div class="relative top-0 left-0">
                        <NuxtImg
                            class="w-full rounded-[20px]"
                            src="/img/store/shop3.jpg"
                        />
                        <h5 class="absolute z-10 bottom-[24px] YaleSolisW-Bd font-bold left-[24px] text-white">Yale 承德門市</h5>
                        <div class="min-h-[100px] w-full bg-gradient-to-t from-black to-black/0 absolute bottom-0 left-0 rounded-b-[20px]"></div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    </section>
</template>

<script lang="ts" setup>
// import required modules
import { Scrollbar } from "swiper/modules";

function onSwiper(swiper: any) {
    console.log(swiper);
}
function onSlideChange() {
    console.log("slide change");
}

const modules = ref([Scrollbar]);
</script>

<style lang="scss" scoped>
::v-deep {
    .dragClass {
        @apply h-[4px] w-[100px] bg-black rounded-lg;
    }
    .horizontalClass {
        @apply h-[4px] w-[450px];
    }
}
</style>
