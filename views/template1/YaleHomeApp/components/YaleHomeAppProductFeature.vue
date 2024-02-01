<template>
    <section class="relative text-center text-gray-800">
        <div class="max-w-[900px] mx-auto pb-[80px]">
            <div>
                <h2 class="text-[32px] font-medium YaleSolisW-Bd">隨時掌握資訊，Yale Home 隨時反應門鎖狀態</h2>
                <h5 class="text-[20px] mt-[12px] font-medium YaleSolisW-Bd">多元化開門方式，實現您的智慧家庭</h5>
            </div>
            <div class="mt-[40px] grid grid-cols-3 gap-[20px]">
                <div
                    class="bg-gray-50 flex justify-center px-10 pt-[60px] pb-10"
                    v-for="(feature, index) in features"
                >
                    <div>
                        <NuxtImg
                            class="w-[64px] mx-auto"
                            src="/img/yale-home-app/yale-home-app-feature-icon.svg"
                        />
                        <h5 class="text-[20px] YaleSolisW-Bd font-medium mt-[24px]">{{ feature.title }}</h5>
                        <p class="text-[16px] mt-[12px]">{{ feature.content }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="absolute bottom-0 z-[-1] bg-gray-600 w-full h-[520px]"></div>
    </section>
</template>

<script setup lang="ts">
const features = ref([
    {
        title: "藍芽與WIFI連線功能",
        content: "以藍芽連線功能與電子門鎖配對，連上網路完成遠端遙控功能。",
    },
    {
        title: "遠端多點控制門鎖",
        content: "可使用手機遠端控制及設定各個配對過的的電子門鎖。",
    },
    {
        title: "智慧推撥警示",
        content: "可針對每位用戶的需求，針對不同人使用電子門鎖的狀況設定推撥。",
    },
    {
        title: "近門自動解鎖",
        content: "透過藍芽以及定位只要接近家門，門鎖會自動解鎖，無須拿出手機及鑰匙。",
    },
    {
        title: "遠端授權功能",
        content: "可透過手機遠端授權APP、臨時密碼、週期密碼給予其他人使用。",
    },
    {
        title: "使用者權限設定",
        content: "可針對不同使用者設定不同的APP觀看權限。",
    },
    {
        title: "NCC 合格證號",
        content: "Bridge: CCAN20LP1200T2藍芽模組:CCAN20LP0520T2",
    },
    {
        title: "遵守歐盟個資法",
        content: "遵守歐盟個資法 GDPR，未經本人同意，不會傳輸個人資料至第三人或第三地。",
    },
]);
</script>
