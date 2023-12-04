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
                        <div
                            class="relative bg-white rounded-2xl"
                            @mouseover="mouseoverEvent(item)"
                            @mouseleave="mouseleaveEvent(item)"
                        >
                            <NuxtImg
                                class="w-full rounded-2xl"
                                src="/img/home/product/product1.jpg"
                            />
                            <div
                                :class="currentHover === item ? 'opacity-100' : 'opacity-0'"
                                class="absolute top-0 flex items-end w-full h-full transition-all duration-500"
                            >
                                <div class="absolute text-3xl text-gray-300 top-2 right-5">
                                    <font-awesome-icon :icon="['far', 'heart']" />
                                </div>
                                <div class="absolute z-50 mb-5 text-center">
                                    <button class="bg-yellow-500 hover:bg-yellow-600 transition-all duration-500 rounded-full text-lg font-light min-w-[200px] min-h-[50px]">加入購物車</button>
                                    <button class="mt-2 z-10 bg-gray-200 rounded-full text-lg font-light min-w-[200px] min-h-[50px] hover:bg-black hover:text-white transition-all duration-500">瞭解更多</button>
                                </div>
                                <div class="absolute top-0 left-0 z-10 w-full h-full bg-white opacity-30 rounded-2xl"></div>
                            </div>
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
import { current } from "tailwindcss/colors";

function onSwiper(swiper: any) {
    console.log(swiper);
}
function onSlideChange() {
    console.log("slide change");
}

const currentHover = ref<null | number>(null);

function mouseoverEvent(index: number) {
    currentHover.value = index;
}

function mouseleaveEvent(index: number) {
    currentHover.value = null;
}

const modules = ref([Scrollbar]);
</script>
