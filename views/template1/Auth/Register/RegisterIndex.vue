<template>
    <section class="mt-headerMb xl:mt-header py-[36px] sm:py-[60px] bg-gray-50 border-t border-gray-300">
        <div class="container">
            <div class="w-full xl:w-3/4 px-[24px] py-[36px] sm:p-[60px] bg-white mx-auto rounded-[24px] border-[1px] border-gray-200">
                <h3 class="text-[24px] font-bold mb-6">加入會員</h3>
                <el-form
                    class="custom-form"
                    ref="formRefDom"
                    :model="form"
                    :rules="rules"
                    require-asterisk-position="right"
                >
                    <div class="flex flex-col grid-cols-2 gap-6 md:grid">
                        <template
                            v-for="(item, index) in formDatas"
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
                                class="flex flex-col flex-1 gap-6 md:flex-row"
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
                            <template v-if="item.space && !isPad">
                                <div
                                    v-for="index in item.space"
                                    :key="index"
                                ></div>
                            </template>
                        </template>
                        <el-form-item
                            class="!mb-0"
                            prop="agree"
                        >
                            <el-checkbox
                                class="!h-fit"
                                v-model="form.agree"
                                size="large"
                            >
                                <slot name="label"
                                    ><span class="text-[14px]">我已閱讀並同意 </span>
                                    <NuxtLink
                                        class="font-bold underline cursor-pointer underline-offset-2 hover:no-underline text-[14px]"
                                        target="_blank"
                                        :to="{
                                            name: 'other-terms-slug',
                                            params: { slug: '耶魯網站服務條款' },
                                        }"
                                        >網站服務條款</NuxtLink
                                    >
                                    <span class="text-[14px]"> 與 </span>
                                    <NuxtLink
                                        class="font-bold underline cursor-pointer underline-offset-2 hover:no-underline text-[14px]"
                                        target="_blank"
                                        :to="{ name: 'other-privacy-slug', params: { slug: '耶魯隱私權政權' } }"
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
import { validateEmail, validateTWMobileNumber, validatePassword, validateSingleCheckbox, validateTelephoneNumber } from "~/service/validator";
import { ElMessage, ElLoading } from "element-plus";
import { useUserStore } from "~/store/userStore";
import { useShoppingCarStore } from "~/store/shoppingCarStore";
import Cookies from "js-cookie";

const { $api } = useNuxtApp();
const router = useRouter();
const { isPad } = useWindowResize();
const userStore = useUserStore();
const shoppingCarStore = useShoppingCarStore();

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

const genderRadios = ref<any>([
    { value: "male", label: "先生" },
    { value: "female", label: "女士" },
]);

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
        prop: "name",
        label: "會員姓名",
        placeholder: "",
        style: "input",
        space: 1,
    },
    {
        prop: "email",
        label: "電子信箱",
        placeholder: "",
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
        prop: "birthday",
        label: "生日",
        placeholder: "請選擇日期",
        style: "datepicker",
    },
    {
        prop: "gender",
        label: "稱謂",
        placeholder: "請選擇日期",
        style: "radio",
        radioData: genderRadios,
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
                type: "inline",
                style: "select",
                function: (e: any) => {
                    console.log(e);
                    e.location = "";
                    e.zip3 = "";

                    const cityDataFilter = initializationStore.cityAreaData.find((item: { name: any }) => item.name === e.city);
                    console.log("cityDataFilter.district", cityDataFilter);
                    const addressProps = formDatas.value.find((item: { prop: string }) => item.prop === "address");
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
                type: "inline",
                style: "select",
                function: (e: any) => {
                    console.log(e);
                    const addressProps = formDatas.value.find((item: { prop: string }) => item.prop === "address");
                    e.zip3 = addressProps.datas.find((item: { prop: string }) => item.prop === "location").options.find((item: { value: any }) => item.value === e.location).zip3;
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
        ],
    },
    {
        prop: "address",
        label: "詳細地址",
        placeholder: "",
        style: "input",
        span: 2,
    },
    {
        prop: "password",
        label: "密碼",
        placeholder: "",
        style: "input",
        type: "password",
        showPassword: true,
        space: 1,
    },
    {
        prop: "confirmPassword",
        label: "確認密碼",
        placeholder: "",
        style: "input",
        type: "password",
        showPassword: true,
        space: 1,
    },
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
    telephone: [
        {
            validator: validateTelephoneNumber,
            trigger: ["change", "blur"],
            message: "格式不正確",
        },
    ],
    birthday: [
        {
            required: true,
            message: "請輸入生日",
            trigger: "blur",
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
    agree: [
        {
            required: true,
            validator: validateSingleCheckbox,
            message: "請勾選同意",
            trigger: ["change", "blur"],
        }
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
                if (userStore.ssoLogingData) {
                    params.openid = userStore.ssoLogingData.user.openid;
                    params.provider = userStore.ssoLogingData.provider;
                }
                const { data, status, error } = await $api().RegisterAPI(params);
                if (status.value === "success") {
                    await login({ email: form.value.email, password: form.value.password });
                    ElMessage({
                        type: "success",
                        message: `註冊成功`,
                    });
                    router.push({
                        name: "auth-verification-slug",
                        params: { slug: "註冊成功" },
                        state: { email: form.value.email },
                    });
                    loading.close();
                } else {
                    ElMessage({
                        type: "error",
                        message: (error.value as any).data.message,
                    });
                    loading.close();
                }
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
            userStore.setIsAuth(true);
            await shoppingCarStore.syncCart();
            await shoppingCarStore.syncCustomCart();

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

onBeforeRouteLeave((to, from, next) => {
    userStore.ssoLogingData = null;
    next();
});
</script>
