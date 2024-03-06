<template>
    <section class="mt-headerMb xl:mt-header sm:pb-[80px] pb-[30px]">
        <nav class="border-t border-b border-gray-300 py-2.5 xl:py-4 bg-white min-h-[43px] xl:min-h-[55px]">
            <div class="container">
                <slot name="breadcrumbs"></slot>
            </div>
        </nav>
        <div
            :style="`background-image: url(${banner})`"
            class="relative h-[195px] md:h-[240px] xl:h-[320px] w-full bg-cover bg-center flex items-center justify-center"
        >
            <!-- <NuxtImg :src="banner" /> -->
            <div class="absolute top-0 w-full h-full bg-black bg-opacity-40"></div>
            <h1 class="text-white text-[28px] md:text-[32px] xl:text-[40px] YaleSolisW-Bd font-medium absolute z-10">{{ title }}</h1>
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
        required: false,
    },
    title: {
        type: String,
        required: true,
    },
});
</script>
