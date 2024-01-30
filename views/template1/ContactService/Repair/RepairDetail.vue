<template>
    <BannerLayout
        :title="'線上報修'"
        :banner="'/img/repair/repair-detail-banner.jpg'"
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
                    <div class="w-3/4 mt-[80px] p-[60px] pt-[50px] bg-white mx-auto rounded-[24px] border-[1px] border-gray-200">
                        <h3 class="text-[24px] font-bold mb-6">報修聯絡人</h3>
                        <div class="grid grid-cols-2 gap-6">
                            <template
                                v-for="(item, index) in formDatas.contactDatas"
                                :key="index"
                            >
                                <div v-if="item?.type !== 'inline'" :class="item.span ? `col-span-${item.span}` : ''">
                                    <el-form-item :prop="item.prop" :label="item.label">
                                        <el-input v-if="item.style === 'input'" :type="item.type" :show-password="item.showPassword" :disabled="item.disabled"
                                                  :placeholder="item.placeholder" v-model="form[item.prop]"></el-input>
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
                                        <el-form-item :prop="item2.prop" :label="item2.label">
                                            <el-input v-if="item2.style === 'input'" :type="item2?.type" :show-password="item2.showPassword" :disabled="item2.disabled"
                                                      :placeholder="item2.placeholder" v-model="form[item2.prop]"></el-input>
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
                                    <div v-for="index in item.space" :key="index"></div>
                                </template>
                            </template>
                        </div>
                    </div>
                    <div class="w-3/4 mt-[40px] p-[60px] pt-[50px] bg-white mx-auto rounded-[24px] border-[1px] border-gray-200">
                        <h3 class="text-[24px] font-bold mb-6">報修商品資訊</h3>
                        <div class="grid grid-cols-2 gap-6">
                            <template
                                v-for="(item, index) in formDatas.productDatas"
                                :key="index"
                            >
                                <div v-if="item?.type !== 'inline'" :class="item.span ? `col-span-${item.span}` : ''">
                                    <el-form-item :prop="item.prop" :label="item.label">
                                        <el-input v-if="item.style === 'input'" :type="item.type" :show-password="item.showPassword" :disabled="item.disabled"
                                                  :placeholder="item.placeholder" resize="none" :rows="item.row" v-model="form[item.prop]"></el-input>
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
                                        <el-radio-group v-else-if="item.style === 'radio'" v-model="form[item.prop]">
                                            <el-radio
                                                v-for="(option, radio_index) in item.radioData"
                                                :key="radio_index"
                                                :label="option.value"
                                                size="large"
                                            >{{ option.label }}
                                            </el-radio
                                            >
                                        </el-radio-group>
                                        <el-date-picker v-else-if="item.style === 'datepicker'"
                                                        v-model="form[item.prop]"
                                                        type="date"
                                                        valueFormat="YYYY-MM-DD"
                                                        :placeholder="item.placeholder"
                                                        popper-class="date-box"
                                        />
                                        <FileUpload
                                            v-else-if="item.style === 'file'"
                                            :prop="item.prop"
                                            @tempPath="handlefile"
                                        />
                                        <VideoUpload
                                            v-else-if="item.style === 'video'"
                                            :prop="item.prop"
                                            @tempPath="handlefile"
                                        />
                                        <el-checkbox-group v-else-if="item.style === 'checkbox'" v-model="form[item.prop]">
                                          <el-checkbox v-for="checkbox in item.checkboxData" :key="checkbox.label" :label="checkbox.value">{{checkbox.label}}
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
                                        <el-form-item :prop="item2.prop" :label="item2.label">
                                            <el-input v-if="item2.style === 'input'" :type="item2?.type" :show-password="item2.showPassword" :disabled="item2.disabled"
                                                      :placeholder="item2.placeholder" v-model="form[item2.prop]"></el-input>
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
                                    <div v-for="index in item.space" :key="index"></div>
                                </template>
                                <!--   備註小字   -->
                                <template v-if="item.memoText">
                                    <div :class="item.span ? `col-span-${item.span}` : ''">
                                      <span>{{ item.memoText }}</span>
                                      <template v-if="item.memoFunctionText">
                                          <span @click="item.memoFunction ? item.memoFunction() : null" class="text-blue-500 ml-1 underline cursor-pointer underline-offset-2 hover:no-underline">{{ item.memoFunctionText }}</span>
                                      </template>
                                    </div>
                                </template>
                                <!--   備註列表   -->
                                <template v-if="item.listText">
                                  <div class="col-span-2" v-html="item.listText"></div>
                                </template>
                            </template>
                            <div class="flex justify-start">
                                <GoogleReCaptchaV2 v-model="form.recaptchaToken" />
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center mt-[40px]">
                        <NuxtLink :to="{ name: 'repair-detail-success-slug', params: { slug: '線上報修成功' } }">
                            <button class="yellow-btn btn-lg">確認送出</button>
                        </NuxtLink>
                    </div>
                </el-form>
            </div>
        </template>
    </BannerLayout>
    <client-only>
        <el-dialog
            class="custom-dialog"
            close-on-click-modal
            lock-scroll
            show-close
            :width="600"
            center
            align-center
            append-to-body
            v-model="dialogSerial"
        >
            <h3 class="text-[24px] font-bold text-gray-800 mb-[30px]">{{serialData.title}}</h3>
            <div class="text-gray-800 edit-section" v-html="serialData.content"></div>
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

