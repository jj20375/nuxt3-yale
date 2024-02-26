<template>
    <el-dialog
        class="custom-dialog h-[600px]"
        close-on-click-modal
        lock-scroll
        show-close
        center
        align-center
        append-to-body
        v-model="showDialog"
        :before-close="closeDialog"
        :show-close="false"
    >
        <h2 class="text-gray-800 font-bold text-[24px] mb-4">商品詳情</h2>
        <div class="product-card p-5 border-gray-200 border-[1px] rounded-[8px]">
            <h5 class="text-[18px] font-bold text-gray-800 mb-4">門扇</h5>
            <div class="flex gap-5">
                <div class="flex-1">
                    <div class="grid gap-2 text-gray-700">
                        <div class="w-[80px]">{{ products.doorGroup.types.category1.label }}</div>
                        <div>{{ products.doorGroup.types.category1.value ? "是" : "否" }}</div>
                        <div class="w-[80px]">場景</div>
                        <div>{{ products.name }}</div>
                        <div class="w-[80px]">款式</div>
                        <div class="flex flex-col gap-1">
                            <div>{{ products.doorGroup.door.title }}</div>
                            <div>{{ products.doorGroup.door.style }}</div>
                        </div>
                        <div class="w-[80px]">顏色</div>
                        <div>{{ products.doorGroup.door.color.text }}</div>
                        <div class="w-[80px]">尺寸</div>
                        <div class="flex flex-col gap-1">
                            <div>門高: {{ products.doorGroup.size["height"] }}</div>
                            <div>門寬: {{ products.doorGroup.size["width"] }}</div>
                            <div>門厚: {{ products.doorGroup.size["bold"] }}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <NuxtImg
                        class="w-[200px] aspect-square object-cover h-fit"
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

<style lang="scss" scoped>
.product-card {
    .grid {
        grid-template-columns: 100px 1fr;
    }
}
</style>
