<template>
    <div class="relative mt-[40px]">
        <div>
            <Swiper
                v-if="photos.length > 0"
                :loop="true"
                :spaceBetween="20"
                :slidesPerView="4"
                :modules="modules"
                @swiper="onSwiper"
            >
                <SwiperSlide
                    v-for="(item, index) in photos"
                    :key="index"
                    class="px-[3px]"
                >
                    <!-- {{ item }} -->
                    <ProductCard :product="item" />
                </SwiperSlide>
            </Swiper>
            <div class="absolute top-0 -left-[30px] -translate-x-full z-50 flex items-center h-full">
                <button
                    class="text-3xl"
                    @click.stop="mainSwiper.slidePrev()"
                >
                    <el-icon><ArrowLeft /></el-icon>
                </button>
            </div>
            <div class="absolute top-0 -right-[30px] translate-x-full z-50 flex items-center h-full">
                <button
                    class="text-3xl"
                    @click.stop="mainSwiper.slideNext()"
                >
                    <el-icon><ArrowRight /></el-icon>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// swiper 幻燈片套件
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import ProductCard from "~/views/template1/components/ProductCard.vue";
/**
 * ProductCarInterface: 產品卡片樣式參數
 */
import type { ProductCarInterface } from "~/interface/product";
/**
 * BreadcrumbInterface: 麵包屑格式
 */
import type { BreadcrumbInterface } from "~/interface/global";

interface Props {
    photos: ProductCarInterface[];
    breadcrumbs: BreadcrumbInterface[];
}

const props = withDefaults(defineProps<Props>(), {
    photos: [
        {
            id: 1,
            model: "",
            name: "",
            price: 0,
            market_price: 0,
            main_image: "",
            other_images: [""],
        },
    ],
    breadcrumbs: [
        {
            name: "",
            text: "",
        },
    ],
});

// swiper slider 模組
const modules = [FreeMode, Thumbs, Navigation];

// 主圖 carousel
const mainSwiper = ref<any>(null);

function onSwiper(swiper: any) {
    mainSwiper.value = swiper;
}
</script>
