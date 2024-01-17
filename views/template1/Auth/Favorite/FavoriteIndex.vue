<template>
    <section class="min-h-screen mt-[94px] pb-[60px] bg-gray-50">
        <nav class="border-t border-b border-gray-300 py-[16px] bg-white">
            <div class="grid grid-cols-7 gap-0">
                <div class="col-span-7 ml-[122px]">
                    <Breadcrumb :menus="breadcrumbs" />
                </div>
            </div>
        </nav>
        <div class="container">
            <div class="mt-[60px] px-[60px]">
                <h3 class="font-medium text-[32px] mb-8">產品收藏清單</h3>
                <div class="grid grid-cols-4 gap-x-5 gap-y-8">
                    <div v-for="item in 12">
                        <ProductCard :product="{ id: item }" />
                    </div>
                </div>
            </div>
            <Pagination class="flex justify-center mb-[95px] mt-[80px]" />
        </div>
    </section>
</template>

<script setup lang="ts">
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
import ProductCard from "~/views/template1/components/ProductCard.vue";
import Pagination from "~/views/template1/components/Pagination.vue";

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
        name: "auth-favorite-slug",
        text: "會員資料",
        params: { slug: "產品收藏清單" }
    }
]);
</script>