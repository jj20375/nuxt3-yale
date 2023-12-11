<template>
    <section class="min-h-screen mt-[94px]">
        <nav class="border-t border-gray-300 py-[16px] pl-[122px]">
            <Breadcrumb :menus="breadcrumbs" />
        </nav>
        <div class="bg-[url('/img/news/news-banner.jpg')] relative min-h-[320px] bg-cover flex items-center justify-center">
            <div class="absolute top-0 w-full h-full bg-black bg-opacity-40"></div>
            <h1 class="text-white text-[40px] YaleSolisW-Bd font-bold absolute z-10">最新消息</h1>
        </div>
        <div class="flex">
            <SideBar class="mt-[60px] bg-white" />
            <main class="mt-[60px] ml-[40px] w-full overflow-y-auto">
                <!-- 客製化網址{{ route.params.slug }}
            <div>搜尋參數 id:{{ route.query.id }}</div> -->
                <article
                    v-for="item in 3"
                    :key="item"
                    class="flex items-center mb-[48px]"
                >
                    <NuxtImg
                        src="/img/news/item-1.jpg"
                        class="w-full max-w-[400px] mr-[48px]"
                    />
                    <div class="w-[440px]">
                        <h2 class="text-[24px] font-bold YaleSolisW-Bd">質感居家，將舒適與風格融為一體。精緻材質、簡約設計，打造溫馨空間</h2>
                        <p class="leading-relaxed text-[16px] font-[300] YaleSolisW-Lt pt-[12px] line-clamp-3">
                            韓國是現今電子鎖普及率最高的國家，高達 90% 以上的門鎖採用電子鎖 ; 而 Gateman wide 及其姐妹品牌 Gateman 是目前韓國市佔率最高，同時也是全球市佔率第一的電子鎖品牌。韓國是現今電子鎖普及率最高的國家，高達 90% 以上的門鎖採用電子鎖 ; 而 Gateman wide 及其姐妹品牌 Gateman
                            是目前韓國市佔率最高，同時也是全球市佔率第一的電子鎖品牌。
                        </p>

                        <div class="flex mt-[20px]">
                            <div class="text-center mr-[16px] w-[90px] border border-gray-300 py-[6px] px-[12px] text-gray-400 text-[12px]">
                                <span>2023/10/28</span>
                            </div>
                            <span
                                ><img
                                    class="w-[28px]"
                                    src="/img/news/pin-icon.svg"
                            /></span>
                        </div>
                    </div>
                </article>
            </main>
        </div>
    </section>
</template>

<script lang="ts" setup>
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
import SideBar from "./NewsSideBar";

const route = useRoute();

const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁",
    },
    {
        name: "news-slug",
        text: "最新消息",
        params: { slug: "耶魯最新消息" },
    },
    {
        name: "news-slug",
        text: "電子鎖",
        params: { slug: "耶魯最新消息" },
        query: { id: "id1" },
    },
]);
</script>
