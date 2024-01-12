<template>
    <section class="mt-[94px] min-h-screen border-t border-gray-300">
        <nav class="border-t border-b border-gray-300 py-[16px] bg-white">
            <div class="grid grid-cols-7 gap-0">
                <div class="col-span-7 ml-[122px]">
                    <Breadcrumb :menus="breadcrumbs" />
                </div>
            </div>
        </nav>
        <div class="container">
            <div class="pt-[60px] pb-[100px]">
                <NuxtLink :to="{ name: 'auth-order-slug' }">
                    <div class="flex">
                        <NuxtImg
                            class="w-[16px] mr-[5px]"
                            src="/img/faq/faq-back-icon.svg"
                        />
                        <span class="text-gray-700">返回</span>
                    </div>
                </NuxtLink>
                <div class="flex justify-between items-end mt-9 mb-[30px]">
                    <h3 class="text-[32px]">訂單資訊</h3>
                    <div class="flex gap-2 items-center h-fit cursor-pointer">
                        <NuxtImg
                            class="w-[20px] aspect-1/1"
                            src="/img/icons/auth/download.svg"
                        />
                        <span>下載訂購單</span>
                    </div>
                </div>
                <RecordTimeline :orderNumber="orderNumber" :timelineData="timelineData" />
                <div class="mt-12">
                    <h4 class="font-bold mb-3">配送資訊</h4>
                    <div class="border-b-[1px] border-gray-200 pb-5">
                        <div
                            class="grid grid-cols-2 gap-4 w-[100%] 2xl:w-[85%] 3xl:w-[70%]">
                            <div v-if="orderDetail?.info?.contactName" class="text-gray-700">
                                聯繫人：{{ orderDetail?.info?.contactName }}
                            </div>
                            <div v-if="orderDetail?.info?.email" class="text-gray-700">
                                Email：{{ orderDetail?.info?.email }}
                            </div>
                            <div v-if="orderDetail?.info?.phone" class="text-gray-700">
                                聯絡電話：{{ orderDetail?.info?.phone }}
                            </div>
                            <div v-if="orderDetail?.info?.address" class="text-gray-700">
                                門市名稱/收件地址：{{ orderDetail?.info?.address }}
                            </div>
                        </div>
                    </div>
                    <h4 class="font-bold mb-3 mt-5">付款明細</h4>
                    <div class="border-b-[1px] border-gray-200 pb-5">
                        <div
                            class="grid grid-cols-2 gap-4 w-[100%] 2xl:w-[85%] 3xl:w-[70%]">
                            <div v-if="orderDetail?.payment?.method" class="text-gray-700">
                                聯繫人：{{ orderDetail?.payment?.method }}
                            </div>
                            <div v-if="orderDetail?.payment?.orderStatus" class="text-gray-700">
                                Email：{{ orderDetail?.payment?.orderStatus }}
                            </div>
                        </div>
                    </div>
                    <h4 class="font-bold mb-3 mt-5">發票資訊</h4>
                    <div class="grid grid-cols-2 gap-4 w-[100%] 2xl:w-[85%] 3xl:w-[70%]">
                        <div v-if="orderDetail?.receipt?.status" class="text-gray-700">
                            發票狀態：{{ orderDetail?.receipt?.status }}
                        </div>
                        <div v-if="orderDetail?.receipt?.type" class="text-gray-700">
                            發票類型：{{ orderDetail?.receipt?.type }}
                        </div>
                        <div v-if="orderDetail?.receipt?.date" class="text-gray-700">
                            開立日期：{{ orderDetail?.receipt?.date }}
                        </div>
                        <div v-if="orderDetail?.receipt?.taxId" class="text-gray-700">
                            統編：{{ orderDetail?.receipt?.taxId }}
                        </div>
                        <div v-if="orderDetail?.receipt?.number" class="text-gray-700">
                            發票號碼：{{ orderDetail?.receipt?.number }}
                        </div>
                    </div>
                </div>
                <div class="mt-12">
                    <div class="bg-gray-100 px-[20px] py-[10px] font-bold">配送商品</div>
                </div>
                <div>
                    <RecordProduct :orderProduct="orderProduct" />
                </div>
                <div class="flex flex-col gap-2 pb-5 border-b-[1px] border-gray-200">
                    <div class="flex justify-between text-sm text-gray-700">
                        <div>運費</div>
                        <div>NT$ {{ $utils().formatCurrency(price?.deliveryFee) }}</div>
                    </div>
                    <div class="flex justify-between text-sm text-gray-700">
                        <div>活動折扣</div>
                        <div>NT$ {{ $utils().formatCurrency(price?.eventDiscount) }}</div>
                    </div>
                    <div class="flex justify-between text-sm text-gray-700">
                        <div>優惠卷折扣</div>
                        <div>NT$ {{ $utils().formatCurrency(price?.couponDiscount) }}</div>
                    </div>
                </div>
                <div class="flex items-center justify-between mt-5">
                    <div class="text-[24px] font-bold">總計</div>
                    <div class="flex items-center gap-2 YaleSolisW-Bd">NT$<span class="text-[24px]">{{ $utils().formatCurrency(price?.totalPrice) }}</span></div>
                </div>
                <div class="mt-4" v-if="price?.memo">
                    <div class="text-gray-700 text-sm leading-8">備註</div>
                    <div class="text-gray-700 text-sm leading-8" v-html="price?.memo"></div>
                </div>
                <div class="flex justify-center mt-[60px]">
                    <button class="transparent-btn btn-xs" @click="handleRefund">取消訂單</button>
                </div>
            </div>
        </div>
        <client-only>
            <el-dialog
                class="custom-dialog"
                close-on-click-modal
                lock-scroll
                show-close
                :height="500"
                :width="400"
                center
                align-center
                append-to-body
                v-model="dialogRefund"
            >
                <h3 class="text-center text-gray-800 font-bold text-[24px] mb-4">取消訂單</h3>
                <div class="text-center text-gray-800 text-[20px]">是否確定取消此筆預約</div>
                <div class="flex gap-4 justify-center mt-6">
                    <button class="transparent-btn btn-sm" @click="dialogRefund = false">否</button>
                    <button class="yellow-btn btn-sm" @click="dialogRefund = false">是</button>
                </div>
            </el-dialog>
        </client-only>
    </section>
