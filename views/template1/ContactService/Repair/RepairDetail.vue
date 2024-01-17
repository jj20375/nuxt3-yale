<template>
    <BannerLayout
        :title="'線上報修'"
        :banner="'/img/repair/repair-detail-banner.jpg'"
    >
        <template #breadcrumbs>
            <Breadcrumb :menus="breadcrumbs" />
        </template>
        <template #content>
            <div class="max-w-[800px] mx-auto mt-[80px]">
            </div>
        </template>
    </BannerLayout>
</template>

<script setup lang="ts">
import BannerLayout from "~/views/template1/layouts/BannerLayout.vue";
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";

const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁",
    },
    {
        name: "repair-slug",
        text: "服務支援",
        params: { slug: "耶魯服務支援" },
    },
    {
        name: "repair-detail-slug",
        text: "線上報修",
        params: { slug: "耶魯線上報修" },
        query: { id: "1" },
    },
]);
</script>
