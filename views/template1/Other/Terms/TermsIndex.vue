<template>
    <BannerLayout
        :title="'網站服務條款'"
        :banner="'/img/rule/rule-1-banner.jpg'"
    >
        <template #breadcrumbs>
            <Breadcrumb :menus="breadcrumbs" />
        </template>

        <template #content>
            <section class="max-w-[950px] mx-auto mt-[80px] text-gray-800">
                <h1 class="text-[28px] font-medium YaleSolisW-Bd text-center mb-[30px]">網站條款</h1>
                <div v-html="content"></div>
            </section>
        </template>
    </BannerLayout>
</template>

<script lang="ts" setup>
import BannerLayout from "~/views/template1/layouts/BannerLayout.vue";
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
const route = useRoute();

const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁",
    },
    {
        name: "other-terms-slug",
        text: "網站服務條款",
        params: { slug: "耶魯網站服務條款" },
    },
]);

const content = ref(`
<p>非常歡迎您光臨「耶魯電子鎖網站」（以下簡稱本網站），為了讓您能夠安心的使用本網站的各項服務與資訊，特此向您說明本網站的隱私權保護政策，以保障您的權益，請您詳閱下列內容：</p>
<h5 class="text-[18px] font-medium">一、隱私權保護政策的適用範圍</h5>
<p class="text-[16px]">隱私權保護政策內容，包括本網站如何處理在您使用網站服務時收集到的個人識別資料。隱私權保護政策不適用於本網站以外的相關連結網站，也不適用於非本網站所委託或參與管理的人員。</p>
`);
</script>
