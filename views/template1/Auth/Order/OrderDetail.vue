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
                    <div class="flex items-center gap-2 cursor-pointer h-fit">
                        <NuxtImg
                            class="w-[20px] aspect-square object-cover"
                            src="/img/icons/auth/download.svg"
                        />
                        <span @click="downloadPdf">下載訂購單</span>
                    </div>
                </div>
                <RecordTimeline
                    :orderNumber="orderData.orderNumber"
                    :timeline="orderData.timeline"
                />
                <div class="mt-12">
                    <h4 class="mb-3 font-bold">配送資訊</h4>
                    <div class="border-b-[1px] border-gray-200 pb-5">
                        <div class="grid grid-cols-2 gap-4 w-[100%] 2xl:w-[85%] 3xl:w-[70%]">
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
                                聯絡電話：{{ orderData?.info?.phone }}
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
                        <div class="grid grid-cols-2 gap-4 w-[100%] 2xl:w-[85%] 3xl:w-[70%]">
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
                    <div class="grid grid-cols-2 gap-4 w-[100%] 2xl:w-[85%] 3xl:w-[70%]">
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
                            v-if="orderData?.receipt?.taxId"
                            class="text-gray-700"
                        >
                            統編：{{ orderData?.receipt?.taxId }}
                        </div>
                        <div
                            v-if="orderData?.receipt?.number"
                            class="text-gray-700"
                        >
                            發票號碼：{{ orderData?.receipt?.number }}
                        </div>
                    </div>
                </div>
                <div class="mt-12">
                    <div class="bg-gray-100 px-[20px] py-[10px] font-bold">配送商品</div>
                </div>
                <div>
                    <RecordProduct :order="orderData.products" />
                </div>
                <div>
                    <OrderPrice :order="orderData.price" />
                </div>
                <div class="flex justify-center mt-[60px]">
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
                <div class="text-center text-gray-800 text-[20px]">是否確定取消此筆預約</div>
                <div class="flex justify-center gap-4 mt-6">
                    <button
                        class="transparent-btn btn-sm"
                        @click="dialogRefund = false"
                    >
                        否
                    </button>
                    <button
                        class="yellow-btn btn-sm"
                        @click="dialogRefund = false"
                    >
                        是
                    </button>
                </div>
            </el-dialog>
        </client-only>
        <div class="pdf-page"><span>test page 測試</span></div>
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
        name: "auth-order-detail-slug",
        text: "#20211010001",
        params: { slug: "#20211010001" },
    },
]);

const dialogRefund = ref(false);

const handleRefund = () => {
    dialogRefund.value = true;
};

// 訂單資料
const orderData = ref({
    orderNumber: "#20211010001",
    timeline: [
        {
            date: "2022-06-11",
            time: "11:00",
            status: "未付款",
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
    payment: {
        method: "信用卡",
        orderStatus: "未付款",
    },
    receipt: {
        status: "未開立",
        type: "公司戶發票",
        date: "2022-06-11",
        taxId: "54567354",
        number: "XG-345345123",
    },
    products: [
        {
            name: "YDM 7216A 指紋卡片密碼鑰匙四合一",
            color: "黑色",
            quantity: 1,
            price: 3000,
            imgSrc: "/img/shopping-car/shopping-gift-demo-1.jpg",
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
            imgSrc: "/img/shopping-car/shopping-gift-demo-1.jpg",
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
        coupon: -1000,
        totalPrice: 43399,
        memo: "備註內容備註內容備註內容備註內容備註內容備註內容備註內容備註內容備註內容備註內容備註內容備註內容",
    },
});

import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
// import Font from "~/public/font/NotoSansTC-Regular-normal";

function downloadPdf() {
    // Default export is a4 paper, portrait, using millimeters for units
    if (process.client) {
        // const doc = new jsPDF();
        // const myfont = Font;
        // doc.addFileToVFS("NotoSansTC-Regular-normal.ttf", myfont);
        // doc.addFont("NotoSansTC-Regular-normal.ttf", "NotoSansTC-Regular", "normal");
        // doc.setFont("NotoSansTC-Regular");

        // const element = "<span style='font-size:100px; font-family:SourceHanSans-Normal;'>測試!</span>";
        // doc.html(element, {
        //     callback: function (doc) {
        //         // doc.addFont("SourceHanSans-Normal.ttf", "SourceHanSans-Normal", "normal");
        //         // doc.setFont("SourceHanSans-Normal");

        //         doc.save("a4.pdf");
        //     },
        //     x: 10,
        //     y: 10,
        // });
        // doc.text("簡體中文、繁體體中文、English、ジャパン、한국어", 10, 10);
        // doc.addFont("SourceHanSans-Normal.ttf", "SourceHanSans-Normal", "normal");
        // doc.setFont("SourceHanSans-Normal");
        // doc.save("my.pdf");
    }

    // doc.addFileToVFS("MyFont.ttf", Font);
    // doc.addFont("MyFont.ttf", "MyFont", "normal");



    const pageElements = document.querySelectorAll('.pdf-page'); // 選取所有需要匯出的頁面元素

      const pdf = new jsPDF(); // 創建一個新的 jspdf 實例
      let currentY = 0; // 目前的 Y 座標

      // 遍歷每個頁面元素，並使用 'html2canvas' 將每個頁面元素渲染為 canvas，並將其添加到 PDF 中
      for (let i = 0; i < pageElements.length; i++) {
        const pageElement = pageElements[i];

        const canvas = await html2canvas(pageElement); // 將頁面元素渲染為 canvas

        const imgDataURL = canvas.toDataURL('image/png'); // 取得 canvas 的圖片 URL
        const imgWidth = pdf.internal.pageSize.getWidth(); // 圖片的寬度，與 PDF 頁面的寬度相同
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // 計算圖片的高度，以保持比例

        if (i > 0) {
          pdf.addPage(); // 添加新的頁面
          currentY = 0; // 重置 Y 座標
        }

        pdf.addImage(imgDataURL, 'PNG', 0, currentY, imgWidth, imgHeight); // 在 PDF 頁面上繪製圖片
        currentY += imgHeight; // 更新目前的 Y 座標
      }

      pdf.save('example.pdf'); // 下載生成的 PDF 文件
    },


}
</script>
