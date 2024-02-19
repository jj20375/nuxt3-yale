<template>
    <section>
        <div class="max-w-[950px] mx-auto my-[60px]">
            <div class="flex items-center gap-[80px]">
                <NuxtImg
                    v-if="products.image"
                    class="w-[390px] object-contain"
                    :src="products.image"
                />
                <div class="flex-1 text-gray-800">
                    <h2 class="text-[32px] font-medium YaleSolisW-Bd mb-[20px]">{{products.title}}</h2>
                    <p class="text-[16px]" v-html="products.content"></p>
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
    products: {
        content: "",
        image: "",
        title: "",
    },
});
</script>
