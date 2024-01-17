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
                        <el-form-item
                            prop="name"
                            label="會員姓名"
                        >
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <!--  佔位用  -->
                        <div></div>
                        <el-form-item
                            prop="email"
                            label="電子信箱"
                        >
                            <el-input v-model="form.email"></el-input>
                        </el-form-item>
                        <!--  佔位用  -->
                        <div></div>
                        <el-form-item
                            prop="cellphone"
                            label="聯絡電話"
                        >
                            <el-input
                                v-model="form.cellphone"
                                placeholder="例：0911-222-222"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            prop="telephone"
                            label="市話"
                        >
                            <el-input
                                v-model="form.telephone"
                                placeholder="例：02-1222-2222"
                            ></el-input>
                        </el-form-item>
                        <el-form-item prop="birthday">
                            <div class="w-full el-form-item">
                                <div class="el-form-item__label">生日<span class="ml-[2px] text-red-500">*</span></div>
                                <el-date-picker
                                    v-model="form.birthday"
                                    type="date"
                                    valueFormat="YYYY-MM-DD"
                                    placeholder="請點選生日"
                                    popper-class="date-box"
                                />
                            </div>
                        </el-form-item>
                        <!--  佔位用  -->
                        <div></div>
                        <el-form-item
                            prop="gender"
                            label="稱謂"
                        >
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
                                    <el-form-item
                                        :prop="item.prop"
                                        :label="item.label"
                                    >
                                        <el-input
                                            v-if="item.style === 'input'"
                                            :type="item.type"
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
                        <el-form-item
                            class="col-span-2"
                            prop="address"
                            label="詳細地址"
                        >
                            <el-input v-model="form.address"></el-input>
                        </el-form-item>
                        <el-form-item
                            prop="password"
                            label="密碼"
                        >
                            <el-input
                                v-model="form.password"
                                showPassword
                                type="password"
                            ></el-input>
                        </el-form-item>
                        <!--  佔位用  -->
                        <div></div>
                        <el-form-item
                            prop="confirmPassword"
                            label="確認密碼"
                        >
                            <el-input
                                v-model="form.confirmPassword"
                                showPassword
                                type="password"
                            ></el-input>
                        </el-form-item>
                        <!--  佔位用  -->
                        <div></div>
                        <el-form-item
                            class="!mb-0"
                            prop="agree"
                        >
                            <el-checkbox
                                class="!h-fit text-[15px]"
                                v-model="form.agree"
                                size="large"
                            >
                                <slot name="label"
                                    >我已閱讀並同意
                                    <NuxtLink
                                        class="font-bold underline cursor-pointer underline-offset-2 hover:no-underline"
                                        :to="{ name: '' }"
                                        >網站服務條款</NuxtLink
                                    >
                                    與
                                    <NuxtLink
                                        class="font-bold underline cursor-pointer underline-offset-2 hover:no-underline"
                                        :to="{ name: '' }"
                                        >隱私權政策</NuxtLink
                                    >
                                </slot>
                            </el-checkbox>
                        </el-form-item>
                        <div class="flex justify-center col-span-2 mt-10">
                            <button
                                @click.prevent="onSubmit"
                                class="yellow-btn btn-lg !py-3"
                            >
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
import { InternalRuleItem } from "async-validator/dist-types/interface";
import { validateEmail, validateTWMobileNumber, validatePassword } from "~/service/validator";
import { ElMessage, ElLoading } from "element-plus";
import { useUserStore } from "~/store/userStore";
import Cookies from "js-cookie";

const { $api } = useNuxtApp();
const router = useRouter();

const userStore = useUserStore();

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
    telephone: "",
    birthday: "",
    gender: "",
    city: "",
    location: "",
    zip3: "",
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
            e.zip3 = "";

            const cityDataFilter = initializationStore.cityAreaData.find((item: { name: any }) => item.name === e.city);
            console.log("cityDataFilter.district", cityDataFilter);
            const addressProps = formDatas.value.find((item: { prop: string }) => item.prop === "location");
            addressProps.options = cityDataFilter.district.map((item: { name: any; zip3: any }) => {
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
        type: "inline",
        style: "select",
        function: (e: any) => {
            console.log(e);
            const addressProps = formDatas.value.find((item: { prop: string }) => item.prop === "location");
            e.zip3 = addressProps.options.find((item: { value: any }) => item.value === e.location).zip3;
        },
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
    { value: "male", label: "先生" },
    { value: "female", label: "女士" },
]);

