<template>
    <div class="mt-[30px] sm:mt-[60px]">
        <h5 class="bg-gray-50 py-[8px] pl-[16px] font-medium w-full mb-[20px]">付款方式</h5>
        <el-form
            ref="formRefDom"
            class="custom-form"
            :model="formData"
            :rules="rules"
            require-asterisk-position="right"
        >
            <el-form-item :prop="'paymentType'">
                <el-radio-group v-model="formData.paymentType">
                    <el-radio
                        v-for="(option, index) in options"
                        :key="index"
                        :label="option.value"
                        size="large"
                    >
                        {{ option.label }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item
                prop="store"
                v-if="form.paymentType === 'type2'"
            >
                <div class="grid grid-cols-2 gap-[30px] w-full mt-4">
                    <div>
                        <label class="block w-full text-gray-800 text-[15px]">選擇門市/百貨櫃位<span class="ml-1 text-red-500">*</span></label>
                        <el-select
                            class="w-full"
                            v-model="form.store"
                            placeholder="請選擇"
                        >
                            <el-option
                                v-for="(option, index) in offlinePaymentStores"
                                :key="option.id"
                                :label="option.name"
                                :value="option.id"
                            >
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { FormInstance } from "element-plus";

const { $api } = useNuxtApp();
const route = useRoute();
const emit = defineEmits(["update:form"]);
const formRefDom = ref<FormInstance>();

const props = defineProps({
    form: {
        type: Object,
        default() {
            return {
                // 付款方式
                paymentType: "",
            };
        },
    },
});

const formData = ref(props.form);

const rules = ref<any>({
    paymentType: [
        {
            required: true,
            message: "請選擇付款方式",
            trigger: ["change", "blur"],
        },
    ],
});

// 線下付款門市
const offlinePaymentStores = ref<any>([]);

// 付款方式
const options = ref([
    {
        label: "信用卡",
        value: "ecpay",
    },
]);

// 只有訂製門才會出現選項
if (route.query.tab === "type2") {
    options.value.push({
        label: "門市付款",
        value: "type2",
    });
}

watch(formData.value, (val) => {
    emit("update:form", val);
});

const validForm = async () => {
    if (!formRefDom.value) return false;
    const result = await formRefDom.value.validate((valid) => {
        if (valid) {
            return true;
        } else {
            return false;
        }
    });
    return result;
};

/**
 * 取得線下付款門市 api
 */
async function getOfflinePaymentStores() {
    try {
        const { data, error }: any = await $api().GetOfflinePaymentStoresAPI();
        if (error.value) {
            console.log("GetOfflinePaymentStoresAPI api error =>", error.value);
            return;
        }
        offlinePaymentStores.value = data.value.data.map((item: any) => {
            return {
                name: `${item.name}-${item.address}`,
                id: item.id,
            };
        });
        console.log("GetOfflinePaymentStoresAPI data =>", data.value);
    } catch (err) {
        console.log("getOfflinePaymentStores err =>", err);
    }
}

defineExpose({
    validForm,
});

await getOfflinePaymentStores();
</script>

<style lang="scss" scoped>
:deep .el-radio-group {
    @apply flex flex-col items-start #{!important};
    .el-radio.el-radio--large {
        @apply mr-[8px] #{!important};

        .el-radio__label {
            @apply font-normal leading-none;
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
