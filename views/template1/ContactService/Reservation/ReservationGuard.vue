<template>
  <BannerLayout
      :title="'新光保全安裝'"
      :banner="'/img/reservation/reservation-banner.jpg'"
      class="bg-gray-50"
  >
    <template #breadcrumbs>
      <Breadcrumb :menus="breadcrumbs"/>
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
            <div>親愛的顧客您好：<br/>完成預約後，專人將會在 3 個工作天內主動致電聯繫，詢問及確認需求，並且協助預約到府安裝。</div>
            <div class="my-[30px] border-b-[1px] border-gray-200"></div>
            <h3 class="text-[24px] font-bold mb-6">申請人</h3>
            <div class="grid grid-cols-2 gap-6">
              <template
                  v-for="(item, index) in formDatas.applyDatas"
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
            <h3 class="text-[24px] font-bold mb-6">新光保全</h3>
            <div class="grid grid-cols-2 gap-6">
              <template
                  v-for="(item, index) in formDatas.guardDatas"
                  :key="index"
              >
                <div :class="item.span ? `col-span-${item.span}` : ''">
                  <el-form-item :prop="item.prop" :label="item.label">
                    <el-input v-if="item.style === 'input'" :type="item.type" :show-password="item.showPassword" :disabled="item.disabled"
                              :placeholder="item.placeholder" v-model="form[item.prop]"></el-input>
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
                    <el-checkbox-group v-else-if="item.style === 'checkbox'" v-model="form[item.prop]">
                      <el-checkbox v-for="checkbox in item.checkboxData" :key="checkbox.label" :label="checkbox.value">{{checkbox.label}}
                      </el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </div>
                <template v-if="item.space">
                  <div v-for="index in item.space" :key="index"></div>
                </template>
                <template v-if="item.memoText || item.memoUrl">
                  <div :class="item.span ? `col-span-${item.span}` : ''">
                    <span>{{ item.memoText }}</span>
                    <template v-if="item.memoUrl">
                      <NuxtLink :to="item.memoUrl">
                        <span class="text-blue-500 ml-1 underline cursor-pointer underline-offset-2 hover:no-underline">{{ item.memoUrlText }}</span>
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
                  <el-form-item :prop="item.prop" :label="item.label">
                    <el-input v-if="item.style === 'input'" :type="item.type" :show-password="item.showPassword" :disabled="item.disabled"
                              :placeholder="item.placeholder" v-model="form[item.prop]"></el-input>
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
                    <el-checkbox-group v-else-if="item.style === 'checkbox'" v-model="form[item.prop]">
                      <el-checkbox v-for="checkbox in item.checkboxData" :key="checkbox.label" :label="checkbox.value">{{checkbox.label}}
                      </el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </div>
                <template v-if="item.space">
                  <div v-for="index in item.space" :key="index"></div>
                </template>
                <template v-if="item.memoText || item.memoUrl">
                  <div :class="item.span ? `col-span-${item.span}` : ''">
                    <span>{{ item.memoText }}</span>
                    <template v-if="item.memoUrl">
                      <NuxtLink :to="item.memoUrl">
                        <span class="text-blue-500 ml-1 underline cursor-pointer underline-offset-2 hover:no-underline">{{ item.memoUrlText }}</span>
                      </NuxtLink>
                    </template>
                  </div>
                </template>
              </template>
              <div class="col-span-2">
                <div class="bg-gray-50 px-4 py-3 leading-7">
                  <ul class="list-disc pl-4">
                    <li class="text-[15px]">請預填，後續將派專人與您聯繫</li>
                    <li class="text-[15px]">安裝過程中會有敲打、電鑽挖孔噪音，請先確認大樓社區能否假日施工，謝謝。</li>
                  </ul>
                </div>
              </div>
              <el-form-item class="col-span-2" prop="description" label="其他需求說明">
                <el-input  v-model="form.description" type="textarea" resize="none" :rows="5"></el-input>
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
                    <label
                        class="block w-full text-[15px] text-gray-800"
                    >
                      {{ item.label }} <span class="text-red-500">*</span>
                    </label>
                    <div class="flex gap-4 w-full mt-2 mb-4">
                      <div class="flex gap-1 items-center underline cursor-pointer underline-offset-2 hover:no-underline" @click="handleLocker">
                        <NuxtImg
                            class="w-4 h-fit aspect-square object-cover"
                            src="/img/repair/repair-doc-icon.svg"
                        />
                        電子鎖安裝照片範例說明</div>
                      <div class="flex gap-1 items-center underline cursor-pointer underline-offset-2 hover:no-underline" @click="handleCoffer">
                        <NuxtImg
                            class="w-4 h-fit aspect-square object-cover"
                            src="/img/repair/repair-doc-icon.svg"
                        />
                        保險箱安裝照片範例說明</div>
                    </div>
                    <FileUpload
                        v-if="item.style === 'file'"
                        :prop="item.prop"
                        @tempPath="handlefile"
                    />
                  </el-form-item>
                </div>
              </template>
              <div class="col-span-2">
                <div class="bg-gray-50 px-4 py-3 leading-7">
                  <ul class="list-disc pl-4">
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
            <NuxtLink :to="{ name: 'reservation-success-slug', params: { slug: '安裝預約送出成功' } }">
              <button class="yellow-btn btn-lg">確認送出</button>
            </NuxtLink>
          </div>
        </el-form>
      </div>
    </template>
  </BannerLayout>
  <client-only>
      <el-dialog
          class="custom-dialog max-h-[600px]"
          close-on-click-modal
          lock-scroll
          show-close
          :width="600"
          center
          align-center
          append-to-body
          v-model="dialogLocker"
      >
          <h3 class="text-[24px] font-bold text-gray-800 mb-[30px]">{{lockerData.title}}</h3>
          <div class="text-gray-800 edit-section" v-html="lockerData.content"></div>
      </el-dialog>
      <el-dialog
          class="custom-dialog max-h-[600px]"
          close-on-click-modal
          lock-scroll
          show-close
          :width="600"
          center
          align-center
          append-to-body
          v-model="dialogCoffer"
      >
          <h3 class="text-[24px] font-bold text-gray-800 mb-[30px]">{{ cofferData.title }}</h3>
          <div class="text-gray-800 edit-section" v-html="cofferData.content"></div>
      </el-dialog>
  </client-only>
