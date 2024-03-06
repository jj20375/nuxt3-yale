<template>
    <BannerLayout
        :title="'維修與保固'"
        :banner="'/img/repair/repair-banner.jpg'"
        :banner-mobile="'/img/repair/repair-banner-m.jpg'"
    >
        <template #breadcrumbs>
            <Breadcrumb :menus="breadcrumbs" />
        </template>
        <template #content>
            <div class="container">
                <div class="max-w-[800px] mx-auto xl:mt-[80px]">
                    <!--   編輯區內容   -->
                    <div class="mt-[24px] md:mt-[60px]">
                        <div
                            v-html="content"
                            class="edit-section"
                        ></div>
                        <div class="mt-[40px] flex sm:flex-row flex-col gap-[24px] justify-center text-[20px] font-medium YaleSolisW-Bd">
                            <div class="flex-1 flex flex-col items-center gap-[20px] py-[40px] bg-gray-50 rounded-[20px]">
                                <div class="flex items-center gap-3">
                                    <NuxtImg
                                        class="w-[36px]"
                                        src="/img/repair/repair-doc-icon.svg"
                                    />
                                    <div>保固登記</div>
                                </div>
                                <NuxtLink :to="{ name: 'repair-warranty-slug', params: { slug: '保固登記' } }">
                                    <button class="yellow-btn btn-md btn-sm">前往申請</button>
                                </NuxtLink>
                            </div>
                            <div class="flex-1 flex flex-col items-center gap-[20px] py-[40px] bg-gray-50 rounded-[20px]">
                                <div class="flex items-center xl:gap-3 gap-[8px]">
                                    <NuxtImg
                                        class="w-[36px]"
                                        src="/img/repair/repair-tool-icon.svg"
                                    />
                                    <div>線上報修</div>
                                </div>
                                <NuxtLink :to="{ name: 'repair-detail-slug', params: { slug: '線上報修' } }">
                                    <button class="yellow-btn btn-md btn-sm">前往申請</button>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </BannerLayout>
</template>

<script setup lang="ts">
import BannerLayout from "~/views/template1/layouts/BannerLayout.vue";
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";

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
        params: { slug: "服務支援" },
    },
    {
        name: "repair-slug",
        text: "維修與保固",
        params: { slug: "維修與保固" },
        query: { id: route.query.id },
    },
]);

const content = ref<any>(null);

async function getPageData() {
    try {
        const params = { code: "maintenance_and_warranty" };
        const { data } = await $api().getPageAPI(params);
        console.log("getPageData api => ", data.value);

        const pageData = (data.value as any).data.schema;

        content.value = pageData.content;

        const seoSetting = (data.value as any).data.seoSetting;
        useSeoMeta({
            title: seoSetting.title,
            description: seoSetting.description,
            ogTitle: seoSetting.title,
            ogDescription: seoSetting.description,
            ogUrl: () => `${window.location.origin}/${seoSetting.custom_url}`,
            keywords: seoSetting.keywords.join(),
        });
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

getPageData();
</script>
