<template>
    <el-dialog
        v-model="showDialog2"
        :before-close="closeDialog"
        class="custom-dialog"
        width="400"
        close-on-click-modal
        lock-scroll
        show-close
        center
        align-center
        append-to-body
    >
        <h2 class="text-gray-800 text-center font-bold text-[24px] mb-4">同意支付尾款</h2>
        <el-form
            class="custom-form"
            ref="formRefDom"
            :model="form"
            :rules="rules"
            require-asterisk-position="right"
        >
            <el-form-item
                class="!mb-0"
                prop="agree">
                <el-checkbox
                    v-model="form.agree"
                    size="large"
                    class="text-gray-800"
                >
                    <slot name="label"
                    ><span class="text-[16px] font-normal text-gray-800">我已閱讀丈量後更新的訂單資訊，並同意支付剩餘尾款金額</span>
                    </slot>
                </el-checkbox>
            </el-form-item>
        </el-form>
        <div class="flex justify-center mt-8">
            <button
                @click.prevent="submit"
                :disabled="!form.agree"
                :class="!form.agree ? 'disabled' : ''"
                class="disabled yellow-btn btn-sm"
            >
                同意
            </button>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:showDialog", "orderRepay"]);
const props = defineProps({
    // 顯示彈窗
    showDialog: {
        type: Boolean,
        default: false
    }
});

// 判斷是否顯示彈窗
const showDialog2 = ref(props.showDialog);
const form = ref({
    agree: false
})

const rules = ref<any>({
    agree: [
        {
            required: true,
            message: "請勾選同意",
            trigger: ["change", "blur"],
        }
    ],
});

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

function submit () {
    emit("orderRepay");
}

function init() {
}
</script>
