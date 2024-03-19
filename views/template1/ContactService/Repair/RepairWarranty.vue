<template>
    <BannerLayout
        :title="'保固登記'"
        :banner="'/img/repair/repair-warranty-banner.jpg'"
        class="bg-gray-50"
    >
        <template #breadcrumbs>
            <Breadcrumb :menus="breadcrumbs" />
        </template>
        <template #content>
            <div class="container">
                <el-form
                    class="custom-form"
                    ref="formRefDom"
                    :model="form"
                    :rules="rules"
                    require-asterisk-position="right"
                >
                    <div class="w-full xl:w-3/4 mt-[36px] sm:mt-[80px] py-[32px] px-[24px] sm:p-[60px] bg-white mx-auto rounded-[12px] sm:rounded-[24px] border-[1px] border-gray-200">
                        <h3 class="text-[24px] font-bold mb-6">序號登錄</h3>
                        <div class="flex flex-col md:grid grid-cols-2 gap-6">
                            <div
                                v-for="(item, index) in formDatas?.registerDatas"
                                :key="index"
                                :class="`col-span-${item.span}`"
                            >
                                <el-form-item
                                    :prop="item.prop"
                                    :label="item.label"
                                >
                                    <el-input
                                        v-if="item.style === 'input'"
                                        :type="item.type"
                                        :show-password="item.showPassword"
                                        :disabled="item.disabled"
                                        :placeholder="item.placeholder"
                                        v-model="form[item.prop]"
                                    />
                                    <el-radio-group
                                        v-else-if="item.style === 'radio'"
                                        v-model="form[item.prop]"
                                    >
                                        <el-radio
                                            v-for="(option, radio_index) in item.radioData"
                                            :key="radio_index"
                                            :label="option.value"
                                            size="large"
                                            >{{ option.label }}
                                        </el-radio>
                                    </el-radio-group>
                                    <el-date-picker
                                        v-else-if="item.style === 'datepicker'"
                                        v-model="form[item.prop]"
                                        type="date"
                                        valueFormat="YYYY-MM-DD"
                                        :placeholder="item.placeholder"
                                        popper-class="date-box"
                                    />
                                    <el-select
                                        v-else-if="item.style === 'select'"
                                        class="w-full"
                                        v-model="form[item.prop]"
                                        :placeholder="item.placeholder"
                                        @change="item.function ? item.function(form) : null"
                                    >
                                        <el-option
                                            v-for="(option, index) in item.options"
                                            :key="index"
                                            :label="option.label"
                                            :value="option.value"
                                        />
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                    <div class="w-full xl:w-3/4 mt-[24px] sm:mt-[80px] py-[32px] px-[24px] sm:p-[60px] bg-white mx-auto rounded-[12px] sm:rounded-[24px] border-[1px] border-gray-200">
                        <h3 class="text-[24px] font-bold mb-6">安裝客戶資料</h3>
                        <div class="flex flex-col md:grid grid-cols-2 gap-6">
                            <div
                                v-for="(item, index) in formDatas?.customerDatas"
                                :key="index"
                                :class="`col-span-${item.span}`"
                            >
                                <el-form-item
                                    :prop="item.prop"
                                    :label="item.label"
                                >
                                    <el-input
                                        v-if="item.style === 'input'"
                                        :type="item.type"
                                        :show-password="item.showPassword"
                                        :disabled="item.disabled"
                                        :placeholder="item.placeholder"
                                        v-model="form[item.prop]"
                                    ></el-input>
                                    <el-radio-group
                                        v-else-if="item.style === 'radio'"
                                        v-model="form[item.prop]"
                                    >
                                        <el-radio
                                            v-for="(option, radio_index) in item.radioData"
                                            :key="radio_index"
                                            :label="option.value"
                                            size="large"
                                            >{{ option.label }}
                                        </el-radio>
                                    </el-radio-group>
                                    <el-date-picker
                                        v-else-if="item.style === 'datepicker'"
                                        v-model="form[item.prop]"
                                        type="date"
                                        valueFormat="YYYY-MM-DD"
                                        :placeholder="item.placeholder"
                                        popper-class="date-box"
                                    />
                                    <el-select
                                        v-else-if="item.style === 'select'"
                                        class="w-full"
                                        v-model="form[item.prop]"
                                        :placeholder="item.placeholder"
                                        @change="item.function ? item.function(form) : null"
                                    >
                                        <el-option
                                            v-for="(option, option_index) in item.options"
                                            :key="option_index"
                                            :label="option.label"
                                            :value="option.value"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                    <div class="w-full xl:w-3/4 mt-[24px] sm:mt-[80px] py-[32px] px-[24px] sm:p-[60px] bg-white mx-auto rounded-[12px] sm:rounded-[24px] border-[1px] border-gray-200">
                        <h3 class="text-[24px] font-bold mb-6">序號</h3>
                        <div class="flex flex-col md:grid grid-cols-2 gap-6">
                            <div
                                v-for="(item, index) in formDatas?.serialDatas"
                                :key="index"
                                :class="`col-span-${item.span}`"
                            >
                                <el-form-item
                                    :prop="item.prop"
                                    :label="item.label"
                                    :rules="rules.serial"
                                >
                                    <el-input
                                        v-if="item.style === 'input'"
                                        :type="item.type"
                                        :show-password="item.showPassword"
                                        :disabled="item.disabled"
                                        :placeholder="item.placeholder"
                                        v-model="form[item.prop]"
                                    ></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="mt-[40px] text-center">
                            <button
                                @click.prevent="addSerial"
                                class="transparent-btn btn-md"
                            >
                                新增一筆序號
                            </button>
                        </div>
                    </div>
                    <div class="flex justify-center mt-[40px]">
                        <button
                            @click.prevent="onSubmit"
                            class="yellow-btn btn-lg"
                        >
                            確認送出
                        </button>
                    </div>
                </el-form>
            </div>
        </template>
    </BannerLayout>
