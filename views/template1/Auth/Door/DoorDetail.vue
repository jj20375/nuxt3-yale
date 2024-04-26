<template>
    <section class="mt-headerMb xl:mt-header">
        <nav class="border-t border-gray-300 border-b py-[16px] bg-white">
            <div class="container">
                <Breadcrumb :menus="breadcrumbs" />
            </div>
        </nav>
        <div class="container">
            <div class="pt-[36px] sm:pt-[60px] pb-[50px] sm:pb-[100px]">
                <NuxtLink :to="{ name: 'auth-door-slug' }">
                    <div class="flex">
                        <NuxtImg
                            class="w-[16px] mr-[5px]"
                            src="/img/faq/faq-back-icon.svg"
                        />
                        <span class="text-gray-700">返回</span>
                    </div>
                </NuxtLink>
                <div class="flex justify-between items-end mt-6 sm:mt-9 mb-5 sm:mb-[30px]">
                    <h3 class="text-[24px] md:text-[32px]">訂單資訊</h3>
                    <div class="flex items-center gap-2 cursor-pointer h-fit">
                        <NuxtImg
                            class="w-[20px] aspect-square object-cover"
                            src="/img/icons/auth/download.svg"
                        />
                        <span @click="downloadPdf()">下載訂購單</span>
                    </div>
                </div>
                <RecordTimeline
                    :orderNumber="orderData.orderNumber"
                    :timeline="orderData.timeline"
                    :status="orderData.orderStatus"
                    :method="orderData.payment[0].method"
                    @orderRepay="handleRepay"
                />
                <div class="mt-8 sm:mt-12">
                    <h4 class="mb-3 font-bold">安裝資訊</h4>
                    <div class="border-b-[1px] border-gray-200 pb-5">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-1 w-full 2xl:w-[85%] 3xl:w-[70%]">
                            <div
                                v-if="orderData?.info?.contactName"
                                class="text-gray-700"
                            >
                                聯繫人：{{ orderData?.info?.contactName }}
                            </div>
                            <div
                                v-if="orderData?.info?.email"
                                class="text-gray-700"
                            >
                                Email：{{ orderData?.info?.email }}
                            </div>
                            <div
                                v-if="orderData?.info?.phone"
                                class="text-gray-700"
                            >
                                行動電話：{{ orderData?.info?.phone }}
                            </div>
                            <div
                                v-if="orderData?.info?.address"
                                class="text-gray-700"
                            >
                                安裝地址：{{ orderData?.info?.address }}
                            </div>
                        </div>
                    </div>
                    <h4 class="mt-5 mb-3 font-bold">付款明細</h4>
                    <div class="border-b-[1px] border-gray-200 pb-5">
                        <h5 class="mb-1 font-bold">訂金</h5>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-1 w-full 2xl:w-[85%] 3xl:w-[70%]">
                            <div class="text-gray-700">付款方式：{{ orderData?.payment[0]?.method }}</div>
                            <div class="text-gray-700">付款狀態：{{ orderData?.payment[0]?.orderStatus }}</div>
                        </div>
                        <h5 class="my-1 font-bold">尾款</h5>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-1 w-full 2xl:w-[85%] 3xl:w-[70%]">
                            <div class="text-gray-700">付款方式：{{ orderData?.payment[1]?.method }}</div>
                            <div class="text-gray-700">付款狀態：{{ orderData?.payment[1]?.orderStatus }}</div>
                        </div>
                    </div>
                    <h4 class="mt-5 mb-3 font-bold">發票資訊</h4>
                    <h5 class="mb-1 font-bold">訂金</h5>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-1 w-full 2xl:w-[85%] 3xl:w-[70%]">
                        <div
                            v-if="orderData?.receipt[0]?.status"
                            class="text-gray-700"
                        >
                            發票狀態：{{ orderData?.receipt[0]?.status }}
                        </div>
                        <div
                            v-if="orderData?.receipt[0]?.type"
                            class="text-gray-700"
                        >
                            發票類型：{{ orderData?.receipt[0]?.type }}
                        </div>
                        <div
                            v-if="orderData?.receipt[0]?.date"
                            class="text-gray-700"
                        >
                            開立日期：{{ orderData?.receipt[0]?.date }}
                        </div>
                        <div
                            v-if="orderData?.receipt[0]?.carrier_code"
                            class="text-gray-700"
                        >
                            電子載具：{{ orderData?.receipt[0]?.carrier_code }}
                        </div>
                        <div
                            v-if="orderData?.receipt[0]?.taxId"
                            class="text-gray-700"
                        >
                            統編：{{ orderData?.receipt[0]?.taxId }}
                        </div>
                        <div
                            v-if="orderData?.receipt[0]?.number"
                            class="text-gray-700"
                        >
                            發票號碼：{{ orderData?.receipt[0]?.number }}
                        </div>
                    </div>
                    <h5 class="my-1 font-bold">尾款</h5>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-1 w-full 2xl:w-[85%] 3xl:w-[70%]">
                        <div
                            v-if="orderData?.receipt[1]?.status"
                            class="text-gray-700"
                        >
                            發票狀態：{{ orderData?.receipt[1]?.status }}
                        </div>
                        <div
                            v-if="orderData?.receipt[1]?.type"
                            class="text-gray-700"
                        >
                            發票類型：{{ orderData?.receipt[1]?.type }}
                        </div>
                        <div
                            v-if="orderData?.receipt[1]?.date"
                            class="text-gray-700"
                        >
                            開立日期：{{ orderData?.receipt[1]?.date }}
                        </div>
                        <div
                            v-if="orderData?.receipt[1]?.carrier_code"
                            class="text-gray-700"
                        >
                            電子載具：{{ orderData?.receipt[1]?.carrier_code }}
                        </div>
                        <div
                            v-if="orderData?.receipt[1]?.taxId"
                            class="text-gray-700"
                        >
                            統編：{{ orderData?.receipt[1]?.taxId }}
                        </div>
                        <div
                            v-if="orderData?.receipt[1]?.number"
                            class="text-gray-700"
                        >
                            發票號碼：{{ orderData?.receipt[1]?.number }}
                        </div>
                    </div>
                </div>
                <div class="mt-8 sm:mt-12">
                    <div class="bg-gray-100 px-[20px] py-[10px] font-bold">配送商品</div>
                </div>
                <div>
                    <RecordProduct
                        isDoor
                        :order="orderData.products"
                        :dialogData="dialogData"
                    />
                </div>
                <div>
                    <OrderPrice
                        :order="orderData.price"
                        :status="orderData.orderStatus"
                        :type="'combination'"
                    />
                </div>
                <div
                    v-if="orderData?.orderStatus === '待付訂金' || orderData?.orderStatus === '已付訂金' || orderData?.orderStatus === '丈量派工中' || orderData?.orderStatus === '丈量完成' || orderData?.orderStatus === '待付尾款'"
                    class="flex justify-center mt-[30px] sm:mt-[60px]"
                >
                    <button
                        class="transparent-btn btn-xs"
                        @click="handleRefund"
                    >
                        取消訂單
                    </button>
                </div>
            </div>
        </div>
        <client-only>
            <finalPaymentRule
                v-model:showDialog="dialogRepay"
                @orderRepay="orderRepay"
            />
        </client-only>
        <client-only>
            <el-dialog
                class="custom-dialog"
                close-on-click-modal
                lock-scroll
                show-close
                :width="400"
                center
                align-center
                append-to-body
                v-model="dialogRefund"
            >
                <h3 class="text-center text-gray-800 font-bold text-[24px] mb-4">取消訂單</h3>
                <div class="text-center text-gray-800 text-[20px]">是否確定取消此筆訂單</div>
                <div class="flex justify-center gap-4 mt-6">
                    <button
                        class="transparent-btn btn-sm"
                        @click="dialogRefund = false"
                    >
                        否
                    </button>
                    <button
                        class="yellow-btn btn-sm"
                        @click="orderCancel"
                    >
                        是
                    </button>
                </div>
            </el-dialog>
        </client-only>
        <client-only>
            <el-dialog
                class="custom-dialog"
                close-on-click-modal
                lock-scroll
                show-close
                :width="400"
                center
                align-center
                append-to-body
                v-model="dialogRefundCustom.isVisible"
            >
                <h3 class="text-center text-gray-800 font-bold text-[24px] mb-4">取消訂單</h3>
                <div class="text-center text-gray-800 text-[20px]">請撥打服務專線 {{ dialogRefundCustom.phone }}<br />取消此筆訂單</div>
                <div class="flex justify-center gap-4 mt-6">
                    <button
                        class="yellow-btn btn-sm"
                        @click="dialogRefundCustom.isVisible = false"
                    >
                        確認
                    </button>
                </div>
            </el-dialog>
        </client-only>
        <client-only>
            <doorDetailPdf
                v-model="showDownload"
                :orderData="orderData"
                ref="orderDownloadHtmlRefDom"
            />
        </client-only>
    </section>
