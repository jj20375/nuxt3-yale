<template>
    <div class="relative w-3/4 mx-auto">
        <Swiper
            v-if="photos.length > 0"
            :loop="true"
            :spaceBetween="10"
            :modules="modules"
            @swiper="onSwiper"
        >
            <SwiperSlide
                v-for="(item, index) in photos"
                :key="index"
                class="px-[3px]"
            >
                <div class="carousel__item">
                    <img
                        class="w-full object-cover aspect-square"
                        :src="item.imgSrc"
                        alt=""
                    />
                </div>
            </SwiperSlide>
        </Swiper>
        <div class="absolute top-0 -left-[30px] -translate-x-1/2 z-50 flex items-center h-full">
            <button
                class="text-3xl"
                @click.stop="mainSwiper.slidePrev()"
            >
                <el-icon><ArrowLeft /></el-icon>
            </button>
        </div>
        <div class="absolute top-0 -right-[30px] translate-x-1/2 z-50 flex items-center h-full">
            <button
                class="text-3xl"
                @click.stop="mainSwiper.slideNext()"
            >
                <el-icon><ArrowRight /></el-icon>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
// swiper 幻燈片套件
import { FreeMode, Navigation } from "swiper/modules";

interface Props {
    photos: { imgSrc: string }[];
}

const props = withDefaults(defineProps<Props>(), {
    photos: [
        {
            imgSrc: "",
        },
    ],
});

// swiper slider 模組
const modules = [FreeMode, Navigation];

// 主圖 carousel
const mainSwiper = ref<any>(null);

function onSwiper(swiper: any) {
    mainSwiper.value = swiper;
}
</script>
