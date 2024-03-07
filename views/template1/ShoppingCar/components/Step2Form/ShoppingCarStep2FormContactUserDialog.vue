<template>
    <el-dialog
        id="addToCarDialog"
        v-model="showDialog"
        :before-close="closeDialog"
        class="custom-dialog"
        close-on-click-modal
        lock-scroll
        show-close
        center
        :width="800"
        align-center
        append-to-body
    >
        <div class="w-full">
            <h3 class="text-center mb-[30px] text-[24px] YaleSolisW-Bd text-gray-800 font-medium">常用聯繫人</h3>
            <el-radio-group
                v-model="selectID"
                @change="setSelectContactUser"
                class="w-full"
            >
                <table class="min-w-full">
                    <thead class="bg-gray-100">
                        <tr class="px-5">
                            <th
                                class="text-[14px] font-medium YaleSolisW-Bd px-[4px] sm:px-[10px] py-[4px] sm:py-[10px] text-left text-gray-800"
                                v-for="(column, key) in columns"
                                :key="key"
                            >
                                {{ column }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(contact, index) in contactUsers"
                            :key="index"
                            class="border-b border-gray-200"
                        >
                            <td
                                class="YaleSolisW-Bd sm:text-[16px] text-[12px] font-bold text-gray-800 px-[4px] sm:px-[10px] py-[4px] sm:py-[10px] min-w-[40px] sm:min-w-[60px]"
                                v-if="contact.is_default"
                            >
                                預設
                            </td>
                            <td
                                v-else
                                class="text-gray-800 px-[10px] py-[10px]"
                            />
                            <td class="sm:text-[16px] text-[12px] px-[4px] sm:px-[10px] py-[4px] sm:py-[10px] text-gray-800 min-w-[50px] sm:min-w-[80px]">{{ contact.name }}</td>
                            <td class="sm:text-[16px] text-[12px] px-[4px] sm:px-[10px] py-[4px] sm:py-[10px] text-gray-800 min-w-[90px] sm:min-w-[120px]">{{ contact.phone }}</td>
                            <td class="sm:text-[16px] text-[12px] px-[4px] sm:px-[10px] py-[4px] sm:py-[10px] text-gray-800">{{ contact.full_address }}</td>
                            <td class="px-[4px] sm:px-[10px] py-[4px] sm:py-[10px] min-w-[30px]">
                                <el-radio
                                    :label="contact.id"
                                    size="large"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </el-radio-group>
            <div class="mt-[40px] flex justify-center gap-4">
                <button
                    @click="closeDialog"
                    class="transparent-btn btn-md"
                >
                    返回
                </button>
                <button
                    @click="closeDialogByConfirm"
                    class="yellow-btn btn-md"
                >
                    確認
                </button>
            </div>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import { ContactUser } from "~/interface/user";
const { isMobile } = useWindowResize();

const props = defineProps<{
    showDialog: boolean;
    selectID: number;
    contactUsers: ContactUser[];
}>();

const emits = defineEmits(["update:showDialog", "updateSelectId"]);

const showDialog = computed({
    get: () => props.showDialog,
    set: (val: boolean) => {
        emits("update:showDialog", val);
    },
});

const selectID = ref(0);

const columns = {
    index: null,
    name: "聯絡人",
    phone: "聯絡電話",
    address: "收件地址",
    radio: null,
};

/**
 * 當預設聯絡人 id 變更時
 * @param id
 */
const setSelectContactUser = (id: number) => {
    selectID.value = id;
};

/**
 * 關閉彈窗事件
 */
const closeDialog = () => {
    showDialog.value = false;
};

/**
 * 確認關閉彈窗事件
 */
const closeDialogByConfirm = () => {
    showDialog.value = false;
    emits("update:showDialog", false);
    emits("updateSelectId", selectID.value);
};

watch(
    () => props.showDialog,
    (val) => {
        if (val) {
            selectID.value = props.selectID;
        }
    }
);
</script>

<style lang="scss" scoped>
:deep .el-radio-group {
    @apply flex flex-col items-start #{!important};
    .el-radio.el-radio--large {
        .el-radio__label {
            @apply hidden font-normal leading-none;
        }
        .el-radio__inner {
            @apply w-[18px] h-[18px];
            &:hover {
                @apply border-yellow-600;
            }
        }
        &.is-checked {
            @apply font-normal #{!important};
            .el-radio__inner {
                @apply border-yellow-600 bg-yellow-600;
            }
        }
    }
}
</style>
