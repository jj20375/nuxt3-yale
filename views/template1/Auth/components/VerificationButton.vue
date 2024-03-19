<template>
    <button class="yellow-btn btn-lg" @click="restartTimer" :class="{ 'is-disabled': countdownTimer > 0 }">
        {{ countdownTimer > 0 ? `重新發送驗證信 ${countdownTimer} 秒` : "重新發送驗證信" }}
    </button>

</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const countdownTimer = ref(60); // 設置初始倒數時間為 60 秒
let timerId: any; // 用於儲存計時器的 ID
const emit = defineEmits(["resendVerification"]);

const props = defineProps({
    restarter: {
        type: Boolean,
        default() {
            return true;
        },
    },
});


const startTimer = () => {
    timerId = setInterval(() => {
        // 每一秒減少倒數時間
        countdownTimer.value--;

        // 如果倒數計時結束，清除計時器並重設倒數時間為 60 秒
        if (countdownTimer.value === 0) {
            clearInterval(timerId);
            timerId = undefined;
        }
    }, 1000);
};

const restartTimer = () => {
    if (countdownTimer.value === 0) {
        emit("resendVerification");
        // 清除舊的計時器
        if (timerId !== undefined) {
            clearInterval(timerId);
            timerId = undefined;
        }

        countdownTimer.value = 60;
        // 啟動新的計時器
        startTimer();
    }
};

// 在組件被掛載後啟動計時器
onMounted(() => {
    if (props.restarter) {
        startTimer();
    } else {
        countdownTimer.value = 0
    }
});

// 在組件被卸載前清除計時器
onBeforeUnmount(() => {
    if (timerId !== undefined) {
        clearInterval(timerId);
        timerId = undefined;
    }
});
</script>

<style lang="scss" scoped>
.yellow-btn{
    &.is-disabled{
        @apply bg-gray-100 text-gray-700 cursor-not-allowed;
    }
}
</style>