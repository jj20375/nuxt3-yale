<template>
    <div class="mt-[88px]">
        <h5 class="bg-gray-50 py-[8px] pl-[16px] w-full mb-[30px]">聯繫人</h5>
        <div class="flex items-center mb-[30px]">
            <div class="mr-[30px]">
                <el-checkbox
                    v-model="formData.chooseDefaultContactUser"
                    @change="onChooseDefaultContactUser"
                    :label="'預設聯繫人'"
                    size="large"
                />
            </div>
            <div
                @click="showDialog = true"
                class="underline text-[15px] text-gray-800 cursor-pointer"
            >
                選擇其他聯繫人
            </div>
        </div>
        <el-form>
            <div class="grid grid-cols-2 gap-[30px]">
                <div
                    v-for="(column, key) in columns"
                    :key="key"
                >
                    <el-form-item :prop="key">
                        <label class="block w-full text-gray-800 text-[15px]"
                            >{{ column.label
                            }}<span
                                v-if="column.required"
                                class="ml-1 text-red-500"
                                >*</span
                            ></label
                        >
                        <div
                            v-if="column.type === 'input'"
                            class="w-full"
                        >
                            <el-input
                                class="w-full"
                                v-model="formData[key]"
                            ></el-input>
                        </div>
                        <div
                            v-else-if="column.type === 'select'"
                            class="w-full"
                        >
                            <el-select
                                class="w-full"
                                v-model="formData[key]"
                                :placeholder="column.placeholder"
                            >
                                <el-option
                                    v-for="option in 10"
                                    :key="option"
                                    :label="'下拉-' + option"
                                    :value="option"
                                ></el-option>
                            </el-select>
                        </div>
                    </el-form-item>
                </div>
            </div>
            <el-form-item prop="address">
                <label class="block w-full text-gray-800 text-[15px]">
                    地址
                    <span class="ml-1 text-red-500">*</span>
                </label>
                <el-input
                    v-model="formData.address"
                    placeholder="請輸入完整地址"
                ></el-input>
            </el-form-item>
            <el-form-item
                prop="saveContctUser"
                class="mt-[20px]"
            >
                <el-checkbox
                    v-model="formData.saveContctUser"
                    :label="'加入常用聯絡人'"
                    size="large"
                />
            </el-form-item>
        </el-form>
        <ContactUsersDialog
            v-model:showDialog="showDialog"
            v-model:defaultContactUserId="defaultContactUserId"
            :contactUsers="contactUsers"
        />
    </div>
</template>

<script setup lang="ts">
// 選擇其他聯繫人
import ContactUsersDialog from "~/views/template1/ShoppingCar/components/Step2Form/ShoppingCarStep2FormContactUserDialog.vue";

const emit = defineEmits(["update:form"]);

const props = defineProps({
    form: {
        type: Object,
        default() {
            return {
                name: "王小明",
                phone: "0911123123",
                // 縣市
                city: null,
                // 地區
                area: null,
                // 地址
                address: null,
                // 加入常用聯絡人
                saveContctUser: false,
                // 選擇預設聯繫人
                chooseDefaultContactUser: false,
            };
        },
    },
});

const columns = ref({
    name: {
        label: "聯繫人姓名",
        required: true,
        type: "input",
    },
    phone: {
        label: "聯繫人電話",
        required: true,
        type: "input",
    },
    city: {
        label: "縣市",
        required: true,
        type: "select",
        placeholder: "請選擇",
    },
    area: {
        label: "地區",
        required: true,
        type: "select",
        placeholder: "請選擇",
    },
});

const formData = ref(props.form);

watch(formData.value, (val) => {
    console.log("work update form => ", val);
    emit("update:form", val);
});

// 選擇其他連係人彈窗顯示
const showDialog = ref(false);

// 聯絡人資料
const contactUsers = ref([]);

// 預設聯絡人 id
const defaultContactUserId = ref(1);

for (let i = 1; i < 5; i++) {
    contactUsers.value.push({
        id: i,
        default: i === 1 ? true : false,
        name: "王阿姨-" + i,
        phone: "0933123123",
        city: "台南",
        area: "永康",
        address: "701 台南市東區東寧路429號2樓-2",
    });
}

/**
 * 選擇預設聯絡人事件
 */
function onChooseDefaultContactUser(val) {
    if (val) {
        formData.value.chooseDefaultContactUser = true;
        emit("update:form", formData.value);
        // 找尋預設選擇聯絡人
        setContactUserData();
    } else {
        formData.value.name = "王小明";
        formData.value.phone = "0911123123";
        formData.value.city = null;
        formData.value.area = null;
        formData.value.address = null;
        defaultContactUserId.value = null;
    }
}

/**
 * 設定預設聯絡人資料
 */
function setContactUserData() {
    let findDefaultContactUserIndex = contactUsers.value.findIndex((item: any) => item.default === true);
    if (findDefaultContactUserIndex !== -1) {
        defaultContactUserId.value = contactUsers.value[findDefaultContactUserIndex].id;
        formData.value.name = contactUsers.value[findDefaultContactUserIndex].name;
        formData.value.phone = contactUsers.value[findDefaultContactUserIndex].phone;
        formData.value.city = contactUsers.value[findDefaultContactUserIndex].city;
        formData.value.area = contactUsers.value[findDefaultContactUserIndex].area;
        formData.value.address = contactUsers.value[findDefaultContactUserIndex].address;
    }
}

// 當預設聯絡人有變更時 觸發
watch(
    () => defaultContactUserId.value,
    (val) => {
        // 舊的預設聯絡人資料  id
        const findDefaultContactUserIndex = contactUsers.value.findIndex((item: any) => item.default === true);
        if (findDefaultContactUserIndex !== -1) {
            contactUsers.value[findDefaultContactUserIndex].default = false;
        }
        // 新的預設聯絡人 id
        const newDefaultContactUserId = contactUsers.value.findIndex((item: any) => item.id === val);
        if (newDefaultContactUserId !== -1) {
            contactUsers.value[newDefaultContactUserId].default = true;
        }
        onChooseDefaultContactUser(val);
    }
);
</script>

<style lang="scss" scoped>
:deep .el-input__wrapper {
    @apply shadow-none border-b border-gray-200 mx-0 rounded-none #{!important};
}
:deep .el-select {
    .el-input__wrapper {
        @apply mx-0;
    }
}
:deep .el-textarea__inner {
    @apply rounded-none;
}

:deep .el-radio__label {
    @apply hidden;
}
</style>