</template>

<script setup lang="ts">
import BannerLayout from "~/views/template1/layouts/BannerLayout.vue";
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
import { validateTWMobileNumber } from "~/service/validator";
import { ElMessage, ElLoading } from "element-plus";
import { ProductListAPIInterface } from "~/interface/product.d";
const router = useRouter();

const { $api, $utils } = useNuxtApp();

const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁",
    },
    {
        name: "repair-warranty-slug",
        text: "服務支援",
        params: { slug: "保固登記" },
    },
    {
        name: "repair-slug",
        text: "維修與保固",
        params: { slug: "維修與保固" },
    },
    {
        name: "repair-warranty-slug",
        text: "保固登記",
        params: { slug: "保固登記" },
    },
]);

const formRefDom = ref<any>();

const form = ref<any>({
    companyName: "",
    date: "",
    purpose: "",
    model: "",
    quantity: "",
    name: "",
    phone: "",
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    memo: "",
    building: "",
    serial0: "",
});

const formDatas = ref<any>({
    registerDatas: [
        {
            prop: "companyName",
            label: "廠商/公司名稱",
            placeholder: "請輸入",
            style: "input",
        },
        {
            prop: "date",
            label: "安裝或出貨日期",
            style: "datepicker",
            placeholder: "請選擇日期",
        },
        {
            prop: "purpose",
            label: "銷售用途",
            placeholder: "請選擇",
            style: "select",
            options: [],
        },
        {
            prop: "model",
            label: "型號",
            style: "select",
            placeholder: "請選擇",
            options: [
                {
                    label: "model1",
                    value: "model1",
                },
            ],
        },
        {
            prop: "quantity",
            label: "數量",
            placeholder: "請輸入",
            type: "number",
            style: "input",
        },
        {
            prop: "name",
            label: "填單人姓名",
            style: "input",
            placeholder: "請輸入",
        },
        {
            prop: "phone",
            label: "填單人行動電話",
            style: "input",
            placeholder: "請輸入",
        },
    ],
    customerDatas: [
        {
            prop: "customerName",
            label: "客戶名稱",
            placeholder: "請輸入",
            style: "input",
        },
        {
            prop: "customerPhone",
            label: "行動電話",
            placeholder: "請輸入",
            style: "input",
        },
        {
            prop: "customerAddress",
            label: "安裝或出貨地址",
            placeholder: "請輸入",
            style: "input",
            span: 2,
        },
        {
            prop: "memo",
            label: "備註",
            placeholder: "請輸入",
            style: "input",
            span: 2,
        },
        {
            prop: "building",
            label: "建案名稱",
            placeholder: "請輸入",
            style: "input",
            span: 2,
        },
    ],
    serialDatas: Array.from({ length: 2 }, (v, i) => ({
        prop: `serial${i}`,
        label: "序號",
        placeholder: "請輸入",
        style: "input",
        span: 1,
    })),
});

function addSerial() {
    if (formDatas.value.serialDatas.length === 100) {
        ElMessage({
            type: "error",
            message: `序號最多100筆`,
        });
    } else {
        formDatas.value.serialDatas.push({
            prop: `serial${formDatas.value.serialDatas.length}`,
            label: "序號",
            placeholder: "請輸入",
            style: "input",
            span: 1,
        });
    }
}

