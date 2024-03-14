<template>
    <BannerLayout
        :title="'一般安裝'"
        :banner="'/img/reservation/reservation-banner.jpg'"
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
                        <div>親愛的顧客您好：<br />完成預約後，專人將會在 3 個工作天內主動致電聯繫，詢問及確認需求，並且協助預約到府安裝。</div>
                        <div class="my-[16px] sm:my-[30px] border-b-[1px] border-gray-200"></div>
                        <h3 class="text-[24px] font-bold mb-6">申請人</h3>
                        <div class="flex flex-col md:grid grid-cols-2 gap-6">
                            <template
                                v-for="(item, index) in formDatas.applyDatas"
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
                                        ></el-input>
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
                                <template v-if="item.space && !isMobile">
                                    <div
                                        v-for="index in item.space"
                                        :key="index"
                                    ></div>
                                </template>
                            </template>
                            <div class="col-span-2">
                                <div class="px-4 py-3 bg-gray-50">
                                    <ul class="pl-4 list-disc">
                                        <li class="text-[15px]">
                                            指定區域將會額外收費1000~1500元，請參考<NuxtLink
                                                target="_blank"
                                                :to="{ name: 'other-charge-slug', params: { slug: '指定地區費用加收說明' } }"
                                                ><span class="ml-1 text-blue-500 underline cursor-pointer underline-offset-2 hover:no-underline">收費標準</span></NuxtLink
                                            >
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full xl:w-3/4 mt-[36px] sm:mt-[80px] px-[24px] py-[36px] sm:p-[60px] bg-white mx-auto rounded-[12px] sm:rounded-[24px] border-[1px] border-gray-200">
                        <h3 class="text-[24px] font-bold mb-6">商品安裝相關</h3>
                        <div class="flex flex-col md:grid grid-cols-2 gap-6">
                            <template
                                v-for="(item, index) in formDatas.installDatas"
                                :key="index"
                            >
                                <div :class="item.span ? `col-span-${item.span}` : ''">
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
                                            :scene="'general-installation'"
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
                                <template v-if="item.space">
                                    <div
                                        v-for="index in item.space"
                                        :key="index"
                                    ></div>
                                </template>
                                <template v-if="item.memoText || item.memoUrl">
                                    <div :class="item.span ? `col-span-${item.span}` : ''">
                                        <span>{{ item.memoText }}</span>
                                        <template v-if="item.memoUrl">
                                            <NuxtLink :to="item.memoUrl">
                                                <span class="ml-1 text-blue-500 underline cursor-pointer underline-offset-2 hover:no-underline">{{ item.memoUrlText }}</span>
                                            </NuxtLink>
                                        </template>
                                    </div>
                                </template>
                            </template>
                            <div class="col-span-2">
                                <div class="px-4 py-3 leading-7 bg-gray-50">
                                    <ul class="pl-4 list-disc">
                                        <li class="text-[15px]">請預填，後續將派專人與您聯繫</li>
                                        <li class="text-[15px]">安裝過程中會有敲打、電鑽挖孔噪音，請先確認大樓社區能否假日施工，謝謝。</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full xl:w-3/4 mt-[36px] sm:mt-[80px] px-[24px] py-[36px] sm:p-[60px] bg-white mx-auto rounded-[12px] sm:rounded-[24px] border-[1px] border-gray-200">
                        <h3 class="text-[24px] font-bold mb-6">廠商資訊</h3>
                        <div class="flex flex-col md:grid grid-cols-2 gap-6">
                            <template
                                v-for="(item, index) in formDatas.firmDatas"
                                :key="index"
                            >
                                <div :class="item.span ? `col-span-${item.span}` : ''">
                                    <el-form-item :prop="item.prop">
                                        <label class="block w-full text-[15px] text-gray-800"> {{ item.label }} </label>

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
                                <template v-if="item.space">
                                    <div
                                        v-for="index in item.space"
                                        :key="index"
                                    ></div>
                                </template>
                                <template v-if="item.memoText || item.memoUrl">
                                    <div :class="item.span ? `col-span-${item.span}` : ''">
                                        <span>{{ item.memoText }}</span>
                                        <template v-if="item.memoUrl">
                                            <NuxtLink :to="item.memoUrl">
                                                <span class="ml-1 text-blue-500 underline cursor-pointer underline-offset-2 hover:no-underline">{{ item.memoUrlText }}</span>
                                            </NuxtLink>
                                        </template>
                                    </div>
                                </template>
                            </template>
                        </div>
                    </div>
                    <div class="w-full xl:w-3/4 mt-[36px] sm:mt-[80px] px-[24px] py-[36px] sm:p-[60px] bg-white mx-auto rounded-[12px] sm:rounded-[24px] border-[1px] border-gray-200">
                        <h3 class="text-[24px] font-bold mb-6">上傳照片</h3>
                        <div class="flex flex-col md:grid grid-cols-2 gap-6">
                            <template
                                v-for="(item, index) in formDatas.updateDatas"
                                :key="index"
                            >
                                <div :class="item.span ? `col-span-${item.span}` : ''">
                                    <el-form-item :prop="item.prop">
                                        <label class="block w-full text-[15px] text-gray-800"> {{ item.label }} <span class="text-red-500">*</span> </label>
                                        <div class="flex flex-col w-full gap-4 mb-6 sm:flex-row">
                                            <div
                                                class="flex items-center gap-1 text-blue-500 underline cursor-pointer underline-offset-2 hover:no-underline"
                                                @click="handleDialog('locker')"
                                            >
                                                <NuxtImg
                                                    class="object-cover w-4 h-fit aspect-square"
                                                    src="/img/repair/repair-doc-icon-2.svg"
                                                />
                                                電子鎖安裝照片範例說明
                                            </div>
                                            <div
                                                class="flex items-center gap-1 text-blue-500 underline cursor-pointer underline-offset-2 hover:no-underline"
                                                @click="handleDialog('coffer')"
                                            >
                                                <NuxtImg
                                                    class="object-cover w-4 h-fit aspect-square"
                                                    src="/img/repair/repair-doc-icon-2.svg"
                                                />
                                                保險箱安裝照片範例說明
                                            </div>
                                        </div>
                                        <FileUpload
                                            v-if="item.style === 'file'"
                                            :prop="item.prop"
                                            :scene="'general-installation'"
                                            @tempPath="handlefile"
                                        />
                                    </el-form-item>
                                </div>
                            </template>
                            <div class="col-span-2">
                                <div class="px-4 py-3 leading-7 bg-gray-50">
                                    <ul class="pl-4 list-disc">
                                        <li class="text-[15px]">請注意：如因門扇特殊 或需要額外使用其他安裝配件、耗材，將由專人報價收費。</li>
                                    </ul>
                                </div>
                            </div>
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
            v-model="dialogVisible"
        >
            <h3 class="text-[24px] font-bold text-gray-800 mb-[30px]">{{ dialogData.title }}</h3>
            <div
                class="text-gray-800 edit-section"
                v-html="dialogData.content"
            ></div>
        </el-dialog>
    </client-only>