</template>
<script setup lang="ts">
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
import { ElMessage, ElLoading } from "element-plus";
import RecordTimeline from "~/views/template1/Auth/components/OrderTimeline.vue";
import RecordProduct from "~/views/template1/Auth/components/doorProduct.vue";
import OrderPrice from "~/views/template1/Auth/components/OrderPrice.vue";
import type { ShoppingCarCustomInterface } from "~/interface/shoppingCar";
// 訂單下載 html
import doorDetailPdf from "~/views/template1/Auth/Door/component/doorDetailPdf.vue";
import orderDetailPdf from "~/views/template1/Auth/Order/components/orderDetailPdf.vue";
import moment from "moment";
/**
 * CustomProductListIdEnum: 訂製門扇 id 對應分類
 * CustomProductListOptionEnum: 訂製門扇 產品選項
 */
import { CustomProductListIdEnum, CustomProductListOptionEnum } from "@/enums/customProduct.enum";
import { useInitializationStore } from "~/store/initializationStore";
// 尾款付款同意視窗
import finalPaymentRule from "~/views/template1/Auth/Door/component/finalPaymentRule.vue";

const initializationStore = useInitializationStore();

const { $api, $utils } = useNuxtApp();
const $config = useRuntimeConfig();

const showDownload = ref(false);
const orderDownloadHtmlRefDom = ref<any>(null);
const route = useRoute();
const router = useRouter();

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
        name: "auth-door-slug",
        text: "訂製門扇-訂單記錄",
        params: { slug: "訂製門扇-訂單記錄" },
    },
    {
        name: "auth-door-detail-slug-id",
        text: "#20211010001",
        params: { slug: "訂單資訊", id: 1 },
    },
]);

