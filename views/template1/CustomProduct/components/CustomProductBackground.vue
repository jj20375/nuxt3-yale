<template>
    <div>
        <h3 class="text-[16px] font-medium YaleSolisW-Bd mb-[20px]">用途<span class="text-red-500 ms-1">*</span></h3>
        <ul class="grid grid-cols-2 sm:grid-cols-3 gap-[12px]">
            <li
                @click="currentTabId = tab.id"
                v-for="(tab, index) in tabDatas"
                class="rounded-[8px] py-[16px] px-[24px] border border-gray-300 cursor-pointer"
                :class="currentTabId == tab.id ? 'shadow-[inset_0_0_0_1px_rgb(255,204,0)] border-yellow-600' : ''"
            >
                <div class="flex items-center">
                    <div
                        v-if="tab.icon"
                        class="mr-[12px]"
                    >
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

const router = useRouter();
const emit = defineEmits(["update:currentBgId", "update:currentBgData"]);

const props = defineProps({
    currentBgId: {
        type: [String, Number],
        default: 1,
    },
    // 當前角度
    currentAngle: {
        type: String,
        default: "front",
    },
    tabs: {
        type: Array,
        default() {
            return [];
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
        router.push({ name: "custom-product-slug", params: { slug: val }, query: { angle: props.currentAngle } });
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
