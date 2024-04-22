<template>
    <div class=" page-container print">
        <div class="mb-5">
            <div class="d-inline-block">
                <span class="page-logo ms-5">
                    <img
                        :src="initializationData.site.site_logo"
                        alt=""
                    />
                </span>
                <span class="page-main-title text-bold vertical-center">一般商品訂購單</span>
            </div>
            <div class="d-inline-block float-right">
                <div class="text-right">訂單編號</div>
                <div class="text-bold">#{{props.orderData.orderNumber}}</div>
            </div>
        </div>
        <div>
            <div class="text-bold mb-2">安裝資訊</div>
            <div class="text-sm text-dark">聯繫人：{{ props.orderData.info.contactName }}</div>
            <div class="text-sm text-dark">聯絡電話：{{ props.orderData.info.phone }}</div>
            <div class="text-sm text-dark">Email：{{ props.orderData.info.email }}</div>
            <div class="text-sm text-dark">安裝地址：{{ props.orderData.info.address }}</div>
        </div>
        <div class="divider"></div>
        <div>
            <div class="text-bold mb-2">付款明細</div>
            <div class="text-sm text-dark">付款方式：{{ props.orderData.payment.method }}</div>
            <div class="text-sm text-dark">付款狀態：{{ props.orderData.payment.orderStatus }}</div>
        </div>
        <div class="divider"></div>
        <div>
            <div class="text-bold mb-2">發票資訊</div>
            <div class="text-sm text-dark">發票狀態：{{ props.orderData.receipt.status }}</div>
            <div class="text-sm text-dark">開立日期：{{ props.orderData.receipt.date }}</div>
            <div class="text-sm text-dark">發票類型：{{ props.orderData.receipt.type }}</div>
            <div class="text-sm text-dark">統編：{{ props.orderData.receipt.taxId }}</div>
            <div class="text-sm text-dark">發票號碼：{{ props.orderData.receipt.number }}</div>
        </div>
        <div class="divider"></div>
        <div
            v-for="(product, key) in productData"
            :key="key"
            class="d-block"
        >
            <div class="d-inline-block">
                <img
                    class="product-image"
                    :src="product.imgUrl"
                />
            </div>
            <div
                class="d-inline-block ms-8"
                style="width: calc(100% - 150px); vertical-align: top"
            >
                <div class="text-bold">{{ product.title }}</div>
                <table class="page-table">
                    <tbody>
                        <tr>
                            <td>數量</td>
                            <td>{{ product.quantity }}</td>
                        </tr>
                    </tbody>
                </table>
                <div style="display: flex; align-items: center; gap: 10px">
                    <div style="border: 1px solid var(--Neutral-2-Dark, #575658); padding: 2px 6px; color: var(--Neutral-2-Dark, #575658); font-size: 12px; font-style: normal; font-weight: 400; line-height: 150%; /* 13.5px */ letter-spacing: 0.27px"></div>
                </div>
            </div>
        </div>
        <!-- <div class="d-block">
            <div class="d-inline-block">
                <img
                    class="product-image"
                    src="http://admin.yaletaiwan.com/storage/products/01HNCH6BWZXNQCVVTAB4DV6847.webp"
                />
            </div>
            <div
                class="d-inline-block ms-8"
                style="width: calc(100% - 150px); vertical-align: top"
            >
                <div class="text-bold">YSEM / 250 / EG1 認證密碼鑰匙保險箱</div>
                <table class="page-table">
                    <tbody>
                        <tr>
                            <td>數量</td>
                            <td>1</td>
                        </tr>
                    </tbody>
                </table>
                <div style="display: flex; align-items: center; gap: 10px">
                    <div style="border: 1px solid var(--Neutral-2-Dark, #575658); padding: 2px 6px; color: var(--Neutral-2-Dark, #575658); font-size: 12px; font-style: normal; font-weight: 400; line-height: 150%; /* 13.5px */ letter-spacing: 0.27px"></div>
                </div>
            </div>
        </div> -->
        <!-- <div class="divider"></div> -->
        <!-- <div class="d-block">
            <div class="d-inline-block">
                <img
                    class="product-image"
                    src="http://admin.yaletaiwan.com/storage/products/01HNC6KYV2J5600WRM66TQAE2X.webp"
                />
            </div>
            <div
                class="d-inline-block ms-8"
                style="width: calc(100% - 150px); vertical-align: top"
            >
                <div class="text-bold">YDM 7220 指紋卡片密碼鑰匙 頂規抗菌款五合一</div>
                <table class="page-table">
                    <tbody>
                        <tr>
                            <td>數量</td>
                            <td>1</td>
                        </tr>
                    </tbody>
                </table>
                <div style="display: flex; align-items: center; gap: 10px">
                    <div style="border: 1px solid var(--Neutral-2-Dark, #575658); padding: 2px 6px; color: var(--Neutral-2-Dark, #575658); font-size: 12px; font-style: normal; font-weight: 400; line-height: 150%; /* 13.5px */ letter-spacing: 0.27px">滿額贈</div>
                </div>
            </div>
        </div> -->
        <div class="divider"></div>
        <div>
            <div class="d-inline-block text-sm text-dark">運費</div>
            <div class="d-inline-block text-sm text-dark float-right">NT$ {{ $utils().formatCurrency(props.orderData.price.deliveryFee) }}</div>
        </div>
        <div  v-for="(item, index) in props.orderData.price?.event" :key="index">
            <div class="d-inline-block text-sm text-dark">活動折扣 ({{item?.name}})</div>
            <div class="d-inline-block text-sm text-dark float-right">NT$ {{ $utils().formatCurrency(item?.discountPrice) }}</div>
        </div>
        <div v-if="props.orderData.price.coupon !== 0">
            <div>優惠卷折扣</div>
            <div>NT$ {{ $utils().formatCurrency(props.orderData.price?.coupon) }}</div>
        </div>

        <div class="divider mt-3 mb-3"></div>
        <div>
            <div class="d-inline-block text-xl text-bold">總計</div>
            <div class="d-inline-block text-xl text-bold float-right">NT$ {{ $utils().formatCurrency(props.orderData.price.totalPrice) }}</div>
        </div>
        <div class="mt-3">
            <div class="text-sm">備註</div>
            <div class="text-sm">{{ props.orderData.price.memo }}</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useInitializationStore } from "~/store/initializationStore";
const { $utils } = useNuxtApp();

const props = defineProps({
    orderData: {
        type: Object,
    },
});

const initializationStore = useInitializationStore();
const initializationData = computed(() => {
    return JSON.parse(JSON.stringify(initializationStore.initializationData));
});

const productData = computed(() => {
    return props.orderData.products
});
</script>
