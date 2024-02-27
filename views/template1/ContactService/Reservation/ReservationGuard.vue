<template>
    <BannerLayout
        :title="'新光保全安裝'"
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
                    @submit.prevent="onSubmit"
                    require-asterisk-position="right"
                >
                    <div class="w-3/4 mt-[80px] p-[60px] pt-[50px] bg-white mx-auto rounded-[24px] border-[1px] border-gray-200">
                        <div>親愛的顧客您好：<br />完成預約後，專人將會在 3 個工作天內主動致電聯繫，詢問及確認需求，並且協助預約到府安裝。</div>
                        <div class="my-[30px] border-b-[1px] border-gray-200"></div>
                        <h3 class="text-[24px] font-bold mb-6">申請人</h3>
                        {{ formDatas.applyDatas }}
                        <div class="grid grid-cols-2 gap-6">
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
                            </template>
                        </div>
                    </div>
                    <div class="w-3/4 mt-[40px] p-[60px] pt-[50px] bg-white mx-auto rounded-[24px] border-[1px] border-gray-200">
                        <h3 class="text-[24px] font-bold mb-6">新光保全</h3>
                        <div class="grid grid-cols-2 gap-6">
                            <template
                                v-for="(item, index) in formDatas.guardDatas"
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
                                            :scene="'sk-security-installation'"
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
                        </div>
                    </div>
                    <div class="w-3/4 mt-[40px] p-[60px] pt-[50px] bg-white mx-auto rounded-[24px] border-[1px] border-gray-200">
                        <h3 class="text-[24px] font-bold mb-6">商品安裝相關</h3>
                        <div class="grid grid-cols-2 gap-6">
                            <template
                                v-for="(item, index) in formDatas.productDatas"
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
                                            :scene="'sk-security-installation'"
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
                            <el-form-item
                                class="col-span-2"
                                prop="description"
                                label="其他需求說明"
                            >
                                <el-input
                                    v-model="form.description"
                                    type="textarea"
                                    resize="none"
                                    :rows="5"
                                ></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="w-3/4 mt-[40px] p-[60px] pt-[50px] bg-white mx-auto rounded-[24px] border-[1px] border-gray-200">
                        <h3 class="text-[24px] font-bold mb-6">上傳照片</h3>
                        <div class="grid gap-6">
                            <template
                                v-for="(item, index) in formDatas.updateDatas"
                                :key="index"
                            >
                                <div :class="item.span ? `col-span-${item.span}` : ''">
                                    <el-form-item :prop="item.prop">
                                        <label class="block w-full text-[15px] text-gray-800"> {{ item.label }} <span class="text-red-500">*</span> </label>
                                        <div class="flex w-full gap-4 mt-2 mb-4">
                                            <div
                                                class="flex items-center gap-1 underline cursor-pointer underline-offset-2 hover:no-underline"
                                                @click="handleDialog('locker')"
                                            >
                                                <NuxtImg
                                                    class="object-cover w-4 h-fit aspect-square"
                                                    src="/img/repair/repair-doc-icon.svg"
                                                />
                                                電子鎖安裝照片範例說明
                                            </div>
                                            <div
                                                class="flex items-center gap-1 underline cursor-pointer underline-offset-2 hover:no-underline"
                                                @click="handleDialog('coffer')"
                                            >
                                                <NuxtImg
                                                    class="object-cover w-4 h-fit aspect-square"
                                                    src="/img/repair/repair-doc-icon.svg"
                                                />
                                                保險箱安裝照片範例說明
                                            </div>
                                        </div>
                                        <FileUpload
                                            v-if="item.style === 'file'"
                                            :prop="item.prop"
                                            :scene="'sk-security-installation'"
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
                            native-type="submit"
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
import { ElMessage, ElLoading } from "element-plus";
import GoogleReCaptchaV2 from "~/components/GoogleRecaptchaV2.vue";
import FileUpload from "~/views/template1/ContactService/ContactWe/components/ContactWebFileUpload.vue";
import { ProductListAPIInterface } from "~/interface/product.d";
const router = useRouter();

const { $api } = useNuxtApp();

