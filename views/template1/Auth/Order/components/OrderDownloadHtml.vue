<template>
    <article
        class="p-10 pdf-page"
        style="width: 1240px; height: 5700px"
    >
        <div class="flex items-center">
            <div class="font-medium YaleSolisW-Bd mr-[20px]">
                <h5>Trusted</h5>
                <p>every day</p>
            </div>
            <!-- {{ imageUrlToBase64(initializationData.site.site_logo) }} -->
            <!-- {{ base64Image }} -->
            <NuxtImg
                class="mr-[20px]"
                src="/img/logo/logo-1.svg"
            />
            <h1 class="text-[28px] font-medium YaleSolisW-Bd">一般產品訂購單</h1>
            <div class="flex-1 text-right">
                <p class="text-grqy-800 text-[16px]">訂單編號</p>
                <p class="text-[18px] font-medium YaleSolisW-Bd">{{ orderData.orderNumber }}</p>
            </div>
        </div>
        <div
            class="mt-[20px] pb-[16px] border-b border-gray-300"
            v-for="(payment, key) in paymentData"
            :key="key"
        >
            <h3 class="text-[20px] mb-[8px] font-medium YaleSolisW-Bd">{{ payment.title }}</h3>
            <ul>
                <li v-for="(column, key2) in payment.columns">
                    <span>{{ column.label }}：</span>
                    <span>{{ column.value }}</span>
                </li>
            </ul>
        </div>
        <div
            class="mt-[20px] pb-[16px]"
            v-for="(product, key) in productData"
            :key="key"
        >
            <h3
                v-if="product.detail"
                class="text-[20px] mb-[8px] font-medium YaleSolisW-Bd"
            >
                {{ product.detail.title }}
            </h3>
            <h3
                v-if="product.detail"
                class="text-[20px] mb-[8px] font-medium YaleSolisW-Bd"
            >
                {{ product.detail.title }}
            </h3>
            <ul>
                <li
                    v-for="(item, index) in product.products"
                    :key="index"
                    class="py-[16px] border-b border-gray-300"
                >
                    <div class="flex">
                        <!-- <NuxtImg
                            :src="item.imgSrc"
                            class="max-w-[200px] w-full mr-[37px]"
                        /> -->
                        <div class="min-w-[250px]">
                            <h5 class="text-gray-500 mb-[8px]">{{ item.name }}</h5>
                            <div class="flex mb-[8px]">
                                <div class="flex-1 text-gray-500">規格</div>
                                <div class="text-gray-500">{{ item.color }}</div>
                            </div>
                            <div class="flex mb-[8px]">
                                <div class="flex-1 text-gray-500">數量</div>
                                <div class="text-gray-500">{{ item.quantity }}</div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div
            v-for="(bill, key) in billingData"
            :key="key"
        >
            <!-- <ul
                v-if="key === 'columns'"
                class="mt-[20px] pb-[16px]"
            >
                <li
                    v-for="(column, key2) in bill"
                    :key="key2"
                    class="flex mb-[4px] text-gray-500"
                >
                    <span class="flex-1">{{ column.label }}</span>
                    <span class=""><span v-if="key2 !== 'deliveryCharge'">-</span>NT${{ $utils().formatCurrency(column.value) }}</span>
                </li>
            </ul> -->
            <ul
                class="py-[16px] border-b border-gray-300"
                v-if="key === 'markets'"
            >
                <li
                    v-for="(item, key2) in bill"
                    :key="key2"
                    class="flex mb-[4px] text-gray-500 list-disc list-inside"
                >
                    <div>{{ item.name }}：</div>
                    <div>{{ item.discountPrice }}</div>
                </li>
            </ul>
        </div>
        <div class="flex mt-[20px]">
            <h2 class="flex-1 text-[24px] font-medium YaleSolisW-Bd">總計</h2>
            <div class="flex items-center">
                <span class="text-[16px]">$NT</span>
                <span class="text-[24px] font-medium YaleSolisW-Bd">{{ $utils().formatCurrency(billingData.total) }}</span>
            </div>
        </div>
        <div class="mt-[20px] text-gray-500 text-[14px]">
            <p>備註</p>
            <p>{{ billingData.note }}</p>
        </div>
    </article>
</template>

<script setup lang="ts">
// 初始化 store
import { useInitializationStore } from "~/store/initializationStore";
// 生成 pdf 套件
import { jsPDF } from "jspdf";
// html 轉 canvas 圖片套件
import html2canvas from "html2canvas";

