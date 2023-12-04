<template>
    <div ref="containerRefDom">
        <ClientOnly>
            <slot></slot>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
// fancybox 套件 https://fancyapps.com/resources/integration/#vue
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
const props = defineProps({
    options: {
        type: Object,
        default() {
            return {};
        },
    },
});

const containerRefDom = ref<any>(null);

onMounted(() => {
    Fancybox.bind(containerRefDom.value, "[data-fancybox]", {
        ...(props.options || {}),
    });
});

onUpdated(() => {
    Fancybox.unbind(containerRefDom.value);
    Fancybox.close();

    Fancybox.bind(containerRefDom.value, "[data-fancybox]", {
        ...(props.options || {}),
    });
});

onUnmounted(() => {
    Fancybox.destroy();
});
</script>
