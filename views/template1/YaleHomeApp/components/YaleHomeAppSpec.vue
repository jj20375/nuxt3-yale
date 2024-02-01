<template>
    <section class="max-w-[950px] mx-auto text-gray-800">
        <div class="flex mt-[40px]">
            <div class="flex-1">
                <h2 class="text-[24px] font-medium YaleSolisW-Bd mb-[20px]">規格</h2>
                <div
                    class="flex mb-1 text-gray-800"
                    v-for="(item, index) in specs"
                >
                    <p class="text-[16px] w-[130px]">{{ item.column }}</p>
                    <p class="text-[16px] flex-1">{{ item.value }}</p>
                </div>
            </div>
            <div class="flex-1">
                <h2 class="text-[24px] font-medium YaleSolisW-Bd mb-[20px]">檔案下載</h2>
                <button class="text-blue-500 underline cursor-pointer underline-offset-2 hover:no-underline">Yale Home 產品DM</button>
            </div>
        </div>
        <div>
            <h2 class="text-[24px] font-medium YaleSolisW-Bd mb-[20px] mt-[60px]">APP下載</h2>
            <div class="flex gap-[20px]">
                <a
                    href=""
                >
                    <NuxtImg class="w-[160px]" src="/img/yale-home-app/yale-home-app-ios-download.png" />
                </a>
                <a href="">
                    <NuxtImg class="w-[160px]" src="/img/yale-home-app/yale-home-app-android-download.png" />
                </a>
            </div>
            <div class="border-b pt-[40px] border-gray-300 w-full h-[1px]"></div>
        </div>
    </section>
</template>

<script setup lang="ts">
const specs = ref([
    {
        column: "型號",
        value: " Yale Home 遠端智慧連線",
    },
    {
        column: "尺寸 (Bridge)",
        value: "70(W) x 70(H) x 39(D) mm",
    },
    {
        column: "顏色",
        value: "白色",
    },
    {
        column: "配對門鎖",
        value: "1台",
    },
    {
        column: "配對手機",
        value: "100台",
    },
    {
        column: "電壓",
        value: "90 ~ 125V",
    },
]);
</script>
