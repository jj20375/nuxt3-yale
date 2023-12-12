<template>
    <section class="min-h-screen mt-[94px]">
        <nav class="border-t border-gray-300 py-[16px] pl-[122px]">
            <Breadcrumb :menus="breadcrumbs" />
        </nav>
        <div class="bg-[url('/img/news/news-banner.jpg')] relative min-h-[320px] bg-cover flex items-center justify-center">
            <div class="absolute top-0 w-full h-full bg-black bg-opacity-40"></div>
            <h1 class="text-white text-[40px] YaleSolisW-Bd font-bold absolute z-10">最新消息</h1>
        </div>
        <div class="flex justify-center w-full">
            <div class="flex justify-center w-[1440px]">
                <SideBar
                    class="mt-[60px] bg-white"
                    :menus="sidebar"
                />
                <main class="mt-[60px] ml-[40px] flex-1 overflow-y-auto">
                    <ListItem :datas="datas" />
                </main>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
import SideBar from "~/views/template1/Post/components/PostSideBar";
import ListItem from "~/views/template1/Post/components/PostListItem.vue";

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

const sidebar = ref([
    {
        text: "電子鎖",
        id: "id1",
        url: {
            params: "電子鎖",
            query: "id1",
            name: "news-slug",
        },
    },
    {
        text: "保險箱",
        id: "id2",
        url: {
            params: "保險箱",
            query: "id2",
            name: "news-slug",
        },
    },
    {
        text: "Yale Home App 及配件",
        id: "id3",
        url: {
            params: "Yale Home App 及配件",
            query: "id3",
            name: "news-slug",
        },
    },
    {
        text: "訂製專屬門扇",
        id: "id4",
        url: {
            params: "訂製專屬門扇",
            query: "id4",
            name: "news-slug",
        },
    },
    {
        text: "型錄及檔案下載",
        id: "id5",
        url: {
            params: "型錄及檔案下載",
            query: "id5",
            name: "news-slug",
        },
    },
]);

const datas = ref([]);

for (let i = 0; i < 10; i++) {
    datas.value.push({
        title: "質感居家，將舒適與風格融為一體。精緻材質、簡約設計，打造溫馨空間",
        content:
            "韓國是現今電子鎖普及率最高的國家，高達 90% 以上的門鎖採用電子鎖 ; 而 Gateman wide 及其姐妹品牌 Gateman 是目前韓國市佔率最高，同時也是全球市佔率第一的電子鎖品牌。韓國是現今電子鎖普及率最高的國家，高達 90% 以上的門鎖採用電子鎖 ; 而 Gateman wide 及其姐妹品牌 Gateman是目前韓國市佔率最高，同時也是全球市佔率第一的電子鎖品牌。",
        imgSrc: "/img/news/item-1.jpg",
        date: "2023/10/28",
    });
}
</script>
