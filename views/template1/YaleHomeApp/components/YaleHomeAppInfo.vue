<template>
    <section class="max-w-[950px] mx-auto sm:mt-[40px] mt-[20px] px-[24px]">
        <h2 class="sm:text-[32px] text-[24px] mb-[12px] sm:mb-[20px] YaleSolisW-Bd font-medium">{{ props.installation_notes.title }}</h2>
        <!--    編輯器區塊   -->
        <div
            class="edit-section"
            v-html="props.installation_notes.content"
        />
    </section>
</template>

<script setup lang="ts">
interface Props {
    installation_notes: {
        title: string;
        content: string;
    };
}

const props = withDefaults(defineProps<Props>(), {
    installation_notes: () => {
        return {
            content: "",
            title: "",
        };
    },
});
</script>
