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
                <RecordTable :tableHeadData="tableHeadData" :tableBodyData="tableBodyData" />
                <Pagination class="flex justify-center mb-[40px] sm:mb-[95px] mt-[40px] sm:mt-[80px]" />
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
        name: "auth-door-slug",
        text: "訂製門扇-訂單記錄",
        params: { slug: "訂製門扇-訂單記錄" }
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
        status: "待支付訂金",
        url: {
            name: "auth-door-detail-slug",
            params: { slug: "訂單資訊" },
            query: { id: "1" },
        }
    },
    {
        number: "#20211010001",
        date: "2021-10-10",
        quantity: "10",
        price: 1111,
        status: "待付尾款",
        url: {
            name: "auth-door-detail-slug",
            params: { slug: "訂單資訊" },
            query: { id: "1" },
        }
    },
    {
        number: "#20211010001",
        date: "2021-10-10",
        quantity: "10",
        price: 3333,
        status: "派工確認完成",
        url: {
            name: "auth-door-detail-slug",
            params: { slug: "訂單資訊" },
            query: { id: "1" },
        }
    },
    {
        number: "#20211010001",
        date: "2021-10-10",
        quantity: "10",
        price: 56565,
        status: "施工確認完成",
        url: {
            name: "auth-door-detail-slug",
            params: { slug: "訂單資訊" },
            query: { id: "1" },
        }
    },
    {
        number: "#20211010001",
        date: "2021-10-10",
        quantity: "10",
        price: 8888,
        status: "已取消",
        url: {
            name: "auth-door-detail-slug",
            params: { slug: "訂單資訊" },
            query: { id: "1" },
        }
    },
    {
        number: "#20211010001",
        date: "2021-10-10",
        quantity: "5",
        price: 7777,
        status: "訂單完成",
        url: {
            name: "auth-door-detail-slug",
            params: { slug: "訂單資訊" },
            query: { id: "1" },
        }
    },
];
</script>