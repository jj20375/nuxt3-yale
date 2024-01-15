<template>
    <div class="flex-1">
        <div class="relative flex items-center w-full">
            <NuxtImg
                class="w-full"
                :src="'/img/custom-product/demo/background/custom-product-background-' + backgroundImg + '.jpg'"
            />
            <div class="absolute z-10 w-full">
                <NuxtImg
                    class="w-full"
                    :src="productData.door[currentViewAngleData]"
                />
            </div>
            <div class="absolute w-full">
                <NuxtImg
                    class="w-full"
                    :src="productData.doorOut[currentViewAngleData]"
                />
            </div>
            <div class="absolute z-20 w-full">
                <NuxtImg
                    class="w-full"
                    :src="productData.lock[currentViewAngleData]"
                />
            </div>
        </div>
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
    // 預設選中角度
    currentAngle: {
        type: String,
        default: "front",
    },
    // 客製化商品圖
    productData: {
        type: Object,
        default() {
            return {
                front: {
                    door: "",
                    doorOut: "",
                    lock: "",
                },
                backend: {
                    door: "",
                    doorOut: "",
                    lock: "",
                },
                half: {
                    door: "",
                    doorOut: "",
                    lock: "",
                },
            };
        },
    },
    // 背脊圖切換
    backgroundImg: {
        type: String,
        default: "type1",
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
