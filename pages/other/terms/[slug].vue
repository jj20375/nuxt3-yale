<template>
    <NuxtLayout name="template1">
        <component :is="AsyncComp"></component>
    </NuxtLayout>
</template>

<script setup lang="ts">
const AsyncComp = defineAsyncComponent(() => import("~/views/template1/Other/Terms/TermsIndex.vue"));
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
