<template>
    <div>
        <h3 class="text-[16px] font-medium YaleSolisW-Bd mb-[20px]">方案<span class="text-red-500 ms-1">*</span></h3>
        <ul class="grid grid-cols-2 sm:grid-cols-3 gap-[12px]">
            <li
                @click="currentPlanIdData = tab.id"
                v-for="(tab, index) in tabs"
                class="relative rounded-[8px] py-[16px] px-[24px] border border-gray-300 cursor-pointer overflow-hidden z-[0]"
                :class="currentPlanIdData == tab.id ? 'shadow-[inset_0_0_0_1px_rgb(255,204,0)] border-yellow-600' : ''"
            >
                <div class="flex items-center justify-center">
                    <div
                        class="text-[14px]"
                        :class="currentPlanIdData == tab.id ? 'YaleSolisW-Bd font-medium' : ''"
                    >
                        {{ tab.name }}
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(["onChangeCurrentPlanId"]);

const props = defineProps({
    currentPlanId: {
        tyep: [String, Number],
        default: "id1",
    },
    tabs: {
        type: Array,
        default() {
            return [];
        },
    },
});

const currentPlanIdData = ref(props.currentPlanId);

watch(
    () => currentPlanIdData.value,
    (val) => {
        emit("onChangeCurrentPlanId", val);
    }
);
</script>
