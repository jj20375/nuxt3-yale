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
                <div class="mx-auto w-full flex-col md:flex-row 2xl:w-[88%] flex gap-[56px] xl:gap-[120px]">
                    <ContactWeForm class="flex-[1.5]" />
                    <div class="text-gray-800 text-center flex-1 mb-[44px]">
                        <NuxtImg
                            class="w-[100px] sm:w-[120px] mx-auto"
                            :src="initializationData?.site.site_logo"
                        />
                        <p class="text-[20px] mt-[24px] sm:mt-[40px] YaleSolisW-Bd font-medium">{{ initializationData?.site.site_name }}</p>
                        <p class="text-[16px] mt-[12px]"><a :href="`tel:${initializationData?.site.contact_phone}`">{{ initializationData?.site.contact_phone }}</a></p>
                        <p class="text-[16px] mt-[4px]"><a :href="`mailto:${initializationData?.site.contact_email}`">{{ initializationData?.site.contact_email }}</a></p>
                        <ul class="flex justify-center mt-[40px]">
                            <li
                                v-for="(media, index) in socialMedia"
                                :key="index"
                            >
                            <div
                                @click="toSocialMedia(media)"
                                class="flex justify-center items-center !w-[40px] !h-[40px] group cursor-pointer"
                            >
                                <component
                                    class="!w-[20px] !h-[20px] transition-all duration-300 group-hover:text-gray-400 group-hover:transition-all group-hover:duration-300"
                                    :is="media.name"
                                />
                            </div>
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
import IconFacebook from "~/assets/img/icons/medias/icon-black-1.svg";
import IconInstagram from "~/assets/img/icons/medias/icon-black-2.svg";
import IconLine from "~/assets/img/icons/medias/icon-black-3.svg";
import IconYoutube from "~/assets/img/icons/medias/icon-black-4.svg";
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

// 社群資料
const socialMedia = computed(() => {
    const arr = []

    if (initializationData.value.site.social_facebook) {
        arr.push({
            name: IconFacebook,
            url: initializationData.value.site.social_facebook,
        })
    }
    if (initializationData.value.site.social_line) {
        arr.push({
            name: IconLine,
            url: initializationData.value.site.social_line,
        })
    }
    if (initializationData.value.site.social_instagram) {
        arr.push({
            name: IconInstagram,
            url: initializationData.value.site.social_instagram,
        })
    }
    if (initializationData.value.site.social_youtube) {
        arr.push({
            name: IconYoutube,
            url: initializationData.value.site.social_youtube,
        })
    }

    return arr
})

function toSocialMedia(socialMedia: { url: string | URL | undefined }) {
    if (socialMedia.url) {
        open(socialMedia.url, "_blank");
    }
}
</script>
