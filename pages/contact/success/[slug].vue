<template>
    <NuxtLayout name="template1">
        <div v-if="pageLoading">
            <div class="flex items-center justify-center w-full h-screen">
                <font-awesome-icon class="animate-spin text-[40px] text-yellow-500"  :icon="['fas', 'circle-notch']"/>
            </div>
        </div>
        <component
            class="min-h-screen"
            :is="AsyncComp"
        ></component>
    </NuxtLayout>
</template>

<script setup lang="ts">
const AsyncComp = defineAsyncComponent(() => import("~/views/template1/ContactService/ContactWe/components/ContactWeSuccess.vue"));
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
