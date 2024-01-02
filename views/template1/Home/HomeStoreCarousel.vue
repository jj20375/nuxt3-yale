<template>
    <section class="relative overflow-hidden bg-white">
        <div class="container">
            <div class="pb-[120px]">
                <h2 class="text-gray-100 text-[66px] font-medium YaleSolisW-Bd leading-none">STORE</h2>
                <h3 class="text-[40px] mt-[14px] mb-8 YaleSolisW-Bd font-medium">直營門市</h3>
                <Swiper
                    :slidesPerView="3.2"
                    :spaceBetween="24"
                    :freeMode="true"
                    :modules="modules"
                    :scrollbar="{ draggable: true, dragSize: 100, horizontalClass: 'horizontalClass', dragClass: 'dragClass' }"
                    @swiper="onSwiper"
                    @slideChange="onSlideChange"
                    class="store-swiper"
                >
                    <SwiperSlide
                        class="mb-[60px] bg-white"
                        v-for="(item, index) in stores"
                        :key="index"
                    >
                        <div class="relative top-0 left-0 aspect-[16/9] overflow-hidden rounded-[20px] transition-all duration-500 hover:drop-shadow-lg">
                            <NuxtImg
                                class="absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover cursor-pointer hover:scale-[1.07] transition-all duration-300"
                                :src="item.image"
                            />
                            <h5 class="absolute z-10 bottom-[24px] YaleSolisW-Bd text-[20px] font-medium left-[24px] text-white">{{ item.name }}</h5>
                            <div class="min-h-[100px] w-full bg-gradient-to-t from-black to-black/0 absolute bottom-0 left-0 pointer-events-none rounded-b-[20px]"></div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
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
::v-deep {
    .dragClass {
        @apply h-[4px] w-[100px] bg-black rounded-lg;
    }
    .horizontalClass {
        @apply h-[4px] w-[450px];
    }
}

.store-swiper {
    @apply overflow-visible;
}
</style>
