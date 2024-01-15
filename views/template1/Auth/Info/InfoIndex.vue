<template>
    <section class="min-h-screen mt-[94px] pb-[60px] bg-gray-50">
        <nav class="border-t border-b border-gray-300 py-[16px] bg-white">
            <div class="grid grid-cols-7 gap-0">
                <div class="col-span-7 ml-[122px]">
                    <Breadcrumb :menus="breadcrumbs" />
                </div>
            </div>
        </nav>
        <div class="container">
            <div class="w-[620px] mt-[60px] py-[60px] px-[60px] bg-white mx-auto rounded-[24px] border-[1px] border-gray-200">
                <h3 class="font-medium text-[28px] text-center mb-8">會員資料</h3>
                <el-form
                    class="custom-form"
                    ref="formRefDom"
                    :model="form"
                    :rules="rules"
                    require-asterisk-position="right"
                >
                    <div class="grid gap-6">
                        <div
                            v-for="(item, index) in formDatas"
                            :key="index"
                        >
                            <el-form-item v-if="item.style === 'input'" :prop="item.prop" :label="item.label">
                                <el-input :type="item.type" :show-password="item.showPassword" :disabled="item.disabled"
                                          :placeholder="item.placeholder" v-model="form[item.prop]"></el-input>
                            </el-form-item>
                            <el-form-item v-else-if="item.style === 'radio'" :prop="item.prop" :label="item.label">
                                <el-radio-group v-model="form[item.prop]">
                                    <el-radio
                                        v-for="(option, radio_index) in item.radioData"
                                        :key="radio_index"
                                        :label="option.value"
                                        size="large"
                                    >{{ option.label }}
                                    </el-radio
                                    >
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item v-else-if="item.style === 'datepicker'" :prop="item.prop">
                                <div class="el-form-item w-full">
                                    <div class="el-form-item__label">{{ item.label }}<span class="ml-[2px] text-red-500"
                                                                                           v-if="item.required">*</span>
                                    </div>
                                    <el-date-picker
                                        v-model="form[item.prop]"
                                        type="date"
                                        valueFormat="YYYY-MM-DD"
                                        :placeholder="item.placeholder"
                                        popper-class="date-box"
                                    />
                                </div>
                            </el-form-item>
                        </div>
                        <div class="flex mt-4 gap-4 justify-center">
                            <NuxtLink
                                :to="{ name: 'auth-panel-slug', params: { slug: '會員中心' }}"
                            >
                                <button
                                    class="transparent-btn btn-md"
                                >
                                    返回
                                </button>
                            </NuxtLink>
                            <button
                                class="yellow-btn btn-md"
                            >
                                儲存
                            </button>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";

const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁"
    },
    {
        name: "auth-panel-slug",
        text: "會員中心",
        params: { slug: "會員中心" }
    },
    {
        name: "auth-info-slug",
        text: "會員資料",
        params: { slug: "會員資料" }
    }
]);

const formRefDom = ref<any>();

const form = ref<any>({
    email: "a123@gmail.com",
    name: "王小明",
    cellphone: "0911222222",
    telephone: "0212222222",
    gender: 1,
    birthday: "2000-01-01"
});

const genderRadios = ref<any>([
    { value: 1, label: "先生" },
    { value: 0, label: "女士" }
]);

const formDatas = ref<any>([
    {
        prop: "email",
        label: "帳號",
        placeholder: "",
        style: "input",
        disabled: true
    },
    {
        prop: "name",
        label: "會員姓名",
        placeholder: "",
        style: "input"
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
        prop: "gender",
        label: "稱謂",
        style: "radio",
        radioData: genderRadios
    },
    {
        prop: "birthday",
        label: "生日",
        style: "datepicker",
        required: true
    }
]);

const rules = ref<any>({
    email: [
        {
            required: true,
            message: "請輸入帳號",
            trigger: "blur"
        }
    ],
    name: [
        {
            required: true,
            message: "請輸入姓名",
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
    gender: [
        {
            required: true,
            message: "請輸入聯絡電話",
            trigger: "blur"
        }
    ]
});
</script>