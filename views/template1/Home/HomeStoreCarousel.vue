<template>
    <section class="bg-white">
        <div class="pl-[100px] pb-[100px]">
            <div class="min-h-[200px] flex items-center">
                <div>
                    <h2 class="font-bold text-gray-100 md:text-[80px] text-3xl">STORE</h2>
                    <h3 class="font-medium md:text-[60px] text-2xl md:mt-[60px]">直營門市</h3>
                </div>
            </div>

            <Swiper
                :slidesPerView="4"
                :spaceBetween="30"
                :freeMode="true"
                :modules="modules"
                :scrollbar="{ draggable: true, dragSize: 100, horizontalClass: 'horizontalClass', dragClass: 'dragClass' }"
                @swiper="onSwiper"
                @slideChange="onSlideChange"
            >
                <SwiperSlide
                    class="min-h-[150px] min-w-[250px] bg-white rounded-lg my-10 p-2 mx-2"
                    v-for="item in 10"
                    :key="item"
                >
                    <NuxtImg
                        class="w-full rounded-2xl"
                        src="/img/store/shop3.jpg"
                    />
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
        @apply h-[10px] w-[100px] bg-black rounded-lg;
    }
    .horizontalClass {
        @apply h-[10px] w-[500px];
    }
}
</style>
