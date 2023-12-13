<template>
    <section class="container min-h-screen mt-[94px] mb-[100px]">
        <div class="max-w-[795px] mx-auto">
            <h1 class="text-[32px] YaleSolisW-Bd font-medium text-black">質感居家，將舒適與風格融為一體。精緻材質、簡約設計，打造溫馨空間{{ route.query.id }}</h1>
            <div class="flex mt-[20px] border-b border-gray-300 pb-[24px]">
                <div class="text-center mr-[16px] w-[90px] border border-gray-300 py-[6px] px-[12px] text-gray-400 text-[12px]">
                    <span>2023/10/28</span>
                </div>
                <span
                    ><img
                        class="w-[28px]"
                        src="/img/news/pin-icon.svg"
                /></span>
            </div>
            <div
                class="my-10 text-gray-500 YaleSolisW-Rg text-[16px]"
                v-html="postContent"
            ></div>
            <div class="flex items-center justify-center pt-[24px] border-t border-gray-300">
                <div class="mr-[40px]">
                    <button
                        @click.prevent=""
                        class="YaleSolisW-Rg text-[16px] flex items-center"
                    >
                        <NuxtImg
                            class="w-[10px]"
                            src="/img/icons/post/arrow-prev.svg"
                        />
                        <span class="ml-[8px]">上一篇</span>
                        <span class="ml-[20px] text-gray-400">{{ pagination.prev.title.substr(0, 10) }}...</span>
                    </button>
                </div>
                <div>
                    <button class="YaleSolisW-Rg rounded-full text-center bg-gray-100 w-[111px] py-[8px] px-[32px] text-[15px]">回列表</button>
                </div>
                <div class="ml-[40px]">
                    <button
                        @click.prevent=""
                        class="YaleSolisW-Rg text-[16px] flex items-center"
                    >
                        <span class="mr-[20px] text-gray-400">{{ pagination.next.title.substr(0, 10) }}...</span>
                        <span class="mr-[8px]">下一篇</span>
                        <NuxtImg
                            class="w-[10px]"
                            src="/img/icons/post/arrow-next.svg"
                        />
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const route = useRoute();

const postContent = ref(`
<div class="mb-2">耶魯電子鎖為您的家居帶來前所未有的安全與風格體驗。客製化多樣選擇，打造獨一無二的門扇，搭配智慧門鎖，不僅提升居家氛圍，更為生活增添了便捷和時尚感。
    <br />
    <br />
從材質到設計，每個細節都彰顯品味，營造出令人滿意的居住環境。耶魯電子鎖，將現代科技巧妙結合於居家生活，為您打造安全、舒適又富有品味的家居新風貌。</div>
<img class="w-full my-5" src="/img/sample/item-1.jpg" />
<div class="mt-2">耶魯電子鎖為您的家居帶來前所未有的安全與風格體驗。客製化多樣選擇，打造獨一無二的門扇，搭配智慧門鎖，不僅提升居家氛圍，更為生活增添了便捷和時尚感。從材質到設計，每個細節都彰顯品味，營造出令人滿意的居住環境。耶魯電子鎖，將現代科技巧妙結合於居家生活，為您打造安全、舒適又富有品味的家居新風貌。</div>
 `);

const pagination = ref({
    prev: {
        title: "質感居家，將舒適與風格融為一體。精緻材質、簡約設計，打造溫馨空間",
        url: {
            name: route.name,
            params: {
                slug: "測試上一頁",
            },
            query: { id: "123" },
        },
    },
    next: {
        title: "電子鎖革新，提升居家氛圍，享受安心與便利的極致體驗",
        url: {
            name: route.name,
            params: {
                slug: "測試下一頁",
            },
            query: { id: "123" },
        },
    },
});
</script>