const dialogRepay = ref(false);

const dialogRefund = ref(false);

const handleRefund = () => {
    if (orderData?.value?.orderStatus === "待付訂金") {
        dialogRefund.value = true;
    } else if (orderData?.value?.orderStatus === "已付訂金" || orderData?.value?.orderStatus === "丈量派工中" || orderData?.value?.orderStatus === "丈量完成" || orderData?.value?.orderStatus === "待付尾款") {
        dialogRefundCustom.value.isVisible = true;
    }
};

const orderCancel = async () => {
    const params = {
        orderId: orderData.value.orderId,
    };
    const { data, status, error } = await $api().orderCancelAPI(params);

    console.log(data, status, error);
    if (status.value === "success") {
        ElMessage({
            type: "success",
            message: "取消成功",
        });
        const { data: resProductDetail }: any = await $api().GetProductOrderDetailAPI({ orderId: route.params.id });
        resProductDetail.value = resProductDetail;
        await getData();
    } else {
        ElMessage({
            type: "error",
            message: (error.value as any).data.message,
        });
    }
    dialogRefund.value = false;
};

const dialogRefundCustom = ref({
    isVisible: false,
    phone: initializationStore.initializationData.site.contact_phone,
});

// 訂單資料
const orderData = ref({
    orderNumber: "#20211010001",
    timeline: [
        {
            date: "2022-06-11",
            time: "11:00",
            status: "代支付訂金",
        },
        {
            date: "2022-06-20",
            time: "13:23",
            status: "訂單成立",
        },
        {
            date: "2022-06-25",
            time: "11:00",
            status: "派工確認完成",
        },
    ],
    info: {
        contactName: "Lucie chen",
        email: "lucie.chen@codepulse.com.tw",
        phone: "0912345678",
        address: "台北市中正區忠孝東路一段76號5樓之1",
    },
    payment: [
        {
            method: "信用卡",
            orderStatus: "未付款",
        },
        {
            method: "信用卡",
            orderStatus: "未付款",
        },
    ],
    orderStatus: "",
    orderPayments: [],
    receipt: [
        {
            status: "未開立",
            type: "公司戶發票",
            date: "2022-06-11",
            taxId: "54567354",
            carrier_code: "",
            number: "XG-345345123",
        },
        {
            status: "未開立",
            type: "公司戶發票",
            date: "2022-06-11",
            taxId: "54567354",
            carrier_code: "",
            number: "XG-345345123",
        },
    ],
    products: [
        {
            name: "YDM 7216A 指紋卡片密碼鑰匙四合一",
            color: "",
            doorLeaf: ["現代北歐玄關門 R53", "米白", "門高：200cm-215cm, 門寬：100cm, 門厚：7cm"],
            doorFrame: ["fuden wood door frame", "曜石黑"],
            doorLock: ["卡片密碼鑰匙三合一電子鎖", "YDM 7116A"],
            doorHanging: ["蝴蝶鉸鍊", "M65"],
            doorSealStrip: "ABC132",
            doorGasket: ["外裝式下降壓條", "K55"],
            doorOperator: ["隱藏式門弓器", "L78"],
            otherService: ["• 拆除及清運", "• 泥作"],
            quantity: 1,
            imgUrl: "/img/home/product/product1.jpg",
            rule: {
                needPrice: NaN, // 滿額贈
                getFree: false, // 加價購
            },
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
            },
        ],
        coupon: -1000,
        deposit: 0,
        deposit_ratio: 30,
        finalPayment_ori: 0,
        finalPayment: 0,
        finalPayment_ratio: 70,
        totalPrice: 43399,
        memo: "備註內容備註內容備註內容備註內容備註內容備註內容備註內容備註內容備註內容備註內容備註內容備註內容",
    },
});

