<template>
    <el-dialog
        id="addToCarDialog"
        v-model="showDialog2"
        :before-close="closeDialog"
        class="custom-dialog h-5/6"
        width="1280"
        close-on-click-modal
        destroy-on-close
        lock-scroll
        show-close
        center
        align-center
        append-to-body
    >
        <h2 class="text-gray-800 text-center font-bold text-[24px] mb-4">{{title}}</h2>
        <div
            v-html="customRuleData"
        ></div>
    </el-dialog>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:showDialog"]);
const props = defineProps({
    // 顯示彈窗
    showDialog: {
        type: Boolean,
        default: false,
    },
    // 定型化契約資料
    title: {
        type: String,
        default: "",
    },
    // 定型化契約資料
    customRuleData: {
        type: String,
        default: "",
    },
});

// 判斷是否顯示彈窗
const showDialog2 = ref(props.showDialog);

watch(
    () => props.showDialog,
    (val) => {
        showDialog2.value = val;
    }
);

/**
 * 關閉彈窗事件
 */
function closeDialog() {
    showDialog2.value = false;
    emit("update:showDialog", false);
}

function init() {}
</script>

<style lang="scss" scoped>
:deep(.el-radio__input.is-checked .el-radio__inner) {
    @apply bg-yellow-600 border-yellow-600 #{!important};
}
</style>
