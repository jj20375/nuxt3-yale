<template>
    <div class="relative">
        <div class="px-[100px]">
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
                            class="w-full cursor-pointer md:rounded-lg md:p-1"
                            :src="item.imgSrc"
                            alt=""
                        />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
        <div class="absolute top-0 z-50 flex items-center h-full">
            <button
                class="text-5xl"
                @click.stop="mainSwiper.slidePrev()"
            >
                <el-icon><ArrowLeft /></el-icon>
            </button>
        </div>
        <div class="absolute top-0 right-0 z-50 flex items-center h-full">
            <button
                class="text-5xl"
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