// 商品詳情彈窗資料
const dialogData = ref([
    {
        title: "門扇",
        imgUrl: "/img/home/product/product1.jpg",
        data: [
            {
                label: "用途",
                value: "防火門扇",
            },
            {
                label: "方案",
                value: "母親節特惠方案",
            },
            {
                label: "品名",
                value: "YDM 7216A 指紋卡片密碼鑰匙四合一",
            },
            {
                label: "型號",
                value: "R53",
            },
            {
                label: "功能",
                value: "防火門扇",
            },
            {
                label: "顏色",
                value: "曜石黑",
            },
            {
                label: "尺寸",
                value: "門高：200cm-215cm, 門寬：100cm, 門厚：7cm",
            },
        ],
    },
    {
        title: "門框",
        imgUrl: "/img/auth/product1.jpg",
        data: [
            {
                label: "品名",
                value: "fuden wood door frame",
            },
            {
                label: "型號",
                value: "B505",
            },
            {
                label: "顏色",
                value: "曜石黑",
            },
        ],
    },
    {
        title: "門鎖",
        imgUrl: "/img/auth/product1.jpg",
        data: [
            {
                label: "品名",
                value: "fuden wood door frame",
            },
            {
                label: "型號",
                value: "YDM 7116A",
            },
        ],
    },
    {
        title: "掛門",
        imgUrl: "/img/auth/product1.jpg",
        data: [
            {
                label: "品名",
                value: "蝴蝶鉸鍊",
            },
            {
                label: "型號",
                value: "M65",
            },
        ],
    },
    {
        title: "氣密條",
        imgUrl: "/img/auth/product1.jpg",
        data: [
            {
                label: "品名",
                value: "氣密條",
            },
            {
                label: "型號",
                value: "ABC132",
            },
        ],
    },
    {
        title: "下降壓條",
        imgUrl: "/img/auth/product1.jpg",
        data: [
            {
                label: "品名",
                value: "下降壓條",
            },
            {
                label: "型號",
                value: "ABC132",
            },
        ],
    },
    {
        title: "開弓器",
        imgUrl: "/img/auth/product1.jpg",
        data: [
            {
                label: "品名",
                value: "開弓器",
            },
            {
                label: "型號",
                value: "ABC132",
            },
        ],
    },
    {
        title: "額外施作服務",
        data: [
            {
                label: "拆除及清運",
                value: "1000",
            },
            {
                label: "泥作",
                value: "5000",
            },
            {
                label: "油漆",
                value: "3000",
            },
        ],
        type: "list",
    },
]);

const resProductDetail = ref<any>(null);

// const { data: resProductDetailData }: any = await $api().GetProductOrderDetailAPI({ orderId: route.params.id });
// resProductDetail.value = resProductDetailData;

