<template>
    <div
        ref="customProductPreviewRefDom"
    >
        <div
            v-if="currentBgData[currentViewAngleData]"
            class="absolute h-full w-full object-cover"
        >
            <NuxtImg
                class="absolute h-full w-full object-cover"
                :src="currentBgData[currentViewAngleData]"
            />
            <div class="absolute z-10 h-full w-full">
                <NuxtImg
                    class="relative h-full w-full object-cover"
                    :src="productData.door[currentViewAngleData]"
                />
            </div>
            <div class="absolute h-full w-full">
                <NuxtImg
                    class="w-full h-full object-cover"
                    :src="productData.doorOut[currentViewAngleData]"
                />
            </div>
            <div class="absolute z-20 h-full w-full">
                <NuxtImg
                    class="w-full h-full object-cover"
                    :src="productData.lock[currentViewAngleData]"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:currentAngle", "update:previewWidth"]);

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
    // 選擇背景圖資料
    currentBgData: {
        type: Object,
        default() {
            return {
                id: 1,
                text: "",
                icon: "",
                backgroundImg: "",
            };
        },
    },
});

const currentViewAngleData = ref(props.currentAngle);

watch(
    () => props.currentAngle,
    (val) => {
        currentViewAngleData.value = val;
    }
);

const customProductPreviewRefDom = ref(null);

onMounted(() => {
    nextTick(() => {
        // 計算目前預覽圖範圍寬度 讓下方 fixed 的區塊 可以計算 定位點
        emit("update:previewWidth", customProductPreviewRefDom.value.offsetWidth);
    });
});
</script>
