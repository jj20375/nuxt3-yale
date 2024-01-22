<template>
  <section class="min-h-screen mt-[94px] pb-[60px]">
    <nav class="border-t border-b border-gray-300 py-[16px] bg-white">
      <div class="grid grid-cols-7 gap-0">
        <div class="col-span-7 ml-[122px]">
          <Breadcrumb :menus="breadcrumbs" />
        </div>
      </div>
    </nav>
    <div class="container">
      <div class="mt-[60px] mx-auto">
<!--  TODO 標題後台可改  -->
        <h1 class="text-center font-bold text-[32px] mb-[40px]">指定地區費用加收說明</h1>
        <!--   編輯區區塊  -->
        <div class="edit-section">
<!--  TODO 這邊資料是稱畫面用，串完資料後請刪除   -->
          <NuxtImg class="w-full"
              src="/img/reservation/charge-table.jpg"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";

const breadcrumbs = ref([
  {
    name: "index",
    text: "首頁",
  },
  {
    name: "charge-slug",
    text: "指定地區費用加收說明",
    params: { slug: "指定地區費用加收說明" },
  },
]);

</script>