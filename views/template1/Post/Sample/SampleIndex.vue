<template>
    <section class="min-h-screen mt-[94px]">
        <nav class="border-t border-gray-300 py-[16px] pl-[122px]">
            <Breadcrumb :menus="breadcrumbs" />
        </nav>
        <div class="bg-[url('/img/sample/sample-banner.jpg')] relative min-h-[320px] bg-cover flex items-center justify-center">
            <div class="absolute top-0 w-full h-full bg-black bg-opacity-40"></div>
            <h1 class="text-white text-[40px] YaleSolisW-Bd font-bold absolute z-10">裝修實績</h1>
        </div>
        <div class="flex justify-center w-full">
            <div class="flex justify-center w-[1440px]">
                <SideBar
                    class="mt-[60px] bg-white"
                    :menus="sidebar"
                />
                <main class="mt-[60px] ml-[40px] flex-1">
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
        text: "裝修實績",
        params: { slug: "耶魯裝修實績" },
    },
    {
        name: "news-slug",
        text: "電子鎖",
        params: { slug: "耶魯電子鎖" },
        query: { id: "id1" },
    },
]);

const sidebar = ref([
    {
        text: "訂製專屬門扇",
        id: "id1",
        url: {
            params: "訂製專屬門扇",
            query: "id1",
            name: "sample-slug",
        },
    },
    {
        text: "電子鎖",
        id: "id2",
        url: {
            params: "電子鎖",
            query: "id2",
            name: "sample-slug",
        },
    },
]);

const datas = ref([]);

for (let i = 0; i < 5; i++) {
    datas.value.push({
        title: "質感居家，將舒適與風格融為一體。精緻材質、簡約設計，打造溫馨空間",
        content: "質感居家，將舒適與風格融為一體。精緻材質、簡約設計，打造溫馨空間。體驗細膩觸感，品味生活的奢華享受。電子鎖革新，提升居家氛圍，享受安心與便利的極致體驗。",
        imgSrc: "/img/sample/item-1.jpg",
        date: "2023/10/28",
    });
}
</script>
