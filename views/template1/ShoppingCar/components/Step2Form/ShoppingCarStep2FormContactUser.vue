<template>
    <div class="mt-[60px]">
        <h5 class="bg-gray-50 py-[8px] font-medium pl-[16px] w-full mb-[30px]">聯繫人</h5>
        <div class="flex items-center gap-[30px] mb-[30px]">
            <el-checkbox
                class="relative"
                v-model="formData.chooseDefaultContactUser"
                @change="onChooseDefaultContactUser"
                :label="'預設聯繫人'"
                size="large"
            />
            <div
                @click="showDialog = true"
                class="relative underline underline-offset-2 text-[15px] text-blue-500 cursor-pointer"
            >
                選擇其他聯繫人
            </div>
        </div>
        <el-form
            class="custom-form"
            ref="formRefDom"
            :model="formData"
            :rules="rules"
            require-asterisk-position="right"
        >
            <div class="grid grid-cols-2 gap-6">
                <div
                    v-for="(column, key) in columns"
                    :key="key"
                >
                    <el-form-item
                        :prop="key"
                        :label="column.label"
                    >
                        <div
                            v-if="column.type === 'input'"
                            class="w-full"
                        >
                            <el-input
                                class="w-full"
                                v-model="formData[key]"
                            />
                        </div>
                        <div
                            v-else-if="column.type === 'select' && column.options"
                            class="w-full"
                        >
                            <el-select
                                class="w-full"
                                v-model="formData[key]"
                                :placeholder="column.placeholder"
                            >
                                <el-option
                                    v-for="item in column.options"
                                    :key="item.val"
                                    :label="item.label"
                                    :value="item.val"
                                />
                            </el-select>
                        </div>
                    </el-form-item>
                </div>
            </div>
            <el-form-item
                class="mt-6"
                prop="address"
            >
                <label class="block w-full text-gray-800 text-[15px]">
                    地址
                    <span class="ml-1 text-red-500">*</span>
                </label>
                <el-input
                    v-model="formData.address"
                    placeholder="請輸入完整地址"
                />
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
            :selectID="selectID"
            :contactUsers="contactUsers"
            @updateSelectId="setContactUserData"
        />
    </div>
</template>

<script setup lang="ts">
import { FormInstance } from "element-plus";
import { validateTWMobileNumber } from "~/service/validator";
// 選擇其他聯繫人
import { ContactUser } from "~/interface/user";
import ContactUsersDialog from "~/views/template1/ShoppingCar/components/Step2Form/ShoppingCarStep2FormContactUserDialog.vue";

const formRefDom = ref(null);
const emit = defineEmits(["update:form"]);

const { $api } = useNuxtApp();
const { data: ContactList } = await $api().GetMemberContactAPI();
const { data: cityData } = await $api().GetCityAreaAPI();

const props = defineProps({
    form: {
        type: Object,
        default() {
            return {
                name: "",
                phone: "",
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

// 縣市 options
const cityOptions = computed(() => {
    if (cityData.value) {
        return (cityData.value as any).data.map((i: { name: string[] }) => {
            return {
                label: i.name,
                val: i.name,
            };
        });
    }
    return [];
});

// 區域 options
const areaOptions = computed(() => {
    if (cityData.value && formData.value.city) {
        const item = (cityData.value as any).data.find((i) => {
            return i.name === formData.value.city;
        });
        return item.district.map((i: { name: string; zip3: number }) => {
            return {
                label: i.name,
                val: i.name,
                zip: i.zip3,
            };
        });
    }
    return [];
});

interface Columns {
    label: string;
    required: boolean;
    type: string;
    placeholder?: string;
    options?: { label: string; val: any }[];
}

const columns: ComputedRef<Record<string, Columns>> = computed(() => {
    return {
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
            options: cityOptions.value,
        },
        area: {
            label: "地區",
            required: true,
            type: "select",
            placeholder: "請選擇",
            options: areaOptions.value,
        },
    };
});

const rules = ref<any>({
    name: [
        {
            required: true,
            message: "請輸入會員名稱",
            trigger: ["change", "blur"],
        },
    ],
    phone: [
        {
            required: true,
            message: "請輸入聯絡電話",
            trigger: ["change", "blur"],
        },
        {
            required: true,
            validator: validateTWMobileNumber,
            trigger: ["change", "blur"],
            message: "格式不正確",
        },
    ],
    city: [
        {
            required: true,
            message: "請輸入城市",
            trigger: ["change", "blur"],
        },
    ],
    area: [
        {
            required: true,
            message: "請輸入地區",
            trigger: ["change", "blur"],
        },
    ],
    address: [
        {
            required: true,
            message: "請輸入地區",
            trigger: ["change", "blur"],
        },
    ],
});

const formData = ref(props.form);

watch(formData.value, (val) => {
    emit("update:form", val);
});

// 選擇其他連係人彈窗顯示
const showDialog = ref(false);
//  當前選擇之聯絡人
const selectID: Ref<number> = ref(0);

// 聯絡人資料
const contactUsers = computed(() => {
    return (ContactList.value as any).data;
});

// 預設聯絡人 id
const defaultContactUserId = computed(() => {
    const result = contactUsers.value.find((i: ContactUser) => {
        return i.is_default === 1;
    });
    return result.id;
});

/**
 * 選擇預設聯絡人事件
 */
const onChooseDefaultContactUser = async (val: boolean) => {
    if (val) {
        setContactUserData(defaultContactUserId.value);
    }
};

/**
 * 設定聯絡人資料
 */
const setContactUserData = async (id: number) => {
    const { data: detail } = await $api().GetMemberContactDetailAPI({ memberAddressId: id });
    selectID.value = id;
    const user: ContactUser = (detail.value as any).data;
    formData.value.name = user.name;
    formData.value.phone = user.phone;
    formData.value.city = user.city;
    formData.value.area = user.district;
    formData.value.address = user.address;
};

watch(
    () => formData.value.city,
    (val) => {
        console.log("val", val);
        const idx = areaOptions.value.findIndex((i) => formData.value.area === i.val);
        if (idx === -1) {
            formData.value.area = "";
        }
    }
);

const validForm = async () => {
    if (!formRefDom.value) return false;
    const userValid = await formRefDom.value.validate((valid) => {
        if (valid) {
            return true;
        } else {
            return false;
        }
    });
    return userValid;
};

defineExpose({
    validForm,
});
</script>

<style lang="scss" scoped>
:deep .el-checkbox {
    .el-checkbox__label {
        @apply text-gray-800 text-[15px] leading-none font-normal #{!important};
    }
    .el-checkbox__inner {
        @apply h-[18px] #{!important};
        &:hover {
            @apply border-yellow-600;
        }
    }
    .is-checked {
        .el-checkbox__inner {
            @apply bg-yellow-600 border-yellow-600 after:h-[9px] after:left-[6px] after:top-[2px] #{!important};
        }
    }
}
</style>
