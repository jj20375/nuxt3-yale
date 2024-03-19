<template>
    <client-only>
        <el-drawer
            id="loginDialog"
            v-model="showDialogData"
            :with-header="false"
            destroy-on-close
            append-to-body
            size="80%"
            custom-class="p-0 rounded-t-2xl"
            :direction="'btt'"
            :before-close="closeDialog"
        >
            <LoginIndex
                :customClass="''"
                :isNeedPageRouter="false"
                @onCloseDialog="closeDialog"
            />
        </el-drawer>
        <!-- <el-dialog
            id="loginDialog"
            close-on-click-modal
            lock-scroll
            show-close
            center
            align-center
            fullscreen
            append-to-body
            v-model="showDialogData"
            :before-close="closeDialog"
        >
            <template #header="{ close, titleId, titleClass }"></template>
            <LoginIndex :customClass="''" />
        </el-dialog> -->
    </client-only>
</template>

<script setup>
import LoginIndex from "~/views/template1/Auth/Login/LoginIndex.vue";

const emit = defineEmits(["onCloseDialog"]);

const props = defineProps({
    showDialog: {
        type: Boolean,
        default: false,
    },
});

const showDialogData = ref(props.showDialog);

function closeDialog() {
    showDialogData.value = false;
    emit("onCloseDialog", false);
}

watch(
    () => props.showDialog,
    (val) => {
        showDialogData.value = val;
    }
);
</script>

<style lang="scss">
#loginDialog {
    .el-dialog__header {
        @apply p-0 #{!important};
    }
}
</style>
