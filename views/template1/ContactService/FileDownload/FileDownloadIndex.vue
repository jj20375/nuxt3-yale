<template>
    <SideBarLayout
        :title="'檔案下載'"
        :banner="'/img/file-download/file-download-banner.jpg'"
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
const { $api } = useNuxtApp();

const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁",
    },
]);

const sidebar = ref<any>([]);

/**
 * 取得文件分類
 */
async function getType() {
    try {
        const { data } = await $api().DocumentTypeAPI();
        sidebar.value = [];

        const rows = (data.value as any).data;

        rows.forEach((item: { name: any; id: any }) => {
            sidebar.value.push({
                text: item.name,
                id: item.id,
                url: {
                    params: { slug: "download", id: item.id },
                    name: "file-download-slug-id",
                },
            });
        });

        // 取得最後面的 麵包屑路徑
        const lastBreadcrumbs = rows.find((item: any) => item.id == route.params.id);

        breadcrumbs.value.push({
            name: "file-download-slug-id",
            text: "服務支援",
            params: { slug: lastBreadcrumbs.name, id: lastBreadcrumbs.id },
        });
        breadcrumbs.value.push({
            name: "file-download-slug-id",
            text: "檔案下載",
            params: { slug: "download", id: lastBreadcrumbs.id },
        });
        breadcrumbs.value.push({
            name: "file-download-slug-id",
            text: lastBreadcrumbs.name,
            params: { slug: "download", id: lastBreadcrumbs.id },
        });
    } catch (err) {}
}

const title = computed(() => {
    const title = sidebar.value.find((item: { id: any }) => item.id == route.params.id);
    if (title !== undefined) {
        return title.text;
    }
    return "未定義";
});

const datas = ref<any>([]);

/**
 * 取得問答列表
 */
async function getList(params: { document_category_id: any }) {
    try {
        const { data } = await $api().DocumentListAPI(params);
        datas.value = [];

        const rows = (data.value as any).data;

        rows.forEach((item: { name: any; link: any }) => {
            datas.value.push({
                text: item.name,
                url: item.link,
            });
        });
    } catch (err) {}
}

/**
 * 初始化
 */
async function init() {
    await getType();
    await getList({ document_category_id: route.params.id });
}

await init();
onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
        }
    });
});
</script>
