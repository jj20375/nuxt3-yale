<template>
    <NuxtLayout name="template1" customClass="bg-gray-50">
        <div v-if="pageLoading" class="bg-white">
            <div class="flex items-center justify-center w-full h-screen">
                <font-awesome-icon
                    class="animate-spin text-[100px]"
                    :icon="['fas', 'spinner']"
                />
            </div>
        </div>
        <component
            :is="AsyncComp"
        ></component>
    </NuxtLayout>
</template>

<script setup lang="ts">
const AsyncComp = defineAsyncComponent(() => import("~/views/template1/Auth/Forgot/ForgotIndex.vue"));
definePageMeta({
    middleware: ["user-middleware"],
});
const pageLoading = ref(useState("loading"));
onMounted(() => {
    pageLoading.value = false;
});
onBeforeRouteLeave(() => {
    pageLoading.value = true;
});
</script>
