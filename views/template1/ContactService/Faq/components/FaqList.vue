<template>
    <ul class="text-gray-800 text-[16px] YaleSolisW-Rg">
        <li
            v-for="(data, index) in datas"
            :key="index"
            class="list-disc list-inside"
            :class="index !== 0 ? 'py-[9px]' : 'pb-[9px]'"
        >
            <NuxtLink class="hover:underline hover:underline-offset-2 hover:transition-all hover:duration-300 hover:font-medium" :to="data.url">
                {{ data.text }}
            </NuxtLink>
        </li>
    </ul>
</template>

<script setup lang="ts">
interface Props {
    datas: {
        text: string;
        url: {
            name: string;
            params: { slug: string };
            query: any;
        };
    }[];
}
const props = withDefaults(defineProps<Props>(), {
    datas: [
        {
            text: "電子鎖沒電怎麼辦？",
            url: {
                name: "faq-details-slug",
                params: { slug: "電子鎖沒電怎麼辦？" },
                query: { id: "id1" },
            },
        },
    ],
});
</script>
