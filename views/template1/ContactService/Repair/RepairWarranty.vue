<template>
    <BannerLayout
        :title="'保固登記'"
        :banner="'/img/repair/repair-warranty-banner.jpg'"
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
        text: "維修與保固",
        params: { slug: "維修與保固" },
    },
    {
        name: "repair-detail-slug",
        text: "保固登記",
        params: { slug: "保固登記" },
        query: { id: "1" },
    },
]);
</script>
