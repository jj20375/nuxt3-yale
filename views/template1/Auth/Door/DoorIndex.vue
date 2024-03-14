<template>
    <section class="mt-headerMb xl:mt-header border-t border-gray-300">
        <nav class="border-b border-gray-300 py-[16px] bg-white">
            <div class="container">
                <Breadcrumb :menus="breadcrumbs" />
            </div>
        </nav>
        <div class="container">
            <div class="pt-[36px] sm:pt-[60px] pb-[50px] sm:pb-[100px]">
                <h3 class="text-[24px] md:text-[32px] font-bold mb-6">訂製門扇-訂單記錄</h3>
                <RecordTable
                    :tableHeadData="tableHeadData"
                    :tableBodyData="tableBodyData"
                />
                <Pagination
                    :pagination="pagination"
                    @handlePageChange="handlePageChange"
                    class="flex justify-center mb-[40px] sm:mb-[95px] mt-[40px] sm:mt-[80px]"
                />
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
import Pagination from "~/views/template1/components/Pagination.vue";
import RecordTable from "~/views/template1/Auth/components/OrderTable.vue";

const { $api, $utils } = useNuxtApp();

const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁",
    },
    {
        name: "auth-panel-slug",
        text: "會員中心",
        params: { slug: "會員中心" },
    },
    {
        name: "auth-door-slug",
        text: "訂製門扇-訂單記錄",
        params: { slug: "訂製門扇-訂單記錄" },
    },
]);

const pagination = ref<any>({
    page: 1,
    pageSize: 5,
    total: 0,
});

const handlePageChange = (val: any) => {
    getList({ per_page: pagination.value.pageSize, page: val });
};

// 表格資料
const tableHeadData = ["訂單編號", "訂單日期", "數量", "訂單金額", "訂單狀態"];
const tableBodyData = ref<any>([]);

/**
 * 取得訂單列表
 */
async function getList(params: { per_page: number; page: number; type: string }) {
    try {
        params.type = "combination";
        const { data } = await $api().GetProductOrderAPI(params);
        console.log("home sample api => ", data.value);

        const rows = (data.value as any).data.rows;
        const meta = (data.value as any).data.meta;

        tableBodyData.value = [];
        rows.forEach((item: { order_no: any; created_at: any; total_amount: any; status: any; id: any }) => {
            tableBodyData.value.push({
                number: item.order_no,
                date: item.created_at,
                quantity: "10",
                price: item.total_amount,
                status: $utils().orderStatus(item.status),
                url: {
                    name: "auth-door-detail-slug",
                    params: { slug: "訂單資訊" },
                    query: { id: item.id },
                },
            });
        });

        pagination.value.total = meta.total;
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

/**
 * 初始化
 */
async function init() {
    await getList({ per_page: pagination.value.pageSize, page: 1 });
}

onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
            await init();
        }
    });
});
</script>
