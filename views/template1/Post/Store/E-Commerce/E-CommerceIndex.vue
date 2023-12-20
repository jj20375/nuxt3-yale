<template>
    <SideBarLayout
        :title="'展售門市'"
        :banner="'/img/store/e-commerce/e-commerce-banner.jpg'"
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
            <ul class="grid grid-cols-3 gap-4 min-h-[560px] mt-10">
                <li
                    v-for="(item, index) in datas"
                    :key="index"
                >
                    <NuxtImg
                        class="max-w-[200px] w-full"
                        :src="item.imgSrc"
                    />
                </li>
            </ul>
        </template>
    </SideBarLayout>
</template>

<script lang="ts" setup>
import SideBarLayout from "~/views/template1/layouts/SideBarLayout.vue";
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
import SideBar from "~/views/template1/components/SideBar";
import ListItem from "~/views/template1/Post/Store/components/StoreListItem.vue";
import Pagination from "~/views/template1/components/Pagination.vue";

const route = useRoute();

const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁",
    },
    {
        name: "news-slug",
        text: "展售門市",
        params: { slug: "耶魯展售門市" },
    },
    {
        name: "news-slug",
        text: "電商通路  ",
        params: { slug: "耶魯直營門市" },
        query: { id: "id1" },
    },
]);

const sidebar = ref([
    {
        text: "直營門市",
        id: "id1",
        url: {
            params: { slug: "直營門市" },
            query: { id: "id1" },
            name: "store-slug",
        },
    },
    {
        text: "授權展售店",
        id: "id2",
        url: {
            params: { slug: "授權展售店" },
            query: { id: "id2" },
            name: "store-slug",
        },
    },
    {
        text: "全國電子通路",
        id: "id3",
        url: {
            params: { slug: "全國電子通路" },
            query: { id: "id3" },
            name: "store-slug",
        },
    },
    {
        text: "電商通路",
        id: "id4",
        url: {
            params: { slug: "電商通路" },
            query: { id: "id4" },
            name: "store-e-commerce-slug",
        },
    },
]);

const datas = ref([]);

for (let i = 0; i < 5; i++) {
    datas.value.push({
        imgSrc: "/img/store/e-commerce/item-1.png",
    });
}
</script>
