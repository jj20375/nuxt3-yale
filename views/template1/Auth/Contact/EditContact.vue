<template>
    <section class="mt-headerMb xl:mt-header pb-[60px] bg-gray-50">
        <nav class="border-b border-gray-300 py-[16px] bg-white">
            <div class="container">
                <Breadcrumb :menus="breadcrumbs" />
            </div>
        </nav>
        <div class="container">
            <div class="w-full lg:w-[620px] mt-[36px] sm:mt-[60px] py-[32px] sm:py-[60px] px-[24px] sm:px-[60px] bg-white mx-auto rounded-[24px] border-[1px] border-gray-200">
                <el-form
                    class="custom-form"
                    ref="formRefDom"
                    :model="form"
                    :rules="rules"
                    require-asterisk-position="right"
                >
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="font-medium YaleSolisW-Bd text-[24px] md:text-[32px] text-center sm:mb-8">編輯聯繫人</h3>
                        <el-form-item>
                            <el-switch
                                v-model="form.default"
                                inactive-text="設為預設"
                            />
                        </el-form-item>
                    </div>
                    <div class="w-full flex flex-col sm:gap-6 gap-4">
                        <div
                            v-for="(item, index) in formDatas"
                            :key="index"
                        >
                            <div v-if="item?.type !== 'inline'">
                                <el-form-item
                                    :prop="item.prop"
                                    :label="item.label"
                                >
                                    <el-input
                                        v-if="item.style === 'input'"
                                        :type="item?.type"
                                        :show-password="item.showPassword"
                                        :disabled="item.disabled"
                                        :placeholder="item.placeholder"
                                        v-model="form[item.prop]"
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
                                class="flex flex-1"
                            >
                                <div
                                    v-for="(item2, index2) in item.datas"
                                    class="flex-1"
                                    :key="index2"
                                    :class="item.datas.length - 1 === index2 ? '' : 'mr-4 md:mr-[30px]'"
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
                                        />
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
                                            />
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 md:flex mt-4 gap-4 justify-center">
                            <NuxtLink :to="{ name: 'auth-contact-slug', params: { slug: '常用聯繫人' } }">
                                <button
                                    class="transparent-btn"
                                    :class="isMobile ? 'w-full' : 'btn-md'"
                                >
                                    返回
                                </button>
                            </NuxtLink>
                            <button
                                @click.prevent="onSubmit"
                                class="yellow-btn"
                                :class="isMobile ? '' : 'btn-md'"
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
import { useInitializationStore } from "~/store/initializationStore";
import { ElMessage, ElLoading } from "element-plus";
import { LocationQueryValue } from "vue-router";

const { $api } = useNuxtApp();
const router = useRouter();
const route = useRoute();
const { isMobile } = useWindowResize();

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

const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁",
    },
    {
        name: "auth-panel-slug",
        text: "會員中心",
        params: { slug: "會員中心" },
    },
    {
        name: "auth-contact-slug",
        text: "常用聯繫人",
        params: { slug: "常用聯繫人" },
    },
    {
        name: "auth-contact-edit-slug-id",
        text: "編輯聯繫人",
        params: { slug: "編輯聯繫人", id: route.params.id },
    },
]);

const formRefDom = ref<any>();

const form = ref<any>({
    default: false,
    contactName: "",
    phone: "",
    city: "",
    location: "",
    zip3: "",
    address: "",
});

const formDatas = ref<any>([
    {
        prop: "contactName",
        label: "聯繫人",
        placeholder: "",
        style: "input",
    },
    {
        prop: "phone",
        label: "行動電話",
        placeholder: "",
        style: "input",
    },
    {
        prop: "address",
        type: "inline",
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
    },
]);

const rules = ref<any>({
    contactName: [
        {
            required: true,
            message: "請輸入聯繫人姓名",
            trigger: ["change", "blur"],
        },
    ],
    phone: [
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
            message: "請選擇稱地區",
            trigger: ["change", "blur"],
        },
    ],
    address: [
        {
            required: true,
            message: "請輸入地址",
            trigger: ["change", "blur"],
        },
    ],
});

/**
 * 取得聯絡人資料
 */
async function getList(params: { memberAddressId: any }) {
    try {
        const { data } = await $api().GetMemberContactDetailAPI(params);
        console.log("home sample api => ", data.value);

        const contactData = (data.value as any).data;

        const full_address = initializationStore.cityAreaData.find((item: { name: any }) => item.name === contactData.city);

        const addressProps = formDatas.value.find((item: { prop: string }) => item.prop === "address");
        addressProps.datas.find((item: { prop: string }) => item.prop === "location").options = full_address.district.map((item: { name: any; zip3: any }) => {
            return {
                label: item.name,
                value: item.name,
                zip3: item.zip3,
            };
        });

        form.value = {
            default: contactData.is_default == 1,
            contactName: contactData.name,
            phone: contactData.phone,
            city: contactData.city,
            location: contactData.district,
            zip3: contactData.zip3,
            address: contactData.address,
        };
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

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
                text: "儲存中...",
                background: "rgba(0, 0, 0, 0.7)",
            });
            try {
                const params = {
                    name: form.value.contactName,
                    phone: form.value.phone,
                    city: form.value.city,
                    district: form.value.location,
                    zip3: form.value.zip3,
                    address: form.value.address,
                    is_default: form.value.default,
                };
                const { data, status, error } = await $api().EditChangeProfileAPI({ memberAddressId: route.params.id }, params);
                if (status.value === "success") {
                    ElMessage({
                        type: "success",
                        message: `編輯成功`,
                    });
                    router.push({ name: "auth-contact-slug", params: { slug: "常用聯繫人" } });
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
                    message: "編輯失敗",
                });
                loading.close();
                console.log("HomeSampleAPI => ", err);
            }
        }
    });
}

/**
 * 初始化
 */
async function init() {
    await getList({ memberAddressId: route.params.id });
}

onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
            await init();
        }
    });
});
</script>
