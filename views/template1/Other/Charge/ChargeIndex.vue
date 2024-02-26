<template>
    <section class="mt-headerMb xl:mt-header sm:pb-[80px] pb-[60px]">
        <nav class="border-t border-b border-gray-300 py-2.5 xl:py-4 bg-white min-h-[43px] xl:min-h-[55px]">
            <div class="container">
                <Breadcrumb :menus="breadcrumbs" />
            </div>
        </nav>
        <div class="container">
            <div class="mt-[60px] mx-auto">
                <h1 class="text-center text-[28px] md:text-[32px] xl:text-[40px] YaleSolisW-Bd font-medium mb-[40px]">{{ pageData.title }}</h1>
                <!--   編輯區區塊  -->
                <div
                    class="edit-section"
                    v-html="pageData.content"
                ></div>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";

const { $api } = useNuxtApp();

const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁",
    },
    {
        name: "other-charge-slug",
        text: "指定地區費用加收說明",
        params: { slug: "指定地區費用加收說明" },
    },
]);

const pageData = ref<any>({
    title: "指定地區費用加收說明",
    content: ``,
});

async function getPageData() {
    try {
        const params = { code: "area_surcharge" };
        const { data } = await $api().getPageAPI(params);
        console.log("getPageData api => ", data.value);

        const schema = (data.value as any).data.schema;

        pageData.value.content = schema.content;
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
            await getPageData();
        }
    });
});
</script>