const breadcrumbs = ref([
    {
        name: "faq-slug",
        text: "服務支援",
        params: { slug: "服務支援" },
    },
    {
        name: "reservation-slug",
        params: { slug: "預約安裝" },
        text: "預約安裝",
    },
    {
        name: "reservation-guard-slug",
        text: "新光保全安裝",
        params: { slug: "新光保全安裝" },
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
    contractId: "",
    contractContent: "",
    name: "",
    cellphone: "",
    telephone: "",
    city: "",
    location: "",
    zip3: "",
    address: "",
    guardPerson: "",
    guardCellphone: "",
    guardTelephone: "",
    model: "",
    quantity: "",
    time: [],
    description: "",
    photo: [],
});

const contractOptions = ref<any>([
    { value: "租賃契約", label: "租賃契約" },
    { value: "賣斷", label: "賣斷" },
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
            prop: "contractId",
            label: "成約訂單編號",
            placeholder: "請填寫",
            style: "input",
        },
        {
            prop: "contractContent",
            label: "契約內容",
            placeholder: "請選擇",
            style: "select",
            options: contractOptions,
        },
        {
            prop: "name",
            label: "客戶名稱",
            placeholder: "請填寫",
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
    guardDatas: [
        {
            prop: "guardPerson",
            label: "新光保全-聯絡人",
            placeholder: "請輸入",
            style: "input",
            space: 1,
        },
        {
            prop: "guardCellphone",
            label: "新光保全-聯絡電話",
            placeholder: "例：0911-222-222",
            style: "input",
        },
        {
            prop: "guardTelephone",
            label: "新光保全-市話",
            placeholder: "例：02-1222-2222",
            style: "input",
        },
    ],
    productDatas: [
        {
            prop: "model",
            label: "安裝型號",
            placeholder: "請選擇安裝型號",
            style: "select",
            options: [
                {
                    label: "安裝型號1",
                    value: "安裝型號1",
                },
            ],
        },
        {
            prop: "quantity",
            label: "安裝數量",
            placeholder: "請輸入數量",
            style: "input",
        },
        {
            prop: "time",
            label: "預約安裝時段",
            style: "checkbox",
            checkboxData: timeOptions,
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
    contractId: [
        {
            required: true,
            message: "請輸入成約訂單編號",
            trigger: ["change", "blur"],
        },
    ],
    contractContent: [
        {
            required: true,
            message: "請選擇契約內容",
            trigger: ["change", "blur"],
        },
    ],
    name: [
        {
            required: true,
            message: "請輸入客戶名稱",
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
    guardPerson: [
        {
            required: true,
            message: "請輸入聯絡人",
            trigger: ["change", "blur"],
        },
    ],
    guardCellphone: [
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
    model: [
        {
            required: true,
            message: "請選擇安裝型號",
            trigger: ["change", "blur"],
        },
        {
            required: true,
            message: "請選擇安裝型號",
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

        const lockSeoSetting = (data.value as any).data.seoSetting;
        useSeoMeta({
            title: lockSeoSetting.title,
            description: lockSeoSetting.description,
            ogTitle: lockSeoSetting.title,
            ogDescription: lockSeoSetting.description,
            ogUrl: () => `${window.location.origin}/${lockSeoSetting.custom_url}`,
            keywords: lockSeoSetting.keywords.join(),
        });

        // 保險箱
        const params = { code: "safe_installation_photo_example_popup" };
        const { data: cofferApiData } = await $api().getPageAPI(params);
        console.log("getPageData api => ", cofferApiData.value);

        const cofferPageData = (cofferApiData.value as any).data.schema;
        console.log("pageData => ", cofferPageData);

        cofferData.value.content = cofferPageData.content;

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

/**
 * 取得商品列表
 */
async function getList() {
    try {
        const params = {};
        const { data } = await $api().ProductLisAPI<ProductListAPIInterface>(params);

        const rows = (data.value as any).data;
        console.log("rows => ", rows);

        formDatas.value.productDatas.find((item: { prop: string }) => item.prop === "model").options = [];
        rows.forEach((item: { model: string }) => {
            formDatas.value.productDatas
                .find((item: { prop: string }) => item.prop === "model")
                .options.push({
                    value: item.model,
                    label: item.model,
                });
        });
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
            await getPageData();
            await getList();
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
                contract_order_number: form.value.contractId,
                customer_name: form.value.name,
                contact_phone: form.value.cellphone,
                city: form.value.city,
                detailed_address: form.value.address,
                district: form.value.location,
                contract_content: form.value.contractContent,
                landline: form.value.telephone,
                zip3: form.value.zip3,
                sk_contact_name: form.value.guardPerson,
                sk_contact_phone: form.value.guardCellphone,
                sk_landline: form.value.guardTelephone,
                installation_model: form.value.model,
                installation_quantity: form.value.quantity,
                appointment_time_slot: form.value.time,
                other_requirements: form.value.description,
                attachments: form.value.photo,
                captcha: form.value.recaptchaToken,
            };
            console.log(formData);
            try {
                const { data, status, error } = await $api().SkSecurityInstallationnAPI(formData);
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
