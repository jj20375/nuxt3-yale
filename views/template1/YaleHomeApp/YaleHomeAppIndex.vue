<template>
    <BannerLayout
        :title="'Yale Home App'"
        :banner="'/img/yale-home-app/yale-home-app-banner.jpg'"
    >
        <template #breadcrumbs>
            <Breadcrumb :menus="breadcrumbs" />
        </template>

        <template #content> </template>
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
        name: "faq-slug",
        text: "Yale Home App",
        params: { slug: "Yale Home APP" },
    },
]);
</script>
