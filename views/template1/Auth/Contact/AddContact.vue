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
            <div
                class="w-[620px] mt-[60px] py-[60px] px-[60px] bg-white mx-auto rounded-[24px] border-[1px] border-gray-200">

                <el-form
                    class="custom-form"
                    ref="formRefDom"
                    :model="form"
                    :rules="rules"
                    require-asterisk-position="right"
                >
                    <div class="flex justify-between items-end mb-8">
                        <h3 class="font-medium text-[28px] text-center">新增聯繫人</h3>
                        <el-form-item>
                            <el-switch
                                v-model="form.default"
                                inactive-text="設為預設"
                            />
                        </el-form-item>
                    </div>
                    <div class="grid gap-6">
                        <div
                            v-for="(item, index) in formDatas"
                            :key="index"
                        >
                            <div v-if="item?.type !== 'inline'">
                                <el-form-item :prop="item.prop" :label="item.label">
                                    <el-input v-if="item.style === 'input'" :type="item?.type" :show-password="item.showPassword" :disabled="item.disabled"
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
                        </div>
                        <div class="flex mt-4 gap-4 justify-center">
                            <NuxtLink
                                :to="{ name: 'auth-contact-slug', params: { slug: '常用聯繫人' }}"
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
        name: "auth-contact-slug",
        text: "常用聯絡人",
        params: { slug: "常用聯絡人" }
    },
    {
        name: "auth-contact-edit-slug",
        text: "編輯聯絡人",
        params: { slug: "編輯聯絡人" }
    }
]);

const formRefDom = ref<any>();

const form = ref<any>({
    default: false,
    contactName: "",
    phone: "",
    city: "",
    location: "",
    zip3: "",
    address: ""
});

const formDatas = ref<any>([
    {
        prop: "contactName",
        label: "聯繫人",
        placeholder: "",
        style: "input"
    },
    {
        prop: "phone",
        label: "聯絡電話",
        placeholder: "",
        style: "input"
    },
    {
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

                    const cityDataFilter = initializationStore.cityAreaData.find((item: { name: any }) => item.name === e.city);
                    console.log("cityDataFilter.district", cityDataFilter);
                    formDatas.value[2].datas[1].options = cityDataFilter.district.map((item: { name: any }) => {
                        return {
                            label: item.name,
                            value: item.name
                        };
                    });
                }
            },
            {
                prop: "location",
                label: "地區",
                placeholder: "請選擇",
                options: [],
                style: "select"
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
        style: "input"
    },
]);

const rules = ref<any>({
    contactName: [
        {
            required: true,
            message: "請輸入聯繫人姓名",
            trigger: "blur"
        }
    ],
    phone: [
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
            message: "請選擇稱地區",
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
});
</script>