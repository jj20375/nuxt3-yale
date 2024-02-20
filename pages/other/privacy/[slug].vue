<template>
    <NuxtLayout name="template1">
        <div v-if="pageLoading">
            <div class="flex items-center justify-center w-full h-screen">
                <font-awesome-icon class="animate-spin text-[40px] text-yellow-500"  :icon="['fas', 'circle-notch']"/>
            </div>
        </div>
        <component
            :is="AsyncComp"
        ></component>
    </NuxtLayout>
</template>

<script setup lang="ts">
const AsyncComp = defineAsyncComponent(() => import("~/views/template1/Other/Privacy/PrivacyIndex.vue"));
definePageMeta({
    middleware: [],
});
const pageLoading = ref(useState("loading"));
onMounted(() => {
    pageLoading.value = false;
});
onBeforeRouteLeave(() => {
    pageLoading.value = true;
});
</script>
