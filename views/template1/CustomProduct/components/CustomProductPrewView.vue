<template>
    <div
        class="flex-1"
        ref="customProductPreviewRefDom"
    >
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
        emit("update:previewWidth", customProductPreviewRefDom.value.offsetWidth);
    });
});
</script>
