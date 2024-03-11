<template>
    <div class="flex items-center sm:flex-nowrap sm:justify-start flex-wrap justify-center">
        <NuxtImg
            class="w-[120px] sm:mr-[24px] sm:mb-[0] mb-[20px]"
            src="/img/faq/faqContact.svg"
        />
        <div>
            <p class="text-gray-600 text-[16px] YaleSolisW-Rg sm:text-left text-center sm:mb-[0px] mb-[8px]">需要更多協助嗎？</p>
            <h5 class="leading-[44.80px] text-[32px] YaleSolisW-Bd font-medium tracking-wide">{{ initializationData?.site.contact_phone }}</h5>
            <p class="text-gray-800 text-[16px] YaleSolisW-Rg">24 小時免費客服電話・全年無休</p>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useInitializationStore } from "~/store/initializationStore";

const initializationStore = useInitializationStore();

const initializationData = computed(() => {
    return initializationStore.initializationData;
});
</script>
