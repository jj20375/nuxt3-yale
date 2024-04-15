<template>
    <NuxtLayout name="template1">
        <div v-if="pageLoading">
            <div class="fixed flex items-center justify-center w-full h-screen bg-white z-[499]">
                <font-awesome-icon
                    class="animate-spin text-[40px] text-gray-300"
                    :icon="['fas', 'circle-notch']"
                />
            </div>
        </div>
        <component :is="AsyncComp" v-model:pageLoading="pageLoading"></component>
    </NuxtLayout>
</template>

<script setup lang="ts">
const AsyncComp = defineAsyncComponent(() => import("~/views/template1/Auth/Door/DoorDetail.vue"));
definePageMeta({
    middleware: ["auth-middleware"],
});
const pageLoading = ref(useState("loading"));
pageLoading.value = true;
onMounted(() => {
    // pageLoading.value = false;
});
onBeforeRouteLeave(() => {
    pageLoading.value = true;
});
</script>
