<template>
    <BannerLayout
        :title="'線上報修'"
        :banner="'/img/repair/repair-detail-banner.jpg'"
        :banner-mobile="'/img/repair/repair-detail-banner-m.jpg'"
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
                    <div class="w-full xl:w-3/4 mt-[36px] sm:mt-[80px] px-[24px] py-[36px] sm:p-[60px] bg-white mx-auto rounded-[12px] sm:rounded-[24px] border-[1px] border-gray-200">
                        <h3 class="text-[24px] font-bold mb-6">報修聯絡人</h3>
                        <div class="flex flex-col sm:grid grid-cols-2 gap-6">
                            <template
                                v-for="(item, index) in formDatas.contactDatas"
                                :key="index"
                            >
                                <div
                                    v-if="item?.type !== 'inline'"
                                    :class="item.span ? `col-span-${item.span}` : ''"
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
                                        <el-select
                                            v-if="item.style === 'select'"
                                            class="w-full"
                                            v-model="form[item.prop]"
                                            :placeholder="item.placeholder"
                                            @change="item.function ? item.function(form) : null"
                                        >
                                            <el-option
                                                v-for="(option, optionIndex) in item.options"
                                                :key="optionIndex"
                                                :label="option.label"
                                                :value="option.value"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                                <div
                                    v-else
                                    class="flex flex-col md:flex-row flex-1 gap-6"
                                    :class="item.span ? `col-span-${item.span}` : ''"
                                >
                                    <div
                                        v-for="(item2, index2) in item.datas"
                                        class="flex-1"
                                        :key="index2"
                                    >
                                        <el-form-item
                                            :prop="item2.prop"
                                            :label="item2.label"
                                        >
                                            <el-input
                                                v-if="item2.style === 'input'"
                                                :type="item2?.type"
                                                :show-password="item2.showPassword"
                                                :disabled="item2.disabled"
                                                :placeholder="item2.placeholder"
                                                v-model="form[item2.prop]"
                                            />
                                            <el-select
                                                v-if="item2.style === 'select'"
                                                class="w-full"
                                                v-model="form[item2.prop]"
                                                :placeholder="item2.placeholder"
                                                @change="item2.function ? item2.function(form) : null"
                                            >
                                                <el-option
                                                    v-for="(option, optionIndex) in item2.options"
                                                    :key="optionIndex"
                                                    :label="option.label"
                                                    :value="option.value"
                                                />
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </div>
                                <template v-if="item.space && !isMobile">
                                    <div
                                        v-for="index in item.space"
                                        :key="index"
                                    ></div>
                                </template>
                            </template>
                        </div>
                    </div>
                    <div class="w-full xl:w-3/4 mt-[36px] sm:mt-[80px] px-[24px] py-[36px] sm:p-[60px] bg-white mx-auto rounded-[12px] sm:rounded-[24px] border-[1px] border-gray-200">
                        <h3 class="text-[24px] font-bold mb-6">報修商品資訊</h3>
                        <div class="flex flex-col sm:grid grid-cols-2 gap-6">
                            <template
                                v-for="(item, index) in formDatas.productDatas"
                                :key="index"
                            >
                                <div
                                    v-if="item?.type !== 'inline'"
                                    :class="item.span ? `col-span-${item.span}` : ''"
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
                                            resize="none"
                                            :rows="item.row"
                                            v-model="form[item.prop]"
                                        ></el-input>
                                        <el-select
                                            v-else-if="item.style === 'select'"
                                            class="w-full"
                                            v-model="form[item.prop]"
                                            :placeholder="item.placeholder"
                                            @change="item.function ? item.function(form) : null"
                                        >
                                            <el-option
                                                v-for="(option, optionIndex) in item.options"
                                                :key="optionIndex"
                                                :label="option.label"
                                                :value="option.value"
                                            ></el-option>
                                        </el-select>
                                        <el-radio-group
                                            v-else-if="item.style === 'radio'"
                                            v-model="form[item.prop]"
                                        >
                                            <el-radio
                                                v-for="(option, radio_index) in item.radioData"
                                                :key="radio_index"
                                                :label="option.value"
                                                size="large"
                                                @change="item.change"
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
                                        <FileUpload
                                            v-else-if="item.style === 'file'"
                                            :prop="item.prop"
                                            :scene="'online-repair'"
                                            @tempPath="handlefile"
                                        />
                                        <VideoUpload
                                            v-else-if="item.style === 'video'"
                                            :prop="item.prop"
                                            :scene="'online-repair'"
                                            @tempPath="handlefile"
                                        />
                                        <el-checkbox-group
                                            v-else-if="item.style === 'checkbox'"
                                            v-model="form[item.prop]"
                                        >
                                            <el-checkbox
                                                v-for="checkbox in item.checkboxData"
                                                :key="checkbox.label"
                                                :label="checkbox.value"
                                                >{{ checkbox.label }}
                                            </el-checkbox>
                                        </el-checkbox-group>
                                    </el-form-item>
                                </div>
                                <div
                                    v-else
                                    class="flex flex-1"
                                    :class="item.span ? `col-span-${item.span}` : ''"
                                >
                                    <div
                                        v-for="(item2, index2) in item.datas"
                                        class="flex-1"
                                        :key="index2"
                                        :class="item.datas.length - 1 === index2 ? '' : 'mr-[30px]'"
                                    >
                                        <el-form-item
                                            :prop="item2.prop"
                                            :label="item2.label"
                                        >
                                            <el-input
                                                v-if="item2.style === 'input'"
                                                :type="item2?.type"
                                                :show-password="item2.showPassword"
                                                :disabled="item2.disabled"
                                                :placeholder="item2.placeholder"
                                                v-model="form[item2.prop]"
                                            ></el-input>
                                            <el-select
                                                v-if="item2.style === 'select'"
                                                class="w-full"
                                                v-model="form[item2.prop]"
                                                :placeholder="item2.placeholder"
                                                @change="item2.function ? item2.function(form) : null"
                                            >
                                                <el-option
                                                    v-for="(option, optionIndex) in item2.options"
                                                    :key="optionIndex"
                                                    :label="option.label"
                                                    :value="option.value"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </div>
                                <template v-if="item.space">
                                    <div
                                        v-for="index in item.space"
                                        :key="index"
                                    ></div>
                                </template>
                                <!--   備註小字   -->
                                <template v-if="item.memoText">
                                    <div :class="item.span ? `col-span-${item.span}` : ''">
                                        <span>{{ item.memoText }}</span>
                                        <template v-if="item.memoFunctionText">
                                            <span
                                                @click="item.memoFunction ? item.memoFunction() : null"
                                                class="ml-1 text-blue-500 underline cursor-pointer underline-offset-2 hover:no-underline"
                                                >{{ item.memoFunctionText }}</span
                                            >
                                        </template>
                                    </div>
                                </template>
                                <!--   備註列表   -->
                                <template v-if="item.listText">
                                    <div
                                        class="col-span-2"
                                        v-html="item.listText"
                                    ></div>
                                </template>
                            </template>
                            <div class="flex justify-start">
                                <GoogleReCaptchaV2 v-model="form.recaptchaToken" />
                            </div>
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
    <client-only>
        <el-dialog
            class="custom-dialog h-[600px]"
            close-on-click-modal
            lock-scroll
            show-close
            :width="600"
            center
            align-center
            append-to-body
            v-model="dialogSerial"
        >
            <h3 class="text-[24px] font-bold text-gray-800 mb-[30px]">{{ serialData.title }}</h3>
            <div
                class="text-gray-800 edit-section"
                v-html="serialData.content"
            ></div>
        </el-dialog>
    </client-only>
