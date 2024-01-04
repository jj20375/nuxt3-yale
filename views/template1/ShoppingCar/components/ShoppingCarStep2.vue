<template>
    <div class="flex">
        <!-- <pre>{{ formMain }}</pre> -->
        <!-- <pre>{{ formContactUser }}</pre> -->
        <div class="flex-1">
            <ShoppingCarStep2FormUser v-model:form="formMain" />
            <ShoppingCarStep2FormContactUser v-model:form="formContactUser" />
            <ShoppingCarStep2FormLogistics v-model:form="formLogistics" />
            <ShoppingCarStep2FormPayment v-model:form="formPayment" />
            <ShoppingCarStep2FormInvoice v-model:form="formInvoice" />
        </div>
    </div>
</template>

<script setup lang="ts">
// 訂購人表單
import ShoppingCarStep2FormUser from "~/views/template1/ShoppingCar/components/Step2Form/ShoppingCarStep2FormUser.vue";
// 聯繫人表單
import ShoppingCarStep2FormContactUser from "~/views/template1/ShoppingCar/components/Step2Form/ShoppingCarStep2FormContactUser.vue";
// 配送方式
import ShoppingCarStep2FormLogistics from "~/views/template1/ShoppingCar/components/Step2Form/ShoppingCarStep2FormLogistics.vue";
// 付款方式
import ShoppingCarStep2FormPayment from "~/views/template1/ShoppingCar/components/Step2Form/ShoppingCarStep2FormPayment.vue";
// 發票
import ShoppingCarStep2FormInvoice from "~/views/template1/ShoppingCar/components/Step2Form/ShoppingCarStep2FormInvoice.vue";

// 訂單主表單
const formMain = ref({
    name: "王小明",
    email: "123@gmail.cpm",
    phone: "0911123123",
    note: null,
});

// 聯絡人表單
const formContactUser = ref({
    name: "王小明",
    phone: "0911123123",
    // 縣市
    city: null,
    // 地區
    area: null,
    // 地址
    address: null,
    // 加入常用地址
    saveAddress: false,
});

// 配送方式
const formLogistics = ref({
    // 配送方式
    logistics: "type1",
});

// 付款方式
const formPayment = ref({
    // 付款方式
    paymentType: "type1",
});

// 發票表單
const formInvoice = ref({
    // 發票類型
    invoiceType: "type1",
    // 載具編碼 ｜ 統編 ｜ 捐贈單位編碼 等等
    invoiceCode: null,
});

// 滿額贈品
const gifts = ref([
    {
        id: "id1",
        name: "質感托特包-1",
        colors: [
            {
                label: "紅色",
                value: "red",
            },
            {
                label: "黑色",
                value: "black",
            },
        ],
        // 商品價格
        price: 150,
        rule: {
            // 需要多少錢才送
            needPrice: 3000,
            // 需付款金額
            pay: 0,
        },
    },
    {
        id: "id2",
        name: "質感托特包-2",
        colors: [
            {
                label: "紅色",
                value: "red",
            },
            {
                label: "黑色",
                value: "black",
            },
        ],
        // 商品價格
        price: 180,
        rule: {
            // 需要多少錢才送
            needPrice: 3000,
            // 需付款金額
            pay: 0,
        },
    },
]);

const rules = ref([]);
</script>
