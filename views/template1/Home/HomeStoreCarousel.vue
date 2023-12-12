<template>
    <section class="relative bg-white overflow-hidden">
        <div class="container">
            <div class="pb-[120px]">
                <h2 class="text-gray-100 text-[66px] font-bold YaleSolisW-Bd leading-none">STORE</h2>
                <h3 class="text-[40px] mt-[14px] mb-8 YaleSolisW-Bd font-bold">直營門市</h3>
                <Swiper
                    :slidesPerView="3.2"
                    :spaceBetween="24"
                    :freeMode="true"
                    :modules="modules"
                    :scrollbar="{ draggable: true, dragSize: 100, horizontalClass: 'horizontalClass', dragClass: 'dragClass' }"
                    @swiper="onSwiper"
                    @slideChange="onSlideChange"
                    class="store-swiper"
                >
                    <SwiperSlide
                        class="mb-[60px] bg-white"
                        v-for="item in 10"
                        :key="item"
                    >
                        <div class="relative top-0 left-0 aspect-[16/9] overflow-hidden rounded-[20px]">
                            <NuxtImg
                                class="absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover cursor-pointer hover:scale-[1.07] transition-all duration-300"
                                src="/img/store/shop3.jpg"
                            />
                            <h5 class="absolute z-10 bottom-[24px] YaleSolisW-Bd font-bold left-[24px] text-white">Yale 承德門市</h5>
                            <div class="min-h-[100px] w-full bg-gradient-to-t from-black to-black/0 absolute bottom-0 left-0 pointer-events-none rounded-b-[20px]"></div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
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

.store-swiper {
    @apply overflow-visible;
}
</style>
