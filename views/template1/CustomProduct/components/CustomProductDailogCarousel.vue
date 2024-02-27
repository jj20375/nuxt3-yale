<template>
    <div class="relative w-3/4 mx-auto">
        <Swiper
            v-if="photos.length > 0"
            :spaceBetween="10"
            :modules="modules"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
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
                class="text-3xl flex justify-center items-center"
                :class="[ isSliderBeginning ? 'opacity-0' : 'opacity-1' ]"
                @click.stop="mainSwiper.slidePrev()"
            >
                <el-icon><ArrowLeft /></el-icon>
            </button>
        </div>
        <div class="absolute top-0 -right-[30px] translate-x-1/2 z-50 flex items-center h-full">
            <button
                class="text-3xl flex justify-center items-center"
                :class="[ isSliderEnd ? 'opacity-0' : 'opacity-1' ]"
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
const isSliderBeginning = ref<boolean>(true);
const isSliderEnd = ref<boolean>(false);

function onSwiper(swiper: any) {
    mainSwiper.value = swiper;
    setTimeout(() => {
        isSliderBeginning.value = mainSwiper.value.isBeginning;
        isSliderEnd.value = mainSwiper.value.isEnd;
    }, 100);
}

function onSlideChange() {
    isSliderBeginning.value = mainSwiper.value.isBeginning;
    isSliderEnd.value = mainSwiper.value.isEnd;
}

</script>