</template>

<script setup lang="ts">
import BannerLayout from "~/views/template1/layouts/BannerLayout.vue";
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
import { useInitializationStore } from "~/store/initializationStore";
import GoogleReCaptchaV2 from "~/components/GoogleRecaptchaV2.vue";
import { ElMessage } from "element-plus";
import FileUpload from "~/views/template1/ContactService/ContactWe/components/ContactWebFileUpload.vue";
import VideoUpload from "~/views/template1/ContactService/Repair/components/VideoUpload.vue";
import { validateTWMobileNumber } from "~/service/validator";
import { ProductListAPIInterface } from "~/interface/product.d";

const { $api, $utils } = useNuxtApp();
const router = useRouter();
const route = useRoute();
const { isMobile } = useWindowResize();

const {
    public: { googleRecaptcha2Key },
} = useRuntimeConfig();

// gooogle recaptcha dom
const reCaptcha2Dom = ref<any>(null);

// 判斷是否有驗證 google recaptcha
const isRecaptchaVerify = ref<boolean>(false);

// google recaptcha key
const sitekey = googleRecaptcha2Key;

// 驗證 recaptcha 通過時 回傳的 token
function isVerify(token: string) {
    // 判斷是否有取得token
    if (!$utils().isEmpty(token)) {
        // 將是否有驗證過google recaptcha 驗證改為 true
        isRecaptchaVerify.value = true;
    }
    form.value["g-recaptcha-response"] = token;
}
// 驗證 recaptcha 失敗時 回傳的 error
function isVerifyError(error: any) {
    // 將是否有驗證過google recaptcha 驗證改為 false
    console.log(error);
    isRecaptchaVerify.value = false;
}

