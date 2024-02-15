<!-- components/ConfirmBox.vue -->
<template>
    <el-dialog
        class="custom-dialog"
        close-on-click-modal
        lock-scroll
        show-close
        :width="400"
        center
        align-center
        append-to-body
        v-model="visible"
        :before-close="handleClose"
    >
        <h3 class="text-center text-gray-800 font-bold text-[24px] mb-4">{{title}}</h3>
        <div class="text-center text-gray-800 text-[20px]">{{message}}</div>
        <div class="flex justify-center gap-4 mt-6">
            <button
                class="transparent-btn btn-sm"
                @click="handleCancel"
            >
                {{cancelTxt}}
            </button>
            <button
                class="yellow-btn btn-sm"
                @click="handleConfirm"
            >
                {{confirmTXT}}
            </button>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

export interface Props {
    title?: string
    message?: string
    cancelTxt?: string
    confirmTXT?: string
    dialogVisible?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    title: '',
    message: '',
    cancelTxt: '否',
    confirmTXT: '是',
    dialogVisible: false,
})
const emits = defineEmits(["handleConfirm", "handleCancel"]);

const visible = ref(false);

watch(() => props.dialogVisible, (val) => {
    visible.value = val;
})

const handleConfirm = () => {
    emits("handleConfirm");
};

const handleCancel = () => {
    emits("handleCancel");
};
</script>
