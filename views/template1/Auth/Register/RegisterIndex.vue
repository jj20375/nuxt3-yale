<template>
    <section class="min-h-screen mt-[94px] py-[60px] bg-gray-50 border-t border-gray-300">
        <div class="container">
            <div class="w-3/4 p-[60px] bg-white mx-auto rounded-[24px] border-[1px] border-gray-200">
                <h3 class="text-[24px] font-bold mb-6">加入會員</h3>
                <el-form
                    class="custom-form"
                    ref="formRefDom"
                    :model="form"
                    :rules="rules"
                    require-asterisk-position="right"
                >
                    <div class="grid grid-cols-2 gap-6">
                        <el-form-item prop="name" label="會員姓名">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <!--  佔位用  -->
                        <div></div>
                        <el-form-item prop="email" label="電子信箱">
                            <el-input v-model="form.email"></el-input>
                        </el-form-item>
                        <!--  佔位用  -->
                        <div></div>
                        <el-form-item prop="cellphone" label="聯絡電話">
                            <el-input v-model="form.cellphone" placeholder="例：0911-222-222"></el-input>
                        </el-form-item>
                        <el-form-item prop="telephone" label="市話">
                            <el-input v-model="form.telephone" placeholder="例：02-1222-2222"></el-input>
                        </el-form-item>
                        <el-form-item prop="birthday">
                            <div class="el-form-item w-full">
                                <div class="el-form-item__label">生日<span class="ml-[2px] text-red-500">*</span></div>
                                <el-date-picker
                                    v-model="form.date"
                                    type="date"
                                    valueFormat="YYYY-MM-DD"
                                    placeholder="請點選生日"
                                    popper-class="date-box"
                                />
                            </div>
                        </el-form-item>
                        <!--  佔位用  -->
                        <div></div>
                        <el-form-item prop="gender" label="稱謂">
                            <el-radio-group v-model="form.gender">
                                <el-radio
                                    v-for="(option, index) in genderRadios"
                                    :key="index"
                                    :label="option.value"
                                    size="large"
                                >{{ option.label }}</el-radio
                                >
                            </el-radio-group>
                        </el-form-item>
                        <!--  佔位用  -->
                        <div></div>
                        <div class="col-span-2">
                            <div class="grid grid-cols-3 gap-6">
                                <div
                                    v-for="(item, index) in formDatas"
                                    :key="index"
                                >
                                    <el-form-item :prop="item.prop" :label="item.label">
                                        <el-input v-if="item.style === 'input'" :type="item.type" :disabled="item.disabled"
                                                  :placeholder="item.placeholder" v-model="form[item.prop]"></el-input>
                                        <el-select
                                            v-if="item.style === 'select'"
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
                        <el-form-item class="col-span-2" prop="address" label="詳細地址">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item prop="password" label="密碼">
                            <el-input v-model="form.password" showPassword type="password"></el-input>
                        </el-form-item>
                        <!--  佔位用  -->
                        <div></div>
                        <el-form-item prop="confirmPassword" label="確認密碼">
                            <el-input v-model="form.confirmPassword" showPassword type="password"></el-input>
                        </el-form-item>
                        <!--  佔位用  -->
                        <div></div>
                        <el-form-item class="!mb-0"
                                      prop="agree"
                        >
                            <el-checkbox
                                class="!h-fit text-[15px]"
                                v-model="form.agree"
                                size="large"
                            >
                                <slot name="label">我已閱讀並同意
                                    <NuxtLink class="underline font-bold underline-offset-2 cursor-pointer hover:no-underline" :to="{ name: ''}">網站服務條款</NuxtLink>
                                    與
                                    <NuxtLink class="underline font-bold underline-offset-2 cursor-pointer hover:no-underline" :to="{ name: ''}">隱私權政策</NuxtLink>
                                </slot>
                            </el-checkbox>
                        </el-form-item>
                        <div class="flex justify-center col-span-2 mt-10">
                            <button class="yellow-btn btn-lg !py-3">
                                立即註冊
                            </button>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { useInitializationStore } from "~/store/initializationStore";
const { $api } = useNuxtApp();

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
    name: "",
    email: "",
    cellphone: "",
    birthday: "",
    gender: "",
    city: "",
    location: "",
    zip3: "235",
    password: "",
    confirmPassword: "",
    agree: false,
});

const formDatas = ref<any>([
    {
        prop: "city",
        label: "縣市",
        placeholder: "請選擇",
        options: initializationStore.cityData,
        type: "inline",
        style: "select",
        function: (e: any) => {
            console.log(e);
            e.location = "";

            const cityDataFilter = initializationStore.cityAreaData.find((item: { name: any }) => item.name === e.city);
            console.log("cityDataFilter.district", cityDataFilter);
            formDatas.value[1].options = cityDataFilter.district.map((item: { name: any }) => {
                return {
                    label: item.name,
                    value: item.name,
                };
            });
        },
    },
    {
        prop: "location",
        label: "地區",
        placeholder: "請選擇",
        options: [],
        type: "inline",
        style: "select",
    },
    {
        prop: "zip3",
        label: "郵遞區號",
        placeholder: "",
        type: "inline",
        style: "input",
        disabled: true,
    },
]);

const genderRadios = ref<any>([
    { value: 1, label: "先生" },
    { value: 0, label: "女士" }
]);

const rules = ref<any>({
    name: [
        {
            required: true,
            message: "請輸入會員姓名",
            trigger: "blur"
        }
    ],
    email: [
        {
            required: true,
            message: "請輸入電子信箱",
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
            message: "請選擇稱謂",
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
            message: "請選擇稱地址",
            trigger: "blur"
        }
    ],
    address: [
        {
            required: true,
            message: "請輸入地址",
            trigger: "blur"
        }
    ],
    password: [
        {
            required: true,
            message: "請輸入密碼",
            trigger: "blur"
        }
    ],
    confirmPassword: [
        {
            required: true,
            message: "請輸入密碼",
            trigger: "blur"
        }
    ],
});
</script>