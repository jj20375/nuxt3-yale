<template>
    <section class="relative text-center text-gray-800">
        <div class="max-w-[950px] mx-auto sm:pb-[80px]">
            <div class="px-[24px]">
                <h2 class="sm:text-[32px] text-[24px] font-medium YaleSolisW-Bd">{{ features.title }}</h2>
                <h5 class="sm:text-[20px] text-[18px] mt-[12px] font-medium YaleSolisW-Bd">{{ features.subtitle }}</h5>
            </div>
            <div class="mt-[30px] sm:mt-[40px] grid grid-cols-1 bg-gray-600 sm:bg-transparent sm:grid-cols-3 sm:gap-[20px] gap-[8px] p-[24px]">
                <div
                    class="bg-gray-50 flex justify-center px-10 sm:pt-[60px] py-[24px] sm:pb-10"
                    v-for="(feature, index) in features.items"
                >
                    <div>
                        <NuxtImg
                            class="sm:w-[64px] w-[50px] mx-auto"
                            :src="feature.image"
                        />
                        <h5 class="sm:text-[20px] text-[16px] YaleSolisW-Bd font-medium mt-[12px] sm:mt-[24px]">{{ feature.title }}</h5>
                        <p class="sm:text-[16px] text-[14px] sm:mt-[12px] mt-[4px]">{{ feature.description }}</p>
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
    features: () => {
        return {
            title: "",
            subtitle: "",
            items: [
                {
                    image: "",
                    title: "",
                    description: "",
                },
            ],
        };
    },
});
</script>
