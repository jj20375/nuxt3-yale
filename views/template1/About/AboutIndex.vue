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
                <div class="md:container md:py-[80px] pt-[4px] pb-[40px]">
                    <div class="flex md:flex-row flex-col xl:gap-[80px] gap-[35px]">
                        <div
                            class="flex-1"
                            v-if="aboutData.imgUrl"
                        >
                            <NuxtImg
                                class="w-full aspect-[16/9] object-cover"
                                :src="aboutData.imgUrl"
                            />
                        </div>
                        <div class="flex-1 flex flex-col justify-center md:px-[0] px-[24px]">
                            <h3 class="md:text-[32px] text-[24px] font-bold md:mb-[22px] mb-[12px]">{{ aboutData.title }}</h3>
                            <div
                                class="edit-section"
                                v-html="aboutData.content"
                            ></div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div class="container md:pt-[120px] md:pb-[40px] pt-[48px] pb-[18px]">
                    <h3 class="text-center font-bold md:text-[32px] text-[24px]">銷售品牌</h3>
                    <Swiper
                        :slidesPerView="isMobile ? 2 : isLargePad ? 4 : 6"
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
const { isMobile, isLargePad } = useWindowResize();
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

        const seoSetting = (data.value as any).data.seoSetting;
        useSeoMeta({
            title: seoSetting.title,
            description: seoSetting.description,
            ogTitle: seoSetting.title,
            ogDescription: seoSetting.description,
            ogUrl: () => `${window.location.origin}/${seoSetting.custom_url}`,
            keywords: seoSetting.keywords.join(),
        });
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
:deep {
    .dragClass {
        @apply h-[4px] w-[100px] bg-black rounded-lg;
    }
    .horizontalClass {
        @apply h-[4px] w-[450px] left-1/2 -translate-x-1/2;
    }
}
</style>
