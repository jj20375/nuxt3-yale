<template>
    <SideBarLayout
        :title="'服務中心'"
        :banner="'/img/contact/contact-banner.jpg'"
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

const { $api } = useNuxtApp();

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
                    params: { slug: item.name },
                    query: { id: item.id },
                    name: "faq-slug",
                },
            });
        });
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

const title = computed(() => {
    const title = sidebar.value.find((item: { id: any }) => item.id == route.query.id);
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
                    name: "faq-details-slug",
                    params: { slug: item.fqa_category.name },
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
    await getList({ fqa_category_id: route.query.id });
}

onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
            await init();
        }
    });
});
</script>
