<template>
    <section>
        <article class="overflow-hidden bg-gray-100">
            <div class="container">
                <div class="relative pt-[140px] pb-[140px]">
                    <h2 class="font-medium text-white text-[66px] leading-none YaleSolisW-Bd">BEST SELLER</h2>
                    <h3 class="font-medium text-[40px] YaleSolisW-Bd mt-[14px] mb-8">精選商品</h3>
                    <Swiper
                        :slidesPerView="4"
                        :spaceBetween="30"
                        :freeMode="true"
                        :modules="modules"
                        @swiper="onSwiper"
                        @slideChange="onSlideChange"
                        class="products-swiper"
                    >
                        <SwiperSlide
                            class="min-h-[150px] min-w-[250px] w-full"
                            v-for="item in 10"
                            :key="item"
                        >
                            <ProductCard :product="{ id: item }" />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </article>
    </section>
</template>

<script lang="ts" setup>
// import required modules
import { Scrollbar } from "swiper/modules";
import { current } from "tailwindcss/colors";
// 產品卡片樣板
import ProductCard from "@/views/template1/components/ProductCard.vue";

const modules = ref([Scrollbar]);

function onSwiper(swiper: any) {
    console.log(swiper);
}
function onSlideChange() {
    console.log("slide change");
}
</script>

<style lang="scss" scoped>
.products-swiper {
    @apply overflow-visible;
}
</style>
