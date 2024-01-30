<template>
    <div class="w-full">
        <div class="relative">
            <div class="px-[100px]">
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
                        class="px-[3px]"
                    >
                        <div class="carousel__item">
                            <img
                                class="w-full cursor-pointer md:p-1 aspect-square object-cover"
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
        <div class="px-[100px]">
            <Swiper
                id="thumbClass"
                v-if="photos.length > 0"
                @swiper="setThumbsSwiper"
                :spaceBetween="10"
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
                        class="w-full p-1 aspect-square cursor-pointer"
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
    mainSwiper.value.slideTo(index - 1, 0);
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
    @apply border-2 border-yellow-500;
}
</style>
