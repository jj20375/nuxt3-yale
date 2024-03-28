<template>
    <div class="relative mt-[40px]">
        <div>
            <Swiper
                v-if="photos.length > 0"
                :spaceBetween="isMobile ? 16 : 20"
                :slidesPerView="isLargePad ? 2 : 4"
                :modules="modules"
                :scrollbar="{ draggable: true, dragSize: 100, horizontalClass: 'horizontalClass', dragClass: 'dragClass' }"
                @swiper="onSwiper"
                @slideChange="onSlideChange"
            >
                <SwiperSlide
                    v-for="(item, index) in photos"
                    :key="index"
                    class="w-full mb-9 xl:mb-0"
                >
                    <!-- {{ item }} -->
                    <ProductCard :product="item" @handleFavorite="handleFavorite" />
                </SwiperSlide>
            </Swiper>
            <div class="absolute hidden xl:flex top-0 -left-[30px] -translate-x-full z-50 flex items-center h-full">
                <button
                    class="text-3xl flex justify-center items-center"
                    :class="[ isSliderBeginning ? 'opacity-0' : 'opacity-1' ]"
                    @click.stop="mainSwiper.slidePrev()"
                >
                    <el-icon>
                        <ArrowLeft />
                    </el-icon>
                </button>
            </div>
            <div class="absolute hidden xl:flex top-0 -right-[30px] translate-x-full z-50 flex items-center h-full">
                <button
                    class="text-3xl flex justify-center items-center"
                    :class="[ isSliderEnd ? 'opacity-0' : 'opacity-1' ]"
                    @click.stop="mainSwiper.slideNext()"
                >
                    <el-icon>
                        <ArrowRight />
                    </el-icon>
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
            other_images: [""]
        }
    ],
    breadcrumbs: [
        {
            name: "",
            text: ""
        }
    ]
});

const emit = defineEmits(["handleFavorite"]);
const { isLargePad, isMobile } = useWindowResize();

async function handleFavorite(id: any) {
    emit("handleFavorite", id);
}

// swiper slider 模組
const modules = [FreeMode, Thumbs, Navigation, Scrollbar];

// 主圖 carousel
const mainSwiper = ref<any>(null);
const isSliderBeginning = ref<boolean>(false);
const isSliderEnd = ref<boolean>(false);

function onSwiper(swiper: any) {
    mainSwiper.value = swiper;
    isSliderBeginning.value = mainSwiper.value.isBeginning;
    isSliderEnd.value = mainSwiper.value.isEnd;
}

// 更新箭頭狀態
function onSlideChange() {
    isSliderBeginning.value = mainSwiper.value.isBeginning;
    isSliderEnd.value = mainSwiper.value.isEnd;
}

</script>
<style lang="scss" scoped>

:deep(.dragClass) {
    @apply xl:hidden h-[4px] bg-black rounded-lg;
}

:deep(.horizontalClass) {
    @apply xl:hidden h-[4px];
}
</style>