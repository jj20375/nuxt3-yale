<template>
    <section class="mt-headerMb xl:mt-header">
        <nav class="border-t border-gray-300 border-b py-[16px] bg-white">
            <div class="container">
                <ClientOnly> <Breadcrumb :menus="breadcrumbs" /></ClientOnly>
            </div>
        </nav>
        <div class="container">
            <div class="pt-[36px] sm:pt-[60px] pb-[50px] sm:pb-[100px]">
                <NuxtLink :to="{ name: 'auth-order-slug' }">
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
                    @orderRepay="orderRepay"
                />
                <div class="mt-8 sm:mt-12">
                    <h4 class="mb-3 font-bold">配送資訊</h4>
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
                                門市名稱/收件地址：{{ orderData?.info?.address }}
                            </div>
                        </div>
                    </div>
                    <h4 class="mt-5 mb-3 font-bold">付款明細</h4>
                    <div class="border-b-[1px] border-gray-200 pb-5">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-1 w-full 2xl:w-[85%] 3xl:w-[70%]">
                            <div
                                v-if="orderData?.payment?.method"
                                class="text-gray-700"
                            >
                                付款方式：{{ orderData?.payment?.method }}
                            </div>
                            <div
                                v-if="orderData?.payment?.orderStatus"
                                class="text-gray-700"
                            >
                                付款狀態：{{ orderData?.payment?.orderStatus }}
                            </div>
                        </div>
                    </div>
                    <h4 class="mt-5 mb-3 font-bold">發票資訊</h4>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-1 w-full 2xl:w-[85%] 3xl:w-[70%]">
                        <div
                            v-if="orderData?.receipt?.status"
                            class="text-gray-700"
                        >
                            發票狀態：{{ orderData?.receipt?.status }}
                        </div>
                        <div
                            v-if="orderData?.receipt?.type"
                            class="text-gray-700"
                        >
                            發票類型：{{ orderData?.receipt?.type }}
                        </div>
                        <div
                            v-if="orderData?.receipt?.date"
                            class="text-gray-700"
                        >
                            開立日期：{{ orderData?.receipt?.date }}
                        </div>
                        <div
                            v-if="orderData?.receipt?.carrier_code"
                            class="text-gray-700"
                        >
                            電子載具：{{ orderData?.receipt?.carrier_code }}
                        </div>
                        <div
                            v-if="orderData?.receipt?.taxId"
                            class="text-gray-700"
                        >
                            統編：{{ orderData?.receipt?.taxId }}
                        </div>
                        <div
                            v-if="orderData?.receipt?.donation_code"
                            class="text-gray-700"
                        >
                            愛心碼：{{ orderData?.receipt?.donation_code }}
                        </div>
                        <div
                            v-if="orderData?.receipt?.number"
                            class="text-gray-700"
                        >
                            發票號碼：{{ orderData?.receipt?.number }}
                        </div>
                    </div>
                </div>
                <div class="mt-8 sm:mt-12">
                    <div class="bg-gray-100 px-[20px] py-[10px] font-bold">配送商品</div>
                </div>
                <div>
                    <RecordProduct :order="orderData.products" />
                </div>
                <div>
                    <OrderPrice :order="orderData.price" />
                </div>
                <div
                    v-if="
                        orderData?.orderStatus === '未付款' ||
                        orderData?.orderStatus === '已付款' ||
                        orderData?.orderStatus === '處理中' ||
                        orderData?.orderStatus === '已出貨'
                    "
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
            <orderDetailPdf
                v-model="showDownload"
                :orderData="orderData"
                ref="orderDownloadHtmlRefDom"
            />
        </client-only>
    </section>
</template>
<script setup lang="ts">
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
import { ElMessage } from "element-plus";
import RecordTimeline from "~/views/template1/Auth/components/OrderTimeline.vue";
import RecordProduct from "~/views/template1/Auth/components/OrderProduct.vue";
import OrderPrice from "~/views/template1/Auth/components/OrderPrice.vue";
// 訂單下載 html
import orderDetailPdf from "~/views/template1/Auth/Order/components/orderDetailPdf.vue";

import moment from "moment";

const { $api, $utils } = useNuxtApp();

