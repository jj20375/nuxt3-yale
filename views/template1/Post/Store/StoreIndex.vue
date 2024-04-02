<template>
    <SideBarLayout
        :title="'展售門市'"
        :banner="banner"
    >
        <template #breadcrumbs>
            <Breadcrumb :menus="breadcrumbs" />
        </template>
        <template #sidebar>
            <SideBar :menus="sidebar" />
        </template>
        <template #list>
            <ListItem
                ref="listRef"
                :datas="datas"
            />
        </template>
        <template #pagination>
            <Pagination
                :pagination="pagination"
                @handlePageChange="handlePageChange"
                class="mt-[80px]"
            />
        </template>
    </SideBarLayout>
</template>

<script lang="ts" setup>
import SideBarLayout from "~/views/template1/layouts/SideBarLayout.vue";
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
import SideBar from "~/views/template1/components/SideBar";
import ListItem from "~/views/template1/Post/Store/components/StoreListItem.vue";
import EListItem from "~/views/template1/Post/Store/E-Commerce/E-CommerceIndex.vue";
import Pagination from "~/views/template1/components/Pagination.vue";

const route = useRoute();

const { $api } = useNuxtApp();

const banner = computed(() => {
    // 判斷直營門市顯示 banner
    if (route.params.id == 1) {
        return "/img/store/store-banner-1.jpg";
    }
    // 判斷授權展售門市顯示 banner
    if (route.params.id == 3) {
        return "/img/store/store-banner-2.jpg";
    }
    // 判斷全國電子顯示 banner
    if (route.params.id == 4) {
        return "/img/store/store-banner-3.jpg";
    }
    return "/img/store/store-banner-1.jpg";
});

const breadcrumbs = ref<any>([
    {
        name: "index",
        text: "首頁",
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
            // id 2 等於電商通路樣板
            if (item.id == 2) {
                sidebar.value.push({
                    text: item.name,
                    id: item.id,
                    url: {
                        params: { slug: item.sort_order, id: item.id },
                        name: "store-e-commerce-slug-id",
                    },
                });
            } else {
                sidebar.value.push({
                    text: item.name,
                    id: item.id,
                    url: {
                        params: { slug: item.sort_order, id: item.id },
                        name: "store-slug-id",
                    },
                });
            }
        });

        // 取得最後面的 麵包屑路徑
        const lastBreadcrumbs = rows.find((item: any) => item.id == route.params.id);
        // 判斷是否有匹配的 id 來新增 後續的麵包屑 路徑
        if (lastBreadcrumbs !== undefined) {
            breadcrumbs.value.push({
                name: "store-slug-id",
                text: "展售門市",
                params: { slug: lastBreadcrumbs.sort_order, id: lastBreadcrumbs.id },
            });

            breadcrumbs.value.push({
                // id 2 等於電商通路樣板
                name: lastBreadcrumbs.id == 2 ? "store-e-commerce-slug-id" : "store-slug-id",
                text: lastBreadcrumbs.name,
                params: { slug: lastBreadcrumbs.sort_order, id: lastBreadcrumbs.id },
            });
        }
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

const pagination = ref<any>({
    page: 1,
    pageSize: 10,
    total: 0,
});

const handlePageChange = (val: any) => {
    getList({ per_page: pagination.value.pageSize, page: val, stronghold_category_id: route.params.id });
};

const datas = ref<any>([]);

/**
 * 取得據點列表
 */
async function getList(params: { per_page: number; page: number; stronghold_category_id: any }) {
    try {
        const { data } = await $api().StoreListPaginateAPI(params);
        datas.value = [];
        console.log("home sample api => ", data.value);

        const rows = (data.value as any).data.rows;
        const meta = (data.value as any).data.meta;

        pagination.value.total = meta.total;

        rows.forEach((item: { name: any; phone: any; image: any; business_hours: any; address: any }) => {
            datas.value.push({
                title: item.name,
                contact: {
                    phone: {
                        icon: "/img/icons/store/phone.svg",
                        value: item.phone,
                    },
                    time: {
                        icon: "/img/icons/store/time.svg",
                        value: item.business_hours,
                    },
                    location: {
                        icon: "/img/icons/store/location.svg",
                        value: item.address,
                    },
                },
                imgSrc: item.image,
            });
        });

        nextTick(async () => {
            listRef.value.domRef[anchorIndex.value].scrollIntoView({ block: "center", behavior: "smooth" });
        });
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

const listRef = ref<any>();
const anchorIndex = ref<any>();

/**
 * 初始化
 */
async function init() {
    await getType();
    let page = 1;
    if (process.client) {
        console.log("history.state", history.state);
        if (history.state.index) {
            page = Math.floor(history.state.index / pagination.value.pageSize) + 1;
            anchorIndex.value = history.state.index % pagination.value.pageSize;
            pagination.value.page = page;
        }
    }
    await getList({ per_page: pagination.value.pageSize, page: page, stronghold_category_id: route.params.id });
}

// await init();
onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
            await init();
        }
    });
});
</script>
