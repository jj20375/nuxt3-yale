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
            <div
                v-html="content"
                class="text-gray-800 text-[16px] leading-relaxed"
            ></div>
            <FaqContact class="mt-[90px]" />
            <div class="mt-[60px]">
                <NuxtLink :to="{ name: 'faq-slug', params: { slug: '耶魯服務支援-電子鎖' }, query: { id: 'id1' } }">
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

const sidebar = ref([
    {
        text: "電子鎖",
        id: "id1",
        url: {
            params: "電子鎖",
            query: "id1",
            name: "news-slug",
        },
    },
    {
        text: "保險箱",
        id: "id2",
        url: {
            params: "保險箱",
            query: "id2",
            name: "news-slug",
        },
    },
    {
        text: "Yale Home App 及配件",
        id: "id3",
        url: {
            params: "Yale Home App 及配件",
            query: "id3",
            name: "news-slug",
        },
    },
    {
        text: "訂製專屬門扇",
        id: "id4",
        url: {
            params: "訂製專屬門扇",
            query: "id4",
            name: "news-slug",
        },
    },
    {
        text: "型錄及檔案下載",
        id: "id5",
        url: {
            params: "型錄及檔案下載",
            query: "id5",
            name: "news-slug",
        },
    },
]);

const title = computed(() => {
    return "電子鎖沒電怎麼辦？";
});

const content = ref(`
<p>耶魯電子鎖皆有低電量提示，建議您看到低電量提示燈亮起時，盡速更換全部電池；請注意不要混用新舊電池，建議使用鹼性電池以避免發生無法預期的損壞。若遇電池沒電、無法開鎖的狀況，可以至便利商店購買 9V 方型電池，從外部緊急提供電源即可開鎖。</p>
`);
</script>
