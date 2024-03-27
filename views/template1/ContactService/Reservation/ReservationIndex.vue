<template>
    <BannerLayout
        :title="'預約安裝'"
        :banner="'/img/reservation/reservation-banner.jpg'"
    >
        <template #breadcrumbs>
            <Breadcrumb :menus="breadcrumbs" />
        </template>
        <template #content>
            <div class="container">
                <div class="max-w-[800px] mx-auto xl:mt-[80px]">
                    <div class="mt-[24px] md:mt-[60px]">
                        <!--   編輯區內容   -->
                        <div
                            v-html="content"
                            class="edit-section"
                        ></div>
                        <div class="mt-[40px] flex sm:flex-row flex-col gap-[24px] justify-center text-[20px] font-medium YaleSolisW-Bd">
                            <div class="flex-1 flex flex-col items-center gap-[20px] py-[40px] bg-gray-50 rounded-[20px]">
                                <div class="flex items-center gap-3">
                                    <NuxtImg
                                        class="w-[36px]"
                                        src="/img/reservation/reservation-yale-icon.png"
                                    />
                                    <div>一般安裝</div>
                                </div>
                                <NuxtLink :to="{ name: 'reservation-general-slug', params: { slug: 'install' } }">
                                    <button class="yellow-btn btn-md">前往申請</button>
                                </NuxtLink>
                            </div>
                            <div class="flex-1 flex flex-col items-center gap-[20px] py-[40px] bg-gray-50 rounded-[20px]">
                                <div class="flex items-center gap-3">
                                    <NuxtImg
                                        class="w-[36px]"
                                        src="/img/reservation/reservation-security-guard-icon.png"
                                    />
                                    <div>新光保全安裝</div>
                                </div>
                                <NuxtLink :to="{ name: 'reservation-guard-slug', params: { slug: 'install' } }">
                                    <button class="yellow-btn btn-md">前往申請</button>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </BannerLayout>
</template>

<script setup lang="ts">
import BannerLayout from "~/views/template1/layouts/BannerLayout.vue";
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
import { useInitializationStore } from "~/store/initializationStore";

const initializationStore = useInitializationStore();

const route = useRoute();
const { $api } = useNuxtApp();

const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁",
    },
    {
        name: "reservation-slug",
        text: "服務支援",
        params: { slug: "install" },
    },
    {
        name: "reservation-slug",
        text: "預約安裝",
        params: { slug: "install" },
    },
]);

const content = ref<any>(null);

async function getPageData() {
    try {
        const params = { code: "installation_reservation" };
        const { data } = await $api().getPageAPI(params);
        console.log("getPageData api => ", data.value);

        const pageData = (data.value as any).data.schema;
        console.log("getPageData pageData => ", pageData);

        content.value = pageData.content;

        const seoSetting = (data.value as any).data.seoSetting;
        useSeoMeta({
            title: seoSetting.title ? seoSetting.title : initializationStore.initializationData.site.meta_title,
            description: seoSetting.description ? seoSetting.description : initializationStore.initializationData.site.meta_description,
            ogTitle: seoSetting.title,
            ogDescription: seoSetting.description,
            ogUrl: () => `${window.location.origin}/${seoSetting.custom_url}`,
            keywords: seoSetting.keywords.join(),
        });
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

getPageData();
</script>