const handleRepay = async () => {
    if (orderData.value.orderStatus === "待付尾款") {
        dialogRepay.value = true;
    } else {
        orderRepay();
    }
};

const orderRepay = async () => {
    const hostUrl = $config.public.hostURL;
    console.log("Refund", hostUrl, orderData.value);
    let orderPaymentId = orderData.value.orderPayments[0]?.id;
    if (orderData.value.orderStatus === "待付尾款") {
        orderPaymentId = orderData.value.orderPayments[1]?.id;
    }
    const params = {
        orderId: orderData.value.orderId,
        orderPaymentId: orderPaymentId,
        redirect_url: `${hostUrl}/order/normal`,
    };
    const loading = ElLoading.service({
        lock: true,
        text: "重新付款中...",
        background: "rgba(0, 0, 0, 0.7)",
    });
    const { data, status, error } = await $api().orderRepayAPI(params);
    if (status.value === "success") {
        const resData = (data.value as any).data;
        if (resData.redirect) {
            window.location.href = resData.redirect_url;
            // window.open(resData.redirect_url, "self");
        }
    }
    loading.close();
};

const paymentStatus = (status: string) => {
    let result = "未付款";
    if (status === "paid") {
        result = "已付款";
    }
    return result;
};

const paymentMethod = (data: any) => {
    let result = "";
    if (data.payment_gateway === "綠界") {
        result = "信用卡";
    }
    if (data.payment_gateway === "門市") {
        result = `門市 (${data.stronghold.name})`;
    }

    return result;
};

/**
 * 取得商品分類詳情
 */
const emit = defineEmits(["update:pageLoading"]);
const getData = async () => {
    try {
        const { data: resProductDetailData }: any = await $api().GetProductOrderDetailAPI({ orderId: route.params.id });
        resProductDetail.value = resProductDetailData;
        console.log("resProductDetail =>", resProductDetail);
        orderData.value.orderId = resProductDetail.value.id;
        orderData.value.orderNumber = resProductDetail.value.order_no;
        breadcrumbs.value[3].text = resProductDetail.value.order_no;
        breadcrumbs.value[3].params.id = resProductDetail.value.id;
        orderData.value.info = {
            contactName: resProductDetail.value.contact_name,
            email: resProductDetail.value.contact_email,
            phone: resProductDetail.value.contact_phone,
            address: resProductDetail.value.contact_city + resProductDetail.value.contact_district + resProductDetail.value.contact_address,
        };
        orderData.value.receipt[0].type = resProductDetail.value.orderPayments[0].orderInvoice.type;
        orderData.value.receipt[0].status = $utils().receiptStatus(resProductDetail.value.orderPayments[0].orderInvoice.status);
        orderData.value.receipt[0].date = resProductDetail.value.orderPayments[0].orderInvoice.issued_at;
        orderData.value.receipt[0].taxId = resProductDetail.value.orderPayments[0].orderInvoice.tax_number;
        orderData.value.receipt[0].carrier_code = resProductDetail.value.orderPayments[0].orderInvoice.carrier_code;
        orderData.value.receipt[0].number = resProductDetail.value.orderPayments[0].orderInvoice.invoice_no;
        orderData.value.receipt[1].type = resProductDetail.value.orderPayments[1].orderInvoice.type;
        orderData.value.receipt[1].status = $utils().receiptStatus(resProductDetail.value.orderPayments[1].orderInvoice.status);
        orderData.value.receipt[1].date = resProductDetail.value.orderPayments[1].orderInvoice.issued_at;
        orderData.value.receipt[1].taxId = resProductDetail.value.orderPayments[1].orderInvoice.tax_number;
        orderData.value.receipt[1].carrier_code = resProductDetail.value.orderPayments[1].orderInvoice.carrier_code;
        orderData.value.receipt[1].number = resProductDetail.value.orderPayments[1].orderInvoice.invoice_no;
        orderData.value.price.deposit = resProductDetail.value.orderPayments[0].amount;
        orderData.value.price.deposit_ratio = resProductDetail.value.orderPayments[0].amount_ratio;
        orderData.value.price.finalPayment_ori = resProductDetail.value.orderPayments[1].original_amount;
        orderData.value.price.finalPayment = resProductDetail.value.orderPayments[1].amount;
        orderData.value.price.finalPayment_ratio = resProductDetail.value.orderPayments[1].amount_ratio;
        // orderData.value.price.totalPrice = resProductDetail.value.total_amount;
        orderData.value.price.totalPrice = Number(resProductDetail.value.orderPayments[0].amount) + Number(resProductDetail.value.orderPayments[1].amount);
        orderData.value.price.memo = resProductDetail.value.remark ? resProductDetail.value.remark : "無";
        orderData.value.orderStatus = $utils().orderStatus(resProductDetail.value.status);
        orderData.value.payment[0].method = paymentMethod(resProductDetail.value.orderPayments[0]);
        orderData.value.payment[0].orderStatus = paymentStatus(resProductDetail.value.orderPayments[0].status);
        orderData.value.payment[1].method = paymentMethod(resProductDetail.value.orderPayments[1]);
        orderData.value.payment[1].orderStatus = paymentStatus(resProductDetail.value.orderPayments[1].status);
        orderData.value.orderPayments = resProductDetail.value.orderPayments;
        orderData.value.timeline = [];
        resProductDetail.value.orderTimelines.forEach((item: { id: any; changed_at: moment.MomentInput; after_status: string }) => {
            orderData.value.timeline.push({
                date: moment(item.changed_at).format("YYYY-MM-DD"),
                time: moment(item.changed_at).format("HH:mm"),
                status: item.after_status,
            });
        });

        const coupon = resProductDetail.value.orderDiscounts.find((item: { type: string; }) => item.type === 'coupon')
        orderData.value.price.coupon = coupon ? -coupon.amount : 0
        const event = resProductDetail.value.orderDiscounts.filter((item: { type: string; }) => item.type !== 'coupon')
        orderData.value.price.event = []
        event.forEach(item => {
            orderData.value.price.event.push({
                name: item.name,
                discountPrice: -item.amount,
            })
        })
        setCustomShoppingCarData(resProductDetail.value.orderItems);
        emit("update:pageLoading", false);
    } catch (err: any) {
        console.log(err.response)
        if (err.response) {
            if (err.response.status === 404) {
                ElMessage({
                    type: "error",
                    message: "找不到此商品訂單",
                });
                router.push({ name: "auth-door-slug", params: { slug: "一般商品-訂單記錄" } });
            }
        }
    }
};

