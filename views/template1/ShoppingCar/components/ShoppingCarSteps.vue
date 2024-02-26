<template>
    <div class="relative">
        <ul class="flex justify-center text-center mt-[48px] sm:mt-[60px]">
            <li
                v-for="(item, key) in steps"
                :key="key"
                class="flex-1"
            >
                <div
                    class="w-[36px] h-[36px] border rounded-full text-center flex items-center justify-center mx-auto"
                    :class="currentStep == key ? 'border-gray-800 text-white bg-gray-800' : 'border-gray-400 text-gray-400 bg-white'"
                >
                    {{ item.step }}
                </div>
                <div
                    class="mt-[12px]"
                    :class="currentStep == key ? 'YaleSolisW-Bd font-medium' : 'text-gray-400 font-normal'"
                >
                    {{ item.text }}
                </div>
            </li>
        </ul>
        <div class="absolute w-full sm:w-[420px] z-[-1] top-[18px] flex justify-center h-[72px]">
            <div class="w-[60%] sm:w-[300px] bg-gray-300 h-[1px] mx-auto"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:step"]);

const props = defineProps({
    step: {
        type: [Number, String],
        default: 0,
    },
});

const steps = ref({
    0: {
        text: "確認購物車",
        step: 1,
    },
    1: {
        text: "填寫資料",
        step: 2,
    },
    2: {
        text: "完成訂購",
        step: 3,
    },
});

const currentStep = ref(props.step);

/**
 * 更換狀態
 * @param {type Nubmer or String(數字或字串)} key step 值
 */
function changeStep(key: string | number) {
    currentStep.value = key;
    emit("update:step", key);
}

watch(
    () => props.step,
    (val) => {
        currentStep.value = val;
    }
);
</script>