// 預先加載縣市資料
const initializationStore = useInitializationStore();
const { data, pending, error, refresh } = await useAsyncData("city", () => getCity());

async function getCity() {
    const { data } = await $api().GetCityAreaAPI();
    initializationStore.cityAreaData = (data.value as any).data;

    initializationStore.cityData = initializationStore.cityAreaData.map((item: { name: any }) => {
        return { label: item.name, value: item.name };
    });
}

const dialogSerial = ref(false);

const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁",
    },
    {
        name: "repair-slug",
        text: "服務支援",
        params: { slug: "耶魯服務支援" },
    },
    {
        name: "repair-detail-slug",
        text: "線上報修",
        params: { slug: "耶魯線上報修" },
        query: { id: "1" },
    },
]);

const formRefDom = ref<any>();

const form = ref<any>({
    contactPerson: "",
    cellphone: "",
    telephone: "",
    city: "",
    location: "",
    zip3: "",
    address: "",
    series: "電子門鎖",
    date: "",
    model: "",
    quantity: "",
    serial: "",
    time: [],
    description: "",
    photo: "",
});

const seriesRadios = ref<any>([
    { value: "電子門鎖", label: "電子門鎖" },
    { value: "電子保險箱", label: "電子保險箱" },
]);

const timeOptions = ref<any>([
    { value: "平日時段 (週一~週五) 早上", label: "平日時段 (週一~週五) 早上" },
    { value: "平日時段 (週一~週五) 下午", label: "平日時段 (週一~週五) 下午" },
    { value: "假日時段 (六、日) 早上", label: "假日時段 (六、日) 早上" },
    { value: "假日時段 (六、日) 下午", label: "假日時段 (六、日) 下午" },
]);

