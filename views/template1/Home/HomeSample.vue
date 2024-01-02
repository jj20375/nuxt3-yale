<template>
    <ClientOnly>
        <div class="relative bg-gradient-to-r from-yellow-100 from-5% via-yellow-500 via-50% to-yellow-500 to-90% ml-auto w-full relative top-0 right-0 h-[100px]">
            <div class="rounded-tr-[100px] bg-white ml-auto w-full absolute top-0 right-0 h-[100px]"></div>
        </div>
        <section
            id="HomeSample"
            class="flex items-center justify-center mt-5"
        >
            <main class="flex-1 mx-auto w-[1113px]">
                <div class="text-center">
                    <h2 class="font-medium text-gray-100 text-[66px] YaleSolisW-Bd leading-none">PROJECT</h2>
                    <h3 class="font-medium leading-[50px] text-[40px] YaleSolisW-Bd mt-[14px]">裝修實績</h3>
                </div>
                <Carousel3d
                    v-if="items.length > 0"
                    ref="carousel3dRefDom"
                    :space="500"
                    :display="3"
                    :perspective="0"
                    :inverseScaling="300"
                    :width="640"
                    :height="400"
                    :startIndex="currentIndex"
                    @after-slide-change="onSlideChange"
                >
                    <Slide
                        v-for="(slide, i) in items"
                        :index="i"
                        :key="i"
                        class="flex justify-center m-5"
                    >
                        <template v-slot="{ index, isCurrent, leftIndex, rightIndex }">
                            <div class="w-full p-10 transition-all duration-500">
                                <div :class="currentIndex === index ? 'bg-white p-2 drop-shadow-lg rounded-2xl  ' : ' opacity-30'">
                                    <NuxtImg
                                        class="rounded-2xl"
                                        :src="slide.thumbnail"
                                    />
                                    <!-- {{ slide }} -->
                                    <!-- {{ index }} -->
                                    <!-- {{ currentIndex }} -->
                                </div>
                            </div>
                        </template>
                    </Slide>
                </Carousel3d>
                <div class="mx-auto">
                    <Carousel3d
                        v-if="items.length > 0"
                        ref="carousel3d2RefDom"
                        :display="1"
                        :disable3d="true"
                        :space="365"
                        :controls-visible="false"
                        :clickable="false"
                        :width="1000"
                        :height="150"
                        :startIndex="currentIndex"
                        @after-slide-change="onSlideChange"
                    >
                        <Slide
                            v-for="(slide, i) in items"
                            :index="i"
                            :key="i"
                        >
                            <template v-slot="{ index, isCurrent, leftIndex, rightIndex }">
                                <div class="p-5 mx-auto bg-white">
                                    <div class="flex items-center justify-center">
                                        <div
                                            class="mr-[50px] text-2xl font-light bg-gray-100 p-2 h-[50px] w-[50px] flex justify-center items-center rounded-full cursor-pointer"
                                            @click.previent="prev(index)"
                                        >
                                            <button class="flex items-center">
                                                <el-icon><ArrowLeft /></el-icon>
                                            </button>
                                        </div>
                                        <div class="flex-1 max-w-[600px]">
                                            <div class="flex items-center">
                                                <h5 class="flex-1 text-[24px] YaleSolisW-Bd font-medium">{{ slide.title }}</h5>
                                                <h6 class="text-[14px] font-medium YaleSolisW-Bd">{{ slide.published_at }}</h6>
                                            </div>
                                            <p class="mt-[12px] YaleSolisW-Lt font-[400] text-[16px]">Yale Access 應用程序巧妙地提高您的家庭安全性了，讓我們能夠在有限的空閒時間處理最重要的事情。</p>
                                            <!-- {{ index }} -->
                                        </div>
                                        <div
                                            class="ml-[50px] text-2xl bg-gray-100 p-2 h-[50px] w-[50px] flex justify-center items-center rounded-full cursor-pointer"
                                            @click.previent="next(index)"
                                        >
                                            <button class="flex items-center">
                                                <el-icon><ArrowRight /></el-icon>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </Slide>
                    </Carousel3d>
                </div>
            </main>
        </section>
        <div class="bg-gray-100 ml-auto w-full relative top-0 right-0 h-[100px]">
            <div class="bg-white rounded-br-[120px] ml-auto w-full absolute top-0 right-0 h-[100px]"></div>
        </div>
    </ClientOnly>
</template>

<script lang="ts" setup>
import { useTemplateStore } from "~/store/templateStore";

const { $api } = useNuxtApp();

const templateStore = useTemplateStore();

const carousel3dRefDom = ref<any>(null);
const carousel3d2RefDom = ref<any>(null);
const items = ref<any>([]);

const currentIndex = ref(0);

function next(index: number) {
    carousel3d2RefDom.value.goNext();
    if (index === items.value.length - 1) {
        currentIndex.value = 0;
        carousel3dRefDom.value.goSlide(0);
    } else {
        currentIndex.value = index + 1;
        carousel3dRefDom.value.goSlide(index + 1);
    }
}
function prev(index: number) {
    carousel3d2RefDom.value.goPrev();
    if (index === 0) {
        carousel3dRefDom.value.goSlide(items.value.length - 1);
        currentIndex.value = items.value.length - 1;
    } else {
        currentIndex.value = index - 1;
        carousel3dRefDom.value.goSlide(index - 1);
    }
}

function onSlideChange(val: any) {
    currentIndex.value = val;
    carousel3d2RefDom.value.goSlide(val);
    console.log("onSlideChange =>>", val);
}

function scrollInit() {
    // 判斷滾動高度 大於50px時 固定選單在上方
    if (window.scrollY > 50) {
        templateStore.setHomeMenuFixed(true);
    } else {
        templateStore.setHomeMenuFixed(false);
    }
}

/**
 * 取得裝修實績列表
 */
async function getList(params: { per_page: number; page: number }) {
    try {
        const { data } = await $api().HomeSampleAPI(params);
        items.value = [];
        console.log("home sample api => ", data.value);

        const rows = (data.value as any).data.rows;
        items.value = rows;
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

/**
 * 初始化
 */
async function init() {
    await getList({ per_page: 10, page: 1 });
}
// await init();

onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
            await init();
            window.addEventListener("scroll", scrollInit);
        }
    });
});

onBeforeUnmount(() => {
    window.removeEventListener("scroll", scrollInit);
});
</script>

<style lang="scss" scoped>
.carousel-3d-container {
    .carousel-3d-slide {
        @apply border-none w-full  bg-[rgba(255,255,255,0)];
    }
}
</style>
