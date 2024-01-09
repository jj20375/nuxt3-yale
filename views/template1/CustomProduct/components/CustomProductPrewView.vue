<template>
    <div class="flex-1">
        <div class="bg-gray-50 h-[400px]"></div>
        <ul class="flex justify-center mt-[12px]">
            <li
                @click="currentViewAngleData = angle.value"
                class="rounded-full px-[20px] py-[8px] text-white cursor-pointer"
                :class="[currentViewAngleData === angle.value ? 'bg-gray-800' : 'bg-gray-300', index !== viewAngle.length - 1 ? 'mr-[12px]' : '']"
                v-for="(angle, index) in viewAngle"
                :key="angle.value"
            >
                {{ angle.text }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:currentAngle"]);

const props = defineProps({
    currentAngle: {
        type: String,
        default: "front",
    },
});

const viewAngle = ref([
    {
        text: "正面",
        value: "front",
    },
    {
        text: "背面",
        value: "backend",
    },
    {
        text: "半開",
        value: "half",
    },
]);

const currentViewAngleData = ref(props.currentAngle);

watch(
    () => currentViewAngleData.value,
    (val) => {
        emit("update:currentAngle", val);
    }
);
</script>
