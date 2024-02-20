<template>
    <section
        class="mt-headerMb xl:mt-header"
        :class="customClass"
    >
        <nav class="border-t border-b border-gray-300 py-2.5 xl:py-4 bg-white min-h-[43px] xl:min-h-[55px]">
            <div class="container">
                <slot name="breadcrumbs"></slot>
            </div>
        </nav>
        <div
            :style="`background-image: url(${banner})`"
            class="relative h-[240px] xl:h-[320px] w-full bg-cover bg-center flex items-center justify-center"
        >
            <!-- <NuxtImg :src="banner" /> -->
            <div class="absolute top-0 w-full h-full bg-black bg-opacity-40"></div>
            <h1 class="text-white text-[40px] YaleSolisW-Bd font-medium absolute z-10">{{ title }}</h1>
        </div>
        <slot v-if="isPad" name="sidebar"></slot>
        <div class="container">
            <div class="mt-[20px] xl:mt-[60px] flex flex-col xl:flex-row gap-4 xl:gap-0">
                <slot v-if="!isPad" name="sidebar"></slot>
                <main class="flex-1 xl:pl-[40px]">
                    <slot name="list"></slot>
                    <slot name="content"></slot>
                    <div class="flex justify-center">
                        <slot name="pagination"></slot>
                    </div>
                </main>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const props = defineProps({
    banner: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    customClass: {
        type: String,
        default: "mb-[100px]",
    },
});
const { isPad } = useWindowResize();
</script>
