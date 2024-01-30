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
            <ul class="grid grid-cols-3 gap-4 mt-10">
                <li
                    v-for="(item, index) in datas"
                    :key="index"
                >
                    <NuxtLink :to="item.url" target="_blank">
                        <NuxtImg
                            class="w-full aspect-[16/9] object-contain"
                            :src="item.imgSrc"
                        />
                    </NuxtLink>
                </li>
            </ul>
        </template>
    </SideBarLayout>
</template>

<script lang="ts" setup>
import SideBarLayout from "~/views/template1/layouts/SideBarLayout.vue";
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
import SideBar from "~/views/template1/components/SideBar";

const route = useRoute();

const { $api } = useNuxtApp();

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

const sidebar = ref<any>([]);

/**
 * 取得據點分類
 */
async function getType() {
    try {
        const { data } = await $api().StoreTypeAPI();
        sidebar.value = [];
        console.log("home sampleType api => ", data.value);

        const rows = (data.value as any).data;

        rows.forEach((item: { name: any; id: any }) => {
            if (item.name === "電商平台") {
                sidebar.value.push({
                    text: item.name,
                    id: item.id,
                    url: {
                        params: { slug: item.name },
                        query: { id: item.id },
                        name: "store-e-commerce-slug",
                    },
                });
            } else {
                sidebar.value.push({
                    text: item.name,
                    id: item.id,
                    url: {
                        params: { slug: item.name },
                        query: { id: item.id },
                        name: "store-slug",
                    },
                });
            }
        });
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

const pagination = ref<any>({
    page: 1,
    pageSize: 10,
    total: 0,
});

const datas = ref<any>([]);

/**
 * 取得據點列表
 */
async function getList(params: { stronghold_category_id: any }) {
    try {
        const { data } = await $api().StoreListAPI(params);
        datas.value = [];
        console.log("home sample api => ", data.value);

        const rows = (data.value as any).data;
        // const meta = (data.value as any).data.meta;

        // pagination.value.total = meta.total;

        rows.forEach((item: { name: any; phone: any; image: any; business_hours: any; address: any }) => {
            datas.value.push({
                title: item.name,
                imgSrc: item.image,
                url: item.external_url,
            });
        });
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

/**
 * 初始化
 */
async function init() {
    await getType();
    console.log("route.query.id", route);
    await getList({ stronghold_category_id: route.query.id });
}

onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
            await init();
        }
    });
});
</script>
