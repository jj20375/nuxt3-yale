<template>
    <section class="min-h-screen mt-[94px] pb-[80px]">
        <nav class="border-t bg-white border-gray-300 py-[16px]">
            <div>
                <div class="grid grid-cols-7 gap-0">
                    <div class="col-span-7 ml-[122px]">
                        <slot name="breadcrumbs"></slot>
                    </div>
                </div>
            </div>
        </nav>
        <div
            :style="`background-image: url(${banner})`"
            class="relative min-h-[320px] w-full bg-cover flex items-center justify-center"
        >
            <!-- <NuxtImg :src="banner" /> -->
            <div class="absolute top-0 w-full h-full bg-black bg-opacity-40"></div>
            <h1 class="text-white text-[40px] YaleSolisW-Bd font-medium absolute z-10">{{ title }}</h1>
        </div>

        <slot name="content"></slot>
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