</template>

<script setup lang="ts">
import BannerLayout from "~/views/template1/layouts/BannerLayout.vue";
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
import { validateTWMobileNumber } from "~/service/validator";
import { useInitializationStore } from "~/store/initializationStore";
import ContactWebFileUpload from "~/views/template1/ContactService/ContactWe/components/ContactWebFileUpload.vue";
import GoogleReCaptchaV2 from "~/components/GoogleRecaptchaV2.vue";
import FileUpload from "~/views/template1/ContactService/ContactWe/components/ContactWebFileUpload.vue";

const { $api } = useNuxtApp();

const breadcrumbs = ref([
  {
    name: "index",
    text: "首頁"
  },
  {
    name: "repair-slug",
    text: "維修與保固",
    params: { slug: "維修與保固" }
  },
  {
    name: "repair-detail-slug",
    text: "保固登記",
    params: { slug: "保固登記" },
    query: { id: "1" }
  }
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
  { value: 1, label: "租賃契約" },
  { value: 2, label: "賣斷" },
]);

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
  applyDatas: [
    {
      prop: "contractId",
      label: "成約訂單編號",
      placeholder: "",
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
            const addressProps = formDatas.value.applyDatas.find((item: { prop: string; }) => item.prop === 'address')
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
            const addressProps = formDatas.value.applyDatas.find((item: { prop: string; }) => item.prop === 'address')
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
  guardDatas: [
    {
      prop: "guardPerson",
      label: "新光保全-聯絡人",
      placeholder: "",
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
      style: "select"
    },
    {
      prop: "quantity",
      label: "安裝數量",
      placeholder: "請輸入數量",
      style: "input"
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
  ]
});

const rules = ref<any>({
  contractId: [
    {
      required: true,
      message: "請輸入成約訂單編號",
      trigger: "blur"
    }
  ],
  contractContent: [
    {
      required: true,
      message: "請選擇契約內容",
      trigger: "blur"
    }
  ],
  name: [
    {
      required: true,
      message: "請輸入客戶名稱",
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
      message: "請選擇地區",
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
  guardPerson: [
    {
      required: true,
      message: "請輸入聯絡人",
      trigger: "blur"
    }
  ],
  guardCellphone: [
    {
      required: true,
      message: "請輸入聯絡電話",
      trigger: "blur"
    }
  ],
  model: [
    {
      required: true,
      message: "請選擇安裝型號",
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
      message: "請選擇預約安裝時段",
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

// 電子鎖安裝照片彈窗
const dialogLocker = ref(false);

const handleLocker = () => {
  dialogLocker.value = true;
};

// 電子鎖彈窗資料
const lockerData = {
    title: "電子鎖安裝照片範例說明",
    content: "<div>範例如圖</div><ol><li>門室外(全)</li><li>門室內(全景)</li><li>門鎖正面(長度尺寸)</li><li>門鎖側面(量門厚)</li></ol>"
}

// 保險箱安裝照片彈窗
const dialogCoffer = ref(false);

const handleCoffer = () => {
  dialogCoffer.value = true;
};

// 保險箱彈窗資料
const cofferData = {
    title: "保險箱安裝照片範例說明",
    content: "<div>範例如圖</div><ol><li>門室外(全)</li><li>門室內(全景)</li><li>門鎖正面(長度尺寸)</li><li>門鎖側面(量門厚)</li></ol>"
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
