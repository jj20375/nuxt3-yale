<template>
    <SideBarLayout
        :title="'展售門市'"
        :banner="'/img/store/store-banner.jpg'"
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
        <template #list>
            <ListItem :datas="datas" />
        </template>
        <template #pagination>
            <Pagination class="mt-[80px]" />
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
        text: "直營門市",
        params: { slug: "耶魯直營門市" },
        query: { id: "id1" },
    },
]);

const sidebar = ref([
    {
        text: "直營門市",
        id: "id1",
        url: {
            params: "直營門市",
            query: "id1",
            name: "store-slug",
        },
    },
    {
        text: "授權展售店",
        id: "id2",
        url: {
            params: "授權展售店",
            query: "id2",
            name: "store-slug",
        },
    },
    {
        text: "全國電子通路",
        id: "id3",
        url: {
            params: "全國電子通路",
            query: "id3",
            name: "store-slug",
        },
    },
    {
        text: "電商通路",
        id: "id4",
        url: {
            params: "電商通路",
            query: "id4",
            name: "store-slug",
        },
    },
]);

const datas = ref([]);

for (let i = 0; i < 5; i++) {
    datas.value.push({
        title: "Yale 承德門市",
        contact: {
            phone: { icon: "/img/icons/store/phone.svg", value: "02-2597-3123" },
            time: { icon: "/img/icons/store/time.svg", value: "11:00 - 21:00" },
            location: { icon: "/img/icons/store/location.svg", value: "台北市大同區承德路三段 217 號 1 樓" },
        },
        imgSrc: "/img/store/item-1.jpg",
    });
}
</script>
