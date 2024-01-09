<template>
    <div class="flex justify-center items-center w-full border border-gray-300 px-[2px] py-[10px] rounded-full">
        <div
            class="ml-5 cursor-pointer"
            @click="countDelete()"
        >
            <el-icon><Minus /></el-icon>
        </div>
        <div class="flex-1 h-[28px] text-center">{{ count }}</div>
        <div
            class="mr-5 cursor-pointer"
            @click="countAdd()"
        >
            <el-icon><Plus /></el-icon>
        </div>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:count"]);

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
    count.value++;
}

watch(
    () => count.value,
    (val) => {
        emit("update:count", val);
    }
);
</script>
