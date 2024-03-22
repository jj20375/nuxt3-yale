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
            <FaqContact class="xl:mt-[90px] mt-[60px]" />
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

const { $api } = useNuxtApp();

const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁",
    },
]);

const sidebar = ref<any>([]);

/**
 * 取得問答分類
 */
async function getType() {
    try {
        const { data } = await $api().FQATypeAPI();
        sidebar.value = [];
        console.log("home sampleType api => ", data.value);

        const rows = (data.value as any).data;

        rows.forEach((item: { name: any; id: any }) => {
            sidebar.value.push({
                text: item.name,
                id: item.id,
                url: {
                    params: { slug: item.name, id: item.id },
                    name: "faq-slug-id",
                },
            });
        });
        // 取得最後面的 麵包屑路徑
        const lastBreadcrumbs = rows.find((item: any) => item.id == route.params.id);
        breadcrumbs.value.push({
            name: "faq-slug-id",
            text: "服務支援",
            params: { slug: lastBreadcrumbs.name, id: lastBreadcrumbs.id },
        });
        breadcrumbs.value.push({
            name: "faq-slug-id",
            text: "服務中心",
            params: { slug: lastBreadcrumbs.name, id: lastBreadcrumbs.id },
        });

        breadcrumbs.value.push({
            name: "faq-slug-id",
            text: lastBreadcrumbs.name,
            params: { slug: lastBreadcrumbs.name, id: lastBreadcrumbs.id },
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
async function getList(params: { fqa_category_id: any }) {
    try {
        const { data } = await $api().FQAListAPI(params);
        datas.value = [];
        console.log("home sample api => ", data.value);

        const rows = (data.value as any).data;

        rows.forEach((item: { id: any; name: any; fqa_category: any }) => {
            datas.value.push({
                text: item.name,
                url: {
                    name: "faq-details-slug-id-detail_id",
                    params: { slug: item.fqa_category.name, id: route.params.id, detail_id: item.id },
                },
            });
        });
    } catch (err) {}
}

/**
 * 初始化
 */
async function init() {
    await getType();
    await getList({ fqa_category_id: route.params.id });
}

await init();
onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
        }
    });
});
</script>
