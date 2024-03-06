<template>
    <div class="h-screen">
        <Swiper
            ref="swiper"
            :slidesPerView="1"
            :navigation="true"
            :modules="modules"
            :loop="true"
            :pagination="{ clickable: true }"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
        >
            <SwiperSlide
                v-for="(item, index) in props.carousel"
                :key="index"
            >
                <div
                    class="flex xl:items-center h-screen bg-center bg-cover"
                    :style="{ 'background-image': `url(${isMobile ? item.mobile_image : item.desktop_image})` }"
                >
                    <article class="container">
                        <div class="relative w-full top-[120px] xl:top-[0] xl:w-1/2">
                            <div class="text-[28px] md:text-[36px] xl:text-[48px] text-center xl:text-start YaleSolisW-Bd font-medium">{{ item.title }}</div>
                            <div class="text-[14px] md:text-[16px] text-center xl:text-start mt-[8px] md:mt-[20px]">{{ item.subtitle }}</div>
                            <div class="mt-[24px] md:mt-[40px]">
                                <button
                                    class="animation-btn"
                                    :class="isMobile ? 'm-auto btn-xs' : isLargePad ? 'm-auto' : 'btn-lg'"
                                >
                                    了解更多
                                </button>
                            </div>
                        </div>
                    </article>
                </div>
            </SwiperSlide>
        </Swiper>
    </div>
</template>

<script setup lang="ts">
// import required modules
import { Navigation, Pagination } from "swiper/modules";
const { isDesktop, isMobile, isLargePad } = useWindowResize();

interface Props {
    carousel: {
        title: string;
        subtitle: string;
        desktop_image: string;
        mobile_image: string;
    }[];
}

const props = withDefaults(defineProps<Props>(), {
    carousel: () => [],
});

function onSwiper(swiper: any) {
    console.log("swiper => ", swiper);
}

function onSlideChange() {
    console.log("slide change");
}

const modules = ref([Navigation, Pagination]);
</script>

<style lang="scss" scoped>
:deep(.swiper) {
    &:hover {
        .swiper-button-next,
        .swiper-button-prev {
            @apply opacity-100;
        }
    }
    .swiper-button-next {
        @apply opacity-0;
        @apply h-8 w-8;
        @apply bg-no-repeat bg-center;
        @apply transition-all duration-300 ease-in-out;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMjMiIHZpZXdCb3g9IjAgMCAxNyAyMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIuNjk5NjcgMjIuOTg2TDAuMzMzMDA4IDIwLjk0NkwxMS4yOTk3IDExLjQ5M0wwLjMzMzAwOCAyLjA0MDAxTDIuNjk5NjcgMEwxNi4wMzMgMTEuNDkzTDIuNjk5NjcgMjIuOTg2WiIgZmlsbD0iIzRFNEU1MSIvPgo8L3N2Zz4=");
        @apply hidden xl:block;
        @apply after:content-none;
        @apply xl:hover:opacity-80;
        @apply hover:transition-all hover:duration-300 hover:ease-in-out;
    }

    .swiper-button-prev {
        @apply opacity-0;
        @apply h-8 w-8;
        @apply bg-no-repeat bg-center;
        @apply transition-all duration-300 ease-in-out;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMjMiIHZpZXdCb3g9IjAgMCAxNiAyMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTMuMzMzMyAyMi45ODZMMCAxMS40OTNMMTMuMzMzMyAwTDE1LjcgMi4wNDAwMUw0LjczMzMzIDExLjQ5M0wxNS43IDIwLjk0NkwxMy4zMzMzIDIyLjk4NloiIGZpbGw9IiM0RTRFNTEiLz48L3N2Zz4=");
        @apply hidden xl:block;
        @apply after:content-none;
        @apply hover:opacity-80;
        @apply hover:transition-all hover:duration-300 hover:ease-in-out;
    }
    .swiper-button-prev {
        @apply left-[44px];
    }
    .swiper-button-next {
        @apply right-[44px];
    }
    .swiper-pagination {
        @apply flex xl:hidden p-2 w-fit bg-white rounded-full top-auto left-1/2 -translate-x-1/2 bottom-4;
        .swiper-pagination-bullet-active {
            @apply bg-gray-800;
        }
    }
}
</style>
