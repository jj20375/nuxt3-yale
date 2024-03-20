<template>
    <div>
        <h3 class="text-[16px] font-medium YaleSolisW-Bd mb-[20px]">方案<span class="text-red-500 ms-1">*</span></h3>
        <ul class="grid grid-cols-2 sm:grid-cols-3 gap-[12px]">
            <li
                @click="currentPlanData = tab.id"
                v-for="(tab, index) in tabs"
                class="relative rounded-[8px] py-[16px] px-[24px] border border-gray-300 cursor-pointer overflow-hidden z-[0]"
                :class="currentPlanData == tab.id ? 'shadow-[inset_0_0_0_1px_rgb(255,204,0)] border-yellow-600' : ''"
            >
                <div class="flex items-center justify-center">
                    <div class="text-[14px]" :class="currentPlanData == tab.id ? 'YaleSolisW-Bd font-medium' : ''">{{ tab.text }}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(["update:currentPlan"]);

const props = defineProps({
    currentPlan: {
        tyep: [String, Number],
        default: "id1",
    },
});

const tabs = ref([
    {
        id: "id1",
        text: "標準款",
    },
    {
        id: "id2",
        text: "經典款",
    },
    {
        id: "id3",
        text: "奢華款",
    },
]);

const currentPlanData = ref(props.currentPlan);

watch(
    () => currentPlanData.value,
    (val) => {
        emit("update:currentPlan", val);
    }
);
</script>
