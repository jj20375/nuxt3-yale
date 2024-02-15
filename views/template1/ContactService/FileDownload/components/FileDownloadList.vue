<template>
    <ul class="grid grid-cols-2 gap-[28px] text-gray-800 list-disc list-inside YaleSolisW-Rg">
        <li
            v-for="(data, index) in datas"
            :key="index"
            class="flex items-center gap-[28px]"
        >
            <div class="text-[16px]"><span class="mr-4">•</span>{{ data.text }}</div>
            <button
                @click="download(data.url)"
                class="gray-btn !py-2"
            >
                下載
            </button>
        </li>
    </ul>
</template>

<script setup lang="ts">
interface Props {
    datas: {
        text: string;
        url: string;
    }[];
}
const props = withDefaults(defineProps<Props>(), {
    datas: [
        {
            text: "YDM7220 使用說明書",
            url: "",
        },
    ],
});

const download = (file: string | URL | undefined) => {
    window.open(file);
};
</script>
