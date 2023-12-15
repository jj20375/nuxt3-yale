<template>
    <section class="min-h-screen mt-[94px] mb-[80px]">
        <nav class="border-t border-gray-300 py-[16px] pl-[122px]">
            <slot name="breadcrumbs"></slot>
        </nav>
        <div
            :style="`background-image: url(${banner})`"
            class="relative min-h-[320px] w-full bg-cover flex items-center justify-center"
        >
            <!-- <NuxtImg :src="banner" /> -->
            <div class="absolute top-0 w-full h-full bg-black bg-opacity-40"></div>
            <h1 class="text-white text-[40px] YaleSolisW-Bd font-medium absolute z-10">{{ title }}</h1>
        </div>

        <div class="container">
            <div class="grid grid-cols-7 gap-0">
                <slot name="sidebar"></slot>
                <main class="mt-[60px] w-full col-span-5 pl-[80px]">
                    <slot name="list"></slot>
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
});
</script>
