<template>
    <div class="relative py-[80px] bg-gray-300">
        <div class="container">
            <div class="relative">
                <Swiper
                    v-if="photos.length > 0"
                    :spaceBetween="24"
                    slidesPerView="auto"
                    :slidesPerGroup="1"
                    :modules="modules"
                    @swiper="onSwiper"
                >
                    <SwiperSlide
                        v-for="(item, index) in photos"
                        :key="index"
                        class="px-[3px]"
                    >
                        <div class="carousel__item rounded-[20px]">
                            <NuxtImg
                                class="h-[350px] rounded-[20px]"
                                :src="item.imgSrc"
                                alt=""
                            />
                        </div>
                    </SwiperSlide>
                </Swiper>
                <div class="absolute top-0 z-50 flex items-center h-full -left-[30px] -translate-x-full">
                    <button
                        class="text-5xl"
                        :class="{ disabled: isSliderInnerBeginning }"
                        @click.stop="mainSwiper.slidePrev()"
                    >
                        <el-icon><ArrowLeft /></el-icon>
                    </button>
                </div>
                <div class="absolute top-0 z-50 flex items-center h-full -right-[30px] translate-x-full">
                    <button
                        class="text-5xl"
                        :class="{ disabled: isSliderInnerEnd }"
                        @click.stop="mainSwiper.slideNext()"
                    >
                        <el-icon><ArrowRight /></el-icon>
                    </button>
                </div>
            </div>
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
const prevInnerRef = ref<any>(null);
const nextInnerRef = ref<any>(null);

function onSwiper(swiper: any) {
    mainSwiper.value = swiper;
}

// 第一個prev不顯示
const isSliderInnerBeginning = computed(() => {
    return mainSwiper.value ? mainSwiper.value.isBeginning : false;
});

// 最後一個next不顯示
const isSliderInnerEnd = computed(() => {
    return mainSwiper.value ? mainSwiper.value.isEnd : false;
});
</script>

<style scoped lang="scss">
.swiper-slide{
    width: auto;
}
</style>