<template>
    <client-only>
        <!-- <el-drawer
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
        </el-drawer> -->
        <el-dialog
            id="loginDialog"
            class="no-padding-dialog"
            close-on-click-modal
            lock-scroll
            width="500"
            :show-close="false"
            center
            align-center
            append-to-body
            destroy-on-close
            v-model="showDialogData"
            :before-close="closeDialog"
        >
            <template #header="{ close, titleId, titleClass }"></template>
            <LoginIndex
                :customClass="'!p-0'"
                :isDialog="true"
                @onCloseDialog="closeDialog"
            />
        </el-dialog>
    </client-only>
</template>

<script setup>
import LoginIndex from "~/views/template1/Auth/Login/LoginIndex.vue";
const { isMobile, isLargePad } = useWindowResize();
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
}
</style>
