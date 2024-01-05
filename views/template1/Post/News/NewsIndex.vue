<template>
    <SideBarLayout
        :title="'最新消息'"
        :banner="'/img/news/news-banner.jpg'"
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
            <Pagination
                :pagination="pagination"
                @handlePageChange="handlePageChange"
                class="mt-[80px]"
            />
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

const { $api, $utils } = useNuxtApp();

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

const sidebar = ref<any>([]);

const pagination = ref<any>({
    page: 1,
    pageSize: 10,
    total: 0,
});

const handlePageChange = (val: any) => {
    getList({ per_page: pagination.value.pageSize, page: val, article_category_id: route.query.id, "articleCategory|type": "news" });
};

/**
 * 取得裝修實績分類
 */
async function getType() {
    try {
        const { data } = await $api().ArticalTypeAPI({ type: "news" });
        sidebar.value = [];
        console.log("home sampleType api => ", data.value);

        const rows = (data.value as any).data;

        rows.forEach((item: { name: any; id: any }) => {
            sidebar.value.push({
                text: item.name,
                id: item.id,
                url: {
                    params: { slug: item.name },
                    query: { id: item.id },
                    name: "news-slug",
                },
            });
        });
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

const datas = ref<any>([]);

/**
 * 取得裝修實績列表
 */
async function getList(params: { per_page: number; page: number; article_category_id: any; "articleCategory|type": string }) {
    try {
        const { data } = await $api().ArticalListAPI(params);
        datas.value = [];
        console.log("home sample api => ", data.value);

        const rows = (data.value as any).data.rows;
        const meta = (data.value as any).data.meta;

        pagination.value.total = meta.total;

        rows.forEach((item: { title: any; description: any; thumbnail: any; published_at: any; id: any }) => {
            datas.value.push({
                title: item.title,
                content: item.description,
                imgSrc: item.thumbnail,
                date: $utils().formatToDate(item.published_at),
                url: {
                    name: "news-details-slug",
                    params: { slug: route.params.slug },
                    query: { id: item.id },
                },
            });
        });
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

/**
 * 初始化
 */
async function init() {
    await getType();
    console.log("route.query.id", route);
    await getList({ per_page: pagination.value.pageSize, page: 1, article_category_id: route.query.id, "articleCategory|type": "news" });
}

onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
            await init();
        }
    });
});
</script>
