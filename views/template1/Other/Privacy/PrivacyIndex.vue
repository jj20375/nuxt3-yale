<template>
    <BannerLayout
        :title="'隱私權政策'"
        :banner="'/img/rule/rule-1-banner.jpg'"
    >
        <template #breadcrumbs>
            <Breadcrumb :menus="breadcrumbs" />
        </template>

        <template #content>
            <section class="max-w-[950px] mx-auto xl:mt-[80px] text-gray-800">
                <div class="container mt-[24px] md:mt-[60px]">
                    <div
                        class="edit-section"
                        v-html="content"
                    ></div>
                </div>
            </section>
        </template>
    </BannerLayout>
</template>

<script lang="ts" setup>
import BannerLayout from "~/views/template1/layouts/BannerLayout.vue";
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
const { $api } = useNuxtApp();
const route = useRoute();

const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁",
    },
    {
        name: "other-privacy-slug",
        text: "隱私權條款",
        params: { slug: "耶魯隱私權條款" },
    },
]);

const content = ref<any>(null);

async function getPageData() {
    try {
        const params = { code: "privacy_policy" };
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
