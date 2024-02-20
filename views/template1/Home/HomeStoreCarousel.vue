<template>
    <section class="relative overflow-hidden bg-white">
        <div class="container">
            <div class="pb-[48px] md:pb-[90px] xl:pb-[120px]">
                <h2 class="text-gray-100 text-center xl:text-start text-[32px] sm:text-[48px] xl:text-[66px] font-medium YaleSolisW-Bd leading-none">STORE</h2>
                <h3 class="text-center xl:text-start text-[28px] sm:text-[32px] xl:text-[40px] md:mt-[14px] mb-6 md:mb-8 leading-[50px] YaleSolisW-Bd font-medium">直營門市</h3>
                <Swiper
                    :slidesPerView="isMobile ? 1.2 : isPad ? 2 : 3.2"
                    :spaceBetween="isMobile ? 16 : 24"
                    :freeMode="true"
                    :modules="modules"
                    :scrollbar="{ draggable: true, dragSize: 100, horizontalClass: 'horizontalClass', dragClass: 'dragClass' }"
                    @swiper="onSwiper"
                    @slideChange="onSlideChange"
                    class="store-swiper"
                >
                    <SwiperSlide
                        class="mb-9 md:mb-[60px] bg-white"
                        v-for="(item, index) in stores"
                        :key="index"
                    >
                        <div class="relative top-0 left-0 aspect-[16/9] overflow-hidden rounded-[20px] transition-all duration-500 hover:drop-shadow-lg">
                            <NuxtImg
                                class="absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover cursor-pointer hover:scale-[1.07] transition-all duration-300"
                                :src="item.image"
                            />
                            <h5 class="absolute w-full z-10 bottom-[24px] YaleSolisW-Bd px-4 md:px-0 text-[20px] font-medium md:left-[24px] text-center md:text-start text-white">{{ item.name }}</h5>
                            <div class="min-h-[100px] w-full bg-gradient-to-t from-gray-900 to-gray-50/0 absolute bottom-0 left-0 opacity-70 pointer-events-none rounded-b-[20px]"></div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
const { isMobile, isPad } = useWindowResize();
// import required modules
import { Scrollbar } from "swiper/modules";

const { $api } = useNuxtApp();

function onSwiper(swiper: any) {
    console.log(swiper);
}
function onSlideChange() {
    console.log("slide change");
}

const stores = ref<any>([]);

/**
 * 取得直營門市列表
 */
async function getList() {
    try {
        const { data } = await $api().HomeStoreCarouselAPI();
        stores.value = [];
        console.log("home sample api stores => ", data.value);

        const rows = (data.value as any).data;
        stores.value = rows;
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

/**
 * 初始化
 */
async function init() {
    await getList();
}

onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
            await init();
        }
    });
});

const modules = ref([Scrollbar]);
</script>

<style lang="scss" scoped>
:deep {
    .dragClass {
        @apply h-[4px] md:w-[100px] bg-black rounded-lg;
    }
    .horizontalClass {
        @apply h-[4px] md:w-[450px];
    }
}

.store-swiper {
    @apply overflow-visible;
}
</style>
