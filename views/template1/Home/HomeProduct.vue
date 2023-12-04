<template>
    <section>
        <article class="bg-gray-100">
            <div class="pl-[100px] pb-[100px]">
                <div class="min-h-[300px] flex items-center">
                    <div>
                        <h2 class="font-bold text-white md:text-[80px] text-3xl">BEST SELLER</h2>
                        <h3 class="font-medium md:text-[60px] text-2xl md:mt-[60px]">精選商品</h3>
                    </div>
                </div>

                <Swiper
                    :slidesPerView="4.5"
                    :spaceBetween="30"
                    :freeMode="true"
                    :modules="modules"
                    @swiper="onSwiper"
                    @slideChange="onSlideChange"
                >
                    <SwiperSlide
                        class="min-h-[150px] min-w-[250px] w-full p-2 mx-2"
                        v-for="item in 10"
                        :key="item"
                    >
                        <div class="bg-white rounded-2xl">
                            <NuxtImg
                                class="w-full rounded-2xl"
                                src="/img/home/product/product1.jpg"
                            />
                        </div>
                        <h3 class="mt-1 text-2xl font-bold">YDM 4109A-{{ item }}</h3>
                        <h3 class="">指紋密碼鑰匙三合一</h3>
                        <div class="flex mt-3 OpenSansFont">
                            <span class="mr-2">NT$1,760</span>
                            <span class="text-gray-400 line-through">NT$1,760</span>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </article>
    </section>
</template>

<script lang="ts" setup>
// import required modules
import { Scrollbar } from "swiper/modules";

function onSwiper(swiper: any) {
    console.log(swiper);
}
function onSlideChange() {
    console.log("slide change");
}

const modules = ref([Scrollbar]);
</script>
