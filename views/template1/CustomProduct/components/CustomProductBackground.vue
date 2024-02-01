<template>
    <div>
        <h3 class="text-[16px] font-medium YaleSolisW-Bd mb-[20px]">場景</h3>
        <ul class="flex">
            <li
                @click="currentTabData = tab.id"
                v-for="(tab, index) in tabs.slice(0, 3)"
                class="rounded-[8px] py-[16px] px-[24px] mr-[12px] cursor-pointer"
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
                @click="currentTabData = tab.id"
                v-for="(tab, index) in tabs.slice(3, 5)"
                class="rounded-[8px] py-[16px] px-[24px] mr-[12px] cursor-pointer"
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
/**
 * CustomProductGetSceneInterface 場景列表
 */

import { CustomProductGetSceneInterface } from "~/interface/customProduct";
/**
 * 訂製門扇方法
 */
import { useCustomProdutHook } from "../hooks/CustomProductHook";

const customProdutHook = useCustomProdutHook();

const emit = defineEmits(["update:currentBgId", "update:currentBgData"]);

const props = defineProps({
    currentTab: {
        tyep: [String, Number],
        default: 1,
    },
});

const tabs = ref([
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
]);

const currentTabData = ref(props.currentTab);

watch(
    () => currentTabData.value,
    (val) => {
        emit("update:currentBgId", val);
        emit(
            "update:currentBgData",
            tabs.value.find((item) => item.id === val)
        );
    }
);

async function init() {
    tabs.value = [];
    await customProdutHook.getCustomProductSceneList();
    customProdutHook.scenes.value.forEach((item: CustomProductGetSceneInterface) => {
        tabs.value.push({
            id: item.id,
            text: item.name,
            icon: item.icon,
            front: item.front_image,
            backend: item.back_image,
            half: item.half_image,
        });
    });
}
await init();

onMounted(() => {
    emit("update:currentBgId", props.currentTab);
    emit(
        "update:currentBgData",
        tabs.value.find((item) => item.id === props.currentTab)
    );
});
</script>
