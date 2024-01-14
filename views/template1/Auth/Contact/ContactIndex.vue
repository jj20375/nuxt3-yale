<template>
    <section class="mt-[94px] min-h-screen border-t border-gray-300">
        <nav class="border-t border-b border-gray-300 py-[16px] bg-white">
            <div class="grid grid-cols-7 gap-0">
                <div class="col-span-7 ml-[122px]">
                    <Breadcrumb :menus="breadcrumbs" />
                </div>
            </div>
        </nav>
        <div class="container">
            <div class="pt-[60px] pb-[100px]">
                <h3 class="text-[32px] font-bold mb-6">常用聯繫人</h3>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";

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
        name: "auth-contact-slug",
        text: "常用聯繫人",
        params: { slug: "常用聯繫人" }
    }
]);
</script>