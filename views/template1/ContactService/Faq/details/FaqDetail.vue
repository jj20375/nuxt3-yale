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
            <div
                v-html="content"
                class="text-gray-800 text-[16px] leading-relaxed"
            ></div>
            <FaqContact class="mt-[90px]" />
            <div class="mt-[60px]">
                <NuxtLink :to="{ name: 'faq-slug', params: { slug: route.params.slug }, query: { id: route.query.id } }">
                    <div class="flex">
                        <NuxtImg
                            class="w-[16px] mr-[5px]"
                            src="/img/faq/faq-back-icon.svg"
                        />
                        <span class="text-gray-700">返回</span>
                    </div>
                </NuxtLink>
            </div>
        </template>
    </SideBarLayout>
</template>

<script lang="ts" setup>
import SideBarLayout from "~/views/template1/layouts/SideBarLayout.vue";
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
import SideBar from "~/views/template1/components/SideBar";
import FaqContact from "~/views/template1/ContactService/components/ContactData.vue";
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
    {
        name: "faq-details-slug",
        text: "電子鎖沒電怎麼辦？",
        params: { slug: "耶魯服務中心-電子鎖-電子鎖沒電怎麼辦？" },
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

const title = ref("");

const content = ref("");

/**
 * 取得問答詳情
 */
async function getDetail(params: { fqaId: any }) {
    try {
        const { data } = await $api().FQADetailAPI(params);
        console.log("home sample api => ", data.value);
        const detail = (data.value as any).data;

        title.value = detail.name;
        content.value = detail.content;
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
    await getDetail({ fqaId: route.query.id });
}

onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
            await init();
        }
    });
});
</script>