</template>

<script setup lang="ts">
import BannerLayout from "~/views/template1/layouts/BannerLayout.vue";
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
import { validateTWMobileNumber, validatePhotoArrayLength } from "~/service/validator";
import { useInitializationStore } from "~/store/initializationStore";
import ContactWebFileUpload from "~/views/template1/ContactService/ContactWe/components/ContactWebFileUpload.vue";
import GoogleReCaptchaV2 from "~/components/GoogleRecaptchaV2.vue";
import FileUpload from "~/views/template1/ContactService/ContactWe/components/ContactWebFileUpload.vue";
import ProductDialog from "~/views/template1/components/ProductDialog.vue";
import CustomProductDailogCarousel from "~/views/template1/CustomProduct/components/CustomProductDailogCarousel.vue";
import { ElMessage, ElLoading } from "element-plus";
import { ProductListAPIInterface, ProductList, ProductCarInterface } from "~/interface/product.d";
const router = useRouter();
const { isMobile } = useWindowResize();

const { $api } = useNuxtApp();

const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁",
    },
    {
        name: "reservation-general-slug",
        text: "服務支援",
        params: { slug: "一般安裝" },
    },
    {
        name: "reservation-slug",
        text: "預約安裝",
        params: { slug: "預約安裝" },
    },
    {
        name: "reservation-general-slug",
        text: "一般安裝",
        params: { slug: "一般安裝" },
    },
]);

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

const formRefDom = ref<any>();

const form = ref<any>({
    contactPerson: "",
    cellphone: "",
    telephone: "",
    city: "",
    location: "",
    zip3: "",
    address: "",
    place: "",
    series: "電子門鎖",
    model: "",
    quantity: "",
    serial: "",
    time: [],
    firmName: "",
    photo: "",
});

