<template>
    <section class="mt-[94px] min-h-screen">
        <nav class="border-t border-b border-gray-300 py-[16px] bg-white">
            <div class="grid grid-cols-7 gap-0">
                <div class="col-span-7 ml-[122px]">
                    <Breadcrumb :menus="breadcrumbs" />
                </div>
            </div>
        </nav>
        <div class="container">
            <div class="pt-[60px] pb-[100px]">
                <div class="flex items-end justify-between mb-6">
                    <h3 class="text-[32px] font-bold">常用聯繫人</h3>
                    <div class="flex gap-2 items-center h-fit cursor-pointer">
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
                        <th v-for="item in tableHeadData" :key="item.index">{{ item }}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in tableBodyData" :key="item.index">
                        <td>
                            <div class="font-bold">{{ item.default ? "預設" : "" }}</div>
                        </td>
                        <td>
                            {{ item.contactName }}
                        </td>
                        <td>
                            {{ item.phone }}
                        </td>
                        <td>
                            {{ item.address }}
                        </td>
                        <td>
                            <NuxtLink :to="item.url">
                                <NuxtImg
                                    class="w-[20px] aspect-square object-cover"
                                    src="img/icons/auth/edit.svg"
                                />
                            </NuxtLink>
                        </td>
                        <td>
                            <NuxtImg
                                class="w-[20px] aspect-square object-cover"
                                src="img/icons/auth/delete.svg"
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="flex justify-center mt-10">
                    <NuxtLink
                        :to="{ name: 'auth-panel-slug', params: { slug: '會員中心' }}"
                    >
                        <button class="transparent-btn btn-md">返回會員中心</button>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";

const { $utils } = useNuxtApp();

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
        text: "常用聯繫人",
        params: { slug: "常用聯繫人" }
    }
]);

// 表格資料
const tableHeadData = [
    '', '聯繫人', '聯絡電話', '收件地址', '管理', ''
]
const tableBodyData = [
    {
        default: true,
        contactName: "王阿姨",
        phone: "0911123123",
        address: "701 台南市東區東寧路429號2樓-2",
        url: {
            name: "auth-contact-edit-slug",
            params: { slug: "訂單資訊" },
            query: { id: "1" },
        }
    },
    {
        default: false,
        contactName: "王ＯＯ",
        phone: "09.....3",
        address: "701 台北市..........................路429號2樓",
        url: {
            name: "auth-contact-edit-slug",
            params: { slug: "訂單資訊" },
            query: { id: "1" },
        }
    },
    {
        default: false,
        contactName: "陳ＯＯ",
        phone: "09.....3",
        address: "701 台北市..........................路429號2樓",
        url: {
            name: "auth-contact-edit-slug",
            params: { slug: "訂單資訊" },
            query: { id: "1" },
        }
    },
];

</script>

<style lang="scss" scoped>
// 會員的table樣式
table{
    @apply w-full;
    th{
        @apply text-start bg-gray-100 text-gray-800 py-3 text-sm;
        &:nth-child(5),&:nth-child(6){
            width: 48px;
        }
    }
    td{
        @apply py-5 border-b border-gray-100;
        &:first-child{
            @apply pl-4;
        }
        &:last-child{
            @apply pr-4;
        }
    }
}
</style>