<template>
    <el-dialog
        id="addToCarDialog"
        v-model="showDialog2"
        width="auto"
        :show-close="true"
        :align-center="true"
        :before-close="closeDialog"
        style="border-radius: 24px"
        appen-to-body
    >
        <div class="flex justify-center px-10">
            <div>
                <h3 class="text-center mb-[30px] text-[24px] YaleSolisW-Bd text-gray-800 font-medium">常用聯絡人</h3>
                <el-radio-group
                    v-model="defaultContactUserIdData"
                    @change="setDefaultContactUser"
                    class="ml-4"
                >
                    <table>
                        <thead class="bg-gray-100">
                            <tr class="px-5">
                                <th
                                    class="text-[14px] font-medium YaleSolisW-Bd h-[30px] py-[4px] text-left text-gray-800"
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
                                class="px-5 border-b border-gray-200"
                            >
                                <td
                                    class="YaleSolisW-Bd text-[16px] pr-[20px] font-bold text-gray-800 pl-5 py-[24px]"
                                    v-if="contact.default"
                                >
                                    預設
                                </td>
                                <td
                                    v-else
                                    class="pr-[20px] text-gray-800 py-[24px]"
                                ></td>
                                <td class="text-[16px] pr-[20px] text-gray-800">{{ contact.name }}</td>
                                <td class="text-[16px] pr-[20px] text-gray-800">{{ contact.phone }}</td>
                                <td class="text-[16px] whitespace-nowrap pr-[20px] text-gray-800 min-w-[300px]">{{ contact.address }}</td>
                                <td class="pr-5">
                                    <el-radio
                                        :label="contact.id"
                                        size="large"
                                    ></el-radio>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </el-radio-group>
                <div class="mt-[40px] mb-[60px] flex justify-center">
                    <div class="mr-[12px]">
                        <button
                            @click="closeDialog"
                            class="border border-gray-800 text-gray-800 rounded-full w-[140px] py-[11px] hover:bg-black hover:text-white duration-500 transition-all"
                        >
                            返回
                        </button>
                    </div>
                    <div>
                        <button
                            @click="closeDialog"
                            class="border border-yellow-600 bg-yellow-600 text-gray-800 rounded-full w-[140px] py-[11px] hover:bg-yellow-700 duration-500 transition-all"
                        >
                            確認
                        </button>
                    </div>
                </div>
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

function closeDialog() {
    showDialog2.value = false;
    emit("update:showDialog", false);
    emit("update:defaultContactUserId", defaultContactUserIdData.value);
}

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

// 設定預設聯絡人
function setDefaultContactUser(val) {
    defaultContactUserIdData.value = val;
}

function init() {}
</script>

<style lang="scss" scoped>
:deep .el-radio__input.is-checked .el-radio__inner {
    @apply bg-yellow-600 border-yellow-600 #{!important};
}
</style>