const rules = ref<any>({
    name: [
        {
            required: true,
            message: "請輸入會員姓名",
            trigger: "blur",
        },
    ],
    email: [
        {
            required: true,
            message: "請輸入電子信箱",
            trigger: "blur",
        },
        {
            required: true,
            validator: validateEmail,
            trigger: ["change", "blur"],
            message: "格式不正確",
        },
    ],
    cellphone: [
        {
            required: true,
            message: "請輸入聯絡電話",
            trigger: "blur",
        },
        {
            required: true,
            validator: validateTWMobileNumber,
            trigger: ["change", "blur"],
            message: "格式不正確",
        },
    ],
    gender: [
        {
            required: true,
            message: "請選擇稱謂",
            trigger: "blur",
        },
    ],
    city: [
        {
            required: true,
            message: "請選擇縣市",
            trigger: "blur",
        },
    ],
    location: [
        {
            required: true,
            message: "請選擇稱地址",
            trigger: "blur",
        },
    ],
    address: [
        {
            required: true,
            message: "請輸入地址",
            trigger: "blur",
        },
    ],
    password: [
        {
            required: true,
            message: "請輸入密碼",
            trigger: "blur",
        },
        {
            required: true,
            validator: validatePassword,
            trigger: ["change", "blur"],
            message: "必須包含至少一個大寫字母、一個小寫字母和一個數字，並且長度至少為 8 個字元。",
        },
    ],
    confirmPassword: [
        {
            required: true,
            message: "請輸入密碼",
            trigger: "blur",
        },
        {
            required: true,
            message: "密碼不一致",
            validator: (rule: InternalRuleItem, value: string, callback: (error?: string | Error) => void) => {
                if (value !== form.value.password) {
                    callback(new Error());
                } else {
                    callback();
                }
            },
            trigger: "change",
        },
    ],
});

async function onSubmit() {
    formRefDom.value.validate(async (valid: any) => {
        if (!valid) {
            ElMessage({
                type: "error",
                message: `尚有欄位未填`,
            });
        } else {
            const loading = ElLoading.service({
                lock: true,
                text: "送出中...",
                background: "rgba(0, 0, 0, 0.7)",
            });
            try {
                const params = {
                    name: form.value.name,
                    email: form.value.email,
                    phone: form.value.cellphone,
                    telephone: form.value.telephone,
                    city: form.value.city,
                    district: form.value.location,
                    zip3: form.value.zip3,
                    address: form.value.address,
                    birthday: form.value.birthday,
                    sex: form.value.gender,
                    password: form.value.password,
                };
                const { data, status, error } = await $api().RegisterAPI(params);
                if (status.value === "success") {
                    await login({ email: form.value.email, password: form.value.password });
                    ElMessage({
                        type: "success",
                        message: `註冊成功`,
                    });
                    router.push({ name: "auth-register-success-slug", params: { slug: "註冊成功" } });
                } else {
                    ElMessage({
                        type: "error",
                        message: (error.value as any).data.message,
                    });
                }
                loading.close();
            } catch (err) {
                ElMessage({
                    type: "error",
                    message: "註冊失敗",
                });
                loading.close();
                console.log("HomeSampleAPI => ", err);
            }
        }
    });
}

/**
 * 登入
 * @param form 登入資料
 */
async function login(form: { email: string; password: string }) {
    try {
        const { data, status, error }: any = await $api().LoginAPI(form);
        if (status.value === "success") {
            const token = data.value.data.token;
            Cookies.set("token", token);
            // 取得使用者資料
            await userStore.getUserProfile();
        } else {
            ElMessage({
                type: "error",
                message: error.value.data.message,
            });
        }
    } catch (err) {
        console.log("LoginAPI => ", err);
    }
}
</script>
