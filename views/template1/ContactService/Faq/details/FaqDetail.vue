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
                v-if="!$utils().isEmpty(content)"
                v-html="content"
                class="text-gray-800 text-[16px] leading-relaxed"
            ></div>
            <FaqContact class="mt-[90px]" />
            <div class="mt-[60px]">
                <NuxtLink :to="{ name: 'faq-slug-id', params: { slug: categoryName, id: route.params.id } }">
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

const { $api, $utils } = useNuxtApp();

const breadcrumbs = ref<any>([
    {
        name: "index",
        text: "首頁",
    },
]);

const sidebar = ref<any>([]);

const categoryName = computed(() => {
    return sidebar.value.find((item: any) => item.id == route.params.id) !== undefined ? sidebar.value.find((item: any) => item.id == route.params.id).name : "其他";
});

/**
 * 取得問答分類
 */
async function getType() {
    try {
        const { data } = await $api().FQATypeAPI();
        sidebar.value = [];

        const rows = (data.value as any).data;

        rows.forEach((item: { name: any; id: any; seoSetting: any }) => {
            sidebar.value.push({
                text: item.name,
                id: item.id,
                url: {
                    params: { slug: item.seoSetting.custom_url, id: item.id },
                    name: "faq-slug-id",
                },
            });
        });

        // 取得最後面的 麵包屑路徑
        const lastBreadcrumbs = rows.find((item: any) => item.id == route.params.id);
        breadcrumbs.value.push({
            name: "faq-slug-id",
            text: "服務支援",
            params: { slug: lastBreadcrumbs.seoSetting.custom_url, id: lastBreadcrumbs.id },
        });
        breadcrumbs.value.push({
            name: "faq-slug-id",
            text: "服務中心",
            params: { slug: lastBreadcrumbs.seoSetting.custom_url, id: lastBreadcrumbs.id },
        });
        breadcrumbs.value.push({
            name: "faq-slug-id",
            text: lastBreadcrumbs.name,
            params: { slug: lastBreadcrumbs.seoSetting.custom_url, id: lastBreadcrumbs.id },
        });
    } catch (err) {}
}

const title = ref("");

const content = ref("");

/**
 * 取得問答詳情
 */
async function getDetail(params: { fqaId: any }) {
    try {
        const { data } = await $api().FQADetailAPI(params);
        const detail = (data.value as any).data;

        title.value = detail.name;
        content.value = detail.content;
        breadcrumbs.value.push({
            name: "faq-details-slug-id-detail_id",
            text: detail.name,
            params: { slug: detail.seoSetting.custom_url, detail_id: detail.id },
        });
    } catch (err) {}
}

/**
 * 初始化
 */
async function init() {
    await getType();
    await getDetail({ fqaId: route.params.detail_id });
}

await init();
onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
        }
    });
});
</script>
