<template>
    <section class="max-w-[950px] mx-auto mt-[40px]">
        <h2 class="text-[32px] mb-[20px] YaleSolisW-Bd font-medium">{{installation_notes.title}}</h2>
        <!--    編輯器區塊   -->
        <div class="edit-section" v-html="installation_notes.content">
        </div>
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
    installation_notes: {
        content: "",
        title: "",
    },
});
</script>
