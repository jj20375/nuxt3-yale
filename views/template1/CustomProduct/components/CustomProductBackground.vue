<template>
    <div>
        <h3 class="text-[16px] font-medium YaleSolisW-Bd mb-[20px]">場景</h3>
        <ul class="grid grid-cols-2 sm:grid-cols-3 gap-[12px]">
            <li
                @click="currentTabId = tab.id"
                v-for="(tab, index) in tabDatas"
                class="rounded-[8px] py-[16px] px-[24px] border border-gray-300 cursor-pointer"
                :class="currentTabId == tab.id ? 'outline outline-2 outline-yellow-600 -outline-offset-2' : ''"
            >
                <div class="flex items-center">
                    <div class="mr-[12px]">
                        <NuxtImg
                            class="w-[24px]"
                            :src="tab.icon"
                        />
                    </div>
                    <div
                        class="text-[14px] leading-none"
                        :class="currentTabId == tab.id ? 'YaleSolisW-Bd font-medium' : ''"
                    >
                        {{ tab.text }}
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
/**
 * CustomProductGetSceneInterface 場景列表
 */

import { CustomProductGetSceneInterface } from "~/interface/customProduct";

const emit = defineEmits(["update:currentBgId", "update:currentBgData"]);

const props = defineProps({
    currentBgId: {
        type: [String, Number],
        default: 1,
    },
    tabs: {
        type: Array,
        default() {
            return [
                {
                    id: 1,
                    text: " 玄關門",
                    icon: "/img/custom-product/custom-product-background-icon-1.svg",
                    backgorundImg: "",
                },
                {
                    id: 2,
                    text: " 臥室門",
                    icon: "/img/custom-product/custom-product-background-icon-2.svg",
                    backgorundImg: "",
                },
                {
                    id: 3,
                    text: "廚房門",
                    icon: "/img/custom-product/custom-product-background-icon-3.svg",
                    backgorundImg: "",
                },
                {
                    id: 4,
                    text: "浴室門",
                    icon: "/img/custom-product/custom-product-background-icon-4.svg",
                    backgorundImg: "",
                },
                {
                    id: 5,
                    text: "陽台門",
                    icon: "/img/custom-product/custom-product-background-icon-5.svg",
                    backgorundImg: "",
                },
            ];
        },
    },
});

const tabDatas = ref(props.tabs);

const currentTabId = ref(props.currentBgId);

watch(
    () => currentTabId.value,
    (val) => {
        emit("update:currentBgId", val);
        emit(
            "update:currentBgData",
            tabDatas.value.find((item) => item.id === val)
        );
    }
);

onMounted(async () => {
    emit("update:currentBgId", props.currentBgId);
    emit(
        "update:currentBgData",
        tabDatas.value.find((item) => item.id === props.currentBgId)
    );
});
</script>
