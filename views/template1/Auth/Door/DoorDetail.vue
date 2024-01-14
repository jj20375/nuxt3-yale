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
                <NuxtLink :to="{ name: 'auth-door-slug' }">
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
                            class="w-[20px] aspect-square object-cover"
                            src="/img/icons/auth/download.svg"
                        />
                        <span>下載訂購單</span>
                    </div>
                </div>
                <RecordTimeline :orderNumber="orderData.orderNumber" :timeline="orderData.timeline" />
                <div class="mt-12">
                    <h4 class="font-bold mb-3">安裝資訊</h4>
                    <div class="border-b-[1px] border-gray-200 pb-5">
                        <div
                            class="grid grid-cols-2 gap-4 w-[100%] 2xl:w-[85%] 3xl:w-[70%]">
                            <div v-if="orderData?.info?.contactName" class="text-gray-700">
                                聯繫人：{{ orderData?.info?.contactName }}
                            </div>
                            <div v-if="orderData?.info?.email" class="text-gray-700">
                                Email：{{ orderData?.info?.email }}
                            </div>
                            <div v-if="orderData?.info?.phone" class="text-gray-700">
                                聯絡電話：{{ orderData?.info?.phone }}
                            </div>
                            <div v-if="orderData?.info?.address" class="text-gray-700">
                                安裝地址：{{ orderData?.info?.address }}
                            </div>
                        </div>
                    </div>
                    <h4 class="font-bold mb-3 mt-5">付款明細</h4>
                    <div class="border-b-[1px] border-gray-200 pb-5">
                        <div
                            class="grid grid-cols-2 gap-4 w-[100%] 2xl:w-[85%] 3xl:w-[70%]">
                            <div v-if="orderData?.payment?.method" class="text-gray-700">
                                付款方式：{{ orderData?.payment?.method }}
                            </div>
                            <div v-if="orderData?.payment?.orderStatus" class="text-gray-700">
                                付款狀態：{{ orderData?.payment?.orderStatus }}
                            </div>
                        </div>
                    </div>
                    <h4 class="font-bold mb-3 mt-5">發票資訊</h4>
                    <div class="grid grid-cols-2 gap-4 w-[100%] 2xl:w-[85%] 3xl:w-[70%]">
                        <div v-if="orderData?.receipt?.status" class="text-gray-700">
                            發票狀態：{{ orderData?.receipt?.status }}
                        </div>
                        <div v-if="orderData?.receipt?.type" class="text-gray-700">
                            發票類型：{{ orderData?.receipt?.type }}
                        </div>
                        <div v-if="orderData?.receipt?.date" class="text-gray-700">
                            開立日期：{{ orderData?.receipt?.date }}
                        </div>
                        <div v-if="orderData?.receipt?.taxId" class="text-gray-700">
                            統編：{{ orderData?.receipt?.taxId }}
                        </div>
                        <div v-if="orderData?.receipt?.number" class="text-gray-700">
                            發票號碼：{{ orderData?.receipt?.number }}
                        </div>
                    </div>
                </div>
                <div class="mt-12">
                    <div class="bg-gray-100 px-[20px] py-[10px] font-bold">配送商品</div>
                </div>
                <div>
                    <RecordProduct isDoor :order="orderData.products" />
                </div>
                <div>
                    <OrderPrice :order="orderData.price" />
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
                <div class="text-center text-gray-800 text-[20px]">請撥打服務專線 0912345678<br/>取消此筆訂單</div>
                <div class="flex gap-4 justify-center mt-6">
                    <button class="yellow-btn btn-sm" @click="dialogRefund = false">確認</button>
                </div>
            </el-dialog>
        </client-only>
    </section>
</template>
<script setup lang="ts">
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
import RecordTimeline from "~/views/template1/Auth/components/OrderTimeline.vue";
import RecordProduct from "~/views/template1/Auth/components/OrderProduct.vue";
import OrderPrice from "~/views/template1/Auth/components/OrderPrice.vue";

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
        name: "auth-door-slug",
        text: "訂製門扇-訂單記錄",
        params: { slug: "訂製門扇-訂單記錄" }
    },
    {
        name: "auth-door-detail-slug",
        text: "#20211010001",
        params: { slug: "#20211010001" }
    }
]);

const dialogRefund = ref(false);

const handleRefund = () => {
    dialogRefund.value = true;
}

// 訂單資料
const orderData = ref({
    orderNumber: "#20211010001",
    timeline: [
        {
            date: "2022-06-11",
            time: "11:00",
            status: "代支付訂金"
        },
        {
            date: "2022-06-20",
            time: "13:23",
            status: "訂單成立"
        },
        {
            date: "2022-06-25",
            time: "11:00",
            status: "派工確認完成"
        }
    ],
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
    },
    products: [
        {
            name: "YDM 7216A 指紋卡片密碼鑰匙四合一",
            color: "",
            fireproof: "是",
            size: "門高：200cm-215cm  門寬：100cm  門厚：7cm",
            doorLeaf: ["現代北歐玄關門", "R53", "米白"],
            doorFrame: ["門框型號一", "fuden wood door frame", "曜石黑"],
            doorLock: ["卡片密碼鑰匙三合一電子鎖","YDM 7116A"],
            doorHanging: "蝴蝶鉸鍊",
            doorSealStrip: "ABC132",
            doorGasket: "外裝式下降壓條",
            doorOperator: "隱藏式門弓器",
            otherService: ["• 拆除及清運", "• 泥作"],
            quantity: 1,
            image: "/img/home/product/product1.jpg",
            rule: {
                needPrice: NaN, // 滿額贈
                getFree: false, // 加價購
            }
        },
    ],
    price: {
        deliveryFee: 0,
        event: [
            {
                name: "母親節520特惠活動",
                discountPrice: -1000,
            },
            {
                name: "新會員送好禮",
                discountPrice: -500,
            }
        ],
        coupon: -1000,
        totalPrice: 43399,
        memo: "備註內容備註內容備註內容備註內容備註內容備註內容備註內容備註內容備註內容備註內容備註內容備註內容"
    }
});

</script>