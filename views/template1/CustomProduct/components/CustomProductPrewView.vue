<template>
    <div ref="customProductPreviewRefDom">
        <template v-for="(item, index) in ['front', 'backend', 'half']" :key="index">
            <div
                v-show="item === currentViewAngleData"
                class="absolute object-cover w-full h-full"
            >
                <NuxtImg
                    v-if="currentBgData && currentBgData[item]"
                    class="absolute object-cover w-full h-full"
                    :src="currentBgData[item]"
                />
                <div
                    v-if="productData.door && productData.door[item]"
                    class="absolute z-10 w-full h-full"
                >
                    <NuxtImg
                        class="relative object-cover w-full h-full"
                        :src="productData.door[item]"
                    />
                </div>
                <div
                    v-if="productData.doorOut && productData.doorOut[item]"
                    class="absolute w-full h-full"
                >
                    <NuxtImg
                        class="object-cover w-full h-full"
                        :src="productData.doorOut[item]"
                    />
                </div>
                <div
                    v-if="productData.lock && productData.door[item] && productData.lock[item]"
                    class="absolute z-20 w-full h-full"
                >
                    <NuxtImg
                        class="object-cover w-full h-full"
                        :src="productData.lock[item]"
                    />
                </div>
                <div
                    class="absolute z-20 w-full h-full"
                    v-if="productData.tool1Data && productData.tool1Data[item]"
                >
                    <NuxtImg
                        class="object-cover w-full h-full"
                        :src="productData.tool1Data[item]"
                    />
                </div>
                <div
                    class="absolute z-20 w-full h-full"
                    v-if="productData.other3Data && productData.other3Data[item]"
                >
                    <NuxtImg
                        class="object-cover w-full h-full"
                        :src="productData.other3Data[item]"
                    />
                </div>
            </div>
        </template>
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

<style lang="scss" scoped>
// 因為圖片本身上下距不一樣，所以用css調整距離
.object-cover {
    object-position: 50% 38%;
}
</style>
