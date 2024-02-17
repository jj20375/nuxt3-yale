<template>
    <el-dialog
        id="addToCarDialog"
        v-model="showDialog2"
        class="custom-dialog h-[500px]"
        close-on-click-modal
        lock-scroll
        show-close
        center
        align-center
        append-to-body
    >
        <div class="w-full">
            <h3 class="text-center mb-[30px] text-[24px] YaleSolisW-Bd text-gray-800 font-medium">常用聯繫人</h3>
            <el-radio-group
                v-model="defaultContactUserIdData"
                @change="setDefaultContactUser"
                class="w-full"
            >
                <table class="min-w-full">
                    <thead class="bg-gray-100">
                        <tr class="px-5">
                            <th
                                class="text-[14px] font-medium YaleSolisW-Bd px-[10px] py-[10px] text-left text-gray-800"
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
                                class="YaleSolisW-Bd text-[16px] font-bold text-gray-800 px-[10px] py-[10px]"
                                v-if="contact.default"
                            >
                                預設
                            </td>
                            <td
                                v-else
                                class="text-gray-800 px-[10px] py-[10px]"
                            ></td>
                            <td class="text-[16px] px-[10px] py-[10px] text-gray-800">{{ contact.name }}</td>
                            <td class="text-[16px] px-[10px] py-[10px] text-gray-800">{{ contact.phone }}</td>
                            <td class="text-[16px] px-[10px] py-[10px] text-gray-800 w-[300px]">{{ contact.address }}</td>
                            <td class="px-[10px] py-[10px]">
                                <el-radio
                                    :label="contact.id"
                                    size="large"
                                ></el-radio>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </el-radio-group>
            <div class="mt-[40px] flex justify-center gap-4 mt-6">
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
const emit = defineEmits(["update:showDialog", "update:defaultContactUserId"]);
const props = defineProps({
    // 顯示彈窗
    showDialog: {
        type: Boolean,
        default: false,
    },
    // 預設聯絡人
    defaultContactUserId: {
        type: Number,
        default: null,
    },
    // 聯絡人
    contactUsers: {
        type: Array,
        default() {
            return [{}];
        },
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

const columns = {
    index: null,
    name: "聯絡人",
    phone: "聯絡電話",
    address: "收件地址",
    radio: null,
};

// 預設聯絡人 id
const defaultContactUserIdData = ref<number>(props.defaultContactUserId);

/**
 * 當預設聯絡人 id 變更時
 * @param id
 */
function setDefaultContactUser(id) {
    defaultContactUserIdData.value = id;
}

/**
 * 關閉彈窗事件
 */
function closeDialog() {
    showDialog2.value = false;
    emit("update:showDialog", false);
}

/**
 * 確認關閉彈窗事件
 */
function closeDialogByConfirm() {
    showDialog2.value = false;
    emit("update:showDialog", false);
    emit("update:defaultContactUserId", defaultContactUserIdData.value);
}

function init() {}
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
