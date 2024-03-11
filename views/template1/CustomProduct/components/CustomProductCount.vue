<template>
    <div class="flex items-stretch justify-center w-full border border-gray-300 rounded-full">
        <button
            class="w-[60px] flex items-center justify-center cursor-pointer h-auto"
            @click.prevent="countDelete()"
        >
            <el-icon><Minus /></el-icon>
        </button>
        <div class="flex-1 flex items-center justify-center py-[10px] h-full">{{ count }}</div>
        <button
            class="w-[60px] flex items-center justify-center cursor-pointer h-auto disabled:cursor-not-allowed"
            :disabled="count >= limit"
            @click.prevent="countAdd()"
        >
            <el-icon><Plus /></el-icon>
        </button>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:count"]);

const props = defineProps({
    // 數量上限
    limit: {
        type: Number,
        default: 1,
    },
});

// 數量
const count = ref(1);

/**
 * 點擊刪除數量按鈕
 */
function countDelete() {
    if (count.value <= 1) {
        count.value = 1;
        return;
    }
    count.value--;
}
/**
 * 點擊增加數量按鈕
 */
function countAdd() {
    if (count.value > props.limit) {
        return (count.value = props.limit);
    }
    count.value++;
}

watch(
    () => count.value,
    (val) => {
        emit("update:count", val);
    }
);
</script>