/**
 * 設定訂製門扇購物車資料
 * @param datas
 */
const setCustomShoppingCarData = (datas: any) => {
    const arr: ShoppingCarCustomInterface[] = [];
    datas.forEach((item: any) => {
        const result: ShoppingCarCustomInterface = {};
        result.count = item.quantity;
        item.orderItems.forEach((item2: any, index: number) => {
            const service: any = [];
            // 判斷是 門扇 的時候執行
            if (item2.productable.customProductType.id === CustomProductListIdEnum.door) {
                const door = setDoorData(item2.productable, item2.productVariationable.values, item2.productVariationable.stock);
                result["doorGroup"] = {
                    label: "門扇",
                    door: { ...door.result, color: door.color },
                    size: door.size,
                };
                result.imgSrc = door.result.imgSrc;
            }
            // 判斷是 門框 的時候執行
            if (item2.productable.customProductType.id === CustomProductListIdEnum.doorOut) {
                const door = setDoorData(item2.productable, item2.productVariationable.values, item2.productVariationable.stock);
                result["doorOut"] = {
                    label: "門框",
                    color: door.color,
                    ...door.result,
                };
            }
            // 判斷是 電子鎖 的時候執行
            if (item2.productable.customProductType.id === CustomProductListIdEnum.lock) {
                const data = setLocksData(item2.productable);
                result["lock"] = {
                    label: "門鎖",
                    ...data,
                };
            }
            // 判斷是 水平把手 的時候執行
            if (item2.productable.customProductType.id === CustomProductListIdEnum.handle) {
                const data = setLocksData(item2.productable);
                result["lock"] = {
                    label: "門鎖",
                    ...data,
                };
            }
            // 判斷是 掛門 的時候執行
            if (item2.productable.customProductType.id === CustomProductListIdEnum.tool1) {
                const data = setToolData(item2.productable);
                result["currentTool1"] = {
                    label: "掛門",
                    ...data,
                };
            }
            // 判斷是 氣密條 的時候執行
            if (item2.productable.customProductType.id === CustomProductListIdEnum.tool2) {
                const data = setToolData(item2.productable);
                result["currentTool2"] = {
                    label: "氣密條",
                    ...data,
                };
            }
            // 判斷是 下降壓條 的時候執行
            if (item2.productable.customProductType.id === CustomProductListIdEnum.other1) {
                console.log(item2)
                const data = setToolData(item2.productable);
                result["currentOther1"] = {
                    label: "下降壓條",
                    datas: [data],
                };
            }
            // 判斷是 門弓器 的時候執行
            if (item2.productable.customProductType.id === CustomProductListIdEnum.other2) {
                const data = setToolData(item2.productable);
                result["currentOther2"] = {
                    label: "門弓器",
                    datas: [data],
                };
            }
            // 判斷是 輔助鎖 的時候執行
            if (item2.productable.customProductType.id === CustomProductListIdEnum.other3) {
                const data = setToolData(item2.productable);
                result["currentOther3"] = {
                    label: "輔助鎖",
                    datas: [data],
                };
            }
            // 判斷是 施作服務 的時候執行
            if (item2.productable.customProductType.id === CustomProductListIdEnum.service) {
                const data = setServiceData(item2.productable);
                service.push(data);
                result["otherServices"] = {
                    label: "額外施作服務",
                };
            }
            if (result["otherServices"]) {
                result["otherServices"].datas = service;
            }
        });

        // 門扇 庫存數量
        const doorStock = result.doorGroup.door.doorLimit;
        // 門框 庫存數量
        const doorOutStock = result.doorOut.doorLimit;
        // 鎖 庫存數量
        const lockStock = result.lock.stock;
        // 掛門 庫存數量
        const currentTool1Stock = result.currentTool1.stock;
        // 氣密條 庫存數量
        const currentTool2Stock = result.currentTool2.stock;
        let currentOther1 = 0;
        // 取的所有商品中最低庫存數量商品
        const stocks = [doorStock, doorOutStock, lockStock, currentTool1Stock, currentTool2Stock];
        // 下將壓條 庫存數量
        if (result.currentOther1) {
            stocks.push(result.currentOther1.stock);
        }
        // 門弓器 庫存數量
        if (result.currentOther2) {
            stocks.push(result.currentOther2.stock);
        }
        arr.push({
            id: item.id,
            count: item.quantity,
            singlePrice: Number(item.price),
            price: Number(item.price),
            totalPrice: Number(item.price) * item.quantity,
            doorLimit: _Min(stocks),
            ...result,
            name: result.doorGroup.door.title,
            custom_scene: item.custom_scene,
        });
    });
    orderData.value.products = arr;
    console.log("arr =>", arr);
};

