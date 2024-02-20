<template>
    <section>
        <div class="max-w-[950px] mx-auto my-[30px] sm:my-[60px] px-[24px]">
            <div class="flex flex-col-reverse sm:flex-row items-center sm:gap-[80px]">
                <NuxtImg
                    v-if="props.products.image"
                    class="w-[291px] sm:w-[390px] object-contain"
                    :src="props.products.image"
                />
                <div class="flex-1 text-gray-800">
                    <h2 class="sm:text-[32px] text-[24px] font-medium YaleSolisW-Bd mb-[12px] sm:mb-[20px]">{{ props.products.title }}</h2>
                    <p
                        class="text-[16px]"
                        v-html="props.products.content"
                    ></p>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
interface Props {
    products: { content: string; image: string; title: string };
}

const props = withDefaults(defineProps<Props>(), {
    products: () => {
        return { content: "", image: "", title: "" };
    },
});
</script>
