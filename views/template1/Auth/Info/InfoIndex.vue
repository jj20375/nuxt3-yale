<template>
    <section class="min-h-screen mt-[86px] pb-[60px] bg-gray-50">
        <nav class="border-t border-b border-gray-300 py-[16px] bg-white">
            <div class="container">
                <Breadcrumb :menus="breadcrumbs" />
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
                                @click.prevent="onSubmit"
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
import { validateTWMobileNumber } from "~/service/validator";
import { ElMessage, ElLoading } from "element-plus";
import { useUserStore } from "~/store/userStore";
import { storeToRefs } from "pinia";

const { $api } = useNuxtApp();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

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

console.log(user)
const form = ref<any>({
    email: user.value.email,
    name: user.value.name,
    cellphone: user.value.phone,
    telephone: user.value.telephone,
    gender: user.value.sex,
    birthday: user.value.birthday,
});

const genderRadios = ref<any>([
    { value: "male", label: "先生" },
    { value: "female", label: "女士" },
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
            message: "請輸入會員姓名",
            trigger: "blur"
        }
    ],
    birthday: [
        {
            required: true,
            message: "請輸入生日",
            trigger: "blur"
        }
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
                    birthday: form.value.birthday,
                    sex: form.value.gender,
                };
                const { data, status, error } = await $api().ChangeProfileAPI(params);
                if (status.value === 'success') {
                    ElMessage({
                        type: "success",
                        message: `修改成功`,
                    });
                    userStore.getUserProfile();
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
                    message: "修改失敗",
                });
                loading.close();
                console.log("HomeSampleAPI => ", err);
            }
        }
    });
}
</script>