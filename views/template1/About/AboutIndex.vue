<template>
    <BannerLayout
        class="mb-0"
        :title="'關於我們'"
        :banner="'/img/about/about-banner.jpg'"
    >
        <template #breadcrumbs>
            <Breadcrumb :menus="breadcrumbs" />
        </template>

        <template #content>
            <section class="bg-gray-50">
                <div class="container py-[80px]">
                    <div class="flex gap-[80px]">
                        <div
                            class="flex-1"
                            v-if="aboutData.imgUrl"
                        >
                            <NuxtImg
                                class="w-full aspect-[16/9] object-cover"
                                :src="aboutData.imgUrl"
                            />
                        </div>
                        <div class="flex-1 flex flex-col justify-center">
                            <h3 class="text-[32px] font-bold mb-[20px]">{{ aboutData.title }}</h3>
                            <div v-html="aboutData.content"></div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div class="container font-bold pt-[120px] pb-[40px]">
                    <h3 class="text-center text-[32px]">銷售品牌</h3>
                    <Swiper
                        :slidesPerView="6"
                        :spaceBetween="20"
                        :freeMode="true"
                        :scrollbar="{ draggable: true, dragSize: 100, horizontalClass: 'horizontalClass', dragClass: 'dragClass' }"
                        :modules="modules"
                        @swiper="onSwiper"
                        class="!pt-4 !pb-8"
                    >
                        <SwiperSlide
                            v-for="(item, index) in aboutData.brands"
                            :key="item.index"
                        >
                            <NuxtImg
                                @click="brandLink(item.link)"
                                class="w-full aspect-[1/1] object-contain cursor-pointer"
                                :src="item.image"
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>
        </template>
    </BannerLayout>
</template>
<script setup lang="ts">
// swiper 幻燈片套件
import { Scrollbar } from "swiper/modules";
import BannerLayout from "~/views/template1/layouts/BannerLayout.vue";
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";

const { $api } = useNuxtApp();

const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁",
    },
    {
        name: "about-slug",
        text: "關於我們",
        params: { slug: "關於我們" },
    },
]);

// 銷售品牌資料
const brandData = [
    {
        imgUrl: "img/about/about-logo-1.jpg",
        url: "",
    },
    {
        imgUrl: "img/about/about-logo-2.jpg",
        url: "",
    },
    {
        imgUrl: "img/about/about-logo-3.jpg",
        url: "",
    },
    {
        imgUrl: "img/about/about-logo-4.jpg",
        url: "",
    },
    {
        imgUrl: "img/about/about-logo-5.jpg",
        url: "",
    },
    {
        imgUrl: "img/about/about-logo-6.jpg",
        url: "",
    },
    {
        imgUrl: "img/about/about-logo-1.jpg",
        url: "",
    },
    {
        imgUrl: "img/about/about-logo-2.jpg",
        url: "",
    },
    {
        imgUrl: "img/about/about-logo-3.jpg",
        url: "",
    },
    {
        imgUrl: "img/about/about-logo-4.jpg",
        url: "",
    },
    {
        imgUrl: "img/about/about-logo-5.jpg",
        url: "",
    },
    {
        imgUrl: "img/about/about-logo-6.jpg",
        url: "",
    },
];

// swiper slider 模組
const modules = [Scrollbar];

// 主圖 carousel
const mainSwiper = ref<any>(null);

function onSwiper(swiper: any) {
    mainSwiper.value = swiper;
}

function brandLink(link: any) {
    if (link) {
        window.location.href = link;
    }
}

/**
 * 取得頁面資料
 */
const aboutData = ref<any>({
    title: "",
    imgUrl: "",
    content: "",
    brands: [],
});

async function getPageData() {
    try {
        const params = { code: "about_us" };
        const { data } = await $api().getPageAPI(params);
        console.log("getPageData api => ", data.value);

        const pageData = (data.value as any).data.schema;
        aboutData.value.title = pageData.title;
        aboutData.value.imgUrl = pageData.image;
        aboutData.value.content = pageData.content;
        aboutData.value.brands = pageData.brands;
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
            await getPageData();
        }
    });
});
</script>

<style lang="scss" scoped>
::v-deep {
    .dragClass {
        @apply h-[4px] w-[100px] bg-black rounded-lg;
    }
    .horizontalClass {
        @apply h-[4px] w-[450px] left-1/2 -translate-x-1/2;
    }
}
</style>