/**
 * 門扇整理資料
 * @param { type Object(物件) } datas 購物車資料
 * @param { type Array(陣列) } options 型號選項
 * @param { type Number(數字) } productLimit 庫存數量限制
 */
function setDoorData(datas: any, options: any, productLimit: number) {
    let result: any = {};
    // 預覽圖
    const previewImgSrc = {};
    // 庫存
    const stock = {};
    // 價格
    const price = {};
    // 訂製門扇加入購物車時需要
    const optionId = {};
    for (const key of Object.keys(datas.customProductVariations)) {
        previewImgSrc[key] = {
            front: datas.customProductVariations[key].front_image,
            backend: datas.customProductVariations[key].back_image,
            half: datas.customProductVariations[key].half_image,
        };
        stock[key] = datas.customProductVariations[key].stock;
        price[key] = Number(datas.customProductVariations[key].price);
        // 訂製門扇加入購物車時需要
        optionId[key] = datas.customProductVariations[key].id;
    }
    // 判斷是否有尺寸值
    const haveSize = datas.customProductOptions.find((option: any) => option.id === CustomProductListOptionEnum.size);
    //  判斷是否有尺寸值 沒有值給空陣列
    const sizes = haveSize !== undefined ? haveSize.values : [];
    result = {
        id: datas.id,
        style: datas.model,
        title: datas.name,
        name: `${datas.brand}`,
        imgSrc: datas.main_image,
        colors: datas.customProductOptions
            .find((option: any) => option.id === CustomProductListOptionEnum.color)
            .values.map((color: any) => ({
                id: color.id,
                text: color.name,
                imgSrc: color.icon,
            })),
        sizes,
        previewImgSrc,
        stock,
        doorLimit: productLimit,
        price,
        optionId,
        detailData: {
            carousel: datas.carousel_images.map((item: string, index: number) => ({ id: index + 1, imgSrc: item })),
            content: datas.content,
        },
    };

    const colorId = options.find((option: any) => option.custom_product_option_id === CustomProductListOptionEnum.color);
    let color = {};
    if (colorId !== undefined) {
        color = datas.customProductOptions
            .find((option: any) => option.id === CustomProductListOptionEnum.color)
            .values.map((color: any) => ({
                id: color.id,
                text: color.name,
                imgSrc: color.icon,
            }))
            .find((item: any) => item.id === colorId.custom_product_option_value_id);
    }

    const sizeId = options.find((option: any) => option.custom_product_option_id === CustomProductListOptionEnum.size);
    let size = {};
    if (sizeId !== undefined && haveSize.values.find((item: any) => item.id === sizeId.custom_product_option_value_id) !== undefined) {
        size = { label: "尺寸", ...haveSize.values.find((item: any) => item.id === sizeId.custom_product_option_value_id) };
    }

    if (!$utils().isEmpty(size)) {
        return { result, color, size };
    }
    return { result, color };
}

