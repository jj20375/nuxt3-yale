<template>
    <section class="max-w-[950px] mx-auto text-gray-800">
        <div class="flex mt-[40px]">
            <div class="flex-1">
                <h2 class="text-[24px] font-medium YaleSolisW-Bd mb-[20px]">規格</h2>
                <div
                    class="flex mb-1 text-gray-800"
                    v-for="(item, index) in specifications"
                >
                    <p class="text-[16px] w-[130px]">{{ item.label }}</p>
                    <p class="text-[16px] flex-1">{{ item.value }}</p>
                </div>
            </div>
            <div class="flex-1">
                <h2 class="text-[24px] font-medium YaleSolisW-Bd mb-[20px]">檔案下載</h2>
                <div v-for="(item, index) in files" :key="index">
                    <button @click="download(item)" class="text-blue-500 underline cursor-pointer underline-offset-2 hover:no-underline">Yale Home 產品DM {{ index }}</button>
                </div>
            </div>
        </div>
        <div>
            <h2 class="text-[24px] font-medium YaleSolisW-Bd mb-[20px] mt-[60px]">APP下載</h2>
            <div class="flex gap-[20px]">
                <NuxtImg @click="download(appData.ios_link)" class="w-[160px] cursor-pointer" src="/img/yale-home-app/yale-home-app-ios-download.png" />
                <NuxtImg @click="download(appData.android_link)" class="w-[160px] cursor-pointer" src="/img/yale-home-app/yale-home-app-android-download.png" />
            </div>
            <div class="border-b pt-[40px] border-gray-300 w-full h-[1px]"></div>
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
    specifications: [{
        label: "",
        value: "",
    }],
    files: [],
    appData: {
        android_link: '',
        ios_link: ''
    }
});

function download(file: string) {
    window.open(file);
}
</script>
