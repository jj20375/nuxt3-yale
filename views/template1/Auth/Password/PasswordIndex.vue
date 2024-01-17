<template>
    <section class="min-h-screen mt-[94px] pb-[60px] bg-gray-50">
        <nav v-if="!userData" class="border-t border-b border-gray-300 py-[16px] bg-white">
            <div class="grid grid-cols-7 gap-0">
                <div class="col-span-7 ml-[122px]">
                    <Breadcrumb :menus="breadcrumbs" />
                </div>
            </div>
        </nav>
        <div class="container overflow-auto">
            <div class="w-[620px] mt-[60px] py-[60px] px-[60px] bg-white mx-auto rounded-[24px] border-[1px] border-gray-200">
                <h3 class="font-medium text-[28px] mb-8">{{ userData ? '重設密碼' : '變更密碼'}}</h3>
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
                        </div>
                        <div class="flex mt-4 gap-4 justify-center">
                            <NuxtLink v-if="!userData"
                                :to="{ name: 'auth-panel-slug', params: { slug: '會員中心' }}"
                            >
                                <button
                                    class="transparent-btn btn-md"
                                >
                                    {{ userData ? '確認' : '儲存'}}
                                </button>
                            </NuxtLink>
                            <NuxtLink
                                :to="{ name: 'auth-password-success-slug', params: { slug: '密碼變更成功' }}"
                            >
                            <button
                                class="yellow-btn btn-md"
                            >
                                儲存
                            </button>
                            </NuxtLink>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";

const route = useRoute();

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
        name: "auth-password-slug",
        text: "變更密碼",
        params: { slug: "變更密碼" }
    }
]);

const formRefDom = ref<any>();

const form = ref<any>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
});

const initFormDatas = ref<any>([
    {
        prop: "oldPassword",
        label: "舊密碼",
        placeholder: "請輸入舊密碼",
        style: "input",
        showPassword: true,
        isVisible: computed(() => !userData.value),
    },
    {
        prop: "newPassword",
        label: "新密碼",
        placeholder: "請輸入新密碼",
        style: "input",
        showPassword: true,
    },
    {
        prop: "confirmPassword",
        label: "確認密碼",
        placeholder: "請再次輸入密碼",
        style: "input",
        showPassword: true,
    },
]);

const formDatas:any = computed(() => initFormDatas.value.filter(item => item.isVisible !== false));

const rules = ref<any>({
    oldPassword: [
        {
            required: true,
            message: "請輸入舊密碼",
            trigger: "blur"
        }
    ],
    newPassword: [
        {
            required: true,
            message: "請輸入新密碼",
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

// TODO 這邊僅供參考畫面用，串接請修改掉
const userData = ref<any>();

/**
 * 初始化
 */
function init() {
    console.log("route.query.id", route.query.id);
    userData.value = route.query.id;
}

init();
</script>