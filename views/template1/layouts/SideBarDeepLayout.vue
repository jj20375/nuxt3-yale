<template>
    <section
        class="relative mt-[86px] before:absolute before:w-1/2 before:h-full before:top-0 before:left-1/2 before:bg-gray-50 before:-z-[1]"
        :class="customClass"
    >
        <nav class="border-t border-b border-gray-300 py-[16px] bg-white min-h-[55px]">
            <div class="container">
                <slot name="breadcrumbs"></slot>
            </div>
        </nav>
        <div class="container">
            <div class="px-0 mr-0 bg-gray-50">
                <div class="flex">
                    <slot name="custom-sidebar"></slot>
                    <div class="flex-1 bg-gray-50 pl-[40px]">
                        <main>
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
</script>
