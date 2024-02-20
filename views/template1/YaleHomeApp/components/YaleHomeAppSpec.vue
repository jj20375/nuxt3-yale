<template>
    <section class="max-w-[950px] mx-auto text-gray-800 px-[24px]">
        <div class="flex flex-col sm:flex-row mt-[20px] sm:mt-[40px]">
            <div class="flex-1">
                <h2 class="sm:text-[24px] text-[18px] font-medium YaleSolisW-Bd mb-[12px] sm:mb-[20px]">規格</h2>
                <div
                    class="flex mb-1 text-gray-800"
                    v-for="(item, index) in specifications"
                >
                    <p class="text-[16px] w-[130px]">{{ item.label }}</p>
                    <p class="text-[16px] flex-1">{{ item.value }}</p>
                </div>
            </div>
            <div class="flex-1 mt-[36px] sm:mt-0">
                <h2 class="sm:text-[24px] text-[18px] font-medium YaleSolisW-Bd mb-[12px] sm:mb-[20px]">檔案下載</h2>
                <div
                    v-for="(item, index) in props.files"
                    :key="index"
                >
                    <button
                        @click="download(item)"
                        class="text-blue-500 underline cursor-pointer underline-offset-2 hover:no-underline"
                    >
                        Yale Home 產品DM
                    </button>
                </div>
            </div>
        </div>
        <div class="mt-[36px] sm:mt-0">
            <h2 class="sm:text-[24px] text-[18px] font-medium YaleSolisW-Bd mb-[12px] sm:mb-[20px]">APP下載</h2>
            <div class="flex gap-[20px]">
                <NuxtImg
                    @click="download(props.appData.ios_link)"
                    class="flex-1 sm:max-w-[160px] cursor-pointer"
                    src="/img/yale-home-app/yale-home-app-ios-download.png"
                />
                <NuxtImg
                    @click="download(props.appData.android_link)"
                    class="flex-1 sm:max-w-[160px] cursor-pointer"
                    src="/img/yale-home-app/yale-home-app-android-download.png"
                />
            </div>
            <div class="border-b pt-[20px] sm:pt-[40px] border-gray-300 w-full h-[1px]" />
        </div>
    </section>
</template>

<script setup lang="ts">
interface Props {
    specifications: {
        label: string;
        value: string;
    }[];
    files: string[];
    appData: {
        android_link: string;
        ios_link: string;
    };
}

const props = withDefaults(defineProps<Props>(), {
    specifications: () => {
        return [
            {
                label: "",
                value: "",
            },
        ];
    },
    files: () => {
        return [];
    },
    appData: () => {
        return {
            android_link: "",
            ios_link: "",
        };
    },
});

function download(file: string) {
    window.open(file);
}
</script>
