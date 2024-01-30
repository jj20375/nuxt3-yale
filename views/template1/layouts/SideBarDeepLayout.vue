<template>
    <section
        class="min-h-screen mt-[86px]"
        :class="customClass"
    >
        <nav class="border-t border-b border-gray-300 py-[16px] bg-white">
            <div class="grid grid-cols-7 gap-0">
                <div class="col-span-7 ml-[122px]">
                    <slot name="breadcrumbs"></slot>
                </div>
            </div>
        </nav>

        <div class="px-0 mr-0 bg-gray-50">
            <div class="grid grid-cols-8 gap-0">
                <slot name="custom-sidebar"></slot>
                <div class="col-span-6 bg-gray-50 pl-[32px]">
                    <main>
                        <slot name="custom-content"></slot>
                        <slot name="custom-pagination"></slot>
                    </main>
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
