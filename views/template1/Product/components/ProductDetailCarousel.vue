<template>
    <div class="shrink-0 grow-0 md:basis-[50%] xl:basis-[430px] md:w-[50%] xl:w-[430px]">
        <div class="relative">
            <Swiper
                v-if="photos.length > 0"
                :loop="true"
                :spaceBetween="10"
                :thumbs="{ swiper: thumbsSwiper }"
                :modules="modules"
                @swiper="onSwiper"
            >
                <SwiperSlide
                    v-for="(item, index) in photos"
                    :key="index"
                >
                    <div class="carousel__item">
                        <img
                            class="w-full cursor-pointer aspect-square object-cover"
                            :src="item.imgSrc"
                            alt=""
                        />
                    </div>
                </SwiperSlide>
            </Swiper>
            <div class="absolute top-0 hidden md:flex md:-left-2 -left-[30px] -translate-x-full z-50  items-center h-full">
                <button
                    class="text-3xl"
                    @click.stop="mainSwiper.slidePrev()"
                >
                    <el-icon><ArrowLeft /></el-icon>
                </button>
            </div>
            <div class="absolute top-0 hidden md:flex md:right-0 md:-right-2 xl:-right-[30px] translate-x-full z-50 items-center h-full">
                <button
                    class="text-3xl"
                    @click.stop="mainSwiper.slideNext()"
                >
                    <el-icon><ArrowRight /></el-icon>
                </button>
            </div>
        </div>
        <div class="pt-[12px] pb-4 md:pt-[42px] px-6 md:px-0">
            <Swiper
                id="thumbClass"
                v-if="photos.length > 0"
                @swiper="setThumbsSwiper"
                :spaceBetween="16"
                :slidesPerView="5"
                :freeMode="true"
                :loop="true"
                :watchSlidesProgress="true"
                :modules="modules"
            >
                <SwiperSlide
                    v-for="(item, index) in photos"
                    :key="index"
                >
                    <img
                        class="w-full aspect-square cursor-pointer"
                        :src="item.imgSrc"
                        alt=""
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    </div>
</template>

<script setup lang="ts">
// swiper 幻燈片套件
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

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
const modules = [FreeMode, Thumbs, Navigation];

// 縮圖 dom
const thumbsSwiper = ref<any>(null);

// 設定幻燈片縮圖對應
const setThumbsSwiper = (swiper: any) => {
    thumbsSwiper.value = swiper;
};

// 主圖 carousel
const mainSwiper = ref<any>(null);

function onSwiper(swiper: any) {
    mainSwiper.value = swiper;
}

function slideTo (index: any)  {
    console.log(mainSwiper.value)
    mainSwiper.value.slideToLoop(index - 1, 200);
};
defineExpose({
    slideTo
})
</script>

<style scoped lang="scss">
#thumbClass .swiper-slide {
    opacity: 0.4;
}

#thumbClass .swiper-slide-thumb-active {
    opacity: 1;
    @apply outline outline-2 -outline-offset-2 outline-yellow-500;
}
</style>