const { $api, $utils } = useNuxtApp();
const router = useRouter();
const route = useRoute();

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
    series: 1,
    date: "",
    model: "",
    quantity: "",
    serial: "",
    time: [],
    description: "",
    photo: "",
});

const seriesRadios = ref<any>([
    { value: 1, label: "電子門鎖" },
    { value: 2, label: "電子保險箱" },
]);

const timeOptions = ref<any>([
    { value: 1, label: "平日時段 (週一~週五) 早上" },
    { value: 2, label: "平日時段 (週一~週五) 下午" },
    { value: 3, label: "假日時段 (六、日) 早上" },
    { value: 4, label: "假日時段 (六、日) 下午" },
]);

const formDatas = ref<any>({
    contactDatas: [
        {
            prop: "contactPerson",
            label: "聯絡人",
            placeholder: "",
            style: "input",
            space: 1,
        },
        {
            prop: "cellphone",
            label: "聯絡電話",
            placeholder: "例：0911-222-222",
            style: "input"
        },
        {
            prop: "telephone",
            label: "市話",
            placeholder: "例：02-1222-2222",
            style: "input"
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
                        const addressProps = formDatas.value.contactDatas.find((item: { prop: string; }) => item.prop === 'address')
                        addressProps.datas.find((item: { prop: string }) => item.prop === 'location').options = cityDataFilter.district.map((item: { name: any; zip3: any }) => {
                            return {
                                label: item.name,
                                value: item.name,
                                zip3: item.zip3,
                            };
                        });
                    }
                },
                {
                    prop: "location",
                    label: "地區",
                    placeholder: "請選擇",
                    options: [],
                    style: "select",
                    function: (e: any) => {
                        console.log(e);
                        const addressProps = formDatas.value.contactDatas.find((item: { prop: string; }) => item.prop === 'address')
                        e.zip3 = addressProps.datas.find((item: { prop: string }) => item.prop === 'location').options.find((item: { value: any }) => item.value === e.location).zip3;
                    },
                },
                {
                    prop: "zip3",
                    label: "郵遞區號",
                    placeholder: "",
                    style: "input",
                    disabled: true
                }
            ]
        },
        {
            prop: "address",
            label: "詳細地址",
            placeholder: "",
            style: "input",
            span: 2,
        },
    ],
    productDatas: [
        {
            prop: "series",
            label: "系列選擇",
            placeholder: "",
            style: "radio",
            radioData: seriesRadios
        },
        {
            prop: "date",
            label: "安裝日期",
            placeholder: "請輸入購買日期或安裝日期",
            style: "datepicker"
        },
        {
            prop: "model",
            label: "報修型號",
            placeholder: "請選擇型號",
            style: "select"
        },
        {
            prop: "quantity",
            label: "報修數量",
            placeholder: "請輸入數量",
            style: "input"
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
            listText: "<div class='grid-cols-2'><div class='bg-gray-50 px-4 py-3'><ul class='list-disc pl-4'><li class='text-[15px]'>請預填，後續將派專人與您聯繫</li></ul></div></div>"
        },
        {
            prop: "description",
            label: "狀況說明",
            placeholder: "",
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
    ]
})

const rules = ref<any>({
  contactPerson: [
    {
      required: true,
      message: "請輸入聯絡人",
      trigger: "blur"
    }
  ],
  cellphone: [
    {
      required: true,
      message: "請輸入聯絡電話",
      trigger: "blur"
    }
  ],
  city: [
    {
      required: true,
      message: "請選擇縣市",
      trigger: "blur"
    }
  ],
  location: [
    {
      required: true,
      message: "請輸入地區",
      trigger: "blur"
    }
  ],
  address: [
    {
      required: true,
      message: "請輸入詳細地址",
      trigger: "blur"
    }
  ],
  series: [
    {
      required: true,
      message: "請輸入填單人聯絡電話",
      trigger: "blur"
    }
  ],
  date: [
    {
      required: true,
      message: "請選擇安裝日期",
      trigger: "blur"
    }
  ],
  model: [
    {
      required: true,
      message: "請輸入報修型號",
      trigger: "change"
    }
  ],
  serial: [
    {
      required: true,
      message: "請輸入產品序號",
      trigger: "blur"
    }
  ],
  quantity: [
    {
      required: true,
      message: "請輸入報修數量",
      trigger: "blur"
    }
  ],
  time: [
    {
      required: true,
      message: "請選擇維修時段",
      trigger: "change",
    }
  ],
  description: [
    {
      required: true,
      message: "請輸入狀況說明",
      trigger: "blur"
    }
  ],
  photo: [
    {
      required: true,
      message: "請選擇照片",
      trigger: "blur"
    }
  ],
});

function handlefile(tempPath: any, prop: string) {
  form.value[prop] = tempPath;
  formRefDom.value.validateField("photo");
}

// 序號位置彈窗資料
const serialData = {
    title: '序號位置範例',
    content: '<div>範例如圖</div><ol><li>盒子底下</li><li>保固書</li></ol>'
}

// async function onSubmit() {
//   formRefDom.value.validate(async (valid: any) => {
//     if (!valid) {
//       ElMessage({
//         type: "error",
//         message: `尚有欄位未填`,
//       });
//     }
//   })
// }
</script>