const showDownload = ref(false);
const route = useRoute();
const router = useRouter();
const $config = useRuntimeConfig();

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
        name: "auth-order-slug",
        text: "一般產品-訂單記錄",
        params: { slug: "一般產品-訂單記錄" },
    },
    {
        name: "auth-order-detail-slug-id",
        text: "#20211010001",
        params: { slug: "訂單資訊", id: '1' }
    },
]);

const dialogRefund = ref(false);

const handleRefund = () => {
    dialogRefund.value = true;
};

const orderCancel = async () => {
    const params = {
        orderId: orderData.value.orderId,
    };
    const { data, status, error } = await $api().orderCancelAPI(params);


    console.log(data, status, error)
    if (status.value === "success") {
        ElMessage({
            type: "success",
            message: "取消成功",
        });
        const { data: resProductDetailData }: any = await $api().GetProductOrderDetailAPI({ orderId: route.params.id });
        resProductDetail.value = resProductDetailData
        await getData();
    } else {
        ElMessage({
            type: "error",
            message: (error.value as any).data.message,
        });
    }
    dialogRefund.value = false;
};

// 訂單資料
const orderData = ref({
    orderId: "",
    orderNumber: "",
    timeline: [
        {
            id: "",
            date: "2022-06-11",
            time: "11:00",
            status: "未付款",
        },
    ],
    info: {
        contactName: "Lucie chen",
        email: "lucie.chen@codepulse.com.tw",
        phone: "0912345678",
        address: "台北市中正區忠孝東路一段76號5樓之1",
    },
    payment: {
        method: "信用卡",
        orderStatus: "未付款",
    },
    orderStatus: '',
    orderPayments: [],
    receipt: {
        status: "未開立",
        type: "公司戶發票",
        date: "2022-06-11",
        taxId: "54567354",
        carrier_code: "",
        number: "XG-345345123",
    },
    products: [
        {
            name: "YDM 7216A 指紋卡片密碼鑰匙四合一",
            color: "黑色",
            quantity: 1,
            price: 3000,
            imgUrl: "/img/shopping-car/shopping-gift-demo-1.jpg",
            rule: {
                needPrice: 3000, // 滿額贈
                getFree: false, // 加價購
            },
        },
        {
            name: "YDM 7216A 指紋卡片密碼鑰匙四合一",
            color: "紅色",
            quantity: 3,
            price: 7000,
            imgUrl: "/img/shopping-car/shopping-gift-demo-1.jpg",
            rule: {
                needPrice: NaN, // 滿額贈
                getFree: true, // 加價購
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
        coupon: 0,
        totalPrice: 43399,
        memo: "備註內容備註內容備註內容備註內容備註內容備註內容備註內容備註內容備註內容備註內容備註內容備註內容",
    },
});

// 訂單下載 html
const orderDownloadHtmlRefDom = ref<any>(null);
    const resProductDetail = ref<any>(null)

// const { data: resProductDetailData }: any = await $api().GetProductOrderDetailAPI({ orderId: route.params.id });
// resProductDetail.value = resProductDetailData

const orderRepay = async () => {
    const hostUrl = $config.public.hostURL;
    console.log("Refund", hostUrl, $config.public);
    const params = {
        orderId: orderData.value.orderId,
        orderPaymentId: orderData.value.orderPayments[0]?.id,
        redirect_url: `${hostUrl}/order/normal`,
    };
    const { data, status, error } = await $api().orderRepayAPI(params);
    if (status.value === "success") {
        const resData = (data.value as any).data;
        if (resData.redirect) {
            window.location.href = resData.redirect_url;
            // window.open(resData.redirect_url, "self");
        }
    }
};

const paymentStatus = (orderPayments:string) => {
    let result = '未付款'
    if (orderPayments[0]?.status === 'paid') {
        result = '已付款'
    }

    return result
}
/**
 * 取得訂單詳情
 */
 const emit = defineEmits(["update:pageLoading"]);
const getData = async () => {
    try {
        const { data: resProductDetailData, status, error }: any = await $api().GetProductOrderDetailAPI({ orderId: route.params.id });
        resProductDetail.value = resProductDetailData
        console.log("resProductDetail =>", resProductDetail);
        orderData.value.orderId = resProductDetail.value.id;
        orderData.value.orderNumber = resProductDetail.value.order_no;
        breadcrumbs.value[3].text = resProductDetail.value.order_no;
        breadcrumbs.value[3].params.slug = '訂單資訊';
        breadcrumbs.value[3].params.id = resProductDetail.value.id;
        orderData.value.info = {
            contactName: resProductDetail.value.contact_name,
            email: resProductDetail.value.contact_email,
            phone: resProductDetail.value.contact_phone,
            address: resProductDetail.value.contact_city + resProductDetail.value.contact_district + resProductDetail.value.contact_address,
        };
        orderData.value.products = [];
        resProductDetail.value.orderItems.forEach((item: { productable: { name: any; attributes: { [x: string]: any } }; quantity: any; productVariationable:any; }) => {
            let productVariationable = []
            let imgUrl = item.productable.main_image
            if (item.productVariationable) {
                productVariationable = item.productVariationable?.values.map((variation: { product_option_name: any; product_option_value_name: any; }) => {
                    return {
                        label: variation.product_option_name,
                        value: variation.product_option_value_name
                    }
                })
                const productVariationableImg = item.productable.other_images.find(img => img.includes(item.productVariationable.image))
                imgUrl = productVariationableImg ? productVariationableImg : item.productable.main_image
            }
            orderData.value.products.push({
                name: item.productable.name,
                price: "$" + $utils().formatCurrency(item.price),
                totalPrice: item.total_amount,
                productVariationable: productVariationable,
                quantity: item.quantity,
                imgUrl: imgUrl,
                is_add_on_purchase: item.is_add_on_purchase,
                is_discount_gift: item.is_discount_gift,
            });
        });
        orderData.value.orderPayments = resProductDetail.value.orderPayments
        orderData.value.timeline = [];
        resProductDetail.value.orderTimelines.forEach((item: { id: any; changed_at: moment.MomentInput; after_status: string }) => {
            orderData.value.timeline.push({
                date: moment(item.changed_at).format("YYYY-MM-DD"),
                time: moment(item.changed_at).format("HH:mm"),
                status: item.after_status,
            });
        });
        orderData.value.receipt.type = resProductDetail.value.orderPayments[0].orderInvoice.type;
        orderData.value.receipt.status = $utils().receiptStatus(resProductDetail.value.orderPayments[0].orderInvoice.status);
        orderData.value.receipt.date = resProductDetail.value.orderPayments[0].orderInvoice.issued_at;
        orderData.value.receipt.taxId = resProductDetail.value.orderPayments[0].orderInvoice.tax_number;
        orderData.value.receipt.carrier_code = resProductDetail.value.orderPayments[0].orderInvoice.carrier_code;
        orderData.value.receipt.donation_code = resProductDetail.value.orderPayments[0].orderInvoice.donation_code;
        orderData.value.receipt.number = resProductDetail.value.orderPayments[0].orderInvoice.invoice_no;
        orderData.value.price.totalPrice = resProductDetail.value.total_amount;
        orderData.value.price.memo = resProductDetail.value.remark ? resProductDetail.value.remark : "無";
        orderData.value.orderStatus = $utils().orderStatus(resProductDetail.value.status);
        orderData.value.payment.orderStatus = paymentStatus(resProductDetail.value.orderPayments);

        const coupon = resProductDetail.value.orderDiscounts.find((item: { type: string; }) => item.type === 'coupon')
        orderData.value.price.coupon = coupon ? -coupon.amount : 0
        orderData.value.price.deliveryFee = resProductDetail.value.shipping ? resProductDetail.value.shipping.amount : 0
        const event = resProductDetail.value.orderDiscounts.filter((item: { type: string; }) => item.type !== 'coupon')
        orderData.value.price.event = []
        event.forEach(item => {
            orderData.value.price.event.push({
                name: item.name,
                discountPrice: -item.amount,
            })
        })
        emit("update:pageLoading", false);
    } catch (err: any) {
        console.log(err.response)
        if (err.response) {
            if (err.response.status === 404) {
                ElMessage({
                    type: "error",
                    message: "找不到此商品訂單",
                });
                router.push({ name: "auth-order-slug", params: { slug: "一般商品-訂單記錄" } });
            }
        }
    }
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