const props = defineProps({
    orderData: {
        type: Object,
    },
});
defineExpose({
    downloadPdf,
});
const base64Image = ref("");

async function getImageBase64(url) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const reader = new FileReader();

        reader.onloadend = () => {
            base64Image.value = reader.result;
        };

        reader.readAsDataURL(blob);
    } catch (error) {
        console.error("Failed to fetch image:", error);
    }
}

// const imageUrlToBase64 = async (url: string) => {
//     // const data = await fetch(url);
//     const blob = await data.blob();
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(blob);
//         reader.onloadend = () => {
//             const base64data = reader.result;
//             resolve(base64data);
//         };
//         reader.onerror = reject;
//     });
// };

const { $utils } = useNuxtApp();

const initializationStore = useInitializationStore();

const initializationData = computed(() => {
    return initializationStore.initializationData;
});
onMounted(async () => {
    await getImageBase64(initializationData.value.site.site_logo);
});

const paymentData = ref({
    logistics: {
        title: "配送資訊",
        columns: {
            name: { label: "聯繫人", value: props.orderData.info.contactName },
            phone: { label: "聯絡電話", value: props.orderData.info.phone },
            email: { label: "Email", value: props.orderData.info.email },
            address: { label: "門市名稱/收件地址", value: props.orderData.info.address },
        },
    },
    payment: {
        title: "付款明細",
        columns: {
            type: { label: "付款方式", value: props.orderData.payment.method },
            status: { label: "付款狀態", value: props.orderData.payment.orderStatus },
        },
    },
    bill: {
        title: "發票資訊",
        columns: {
            status: { label: "發票狀態", value: props.orderData.receipt.status },
            createdDate: { label: "開立日期", value: props.orderData.receipt.date },
            type: { label: "發票類型", value: props.orderData.receipt.type },
            receipt: { label: "統編", value: props.orderData.receipt.taxId },
            billCode: { label: "發票號碼", value: props.orderData.receipt.number },
        },
    },
});

const productData = ref({
    detail: {
        title: "商品明細",
        products: props.orderData.products,
    },
});

const billingData = ref({
    // columns: {
    //     deliveryCharge: {
    //         label: "運費",
    //         value: 200,
    //     },
    //     sale: {
    //         label: "活動折扣",
    //         value: 1200,
    //     },
    //     coupon: {
    //         label: "優惠券折扣",
    //         value: 1200,
    //     },
    // },
    markets: props.orderData.price.event,
    total: Number(props.orderData.price.totalPrice),
    note: props.orderData.price.memo,
});

async function downloadPdf() {
    // Default export is a4 paper, portrait, using millimeters for units
    nextTick(async () => {
        const pageElements = document.querySelectorAll(".pdf-page"); // 選取所有需要匯出的頁面元素

        // const pdf = new jsPDF("p", "mm", [297, 210]); // 創建一個新的 jspdf 實例
        const pdf = new jsPDF(); // 創建一個新的 jspdf 實例
        let currentY = 0; // 目前的 Y 座標

        // 遍歷每個頁面元素，並使用 'html2canvas' 將每個頁面元素渲染為 canvas，並將其添加到 PDF 中
        for (let i = 0; i < pageElements.length; i++) {
            const pageElement = pageElements[i];

            const canvas = await html2canvas(pageElement, {
                useCORS: true,
            }); // 將頁面元素渲染為 canvas
            const imgDataURL = canvas.toDataURL("image/jpeg"); // 取得 canvas 的圖片 URL
            const imgWidth = pdf.internal.pageSize.getWidth() * 0.9; // 圖片的寬度，與 PDF 頁面的寬度相同
            const imgHeight = ((canvas.height * imgWidth) / canvas.width) * 0.9; // 計算圖片的高度，以保持比例

            if (i > 0) {
                pdf.addPage(); // 添加新的頁面
                currentY = 0; // 重置 Y 座標
            }

            pdf.addImage(imgDataURL, "JPEG", 10, 10, imgWidth, imgHeight); // 在 PDF 頁面上繪製圖片
            currentY += imgHeight; // 更新目前的 Y 座標
        }
        pdf.save("example.pdf"); // 下載生成的 PDF 文件

        // setTimeout(() => {
        //     pdf.save("example.pdf"); // 下載生成的 PDF 文件
        // }, 1000);
    });
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
}
</script>
