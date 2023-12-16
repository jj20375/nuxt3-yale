<template>
    <SideBarLayout
        :title="'服務中心'"
        :banner="'/img/faq/faq-banner.jpg'"
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
        <template #content>
            <FaqTItle :title="title" />
            <FaqList :datas="datas" />
            <FaqContact class="mt-[90px]" />
        </template>
    </SideBarLayout>
</template>

<script lang="ts" setup>
import SideBarLayout from "~/views/template1/layouts/SideBarLayout.vue";
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
import SideBar from "~/views/template1/components/SideBar";
import FaqContact from "~/views/template1/ContactService/components/ContactData.vue";
import FaqList from "~/views/template1/ContactService/Faq/components/FaqList.vue";
import FaqTItle from "~/views/template1/ContactService/components/ContactTitle";

const route = useRoute();

const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁",
    },
    {
        name: "faq-slug",
        text: "服務支援",
        params: { slug: "耶魯服務支援" },
    },
    {
        name: "faq-slug",
        text: "服務中心",
        params: { slug: "耶魯服務中心" },
        query: { id: "id1" },
    },
    {
        name: "faq-slug",
        text: "電子鎖",
        params: { slug: "耶魯服務中心-電子鎖" },
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
            name: "faq-slug",
        },
    },
    {
        text: "保險箱",
        id: "id2",
        url: {
            params: "保險箱",
            query: "id2",
            name: "faq-slug",
        },
    },
    {
        text: "Yale Home App 及配件",
        id: "id3",
        url: {
            params: "Yale Home App 及配件",
            query: "id3",
            name: "faq-slug",
        },
    },
    {
        text: "訂製專屬門扇",
        id: "id4",
        url: {
            params: "訂製專屬門扇",
            query: "id4",
            name: "faq-slug",
        },
    },
    {
        text: "型錄及檔案下載",
        id: "id5",
        url: {
            params: "型錄及檔案下載",
            query: "id5",
            name: "faq-slug",
        },
    },
]);

const title = computed(() => {
    const title = sidebar.value.find((item) => item.id === route.query.id);
    if (title !== undefined) {
        return title.text;
    }
    return "未定義";
});

const datas = ref([
    {
        text: "電子鎖沒電怎麼辦？",
        url: {
            name: "faq-details-slug",
            params: { slug: "電子鎖沒電怎麼辦？" },
            query: { id: "id1" },
        },
    },
    {
        text: "如果電子鎖突然故障，何時能到場修繕？",
        url: {
            name: "faq-details-slug",
            params: { slug: "如果電子鎖突然故障，何時能到場修繕？" },
            query: { id: "id1" },
        },
    },
    {
        text: "耶魯電子鎖有經過認證嗎？",
        url: {
            name: "faq-details-slug",
            params: { slug: "耶魯電子鎖有經過認證嗎？" },
            query: { id: "id1" },
        },
    },
    {
        text: "操作上遇到問題怎麼辦？",
        url: {
            name: "faq-details-slug",
            params: { slug: "操作上遇到問題怎麼辦？" },
            query: { id: "id1" },
        },
    },
    {
        text: "電子鎖服務條款與保固範圍？",
        url: {
            name: "faq-details-slug",
            params: { slug: "電子鎖服務條款與保固範圍？" },
            query: { id: "id1" },
        },
    },
    {
        text: "安裝會有額外費用嗎？",
        url: {
            name: "faq-details-slug",
            params: { slug: "安裝會有額外費用嗎？" },
            query: { id: "id1" },
        },
    },
    {
        text: "我可以自己安裝嗎？",
        url: {
            name: "faq-details-slug",
            params: { slug: "我可以自己安裝嗎？" },
            query: { id: "id1" },
        },
    },
    {
        text: "我們家的門可以裝嗎？",
        url: {
            name: "faq-details-slug",
            params: { slug: "我們家的門可以裝嗎？" },
            query: { id: "id1" },
        },
    },
]);
</script>
