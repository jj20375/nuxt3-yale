<template>
    <section>
        <div class="max-w-[950px] mx-auto my-[30px] sm:my-[60px] px-[24px]">
            <div class="flex flex-col gap-[30px]">
                <div v-for="(data, index) in datas">
                    <NuxtImg
                        class="w-full"
                        :src="data.imgSrc"
                    />
                    <h3 class="text-[24px] sm:text-[32px] font-medium YaleSolisW-Bd mt-[20px] sm:mt-[30px] text-gray-800">{{ data.title }}</h3>
                    <p
                        class="text-[16px] text-gray-800 sm:mt-[20px] mt-[12px]"
                        v-html="data.content"
                    ></p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
interface Props {
    datas: {
        imgSrc: string;
        title: string;
        content: string;
    }[];
}

const props = withDefaults(defineProps<Props>(), {
    datas: [{ imgSrc: "", title: "", content: "" }],
});
</script>
