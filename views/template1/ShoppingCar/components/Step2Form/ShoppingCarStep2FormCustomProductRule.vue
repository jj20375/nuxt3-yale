<template>
    <el-dialog
        id="addToCarDialog"
        v-model="showDialog2"
        width="auto"
        :show-close="false"
        :align-center="true"
        :before-close="closeDialog"
        style="border-radius: 24px"
        appen-to-body
    >
        <div class="text-right">
            <button @click="closeDialog">
                <el-icon :size="30"><Close /></el-icon>
            </button>
        </div>
        <div class="flex justify-center px-10">
            <div>
                <h3 class="text-center mb-[30px] text-[24px] YaleSolisW-Bd text-gray-800 font-medium">定型化契約</h3>
                <div
                    class="max-w-[500px]"
                    v-html="customRuleData"
                ></div>
            </div>
        </div>
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
:deep .el-radio__input.is-checked .el-radio__inner {
    @apply bg-yellow-600 border-yellow-600 #{!important};
}
</style>
