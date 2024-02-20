<template>
    <section class="relative text-center text-gray-800">
        <div class="max-w-[950px] mx-auto pb-[80px]">
            <div>
                <h2 class="text-[32px] font-medium YaleSolisW-Bd">{{ features.title }}</h2>
                <h5 class="text-[20px] mt-[12px] font-medium YaleSolisW-Bd">{{ features.subtitle }}</h5>
            </div>
            <div class="mt-[40px] grid grid-cols-3 gap-[20px]">
                <div
                    class="bg-gray-50 flex justify-center px-10 pt-[60px] pb-10"
                    v-for="(feature, index) in features.items"
                >
                    <div>
                        <NuxtImg
                            class="w-[64px] mx-auto"
                            :src="feature.image"
                        />
                        <h5 class="text-[20px] YaleSolisW-Bd font-medium mt-[24px]">{{ feature.title }}</h5>
                        <p class="text-[16px] mt-[12px]">{{ feature.description }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="absolute bottom-0 z-[-1] bg-gray-600 w-full h-[520px]"></div>
    </section>
</template>

<script setup lang="ts">
interface Props {
    features: {
        title: string;
        subtitle: string;
        items: {
            image: string;
            title: string;
            description: string;
        }[];
    };
}

const props = withDefaults(defineProps<Props>(), {
    features: {
        title: "",
        subtitle: "",
        items: [
            {
                image: "",
                title: "",
                description: "",
            },
        ],
    },
});
</script>
