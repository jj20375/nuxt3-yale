<style lang="scss" sccped>
.carousel-3d-container {
    .carousel-3d-slide {
        @apply border-none w-full  bg-[rgba(255,255,255,0)];
    }
}
</style>

<template>
    <ClientOnly>
        <div class="bg-yellow-400 ml-auto w-full relative top-0 right-0 h-[200px]">
            <div class="rounded-tr-[200px] bg-white ml-auto w-full absolute top-0 right-0 h-[200px]"></div>
        </div>
        <section class="mt-5">
            <div class="text-center">
                <h2 class="font-bold text-gray-100 md:text-[80px] text-3xl">PROJECT</h2>
                <h3 class="font-medium md:text-[60px] text-2xl md:mt-[60px]">裝修實績</h3>
            </div>
            <Carousel3d
                v-if="items.length > 0"
                ref="carousel3dRefDom"
                :space="500"
                :display="3"
                :perspective="0"
                :inverseScaling="200"
                :width="800"
                :height="500"
                :clickable="false"
            >
                <Slide
                    v-for="(slide, i) in items"
                    :index="i"
                    :key="i"
                    class="flex justify-center m-5"
                >
                    <template v-slot="{ index, isCurrent, leftIndex, rightIndex }">
                        <div class="w-full p-10">
                            <div :class="currentIndex === index ? 'bg-white p-5 drop-shadow-lg rounded-2xl  ' : ' opacity-30'">
                                <NuxtImg
                                    class="rounded-2xl"
                                    src="/img/home/sample/fix.jpg"
                                />
                                <!-- {{ slide }} -->
                                {{ index }}
                                {{ currentIndex }}
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
                    :clickable="false"
                    :width="1000"
                    :height="200"
                    :count="items.length"
                    @onMainSlideClick="onSlideChange"
                >
                    <Slide
                        v-for="(slide, i) in items"
                        :index="i"
                        :key="i"
                    >
                        <template v-slot="{ index, isCurrent, leftIndex, rightIndex }">
                            <div class="p-5 mx-auto bg-white">
                                <div class="flex items-center">
                                    <div
                                        class="mr-20 text-2xl font-light bg-gray-100 p-2 h-[50px] w-[50px] flex justify-center items-center rounded-full cursor-pointer"
                                        @click.previent="prev(index)"
                                    >
                                        <button class="flex items-center">
                                            <el-icon><ArrowLeft /></el-icon>
                                        </button>
                                    </div>
                                    <div class="flex-1">
                                        <div class="flex">
                                            <h5 class="flex-1 text-3xl font-bold">實現您的智慧家庭{{ slide }}</h5>
                                            <h6 class="text-xl font-bold">2023 / 12 / 01</h6>
                                        </div>
                                        <p class="my-2 text-base">Yale Access 應用程序巧妙地提高您的家庭安全性了，讓我們能夠在有限的空閒時間處理最重要的事情。</p>
                                        {{ leftIndex }}
                                        {{ index }}
                                        {{ rightIndex }}
                                    </div>
                                    <div
                                        class="ml-20 text-2xl bg-gray-100 p-2 h-[50px] w-[50px] flex justify-center items-center rounded-full cursor-pointer"
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
        </section>
        <div class="bg-gray-100 ml-auto w-full relative top-0 right-0 h-[200px]">
            <div class="bg-white rounded-br-[200px] ml-auto w-full absolute top-0 right-0 h-[200px]"></div>
        </div>
    </ClientOnly>
</template>

<script lang="ts" setup>
// import required modules

const carousel3dRefDom = ref<any>(null);
const carousel3d2RefDom = ref<any>(null);

const items = ref([]);

for (let i = 0; i < 10; i++) {
    items.value.push(i);
}

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
    console.log(val);
}

onMounted(() => {
    nextTick(() => {
        console.log("carousel3dRefDom.value =>", carousel3dRefDom.value);
        // mainCarousel.value.init();
        // thumbCarousel.value.init();
    });
});

// transform: translate3d(10px, 0px, -100px) rotateX(0deg) rotateY(00deg) scale(1);
//     z-index: -1;
//     width: 488px;
//     transition-duration: 0ms;
</script>