</template>
<script setup lang="ts">
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
import RecordTimeline from "~/views/template1/Auth/components/RecordTimeline.vue";
import RecordProduct from "~/views/template1/Auth/components/RecordProduct.vue";

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
        name: "auth-order-slug",
        text: "一般產品-訂單記錄",
        params: { slug: "一般產品-訂單記錄" }
    },
    {
        name: "auth-order-detail-slug",
        text: "#20211010001",
        params: { slug: "#20211010001" }
    }
]);

const dialogRefund = ref(false);

const handleRefund = () => {
    dialogRefund.value = true;
}

// 訂單編號
const orderNumber = ref("#20211010001");

// 訂單歷程
const timelineData = ref([
    {
        date: "2022-06-11",
        time: "11:00",
        status: "未付款"
    },
    {
        date: "2022-06-20",
        time: "13:23",
        status: "訂單成立"
    },
    {
        date: "2022-06-11",
        time: "11:00",
        status: "派工確認完成"
    }
]);

// 訂單詳細資訊
const orderDetail = ref({
    info: {
        contactName: "Lucie chen",
        email: "lucie.chen@codepulse.com.tw",
        phone: "0912345678",
        address: "台北市中正區忠孝東路一段76號5樓之1"
    },
    payment: {
        method: "信用卡",
        orderStatus: "未付款"
    },
    receipt: {
        status: "未開立",
        type: "公司戶發票",
        date: "2022-06-11",
        taxId: "54567354",
        number: "XG-345345123"
    }
});

// 配送商品
const orderProduct = ref([
    {
        name: "YDM 7216A 指紋卡片密碼鑰匙四合一",
        color: "黑色",
        quantity: 1,
        price: 3000,
        rule: {
            needPrice: 3000, // 滿額贈
            getFree: false, // 加價購
        }
    },
    {
        name: "YDM 7216A 指紋卡片密碼鑰匙四合一",
        color: "紅色",
        quantity: 3,
        price: 7000,
        rule: {
            needPrice: NaN, // 滿額贈
            getFree: true, // 加價購
        }
    }
]);

// 運費及價格
const price = ref({
    deliveryFee: 0,
    eventDiscount: -1000,
    couponDiscount: -1000,
    totalPrice: 43399,
    memo: "備註內容備註內容備註內容備註內容備註內容備註內容備註內容備註內容備註內容備註內容備註內容備註內容"
});

</script>