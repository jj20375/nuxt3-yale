<template>
    <SideBarLayout
        :title="'裝修實績'"
        :banner="'/img/sample/sample-banner.jpg'"
    >
        <template #breadcrumbs>
            <Breadcrumb :menus="breadcrumbs" />
        </template>
        <template #sidebar>
            <SideBar
                class="col-span-2"
                :menus="sidebar"
            />
        </template>
        <template #list>
            <ListItem :datas="datas" />
        </template>
        <template #pagination>
            <Pagination class="mt-[80px]" />
        </template>
    </SideBarLayout>
</template>

<script lang="ts" setup>
import SideBarLayout from "~/views/template1/layouts/SideBarLayout.vue";
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
import SideBar from "~/views/template1/components/SideBar";
import ListItem from "~/views/template1/Post/components/PostListItem.vue";
import Pagination from "~/views/template1/components/Pagination.vue";

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
        url: {
            name: "sample-details-slug",
            params: { slug: "測試" },
            query: { id: "123" },
        },
    });
}
</script>
