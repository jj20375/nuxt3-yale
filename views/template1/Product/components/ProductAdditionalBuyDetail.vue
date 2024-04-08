<template>
    <section class="mt-headerMb xl:mt-header mb-[80px]">
        <div
            class="md:mt-[60px]"
            :class="isLargePad && !isMobile ? 'container' : ''"
        >
            <div class="w-full xl:w-[950px] mx-auto">
                <div class="flex flex-col md:flex-row gap-[28px] md:gap-[60px] xl:gap-[120px]">
                    <div class="shrink-0 grow-0 md:basis-[50%] xl:basis-[430px] md:w-[50%] xl:w-[430px]">
                        <NuxtImg
                            v-if="detailData.main_image"
                            class="w-[430px]"
                            :src="detailData.main_image"
                        />
                    </div>
                    <div
                        class="flex flex-col"
                        :class="isMobile ? 'container' : ''"
                    >
                        <div class="flex justify-between gap-4">
                            <div>
                                <h1 class="text-[24px] font-medium text-gray-800 YaleSolisW-Bd">{{ detailData.model }}</h1>
                            </div>
                        </div>
                        <h2 class="mt-[8px] text-[16px] YaleSolisW-Bd font-medium text-gray-400">{{ detailData.name }}</h2>
                        <div class="flex mt-[8px] gap-[12px]">
                            <p class="text-gray-800 text-[20px] font-medium YaleSolisW-Bd">NT${{ $utils().formatCurrency(detailData.price) }}</p>
                        </div>
                        <div class="mt-[16px] text-gray-900 list-disc list-inside text-[16px] mb-1">
                            {{ detailData.description }}
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="mt-[40px] md:mt-[80px]"
                :class="isMobile ? 'container' : isLargePad ? '' : 'container'"
            >
                <div
                    class="min-h-[500px] text-center flex items-center justify-center mt-[24px] md:mt-[60px]"
                >
                    <div
                        class="edit-section"
                        v-html="detailData.content"
                    ></div>
                </div>
                <div
                    class="flex flex-col xl:grid grid-cols-2 gap-12 xl:gap-[80px] mt-[24px] md:mt-[60px]"
                >
                    <div>
                        <h5 class="text-[18px] font-medium YaleSolisW-Bd text-gray-800 mb-[20px]">產品規格內容</h5>
                        <div
                            v-for="(attr, key) in detailData.attributes"
                            :key="key"
                            class="flex border-b border-gray-100 text-[15px] py-[8px]"
                        >
                            <div class="flex-1">{{ key }}</div>
                            <div class="flex-1">{{ attr }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
const { isLargePad, isMobile } = useWindowResize();
interface Props {
    detailData: ProductCarInterface;
    id: Number
}

const props = withDefaults(defineProps<Props>(), {
    detailData: {
        id: 1,
        model: "",
        name: "",
        price: 0,
        market_price: 0,
        main_image: "",
        other_images: [""],
    },
    id: null
});
</script>
