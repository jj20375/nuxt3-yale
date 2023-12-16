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
            <FileDownloadTItle :title="title" />
            <FileDownloadList :datas="datas" />
            <FileDownloadContact class="mt-[90px]" />
        </template>
    </SideBarLayout>
</template>

<script lang="ts" setup>
import SideBarLayout from "~/views/template1/layouts/SideBarLayout.vue";
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
import SideBar from "~/views/template1/components/SideBar";
import FileDownloadContact from "~/views/template1/ContactService/components/ContactData.vue";
import FileDownloadTItle from "~/views/template1/ContactService/components/ContactTitle";
import FileDownloadList from "~/views/template1/ContactService/FileDownload/components/FileDownloadList.vue";
const route = useRoute();

const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁",
    },
    {
        name: "file-download-slug",
        text: "服務支援",
        params: { slug: "耶魯服務支援" },
    },
    {
        name: "file-download-slug",
        text: "檔按下載",
        params: { slug: "耶魯檔按下載" },
        query: { id: "id1" },
    },
    {
        name: "file-download-slug",
        text: "Yale 電子鎖使用說明書",
        params: { slug: "耶魯檔案下載-Yale 電子鎖使用說明書" },
        query: { id: "id1" },
    },
]);

const sidebar = ref([
    {
        text: "Yale 電子鎖使用說明書",
        id: "id1",
        url: {
            params: "Yale 電子鎖使用說明書",
            query: "id1",
            name: "file-download-slug",
        },
    },
]);

for (let i = 0; i < 4; i++) {
    sidebar.value.push({
        text: `分類${i + 1}`,
        id: `id${i + 2}`,
        url: {
            params: `分類${i + 1}`,
            query: "id1",
            name: "file-download-slug",
        },
    });
}

const title = computed(() => {
    const title = sidebar.value.find((item) => item.id === route.query.id);
    if (title !== undefined) {
        return title.text;
    }
    return "未定義";
});

const datas = ref([]);

for (let i = 0; i < 15; i++) {
    datas.value.push({
        text: "YDM7220 使用說明書-" + i,
        url: "",
    });
}
</script>