const formDatas = ref<any>({
    contactDatas: [
        {
            prop: "contactPerson",
            label: "聯絡人",
            placeholder: "請輸入",
            style: "input",
            space: 1,
        },
        {
            prop: "cellphone",
            label: "聯絡電話",
            placeholder: "例：0911-222-222",
            style: "input",
        },
        {
            prop: "telephone",
            label: "市話",
            placeholder: "例：02-1222-2222",
            style: "input",
        },
        {
            prop: "address",
            type: "inline",
            span: 2,
            datas: [
                {
                    prop: "city",
                    label: "縣市",
                    placeholder: "請選擇",
                    options: initializationStore.cityData,
                    style: "select",
                    function: (e: any) => {
                        console.log(e);
                        e.location = "";
                        e.zip3 = "";

                        const cityDataFilter = initializationStore.cityAreaData.find((item: { name: any }) => item.name === e.city);
                        console.log("cityDataFilter.district", cityDataFilter);
                        const addressProps = formDatas.value.contactDatas.find((item: { prop: string }) => item.prop === "address");
                        addressProps.datas.find((item: { prop: string }) => item.prop === "location").options = cityDataFilter.district.map((item: { name: any; zip3: any }) => {
                            return {
                                label: item.name,
                                value: item.name,
                                zip3: item.zip3,
                            };
                        });
                    },
                },
                {
                    prop: "location",
                    label: "地區",
                    placeholder: "請選擇",
                    options: [],
                    style: "select",
                    function: (e: any) => {
                        console.log(e);
                        const addressProps = formDatas.value.contactDatas.find((item: { prop: string }) => item.prop === "address");
                        e.zip3 = addressProps.datas.find((item: { prop: string }) => item.prop === "location").options.find((item: { value: any }) => item.value === e.location).zip3;
                    },
                },
                {
                    prop: "zip3",
                    label: "郵遞區號",
                    placeholder: "",
                    style: "input",
                    disabled: true,
                },
            ],
        },
        {
            prop: "address",
            label: "詳細地址",
            placeholder: "請輸入",
            style: "input",
            span: 2,
        },
    ],
    productDatas: [
        {
            prop: "series",
            label: "系列選擇",
            placeholder: "請輸入",
            style: "radio",
            radioData: seriesRadios,
            change: (e: any) => {
                getList(e);
            },
        },
        {
            prop: "date",
            label: "安裝日期",
            placeholder: "請輸入購買日期或安裝日期",
            style: "datepicker",
        },
        {
            prop: "model",
            label: "報修型號",
            placeholder: "請選擇型號",
            style: "select",
            options: [],
        },
        {
            prop: "quantity",
            label: "報修數量",
            placeholder: "請輸入數量",
            style: "input",
        },
        {
            prop: "serial",
            label: "產品序號",
            placeholder: "請輸入產品序號，共11碼英文+數字",
            style: "input",
            span: 2,
            memoText: "序號位置：外盒開蓋地處有條碼貼紙",
            memoFunction: (e: any) => {
                dialogSerial.value = true;
            },
            memoFunctionText: "點我查看序號位置範例",
        },
        {
            prop: "time",
            label: "維修時段",
            style: "checkbox",
            checkboxData: timeOptions,
            listText: "<div class='grid-cols-2'><div class='px-4 py-3 bg-gray-50'><ul class='pl-4 list-disc'><li class='text-[15px]'>請預填，後續將派專人與您聯繫</li></ul></div></div>",
        },
        {
            prop: "description",
            label: "狀況說明",
            placeholder: "請輸入",
            style: "input",
            type: "textarea",
            span: 2,
            row: 5,
        },
        {
            prop: "photo",
            label: "圖片上傳",
            placeholder: "請上傳圖片",
            type: "photo",
            style: "file",
            span: 2,
        },
        {
            prop: "video",
            label: "影片上傳",
            placeholder: "請上傳影片",
            style: "video",
            span: 2,
        },
    ],
});

const rules = ref<any>({
    contactPerson: [
        {
            required: true,
            message: "請輸入聯絡人",
            trigger: ["change", "blur"],
        },
    ],
    cellphone: [
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
            message: "請選擇縣市",
            trigger: ["change", "blur"],
        },
    ],
    location: [
        {
            required: true,
            message: "請輸入地區",
            trigger: ["change", "blur"],
        },
    ],
    address: [
        {
            required: true,
            message: "請輸入詳細地址",
            trigger: ["change", "blur"],
        },
    ],
    series: [
        {
            required: true,
            message: "請選擇",
            trigger: ["change", "blur"],
        },
    ],
    date: [
        {
            required: true,
            message: "請選擇安裝日期",
            trigger: ["change", "blur"],
        },
    ],
    model: [
        {
            required: true,
            message: "請輸入報修型號",
            trigger: "change",
        },
    ],
    serial: [
        {
            required: true,
            message: "請輸入產品序號",
            trigger: ["change", "blur"],
        },
    ],
    quantity: [
        {
            required: true,
            message: "請輸入報修數量",
            trigger: ["change", "blur"],
        },
    ],
    time: [
        {
            required: true,
            message: "請選擇維修時段",
            trigger: "change",
        },
    ],
    description: [
        {
            required: true,
            message: "請輸入狀況說明",
            trigger: ["change", "blur"],
        },
    ],
    photo: [
        {
            required: true,
            message: "請選擇照片",
            trigger: ["change", "blur"],
        },
    ],
});

