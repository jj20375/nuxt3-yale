<template>
    <SideBarLayout
        :title="'裝修實績'"
        :banner="'/img/sample/sample-banner.jpg'"
    >
        <template #breadcrumbs>
            <Breadcrumb :menus="breadcrumbs" />
        </template>
        <template #sidebar>
            <SideBar :menus="sidebar" />
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

const breadcrumbs = ref<any>([
    {
        name: "index",
        text: "首頁",
    },
]);

const sidebar = ref<any>([]);

const pagination = ref<any>({
    page: 1,
    pageSize: 10,
    total: 0,
});

const handlePageChange = (val: any) => {
    getList({ per_page: pagination.value.pageSize, page: val, article_category_id: route.query.id });
};

/**
 * 取得裝修實績分類
 */
async function getType() {
    try {
        const { data } = await $api().ArticalTypeAPI({ type: "renovation" });
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
                    name: "sample-slug",
                },
            });
        });
        // 取得最後面的 麵包屑路徑
        const lastBreadcrumbs = rows.find((item: any) => item.id == route.query.id);
        // 判斷是否有匹配的 id 來新增 後續的麵包屑 路徑
        if (lastBreadcrumbs !== undefined) {
            breadcrumbs.value.push({
                name: "sample-slug",
                text: "裝修實績",
                params: { slug: "耶魯裝修實績" },
                query: { id: lastBreadcrumbs.id },
            });
            breadcrumbs.value.push({
                name: "sample-slug",
                text: lastBreadcrumbs.name,
                params: { slug: "耶魯裝修實績" },
                query: { id: lastBreadcrumbs.id },
            });
        }
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

/**
 * 取得文章分類詳情
 */
async function getTypeDetail() {
    try {
        const params = { articleId: route.query.id };
        const { data } = await $api().ArticalTypeDetailAPI(params);

        const rows = (data.value as any).data;

        useSeoMeta({
            ogTitle: rows.seoSetting.title,
            ogDescription: rows.seoSetting.description,
            ogUrl: () => `${window.location.origin}/sample/${rows.seoSetting.custom_url}`,
            keywords: rows.seoSetting.keywords.join(),
        });
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

const datas = ref<any>([]);

/**
 * 取得裝修實績列表
 */
async function getList(params: { per_page: number; page: number; article_category_id: any; search_relations?: string } = { per_page: pagination.value.pageSize, page: 1, article_category_id: 1, search_relations: "articleCategory.type:renovation" }) {
    try {
        params = { ...params };
        params["search_relations"] = "articleCategory.type:renovation";
        const { data } = await $api().ArticalListAPI(params);
        datas.value = [];
        console.log("home sample api => ", data.value);

        const rows = (data.value as any).data.rows;
        const meta = (data.value as any).data.meta;

        pagination.value.total = meta.total;

        rows.forEach((item: { title: any; description: any; thumbnail: any; published_at: any; id: any; is_top: any }) => {
            datas.value.push({
                title: item.title,
                content: item.description,
                imgSrc: item.thumbnail,
                date: $utils().formatToDate(item.published_at),
                is_top: item.is_top,
                url: {
                    name: "sample-details-slug",
                    params: { slug: route.params.slug },
                    query: { id: item.id, breadcrumbs: JSON.stringify(breadcrumbs.value) },
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
    await getTypeDetail();
    console.log("route.query.id", route);
    await getList({ per_page: pagination.value.pageSize, page: 1, article_category_id: route.query.id });
}

await init();
onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
        }
    });
});
</script>

'articleCategory|type': 'renovation'
