<template>
    <NuxtLayout
        name="template1"
        customClass="bg-gray-50"
    >
        <div
            v-if="pageLoading"
            class="bg-white"
        >
            <div class="flex items-center justify-center w-full h-screen">
                <font-awesome-icon
                    class="animate-spin text-[40px] text-gray-300"
                    :icon="['fas', 'circle-notch']"
                />
            </div>
        </div>
        <component :is="AsyncComp"></component>
    </NuxtLayout>
</template>

<script setup lang="ts">
const AsyncComp = defineAsyncComponent(() => import("~/views/template1/Auth/Favorite/FavoriteIndex.vue"));
definePageMeta({
    middleware: ["auth-middleware"],
});
const pageLoading = ref(useState("loading"));
onMounted(() => {
    pageLoading.value = false;
});
onBeforeRouteLeave(() => {
    pageLoading.value = true;
});
</script>
