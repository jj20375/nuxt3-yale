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
                        <div class="flex-1">
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
                <div class="container font-bold py-[80px]">
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
                            v-for="(item, index) in brandData"
                            :key="item.index"
                        >
                            <NuxtImg
                                class="w-full aspect-[1/1] object-contain"
                                :src="item.imgUrl"
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

// 關於我們資料
const aboutData = {
    title: "關於我們",
    imgUrl: "img/about/about-1.jpg",
    content: "我們是耶魯產品零售通路代理商，專職在百貨、電商及 Yale Smart Shop銷售耶魯電子鎖及保險箱。<br/><br/>現為滿足市場對門扇的需求，我們創建3D網站，提供客戶門扇「安全」、「便利」、「隔音」、「氣密」、「風格設計」一站式購足服務。使用者可以自由設計風格、材質、顏色、場景及選擇配件來製作屬於自己喜愛的門扇。"
}

// 銷售品牌資料
const brandData = [
    {
        imgUrl: "img/about/about-logo-1.jpg",
        url: ""
    },
    {
        imgUrl: "img/about/about-logo-2.jpg",
        url: ""
    },
    {
        imgUrl: "img/about/about-logo-3.jpg",
        url: ""
    },
    {
        imgUrl: "img/about/about-logo-4.jpg",
        url: ""
    },
    {
        imgUrl: "img/about/about-logo-5.jpg",
        url: ""
    },
    {
        imgUrl: "img/about/about-logo-6.jpg",
        url: ""
    },
    {
        imgUrl: "img/about/about-logo-1.jpg",
        url: ""
    },
    {
        imgUrl: "img/about/about-logo-2.jpg",
        url: ""
    },
    {
        imgUrl: "img/about/about-logo-3.jpg",
        url: ""
    },
    {
        imgUrl: "img/about/about-logo-4.jpg",
        url: ""
    },
    {
        imgUrl: "img/about/about-logo-5.jpg",
        url: ""
    },
    {
        imgUrl: "img/about/about-logo-6.jpg",
        url: ""
    },
]

// swiper slider 模組
const modules = [Scrollbar];

// 主圖 carousel
const mainSwiper = ref<any>(null);

function onSwiper(swiper: any) {
    mainSwiper.value = swiper;
}

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