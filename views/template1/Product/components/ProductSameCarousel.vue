<template>
    <div class="relative mt-[40px]">
        <div>
            <Swiper
                v-if="photos.length > 0"
                :loop="isPad ? false : true"
                :spaceBetween="isMobile ? 16 : 20"
                :slidesPerView="isPad ? 2 : 4"
                :modules="modules"
                :scrollbar="{ draggable: true, dragSize: 100, horizontalClass: 'horizontalClass', dragClass: 'dragClass' }"
                @swiper="onSwiper"
            >
                <SwiperSlide
                    v-for="(item, index) in photos"
                    :key="index"
                    class="aspect-square w-full mb-9 xl:mb-0"
                >
                    <!-- {{ item }} -->
                    <ProductCard :product="item" @handleFavorite="handleFavorite" />
                </SwiperSlide>
            </Swiper>
            <div class="absolute hidden xl:flex top-0 -left-[30px] -translate-x-full z-50 flex items-center h-full">
                <button
                    class="text-3xl"
                    @click.stop="mainSwiper.slidePrev()"
                >
                    <el-icon><ArrowLeft /></el-icon>
                </button>
            </div>
            <div class="absolute hidden xl:flex top-0 -right-[30px] translate-x-full z-50 flex items-center h-full">
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
import { FreeMode, Navigation, Thumbs, Scrollbar } from "swiper/modules";
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

const emit = defineEmits(["handleFavorite"]);
const { isPad, isMobile } = useWindowResize();

async function handleFavorite (id: any) {
    emit("handleFavorite", id);
}

// swiper slider 模組
const modules = [FreeMode, Thumbs, Navigation, Scrollbar];

// 主圖 carousel
const mainSwiper = ref<any>(null);

function onSwiper(swiper: any) {
    mainSwiper.value = swiper;
}
</script>
<style lang="scss" scoped>
:deep {
    .dragClass {
        @apply xl:hidden h-[4px] bg-black rounded-lg;
    }
    .horizontalClass {
        @apply xl:hidden h-[4px];
    }
}
</style>