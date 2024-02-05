<template>
    <div>
        <h3 class="text-[16px] font-medium YaleSolisW-Bd mb-[20px]">方案</h3>
        <ul class="grid grid-cols-3 gap-[12px]">
            <li
                @click="currentPlanData = tab.id"
                v-for="(tab, index) in tabs"
                class="rounded-[8px] py-[16px] px-[24px] border border-gray-300 cursor-pointer"
                :class="currentPlanData == tab.id ? 'outline outline-2 outline-yellow-600 -outline-offset-2' : ''"
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
        text: " 標準款",
    },
    {
        id: "id2",
        text: "日風經典款",
    },
    {
        id: "id3",
        text: "歐風奢華款",
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
