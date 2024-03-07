<template>
    <BannerLayout
        :title="'聯絡我們'"
        :banner="'/img/contact/contact-banner.jpg'"
    >
        <template #breadcrumbs>
            <Breadcrumb :menus="breadcrumbs" />
        </template>

        <template #content>
            <section class="container mt-[36px] sm:mt-[80px] custom-form">
                <div class="mx-auto w-full flex-col sm:flex-row 2xl:w-[88%] flex gap-[56px] sm:gap-[120px]">
                    <ContactWeForm class="flex-[1.5]" />
                    <div class="text-gray-800 text-center flex-1 mb-[44px]">
                        <NuxtImg
                            class="w-[100px] sm:w-[120px] mx-auto"
                            :src="initializationData?.site.site_logo"
                        />
                        <p class="text-[20px] mt-[24px] sm:mt-[40px] YaleSolisW-Bd font-medium">{{ initializationData?.site.meta_title }}</p>
                        <p class="text-[16px] mt-[12px]">{{ initializationData?.site.contact_phone }}</p>
                        <P class="text-[16px] mt-[4px]">{{ initializationData?.site.contact_email }}</P>
                        <ul class="flex justify-center mt-[40px]">
                            <li
                                v-for="(media, index) in medias"
                                :key="index"
                            >
                                <NuxtImg
                                    class="w-[24px]"
                                    :class="medias.length - 1 !== index ? 'mr-[24px]' : ''"
                                    :src="media"
                                />
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </template>
    </BannerLayout>
</template>

<script lang="ts" setup>
import BannerLayout from "~/views/template1/layouts/BannerLayout.vue";
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
import ContactWeForm from "~/views/template1/ContactService/ContactWe/components/ContactWeForm.vue";
import { useInitializationStore } from "~/store/initializationStore";
const route = useRoute();

const initializationStore = useInitializationStore();

const initializationData = computed(() => {
    return initializationStore.initializationData;
});

const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁",
    },
    {
        name: "contact-slug",
        text: "服務支援",
        params: { slug: "聯絡我們" },
    },
    {
        name: "contact-slug",
        text: "聯絡我們",
        params: { slug: "聯絡我們" },
    },
]);

const medias = ref([]);

for (let i = 0; i < 4; i++) {
    medias.value.push("/img/icons/medias/icon-black-" + (i + 1) + ".svg");
}
</script>