/**
 * 設定鎖資料
 * @param data
 */
function setLocksData(data: any) {
    const result = {
        imgSrc: data.main_image,
        style: `${data.model}`,
        model: data.model,
        title: data.name,
        name: `${data.name}`,
        shape: data.shape,
        stock: data.stock,
        price: Number(data.price),
        id: data.id,
        detailData: {
            carousel: data.carousel_images.map((item: string, index: number) => ({ id: index + 1, imgSrc: item })),
            content: data.content,
        },
        previewImgSrc: {
            front: data.front_image,
            backend: data.back_image,
            half: data.half_image,
        },
    };
    return result;
}

/**
 * 設定必選五金與選配資料
 */
function setToolData(data: any) {
    const result = {
        id: data.id,
        style: data.model,
        title: data.name,
        brand: data.brand,
        name: data.name,
        imgSrc: data.main_image,
        stock: data.stock,
        price: Number(data.price),
        detailData: {
            carousel: data.carousel_images.map((item: string, index: number) => ({ id: index + 1, imgSrc: item })),
            content: data.content,
        },
    };
    return result;
}

/**
 * 設定施作服務資料
 */
function setServiceData(data: any) {
    const result = {
        id: data.id,
        name: data.name,
        imgSrc: data.main_image,
        stock: data.stock,
        price: Number(data.price),
        detailData: {
            carousel: data.carousel_images.map((item: string, index: number) => ({ id: index + 1, imgSrc: item })),
            content: data.content,
        },
    };
    return result;
}

/**
 * 初始化
 */
async function init() {
    await getData();
}

function downloadPdf() {
    const iframeEL=document.querySelector('.target-el-iframe');
    if(iframeEL){
        iframeEL.remove();
    }
    //目標元素
    const info=document.querySelector('.print');
    //創建iframe
    const iframeEl= document.createElement('iframe');
    iframeEl.classList.add('target-el-iframe')
    iframeEl.setAttribute('style','display: none')

    //添加到頁面
    document.body.appendChild(iframeEl)
    const doc = iframeEl.contentWindow.document
    doc.write('<div class="print-iframe">' + info.innerHTML + '</div>')
    doc.write('<style>@page{size:auto;margin: 0.5cm 1cm 0cm 1cm;}</style>')
    doc.close()
    //引用第三方樣式
    const link1 = doc.createElement('link');
    link1.rel = 'stylesheet';
    link1.href = 'https://fonts.googleapis.com';

    const link2 = doc.createElement('link');
    link2.rel = 'stylesheet';
    link2.href = 'https://fonts.gstatic.com';

    const link3 = doc.createElement('link');
    link3.rel = 'stylesheet';
    link3.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&display=swap';

    const link = doc.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/css/print.css';
    
    // doc.head.appendChild(link);

    doc.head.appendChild(link);
    console.log(iframeEl.contentWindow)
      //打印
    iframeEl.onload = () => {
        iframeEl.contentWindow.print()
    }
}

onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
            await init();
        }
    });
});
</script>
