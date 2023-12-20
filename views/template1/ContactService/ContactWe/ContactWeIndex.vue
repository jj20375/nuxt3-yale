<template>
    <BannerLayout
        :title="'聯絡我們'"
        :banner="'/img/contact/contact-banner.jpg'"
    >
        <template #breadcrumbs>
            <Breadcrumb :menus="breadcrumbs" />
        </template>

        <template #content>
            <section class="container mt-[80px]">
                <div class="flex">
                    <ContactWeForm class="flex-1" />
                    <div class="text-gray-800 text-center ml-[150px] flex-1">
                        <NuxtImg
                            class="w-[120px] mx-auto"
                            src="/img/logo/logo-1.svg"
                        />
                        <p class="text-[20px] mt-[40px] YaleSolisW-Bd font-medium">耶魯台灣零售總代理 - 灝翔有限公司</p>
                        <p class="text-[16px] mt-[12px]">0800-314-109</p>
                        <P class="text-[16px] mt-[4px]">twyale0800314109@gmail.com</P>
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
const route = useRoute();

const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁",
    },
    {
        name: "faq-slug",
        text: "服務支援",
        params: { slug: "耶魯服務支援" },
    },
    {
        name: "contact-slug",
        text: "聯絡我們",
        params: { slug: "耶魯聯絡我們" },
        query: { id: "id1" },
    },
]);

const medias = ref([]);

for (let i = 0; i < 4; i++) {
    medias.value.push("/img/icons/medias/icon-black-" + (i + 1) + ".svg");
}
</script>
