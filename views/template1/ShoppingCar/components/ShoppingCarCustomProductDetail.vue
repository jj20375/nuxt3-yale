<template>
    <el-dialog
        v-model="showDialog"
        :before-close="closeDialog"
        :show-close="false"
    >
        <div class="text-right">
            <button @click="closeDialog">
                <el-icon :size="30"><Close /></el-icon>
            </button>
        </div>
        <h2 class="text-[24px] text-gray-800 font-medium YaleSolisW-Bd">商品詳情</h2>
        <div class="p-[20px] text-gray-800 border border-gray-300 rounded-[8px]">
            <h5 class="text-[18px] font-medium YaleSolisW-Bd mb-[8px]">門扇</h5>
            <div class="flex">
                <div class="flex-1">
                    <div class="flex mb-[4px]">
                        <div class="w-[80px]">{{ products.doorGloup.types.category1.label }}:</div>
                        <div>{{ products.doorGloup.types.category1.value ? "是" : "否" }}</div>
                    </div>
                    <div class="flex mb-[4px]">
                        <div class="w-[80px]">場景:</div>
                        <div>{{ products.name }}</div>
                    </div>
                    <div class="flex mb-[4px]">
                        <div class="w-[80px]">款式:</div>
                        <div>
                            <div>{{ products.doorGloup.door.title }}</div>
                            <div>{{ products.doorGloup.door.style }}</div>
                        </div>
                    </div>
                    <div class="flex mb-[4px]">
                        <div class="w-[80px]">顏色:</div>
                        <div>{{ products.doorGloup.door.color.text }}</div>
                    </div>
                    <div class="flex mb-[4px]">
                        <div class="w-[80px]">尺寸:</div>
                        <div>
                            <div>門高: {{ products.doorGloup.size["height"] }}</div>
                            <div>門寬: {{ products.doorGloup.size["width"] }}</div>
                            <div>門厚: {{ products.doorGloup.size["bold"] }}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <NuxtImg
                        class="w-[200px]"
                        :src="products.imgSrc"
                    />
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
defineExpose({
    openDialog,
});

const props = defineProps({
    products: {
        type: Object,
        default() {
            return {};
        },
    },
});

const showDialog = ref(false);

function openDialog() {
    showDialog.value = true;
}

function closeDialog() {
    showDialog.value = false;
}
</script>