const rules = ref<any>({
    companyName: [
        {
            required: true,
            message: "請輸入廠商/公司名稱",
            trigger: "blur",
        },
    ],
    date: [
        {
            required: true,
            message: "請輸入安裝或出貨日期",
            trigger: "blur",
        },
    ],
    model: [
        {
            required: true,
            message: "請選擇型號",
            trigger: "blur",
        },
    ],
    quantity: [
        {
            required: true,
            message: "請輸入數量",
            trigger: "blur",
        },
    ],
    name: [
        {
            required: true,
            message: "請輸入填單人姓名",
            trigger: "blur",
        },
    ],
    phone: [
        {
            required: true,
            message: "請輸入填單人行動電話",
            trigger: "blur",
        },
        {
            required: true,
            validator: validateTWMobileNumber,
            trigger: ["change", "blur"],
            message: "格式不正確",
        },
    ],
    customerName: [
        {
            required: true,
            message: "請輸入客戶名稱",
            trigger: "blur",
        },
    ],
    customerPhone: [
        {
            required: true,
            message: "請輸入行動電話",
            trigger: "blur",
        },
        {
            required: true,
            validator: validateTWMobileNumber,
            trigger: ["change", "blur"],
            message: "格式不正確",
        },
    ],
    customerAddress: [
        {
            required: true,
            message: "請輸入安裝或出貨地址",
            trigger: "blur",
        },
    ],
    serial: [
        {
            pattern: /^.{11,11}$/,
            trigger: ["change", "blur"],
            message: "格式不正確",
        },
    ],
    serial0: [
        {
            required: true,
            message: "請輸入序號",
            trigger: "blur",
        },
    ],
});

watch(
    () => form.value.phone,
    (newValue) => {
        form.value.phone =  $utils().cellphoneFormat(newValue);
    }
);

watch(
    () => form.value.customerPhone,
    (newValue) => {
        form.value.customerPhone =  $utils().cellphoneFormat(newValue);
    }
);

async function onSubmit() {
    formRefDom.value.validate(async (valid: any) => {
        if (!valid) {
            ElMessage({
                type: "error",
                message: `尚有欄位未填`,
            });
        } else {
            const serial_number = [];
            for (let i = 0; i < 16; i++) {
                if (form.value[`serial${i}`]) {
                    serial_number.push(form.value[`serial${i}`]);
                }
            }
            const formData = {
                company_name: form.value.companyName,
                installation_or_delivery_date: $utils().formatToDate(form.value.date),
                sales_purpose: form.value.purpose,
                model: form.value.model,
                quantity: form.value.quantity,
                contact_name: form.value.name,
                contact_phone: form.value.phone.replace(/-/g, ''),
                customer_name: form.value.customerName,
                customer_phone: form.value.customerPhone.replace(/-/g, ''),
                installation_or_delivery_address: form.value.customerAddress,
                remarks: form.value.memo,
                project_name: form.value.building,
                serial_number: serial_number,
            };
            console.log(formData);

            try {
                const { data, status, error } = await $api().WarrantyRegistrationAPI(formData);
                if (status.value === "success") {
                    router.push({ name: "repair-warranty-success-slug", params: { slug: "保固登記成功" } });
                } else {
                    ElMessage({
                        type: "error",
                        message: (error.value as any).data.message,
                    });
                }
            } catch (err) {
                console.log(err);
                ElMessage({
                    type: "error",
                    message: `表單送出失敗`,
                });
            }
        }
    });
}

/**
 * 取得型號
 */
async function getList() {
    try {
        const params = {
            code: 'warranty-registration'
        };
        const { data } = await $api().RagicConfigAPI(params);

        const rows = (data.value as any).data;
        console.log("rows => ", rows);

        const modelOptions = rows.model.options
        const sales_purpose = rows.sales_purpose.options

        formDatas.value.registerDatas.find((item: { prop: string }) => item.prop === "model").options = [];
        modelOptions.forEach((model: string) => {
            formDatas.value.registerDatas
                .find((item: { prop: string }) => item.prop === "model")
                .options.push({
                    value: model,
                    label: model,
                });
        });
        formDatas.value.registerDatas.find((item: { prop: string }) => item.prop === "purpose").options = [];
        sales_purpose.forEach((purpose: string ) => {
            formDatas.value.registerDatas
                .find((item: { prop: string }) => item.prop === "purpose")
                .options.push({
                    value: purpose,
                    label: purpose,
                });
        });
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
            await getList();
        }
    });
});
</script>
