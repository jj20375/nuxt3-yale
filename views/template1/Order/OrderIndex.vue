<template>
    <component :is="showComponent"></component>
</template>

<script setup lang="ts">
import { Vue3Lottie } from "vue3-lottie";
import OrderSuccess from "~/views/template1/Order/components/OrderSuccess.vue";
import OrderFail from "~/views/template1/Order/components/OrderFail.vue";

const router = useRouter();
const route = useRoute();

const showComponent = computed(() => {
    if (route.query.status === "error") {
        return OrderFail;
    } else {
        return OrderSuccess;
    }
});
</script>
