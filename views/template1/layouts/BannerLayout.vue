<template>
    <section class="mt-[64px] xl:mt-[86px] sm:pb-[80px] pb-[30px]">
        <nav class="border-t bg-white border-gray-300 sm:py-[16px] py-[12px]">
            <div class="container">
                <slot name="breadcrumbs"></slot>
            </div>
        </nav>
        <div
            :style="!isMobile ? `background-image: url(${banner})` : `background-image: url(${bannerMobile})`"
            class="relative min-h-[195px] sm:min-h-[320px] w-full bg-cover flex items-center justify-center"
        >
            <!-- <NuxtImg :src="banner" /> -->
            <div class="absolute top-0 w-full h-full bg-black bg-opacity-40"></div>
            <h1 class="text-white text-[28px] sm:text-[40px] YaleSolisW-Bd font-medium absolute z-10">{{ title }}</h1>
        </div>

        <slot name="content"></slot>
    </section>
</template>

<script setup lang="ts">
const { isMobile } = useWindowResize();
const props = defineProps({
    banner: {
        type: String,
        required: true,
    },
    bannerMobile: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
});
</script>