const placeOptions = ref<any>([
    { value: "PChome", label: "PChome" },
    { value: "MOMO", label: "MOMO" },
    { value: "蝦皮", label: "蝦皮" },
    { value: "官方網站", label: "官方網站" },
    { value: "好市多", label: "好市多" },
    { value: "鎖店", label: "鎖店" },
    { value: "全國電子", label: "全國電子" },
    { value: "代理商/經銷商", label: "代理商、經銷商" },
    { value: "其他", label: "其他" },
]);

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
    applyDatas: [
        {
            prop: "contactPerson",
            label: "聯絡人",
            placeholder: "請輸入",
            style: "input",
            space: 1,
        },
        {
            prop: "cellphone",
            label: "行動電話",
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
                        const addressProps = formDatas.value.applyDatas.find((item: { prop: string }) => item.prop === "address");
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
                        const addressProps = formDatas.value.applyDatas.find((item: { prop: string }) => item.prop === "address");
                        e.zip3 = addressProps.datas.find((item: { prop: string }) => item.prop === "location").options.find((item: { value: any }) => item.value === e.location).zip3;
                    },
                },
                {
                    prop: "zip3",
                    label: "郵遞區號",
                    placeholder: "請輸入",
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
    installDatas: [
        {
            prop: "place",
            label: "購買通路",
            placeholder: "請選擇",
            style: "select",
            options: placeOptions,
        },
        {
            prop: "series",
            label: "系列選擇",
            placeholder: "請選擇",
            style: "radio",
            radioData: seriesRadios,
            change: (e: any) => {
                getList(e);
            },
        },
        {
            prop: "model",
            label: "安裝型號",
            placeholder: "請選擇安裝型號",
            style: "select",
            options: [],
        },
        {
            prop: "quantity",
            label: "安裝數量",
            placeholder: "請輸入數量",
            style: "input",
        },
        {
            prop: "serial",
            label: "產品序號(請收到門鎖後再預約)",
            placeholder: "請輸入產品序號，共11碼英文+數字",
            style: "input",
            span: 2,
            memoText: "序號位置：外盒開蓋地處有條碼貼紙",
        },
        {
            prop: "time",
            label: "預約安裝時段",
            style: "checkbox",
            checkboxData: timeOptions,
        },
    ],
    firmDatas: [
        {
            prop: "firmName",
            label: "如果您是廠商、代理商，請填寫您的大名、電話、公司名稱",
            placeholder: "例：灝翔有限公司/王小姐/02-2555-6666",
            style: "input",
            span: 2,
        },
    ],
    updateDatas: [
        {
            prop: "photo",
            label: "請參考【安裝照片範例說明】，並上傳照片共 3~5 張",
            style: "file",
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
            message: "請輸入行動電話",
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
            message: "請選擇地區",
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
    place: [
        {
            required: true,
            message: "請輸入購買通路",
            trigger: ["change", "blur"],
        },
    ],
    series: [
        {
            required: true,
            message: "請選擇系列",
            trigger: ["change", "blur"],
        },
    ],
    model: [
        {
            required: true,
            message: "請選擇安裝型號",
            trigger: ["change", "blur"],
        },
    ],
    quantity: [
        {
            required: true,
            message: "請輸入數量",
            trigger: ["change", "blur"],
        },
    ],
    serial: [
        {
            required: true,
            message: "請輸入產品序號",
            trigger: ["change", "blur"],
        },
    ],
    time: [
        {
            required: true,
            message: "請選擇預約安裝時段",
            trigger: ["change", "blur"],
        },
    ],
    photo: [
        {
            required: true,
            message: "請選擇照片",
            trigger: ["change", "blur"],
        },
        {
            required: true,
            validator: validatePhotoArrayLength,
            trigger: ["change", "blur"],
            message: "照片數量需3~5張",
        },
    ],
});

function handlefile(tempPath: any, prop: string) {
    form.value[prop] = tempPath;
    formRefDom.value.validateField("photo");
}

// 安裝照片彈窗
const dialogData = ref<any>({
    title: "",
    content: "",
});
const dialogVisible = ref(false);
const handleDialog = (item: string) => {
    dialogVisible.value = true;
    if (item === "locker") {
        dialogData.value = lockerData.value;
    } else if (item === "coffer") {
        dialogData.value = cofferData.value;
    }
};

// 電子鎖彈窗資料
const lockerData = ref<any>({
    title: "電子鎖安裝照片範例說明",
    content: "",
});

// 保險箱彈窗資料
const cofferData = ref<any>({
    title: "保險箱安裝照片範例說明",
    content: "",
});

async function getPageData() {
    try {
        // 電子鎖
        const lockParams = { code: "electronic_lock_installation_photo_example_popup" };
        const { data: lockerApiData } = await $api().getPageAPI(lockParams);
        console.log("getPageData api => ", lockerApiData.value);

        const lockPageData = (lockerApiData.value as any).data.schema;
        console.log("pageData => ", lockPageData);

        lockerData.value.content = lockPageData.content;

        // 保險箱
        const params = { code: "safe_installation_photo_example_popup" };
        const { data: cofferApiData } = await $api().getPageAPI(params);
        console.log("getPageData api => ", cofferApiData.value);

        const cofferPageData = (cofferApiData.value as any).data.schema;
        console.log("pageData => ", cofferPageData);

        cofferData.value.content = cofferPageData.content;
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

        formDatas.value.installDatas.find((item: { prop: string }) => item.prop === "model").options = [];
        rows.forEach((item: { model: string }) => {
            formDatas.value.installDatas
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
                purchase_channel: form.value.place,
                series_selection: form.value.series,
                installation_model: form.value.model,
                installation_quantity: form.value.quantity,
                product_serial_number: form.value.serial,
                appointment_time_slot: form.value.time,
                vendor_name: form.value.firmName,
                attachments: form.value.photo,
                captcha: form.value.recaptchaToken,
            };
            console.log(formData);

            try {
                const { data, status, error } = await $api().GeneralnstallationAPI(formData);
                if (status.value === "success") {
                    router.push({ name: "reservation-success-slug", params: { slug: "安裝預約送出成功" } });
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