function handlefile(tempPath: any, prop: string) {
    form.value[prop] = tempPath;
    formRefDom.value.validateField("photo");
}

// 序號位置彈窗資料
const serialData = ref<any>({
    title: "序號位置範例",
    content: "",
});

async function getPageData() {
    try {
        const params = { code: "serial_number_position_example_popup" };
        const { data } = await $api().getPageAPI(params);
        console.log("getPageData api => ", data.value);

        const pageData = (data.value as any).data.schema;
        serialData.value.content = pageData.content;

        const seoSetting = (data.value as any).data.seoSetting;
        useSeoMeta({
            title: seoSetting.title,
            description: seoSetting.description,
            ogTitle: seoSetting.title,
            ogDescription: seoSetting.description,
            ogUrl: () => `${window.location.origin}/${seoSetting.custom_url}`,
            keywords: seoSetting.keywords.join(),
        });
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

const product_category = ref([]);
/**
 * 取得商品分類
 */
async function getType() {
    try {
        const { data } = await $api().ProductTypeAPI();

        const rows = (data.value as any).data;
        console.log("product_category_id", rows);

        product_category.value = rows;
        getList("電子門鎖");
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

/**
 * 取得商品列表
 */
async function getList(type = "電子門鎖") {
    console.log("type => ", type);
    try {
        let product_category_id;
        if (type === "電子門鎖") {
            product_category_id = product_category.value
                .find((item: { id: Number }) => item.id === 1)
                .children.map((child: { id: Number }) => {
                    return child.id;
                });
        } else if (type === "電子保險箱") {
            product_category_id = product_category.value
                .find((item: { id: Number }) => item.id === 3)
                .children.map((child: { id: Number }) => {
                    return child.id;
                });
        }
        const params = {};
        // 搜尋分類參數時 須帶上 搜尋模式 條件
        params["search_fields"] = "productCategories.product_category_id:in";
        // 搜尋分類參數 ("主鎖｜輔助鎖" 等等...)
        params["search_relations"] = "productCategories.product_category_id:" + product_category_id.join();

        const { data } = await $api().ProductLisAPI<ProductListAPIInterface>(params);

        const rows = (data.value as any).data;
        console.log("home sample api => ", rows);

        formDatas.value.productDatas.find((item: { prop: string }) => item.prop === "model").options = [];
        rows.forEach((item: { model: string }) => {
            formDatas.value.productDatas
                .find((item: { prop: string }) => item.prop === "model")
                .options.push({
                    value: item.model,
                    label: item.model,
                });
        });
        form.value.model = "";
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
            await getPageData();
            await getType();
        }
    });
});

async function onSubmit() {
    if (!form.value.recaptchaToken) {
        ElMessage({
            type: "error",
            message: `請勾選我不是機器人`,
        });
        return;
    }
    formRefDom.value.validate(async (valid: any) => {
        if (!valid) {
            ElMessage({
                type: "error",
                message: `尚有欄位未填`,
            });
        } else {
            const formData = {
                contact_name: form.value.contactPerson,
                contact_phone: form.value.cellphone,
                city: form.value.city,
                detailed_address: form.value.address,
                district: form.value.location,
                landline: form.value.telephone,
                zip3: form.value.zip3,
                series_selection: form.value.series,
                installation_date: form.value.date,
                repair_model: form.value.model,
                repair_quantity: form.value.quantity,
                product_serial_number: form.value.serial,
                repair_time_slot: form.value.time,
                condition_description: form.value.description,
                attachments: form.value.photo,
                captcha: form.value.recaptchaToken,
            };
            console.log(formData);

            try {
                const { data, status, error } = await $api().OnlineRepairAPI(formData);
                if (status.value === "success") {
                    router.push({ name: "repair-detail-success-slug", params: { slug: "線上報修成功" } });
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
</script>
