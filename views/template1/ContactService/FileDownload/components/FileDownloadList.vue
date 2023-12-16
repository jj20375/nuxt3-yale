<template>
    <ul class="grid grid-cols-2 gap-0 text-gray-800 YaleSolisW-Rg">
        <li
            v-for="(data, index) in datas"
            :key="index"
            class="flex items-center list-disc list-inside pb-[28px]"
        >
            <div class="text-[16px] mr-[29px]">{{ data.text }}</div>
            <button class="bg-gray-100 text-[15px] rounded-full py-[8px] px-[25px]">下載</button>
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
</script>
