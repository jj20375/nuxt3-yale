<template>
    <div class="hidden page-container print">
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
                <div class="text-bold">#{{ props.orderData.orderNumber }}</div>
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
        <div class="mb-2">
            <div class="text-bold mb-2">付款明細(訂金)</div>
            <div class="text-sm text-dark">付款方式：{{ props.orderData.payment[0].method }}</div>
            <div class="text-sm text-dark">付款狀態：{{ props.orderData.payment[0].orderStatus }}</div>
        </div>
        <div>
            <div class="text-bold mb-2">付款明細(尾款)</div>
            <div class="text-sm text-dark">付款方式：{{ props.orderData.payment[1].method }}</div>
            <div class="text-sm text-dark">付款狀態：{{ props.orderData.payment[1].orderStatus }}</div>
        </div>
        <div class="divider"></div>
        <div>
            <div class="text-bold mb-2">發票資訊(訂金)</div>
            <div class="text-sm text-dark">發票狀態：{{ props.orderData.receipt[0].status }}</div>
            <div class="text-sm text-dark">開立日期：{{ props.orderData.receipt[0].date }}</div>
            <div class="text-sm text-dark">發票類型：{{ props.orderData.receipt[0].type }}</div>
            <div class="text-sm text-dark">統編：{{ props.orderData.receipt[0].taxId }}</div>
            <div class="text-sm text-dark mb-2">發票號碼：{{ props.orderData.receipt[0].number }}</div>
            <div class="text-bold mb-2">發票資訊(尾款)</div>
            <div class="text-sm text-dark">發票狀態：{{ props.orderData.receipt[1].status }}</div>
            <div class="text-sm text-dark">開立日期：{{ props.orderData.receipt[1].date }}</div>
            <div class="text-sm text-dark">發票類型：{{ props.orderData.receipt[1].type }}</div>
            <div class="text-sm text-dark">統編：{{ props.orderData.receipt[1].taxId }}</div>
            <div class="text-sm text-dark">發票號碼：{{ props.orderData.receipt[1].number }}</div>
        </div>
        <div class="divider"></div>
        <div
            class="d-block"
            v-for="(product, index) in props.orderData.products"
            :key="index"
        >
            <div class="d-inline-block">
                <img
                    class="product-image"
                    :src="product.imgSrc"
                />
            </div>
            <div
                class="d-inline-block ms-8"
                style="width: calc(100% - 150px); vertical-align: top"
            >
                <div class="text-bold">{{product.custom_scene}}</div>
                <table class="page-table">
                    <tbody>
                        <tr
                            v-for="(item, key) in product"
                            :key="key"
                        >
                            <td>{{ item.label }}</td>
                            <td v-if="key === 'doorGroup'">
                                <template v-for="(item3, index3) in item">
                                    <div v-if="index3 === 'types'">
                                        <div v-for="(item4, index4) in item3">
                                            <div>{{ item4.label }}</div>
                                            <div>{{ item4.value ? "是" : "否" }}</div>
                                        </div>
                                    </div>
                                    <div
                                        v-if="index3 === 'size'"
                                        class="flex"
                                    >
                                        {{ item3.label }}: {{ item3.name }}
                                    </div>
                                    <div v-if="index3 === 'door'">
                                        <!-- <div class="whitespace-nowrap">門扇</div> -->
                                        <div class="flex flex-col gap-1">
                                            <div>{{ item3.title }}</div>
                                            <div>{{ item3.style }}</div>
                                            <div>{{ item3.color.text }}</div>
                                        </div>
                                    </div>
                                </template>
                            </td>
                            <td v-if="key === 'doorOut'">
                                <div>{{ item.title }}</div>
                                <div>{{ item.style }}</div>
                                <div>{{ item.color.text }}</div>
                            </td>
                            <td v-if="key === 'lock'">
                                <div>{{ item.name }}</div>
                                <div>{{ item.model }}</div>
                            </td>
                            <td v-if="item && ['currentTool1', 'currentTool2'].includes(key)">
                                {{ item.title }}-{{ item.style }}
                            </td>
                            <td v-if="item && ['currentOther1', 'currentOther2', 'currentOther3'].includes(key)">
                                <template v-for="(item2, index2) in item.datas">
                                    {{ item2.name }}<span v-if="!['otherServices', 'currentOther3'].includes(key)">-</span>
                                    <span v-if="key == 'currentOther3'">{{ item2.title }}</span>
                                    <span v-else-if="key !== 'otherServices'">{{ item2.style }}</span>
                                </template>
                            </td>
                            <td class="mt-2" v-if="item && ['otherServices'].includes(key)">
                                <ul
                                    v-if="item"
                                >
                                    <li
                                        v-for="(item2, index2) in item.datas"
                                        :class="!['currentOther1', 'currentOther2', 'currentOther3'].includes(key) ? 'list-disc' : '-ml-2'"
                                        class="list-inside"
                                    >
                                        {{ item2.name }}<span v-if="!['otherServices', 'currentOther3'].includes(key)">-</span>
                                        <span v-if="key == 'currentOther3'">{{ item2.title }}</span>
                                        <span v-else-if="key !== 'otherServices'">{{ item2.style }}</span>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td>數量</td>
                            <td>{{ product.count }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div>
            <div class="d-inline-block text-sm text-dark">運費</div>
            <div class="d-inline-block text-sm text-dark float-right">NT$ {{ $utils().formatCurrency(props.orderData.price.deliveryFee) }}</div>
        </div>
        <div
            v-for="(item, index) in props.orderData.price?.event"
            :key="index"
        >
            <div class="d-inline-block text-sm text-dark">活動折扣 ({{ item?.name }})</div>
            <div class="d-inline-block text-sm text-dark float-right">NT$ {{ $utils().formatCurrency(item?.discountPrice) }}</div>
        </div>
        <div v-if="props.orderData.price.coupon !== 0">
            <div>優惠卷折扣</div>
            <div>NT$ {{ $utils().formatCurrency(props.orderData.price?.coupon) }}</div>
        </div>

        <div class="divider mt-3 mb-3"></div>
        <div>
            <div class="d-inline-block text-xl text-bold">預估總計</div>
            <div class="d-inline-block text-xl text-bold float-right">NT$ {{ $utils().formatCurrency(props.orderData.price.totalPrice) }}</div>
        </div>
        <div
            class="text-gray-600 text-[14px] flex mt-[4px]"
        >
            <div class="d-inline-block">訂金(總價{{props.orderData.price.deposit_ratio}}%)</div>
            <!-- 訂金 -->
            <div class="d-inline-block float-right">NT$ {{ $utils().formatCurrency(props.orderData.price.deposit) }}</div>
        </div>
        <div
            class="text-gray-600 text-[14px] flex mt-[4px]"
        >
            <div class="d-inline-block">尾款(預估總價{{props.orderData.price.finalPayment_ratio}}%)</div>
            <!-- 訂金 -->
            <div class="d-inline-block float-right">NT$ {{ $utils().formatCurrency(props.orderData.price.finalPayment_ori) }}</div>
        </div>
        <div
            v-if="props.orderData.orderStatus === '丈量完成' || props.orderData.orderStatus === '待付尾款' || props.orderData.orderStatus === '已付尾款' || props.orderData.orderStatus === '門扇製作完成' || props.orderData.orderStatus === '安裝派工中' || props.orderData.orderStatus === '安裝完成'"
            class="text-gray-600 text-[14px] flex mt-[4px]"
        >
            <div class="d-inline-block">實際尾款</div>
            <!-- 訂金 -->
            <div class="d-inline-block float-right">NT$  {{ $utils().formatCurrency(props.orderData.price.finalPayment) }}</div>
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
    return props.orderData.products;
});
</script>
