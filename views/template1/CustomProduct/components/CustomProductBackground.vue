<template>
    <div>
        <h3 class="text-[16px] font-medium YaleSolisW-Bd mb-[20px]">場景</h3>
        <ul class="flex">
            <li
                v-for="(tab, index) in tabs.slice(0, 3)"
                class="rounded-[8px] py-[16px] px-[24px] mr-[12px]"
                :class="currentTabData == tab.id ? 'border-2 border-yellow-600' : 'border border-gray-300'"
            >
                <div class="flex items-center">
                    <div class="mr-[12px]">
                        <NuxtImg
                            class="w-[24px]"
                            :src="tab.icon"
                        />
                    </div>
                    <div class="text-[14px] YaleSolisW-Bd font-medium">{{ tab.text }}</div>
                </div>
            </li>
        </ul>
        <ul class="flex mt-[12px]">
            <li
                v-for="(tab, index) in tabs.slice(3, 5)"
                class="rounded-[8px] py-[16px] px-[24px] mr-[12px]"
                :class="currentTabData == tab.id ? 'border-2 border-yellow-600' : 'border border-gray-300'"
            >
                <div class="flex items-center">
                    <div class="mr-[12px]">
                        <NuxtImg
                            class="w-[24px]"
                            :src="tab.icon"
                        />
                    </div>
                    <div class="text-[14px] YaleSolisW-Bd font-medium">{{ tab.text }}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(["update:currentTab"]);

const props = defineProps({
    currentTab: {
        tyep: [String, Number],
        default: "id1",
    },
});

const tabs = ref([
    {
        id: "id1",
        text: " 玄關門",
        icon: "/img/custom-product/custom-product-background-icon-1.svg",
    },
    {
        id: "id2",
        text: " 臥室門",
        icon: "/img/custom-product/custom-product-background-icon-2.svg",
    },
    {
        id: "id3",
        text: "廚房門",
        icon: "/img/custom-product/custom-product-background-icon-3.svg",
    },
    {
        id: "id4",
        text: "浴室門",
        icon: "/img/custom-product/custom-product-background-icon-4.svg",
    },
    {
        id: "id5",
        text: "陽台門",
        icon: "/img/custom-product/custom-product-background-icon-5.svg",
    },
]);

const currentTabData = ref(props.currentTab);

watch(
    () => currentTabData.value,
    (val) => {
        emit("update:currentTab", val);
    }
);
</script>
