<template>
    <BannerLayout
        :title="'保固登記'"
        :banner="'/img/repair/repair-warranty-banner.jpg'"
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
                    <div class="w-3/4 mt-[80px] p-[60px] bg-white mx-auto rounded-[24px] border-[1px] border-gray-200">
                        <h3 class="text-[24px] font-bold mb-6">序號登錄</h3>
                        <div class="grid grid-cols-2 gap-6">
                            <div
                                v-for="(item, index) in formDatas?.registerDatas"
                                :key="index"
                                :class="`col-span-${item.span}`"
                            >
                                <el-form-item :prop="item.prop" :label="item.label">
                                    <el-input v-if="item.style === 'input'" :type="item.type"
                                              :show-password="item.showPassword" :disabled="item.disabled"
                                              :placeholder="item.placeholder" v-model="form[item.prop]"></el-input>
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
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                    <div class="w-3/4 mt-[40px] p-[60px] bg-white mx-auto rounded-[24px] border-[1px] border-gray-200">
                        <h3 class="text-[24px] font-bold mb-6">安裝客戶資料</h3>
                        <div class="grid grid-cols-2 gap-6">
                            <div
                                v-for="(item, index) in formDatas?.customerDatas"
                                :key="index"
                                :class="`col-span-${item.span}`"
                            >
                                <el-form-item :prop="item.prop" :label="item.label">
                                    <el-input v-if="item.style === 'input'" :type="item.type"
                                              :show-password="item.showPassword" :disabled="item.disabled"
                                              :placeholder="item.placeholder" v-model="form[item.prop]"></el-input>
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
                    <div class="w-3/4 mt-[40px] p-[60px] bg-white mx-auto rounded-[24px] border-[1px] border-gray-200">
                        <h3 class="text-[24px] font-bold mb-6">序號</h3>
                        <div class="grid grid-cols-2 gap-6">
                            <div
                                v-for="(item, index) in formDatas?.serialDatas"
                                :key="index"
                                :class="`col-span-${item.span}`"
                            >
                                <el-form-item :prop="item.prop" :label="item.label">
                                    <el-input v-if="item.style === 'input'" :type="item.type"
                                              :show-password="item.showPassword" :disabled="item.disabled"
                                              :placeholder="item.placeholder" v-model="form[item.prop]"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center mt-[40px]">
                        <NuxtLink :to="{ name: 'repair-warranty-success-slug', params: { slug: '保固登記成功' } }">
                            <button class="yellow-btn btn-lg">確認送出</button>
                        </NuxtLink>
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

const formRefDom = ref<any>();

const form = ref<any>({
    order: "202401-096",
    companyName: "",
    date: "",
    purpose: "",
    serial: "",
    quantity: "",
    name: "",
    phone: "",
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    memo: "",
    building: "",
});

const formDatas = ref<any>({
    registerDatas: [
        {
            prop: "order",
            label: "項次",
            placeholder: "",
            style: "input",
            disabled: true
        },
        {
            prop: "companyName",
            label: "廠商/公司名稱",
            placeholder: "",
            style: "input"
        },
        {
            prop: "date",
            label: "安裝或出貨日期",
            style: "datepicker",
            placeholder: "請選擇日期"
        },
        {
            prop: "purpose",
            label: "銷售用途",
            placeholder: "請選擇",
            style: "select",
            options: "" // 選項放在這裡
        },
        {
            prop: "serial",
            label: "型號",
            style: "select",
            placeholder: "請選擇",
            options: "" // 選項放在這裡
        },
        {
            prop: "quantity",
            label: "數量",
            placeholder: "",
            style: "input"
        },
        {
            prop: "name",
            label: "填單人姓名",
            style: "input"
        },
        {
            prop: "phone",
            label: "填單人聯絡電話",
            style: "input"
        }
    ],
    customerDatas:[
        {
            prop: "customerName",
            label: "客戶名稱",
            placeholder: "",
            style: "input",
        },
        {
            prop: "customerPhone",
            label: "聯絡電話",
            placeholder: "",
            style: "input",
        },
        {
            prop: "customerAddress",
            label: "安裝或出貨地址",
            placeholder: "",
            style: "input",
            span: 2,
        },
        {
            prop: "memo",
            label: "備註",
            placeholder: "",
            style: "input",
            span: 2,
        },
        {
            prop: "building",
            label: "建案名稱",
            placeholder: "",
            style: "input",
            span: 2,
        },
    ],
    serialDatas: Array.from({ length: 16 }, (v, i) => ({
        prop: `serial${i + 1}`,
        label: "序號",
        placeholder: "",
        style: "input",
        span: 1,
    })),
});

const rules = ref<any>({
    order: [
        {
            required: true,
            message: "請輸入項次",
            trigger: "blur"
        }
    ],
    companyName: [
        {
            required: true,
            message: "請輸入廠商/公司名稱",
            trigger: "blur"
        }
    ],
    date: [
        {
            required: true,
            message: "請輸入安裝或出貨日期",
            trigger: "blur"
        }
    ],
    serial: [
        {
            required: true,
            message: "請選擇型號",
            trigger: "blur"
        }
    ],
    quantity: [
        {
            required: true,
            message: "請輸入數量",
            trigger: "blur"
        }
    ],
    name: [
        {
            required: true,
            message: "請輸入填單人姓名",
            trigger: "blur"
        }
    ],
    phone: [
        {
            required: true,
            message: "請輸入填單人聯絡電話",
            trigger: "blur"
        }
    ],
    customerName: [
        {
            required: true,
            message: "請輸入客戶名稱",
            trigger: "blur"
        }
    ],
    customerPhone: [
        {
            required: true,
            message: "請輸入聯絡電話",
            trigger: "blur"
        }
    ],
    customerAddress: [
        {
            required: true,
            message: "請輸入安裝或出貨地址",
            trigger: "blur"
        }
    ],
    memo: [
        {
            required: true,
            message: "請輸入備註",
            trigger: "blur"
        }
    ],
    building: [
        {
            required: true,
            message: "請輸入建案名稱",
            trigger: "blur"
        }
    ],
    serial1: [
        {
            required: true,
            message: "請輸入序號",
            trigger: "blur"
        }
    ],
});
</script>
