<template>
    <section class="mt-[64px] sm:mt-[86px]">
        <nav class="border-t border-b border-gray-300 py-[16px] bg-white">
            <div class="container">
                <Breadcrumb :menus="breadcrumbs" />
            </div>
        </nav>
        <div class="container">
            <div class="pt-[24px] sm:pt-[60px] pb-[100px]">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="font-medium text-[20px] sm:text-[32px] text-center">常用聯繫人</h3>
                    <div class="flex items-center gap-2 cursor-pointer h-fit">
                        <NuxtImg
                            class="w-[20px] aspect-square object-cover"
                            src="img/icons/auth/add.svg"
                        />
                        <NuxtLink :to="{ name: 'auth-contact-add-slug', params: { slug: '新增聯繫人' } }">
                            <div>新增聯繫人</div>
                        </NuxtLink>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th
                                v-for="(item, index) in tableHeadData"
                                :key="index"
                            >
                                {{ item }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="item in tableBodyData"
                            :key="item.index"
                        >
                            <td>
                                <div class="font-bold text-[12px] sm:text-[16px]">{{ item.default ? "預設" : "" }}</div>
                            </td>
                            <td class="text-[12px] sm:text-[16px] px-[4px]">
                                {{ item.contactName }}
                            </td>
                            <td class="text-[12px] sm:text-[16px] px-[4px]">
                                {{ item.phone }}
                            </td>
                            <td class="text-[12px] sm:text-[16px] px-[4px]">
                                {{ item.address }}
                            </td>
                            <td>
                                <NuxtLink :to="item.url">
                                    <NuxtImg
                                        class="w-[16px] sm:w-[20px] aspect-square object-cover"
                                        src="img/icons/auth/edit.svg"
                                    />
                                </NuxtLink>
                            </td>
                            <td>
                                <NuxtImg
                                    @click.prevent="deleteData(item)"
                                    class="w-[16px] sm:w-[20px] aspect-square object-cover cursor-pointer"
                                    src="img/icons/auth/delete.svg"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="flex justify-center mt-10">
                    <NuxtLink :to="{ name: 'auth-panel-slug', params: { slug: '會員中心' } }">
                        <button class="transparent-btn btn-md">返回會員中心</button>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
    <client-only>
        <confirmBox
            :title="'刪除警告'"
            :message="'是否刪除此聯絡人'"
            :cancelTxt="'否'"
            :confirmTXT="'是'"
            :dialogVisible="dialogVisible"
            @handleConfirm="handleConfirm"
            @handleCancel="handleCancel"
        ></confirmBox>
    </client-only>
</template>

<script setup lang="ts">
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { Action } from "element-plus";
import confirmBox from "@/components/confirmBox.vue";

const { $utils, $api } = useNuxtApp();

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
]);

// 表格資料
const tableHeadData = ["", "聯繫人", "聯絡電話", "收件地址", "管理", ""];
const tableBodyData = ref<any>([]);

/**
 * 取得聯絡人列表
 */
async function getList() {
    try {
        const { data } = await $api().GetMemberContactAPI();
        tableBodyData.value = [];
        console.log("home sample api => ", data.value);

        const rows = (data.value as any).data;

        rows.forEach((item: { id: any; is_default: any; name: any; phone: any; full_address: any }) => {
            tableBodyData.value.push({
                id: item.id,
                default: item.is_default ? true : false,
                contactName: item.name,
                phone: item.phone,
                address: item.full_address,
                url: {
                    name: "auth-contact-edit-slug",
                    params: { slug: "訂單資訊" },
                    query: { id: item.id },
                },
            });
        });
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

const dialogVisible = ref(false);
const member_id = ref(null);

function deleteData(item: { id: any }) {
    member_id.value = item.id
    dialogVisible.value = true
}

async function handleConfirm() {
    try {
        const params = { memberAddressId: member_id.value };
        const { data, status, error } = await $api().DeleteProfileAPI(params);
        if (status.value === "success") {
            ElMessage({
                type: "success",
                message: "刪除成功",
            });
            await getList();
            dialogVisible.value = false
        } else {
            ElMessage({
                type: "error",
                message: (error.value as any).data.message,
            });
        }
    } catch (err) {
        ElMessage({
            type: "error",
            message: "刪除失敗",
        });
        dialogVisible.value = false
    }
}

function handleCancel() {
    dialogVisible.value = false
}

/**
 * 初始化
 */
async function init() {
    await getList();
}

await init();
onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
        }
    });
});
</script>

<style lang="scss" scoped>
// 會員的table樣式
table {
    @apply w-full;
    th {
        @apply text-start bg-gray-100 text-gray-800 py-3 text-sm;
        &:nth-child(5),
        &:nth-child(6) {
            width: 48px;
        }
    }
    td {
        @apply py-5 border-b border-gray-100;
        &:first-child {
            @apply pl-2 sm:pl-4;
        }
        &:last-child {
            @apply pl-2 sm:pr-4;
        }
    }
}
</style>
