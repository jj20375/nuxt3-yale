<template>
    <section class="mt-[86px] min-h-screen border-t border-gray-300">
        <nav class="border-t border-b border-gray-300 py-[16px] bg-white">
            <div class="grid grid-cols-7 gap-0">
                <div class="col-span-7 ml-[122px]">
                    <Breadcrumb :menus="breadcrumbs" />
                </div>
            </div>
        </nav>
        <div class="container">
            <div class="pt-[60px] pb-[100px]">
                <h3 class="text-[32px] font-bold mb-6">一般產品-訂單記錄</h3>
                <RecordTable :tableHeadData="tableHeadData" :tableBodyData="tableBodyData" />
                <Pagination class="flex justify-center mb-[95px] mt-[80px]" />
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
import Pagination from "~/views/template1/components/Pagination.vue";
import RecordTable from "~/views/template1/Auth/components/OrderTable.vue";

const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁"
    },
    {
        name: "auth-panel-slug",
        text: "會員中心",
        params: { slug: "會員中心" }
    },
    {
        name: "auth-order-slug",
        text: "一般產品-訂單記錄",
        params: { slug: "一般產品-訂單記錄" }
    }
]);

// 表格資料
const tableHeadData = [
    '訂單編號', '訂單日期', '數量', '訂單金額', '訂單狀態'
]
const tableBodyData = [
    {
        number: "#20211010001",
        date: "2021-10-10",
        quantity: "10",
        price: 8888,
        status: "未付款",
        url: {
            name: "auth-order-detail-slug",
            params: { slug: "訂單資訊" },
            query: { id: "1" },
        }
    },
    {
        number: "#20211010001",
        date: "2021-10-10",
        quantity: "10",
        price: 1111,
        status: "處理中",
        url: {
            name: "auth-order-detail-slug",
            params: { slug: "訂單資訊" },
            query: { id: "1" },
        }
    },
    {
        number: "#20211010001",
        date: "2021-10-10",
        quantity: "10",
        price: 3333,
        status: "已取消",
        url: {
            name: "auth-order-detail-slug",
            params: { slug: "訂單資訊" },
            query: { id: "1" },
        }
    },
    {
        number: "#20211010001",
        date: "2021-10-10",
        quantity: "10",
        price: 56565,
        status: "已出貨",
        url: {
            name: "auth-order-detail-slug",
            params: { slug: "訂單資訊" },
            query: { id: "1" },
        }
    },
    {
        number: "#20211010001",
        date: "2021-10-10",
        quantity: "10",
        price: 8888,
        status: "已出貨",
        url: {
            name: "auth-order-detail-slug",
            params: { slug: "訂單資訊" },
            query: { id: "1" },
        }
    },
];
</script>