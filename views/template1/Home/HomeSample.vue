<template>
    <ClientOnly>
        <div class="relative bg-gray-200 to-90% ml-auto w-full relative top-0 right-0 h-[60px] md:h-[90px] xl:h-[120px]">
            <div class="rounded-tr-[60px] md:rounded-tr-[90px] xl:rounded-tr-[120px] bg-white ml-auto w-full absolute top-0 right-0 h-[60px] md:h-[90px] xl:h-[120px]"></div>
        </div>
        <section
            id="HomeSample"
            class="flex items-center justify-center overflow-hidden md:mt-5"
        >
            <main class="flex-1 mx-auto">
                <div class="text-center">
                    <h2 class="inline-block font-medium text-gray-100 text-[32px] sm:text-[48px] xl:text-[66px] YaleSolisW-Bd leading-none gradient-title">PROJECT</h2>
                    <h3 class="font-medium leading-[50px] text-[28px] sm:text-[32px] xl:text-[40px] YaleSolisW-Bd md:mt-[14px]">裝修實績</h3>
                </div>
                <Carousel3d
                    v-if="items.length > 0"
                    ref="carousel3dRefDom"
                    :disable3d="isMobile ? true : false"
                    :space="isMobile ? nowWindowSize.width : 500"
                    :display="3"
                    :perspective="0"
                    :inverseScaling="300"
                    :width="isLargeDesktop ? 800 : !isMobile ? 640 : nowWindowSize.width"
                    :height="isLargeDesktop ? 500 : !isMobile ? 400 : (nowWindowSize.width / 8) * 5"
                    :startIndex="currentIndex"
                    @after-slide-change="onSlideChange"
                >
                    <Slide
                        v-for="(slide, i) in items"
                        :index="i"
                        :key="i"
                        class="flex justify-center md:m-5"
                    >
                        <template v-slot="{ index, isCurrent, leftIndex, rightIndex }">
                            <div class="w-full p-6 transition-all duration-500 md:p-10">
                                <div :class="currentIndex === index ? 'bg-white p-2 drop-shadow-lg rounded-2xl  ' : ' opacity-30'">
                                    <NuxtImg
                                        class="rounded-lg aspect-[16/9] object-cover"
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
                        :width="!isLargePad ? 1000 : !isMobile ? 640 : nowWindowSize.width"
                        :height="!isMobile ? 150 : 120"
                        :startIndex="currentIndex"
                        @after-slide-change="onSlideChange"
                    >
                        <Slide
                            v-for="(slide, i) in items"
                            :index="i"
                            :key="i"
                        >
                            <template v-slot="{ index, isCurrent, leftIndex, rightIndex }">
                                <div class="px-5 mx-auto bg-white xl:p-5">
                                    <div class="flex items-center justify-center">
                                        <div
                                            class="mr-[20px] md:mr-[50px] text-2xl font-light bg-gray-100 p-2 h-[30px] w-[30px] md:h-[50px] md:w-[50px] flex justify-center items-center rounded-full cursor-pointer"
                                            @click.previent="prev(index)"
                                        >
                                            <button class="flex items-center text-[14px] md:text-[16px]">
                                                <el-icon><ArrowLeft /></el-icon>
                                            </button>
                                        </div>
                                        <div
                                            class="flex-1 max-w-[600px] cursor-pointer"
                                            @click="goToDetail(slide.url)"
                                        >
                                            <div class="flex items-center">
                                                <h5 class="flex-1 text-[18px] md:text-[24px] YaleSolisW-Bd font-medium line-clamp-1">
                                                    {{ slide.title }}
                                                </h5>
                                                <h6 class="hidden xl:block text-[14px] font-medium YaleSolisW-Bd">{{ slide.published_at }}</h6>
                                            </div>
                                            <p
                                                class="md:mt-[6px] mt-[12px] YaleSolisW-Lt font-[400] text-[16px] line-clamp-2"
                                                v-if="slide.description"
                                            >
                                                {{ slide.description }}
                                            </p>
                                            <!-- {{ index }} -->
                                        </div>
                                        <div
                                            class="ml-[20px] md:ml-[50px] text-2xl bg-gray-100 p-2 h-[30px] w-[30px] md:h-[50px] md:w-[50px] flex justify-center items-center rounded-full cursor-pointer"
                                            @click.prevent="next(index)"
                                        >
                                            <button class="flex items-center text-[14px] md:text-[16px]">
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
        <div class="bg-gray-100 ml-auto w-full relative top-0 right-0 h-[60px] md:h-[90px] xl:h-[120px]">
            <div class="bg-white rounded-br-[60px] md:rounded-br-[90px] xl:rounded-br-[120px] ml-auto w-full absolute top-0 right-0 h-[60px] md:h-[90px] xl:h-[120px]"></div>
        </div>
    </ClientOnly>
</template>

<script lang="ts" setup>
const { $api, $utils } = useNuxtApp();
const { isLargeDesktop, isMobile, isLargePad, nowWindowSize } = useWindowResize();
const router = useRouter();

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

/**
 * 取得裝修實績列表
 */
async function getList(params: { per_page: number; page: number }) {
    try {
        const { data } = await $api().HomeSampleAPI(params);
        items.value = [];
        console.log("home sample api => ", data.value);

        const rows = (data.value as any).data.rows;

        // const breadcrumbs = [
        //     {
        //         name: "index",
        //         text: "首頁",
        //     },
        // ];

        rows.forEach((item: { articleCategory: any; id: any }) => {
            const breadcrumbs = [
                {
                    name: "index",
                    text: "首頁",
                },
            ];
            breadcrumbs.push({
                name: "sample-slug-id",
                text: "裝修實績",
                params: { slug: "裝修實績", id: item.articleCategory.id },
            });
            breadcrumbs.push({
                name: "sample-slug-id",
                text: item.articleCategory.name,
                params: { slug: "裝修實績", id: item.articleCategory.id },
            });
            items.value.push({
                ...item,
                url: {
                    name: "sample-details-slug-id",
                    params: { slug: item.articleCategory.name, id: item.id },
                },
            });
        });
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

function goToDetail(url: any) {
    // 將麵包屑存進 storage
    router.push({ name: url.name, params: url.params });
}

/**
 * 初始化
 */
async function init() {
    await getList({ per_page: 10, page: 1 });
}
await init();
</script>

<style lang="scss" scoped>
.carousel-3d-container {
    @apply my-0;
    .carousel-3d-slide {
        @apply border-none w-full  bg-[rgba(255,255,255,0)];
    }
}
</style>
