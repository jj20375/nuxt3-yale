<template>
    <section
        class="relative mt-headerMb bg-gray-50 xl:bg-transparent xl:mt-header xl:before:absolute xl:before:w-1/2 xl:before:h-full xl:before:top-0 xl:before:left-1/2 xl:before:bg-gray-50 xl:before:-z-[1]"
        :class="customClass"
    >
        <nav class="border-t border-b border-gray-300 py-2.5 xl:py-4 bg-white min-h-[43px] xl:min-h-[55px]">
            <div class="container">
                <slot name="breadcrumbs"></slot>
            </div>
        </nav>
        <slot v-if="isLargePad" name="custom-sidebar"></slot>
        <div class="container">
            <div class="px-0 mr-0 xl:bg-gray-50">
                <div class="flex flex-col xl:flex-row gap-4 xl:gap-0">
                    <slot v-if="!isLargePad" name="custom-sidebar"></slot>
                    <div class="xl:flex-1 xl:bg-gray-50 xl:pl-[40px]">
                        <main class="min-h-screen">
                            <slot name="custom-content"></slot>
                            <slot name="custom-pagination"></slot>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const props = defineProps({
    customClass: {
        type: String,
        default: "mb-[100px]",
    },
});

const { isLargePad } = useWindowResize();
</script>
