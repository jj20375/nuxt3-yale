<template>
    <NuxtLayout name="template1">
        <div v-if="pageLoading">
            <div class="flex items-center justify-center w-full h-screen">
                <font-awesome-icon
                    class="animate-spin text-[100px]"
                    :icon="['fas', 'spinner']"
                />
            </div>
        </div>
        <component
            class="min-h-screen"
            :is="AsyncComp"
        ></component>
    </NuxtLayout>
</template>

<script setup lang="ts">
const AsyncComp = defineAsyncComponent(() => import("~/views/template1/Auth/Forgot/resetPassword.vue"));
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
