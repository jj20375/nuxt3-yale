<template>
    <div>
        <h3 class="text-[16px] font-medium YaleSolisW-Bd mb-[20px]">方案</h3>
        <ul class="flex">
            <li
                @click="currentPlanData = tab.id"
                v-for="(tab, index) in tabs.slice(0, 3)"
                class="rounded-[8px] py-[16px] px-[24px] mr-[12px] cursor-pointer"
                :class="currentPlanData == tab.id ? 'border-2 border-yellow-600' : 'border border-gray-300'"
            >
                <div class="flex items-center">
                    <div class="text-[14px] YaleSolisW-Bd font-medium">{{ tab.text }}</div>
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
