<template>
    <div class="sm:mr-[40px] flex-1">
        <ShoppingCarStep2FormUser
            v-if="formMain.email"
            ref="formUserRef"
            v-model:form="formMain"
        />
        <ShoppingCarStep2FormContactUser
            ref="formContactUserRef"
            v-model:form="formContactUser"
        />
        <ShoppingCarStep2FormLogistics
            v-if="props.currentTab === 'type1'"
            ref="formLogisticsRef"
            v-model:form="formLogistics"
        />
        <ShoppingCarStep2FormPayment
            v-model:form="formPayment"
            ref="formPaymentRef"
        />
        <ShoppingCarStep2FormMeasureTheSize
            ref="formMeasureTheSizeRef"
            v-if="props.currentTab === 'type2'"
            v-model:form="formMeasureTheSize"
        />
        <ShoppingCarStep2FormInvoice
            ref="formInvoiceRef"
            v-model:form="formInvoice"
        />
        <ShoppingCarStep2FormGift
            :gifts="gifts"
            v-model:form="formGift"
            v-model:selectGiftIds="selectGiftIds"
        />
        <ShoppingCarStep2FormCustomProductRule
            v-model:showDialog="showDialogByCustomRule"
            :customRuleData="customRuleData"
        />

        <div class="flex flex-col gap-2 mt-[30px] mb-[20px]">
            <div
                v-if="props.currentTab === 'type2'"
                class="flex items-center"
            >
                <el-checkbox
                    v-model="formConfirm.confirmCustomRule"
                    size="large"
                    class="text-gray-800"
                >
                    <span class="font-normal">我已閱讀並同意</span>
                </el-checkbox>
                <span
                    @click="showDialogByCustomRule = !showDialogByCustomRule"
                    class="mx-2 text-gray-800 font-medium underline underline-offset-2 cursor-pointer hover:no-underline YaleSolisW-Bd text-[14px]"
                    >定型化契約</span
                >
            </div>
            <div>
                <el-checkbox
                    v-model="formConfirm.confirmRule"
                    size="large"
                    class="text-gray-800"
                >
                    <span class="font-normal">我已閱讀並同意</span>
                    <span class="mx-2 font-medium underline cursor-pointer underline-offset-2 hover:no-underline YaleSolisW-Bd">
                        <NuxtLink
                            class="text-gray-800"
                            target="_blank"
                            :to="{
                                name: 'other-terms-slug',
                                params: { slug: '耶魯網站服務條款' },
                            }"
                            >網站服務條款</NuxtLink
                        ></span
                    >
                    <span class="font-normal">與</span>
                    <span class="mx-2 font-medium underline cursor-pointer underline-offset-2 hover:no-underline YaleSolisW-Bd">
                        <NuxtLink
                            class="text-gray-800"
                            target="_blank"
                            :to="{ name: 'other-privacy-slug', params: { slug: '耶魯隱私權政權' } }"
                        >
                            隱私權政策
                        </NuxtLink>
                    </span>
                </el-checkbox>
            </div>
            <div
                v-if="showCheckWarning"
                class="text-pink-900 text-[12px] mt-[-5px]"
            >
                請勾選
            </div>
            <div class="hidden sm:flex justify-center mt-[40px]">
                <button
                    @click.prevent="validTest"
                    class="yellow-btn btn-lg"
                >
                    前往付款
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

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
// 滿額贈
import ShoppingCarStep2FormGift from "~/views/template1/ShoppingCar/components/Step2Form/ShoppingCarStep2FormGift.vue";
// 定型化契約彈窗
import ShoppingCarStep2FormCustomProductRule from "~/views/template1/ShoppingCar/components/Step2Form/ShoppingCarStep2FormCustomProductRule.vue";
// 預約丈量時間
import ShoppingCarStep2FormMeasureTheSize from "~/views/template1/ShoppingCar/components/Step2Form/ShoppingCarStep2FormMeasureTheSize.vue";

import { useUserStore } from "~/store/userStore";
import { ReqCheckout } from "~/api/cart";
import { useShoppingCarStore } from "~/store/shoppingCarStore";

const formUserRef = ref<any>(null);
const formContactUserRef = ref<any>(null);
const formLogisticsRef = ref<any>(null);
const formPaymentRef = ref<any>(null);
const formInvoiceRef = ref<any>(null);
const formMeasureTheSizeRef = ref<any>(null);

const showCheckWarning = ref(false);

const userStore = useUserStore();
const shoppingCarStore = useShoppingCarStore();

const { user } = storeToRefs(userStore);
const { shoppingCar } = storeToRefs(shoppingCarStore);
const { shoppingCustomCar } = storeToRefs(shoppingCarStore);

const { $api, $shoppingCarService } = useNuxtApp();
const router = useRouter();

interface Props {
    currentTab: string;
    selectProductIds: number[];
    goCheckoutStep3: boolean;
}

const props: Props = withDefaults(defineProps<Props>(), {
    currentTab: "",
    selectProductIds: () => [],
    goCheckoutStep3: false,
});

// 顯示定型化契約彈窗
const showDialogByCustomRule = ref(false);

// 定型化契約資料
const customRuleData = ref<any>(``);

// 訂單主表單
const formMain = ref({
    name: "",
    email: "",
    phone: "",
    note: "",
});

// 聯絡人表單
const formContactUser = ref({
    name: "",
    phone: "",
    // 縣市
    city: "",
    // 地區
    area: "",
    // 地址
    address: "",
    // 加入常用聯絡人
    saveContctUser: false,
    // 選擇預設聯繫人
    chooseDefaultContactUser: false,
    // 郵遞區號
    contact_zip3: "",
});

// 配送方式
const formLogistics = ref({
    // 配送方式
    logistics: "",
});

// 付款方式
const formPayment = ref<{ paymentType: string; offlineStore?: number }>({
    // 付款方式
    paymentType: "ecpay",
});

// 預約丈量時間
const formMeasureTheSize = ref<string>({
    measureSizeTime: "",
});

// 發票表單
const formInvoice = ref({
    // 發票類型 cloud ,company ,donation ,mobile_carrier ,natural_person_certificate
    invoiceType: "",
    // 載具編碼 ｜ 統編 ｜ 捐贈單位編碼 等等
    carrierCode: "", // 當 invoice_type 為 mobile_carrier,natural_person_certificate 必填
    donationCode: "", // 當 invoice_type 為 donation 必填
    taxNumber: "", // 當 invoice_type 為 company 必填
});

// 贈品表單
const formGift = ref([
    {
        id: "id1",
        color: "red",
        count: 1,
    },
    {
        id: "id2",
        color: "black",
        count: 2,
    },
]);

// 確認閱讀合約
const formConfirm = ref({
    // 網站服務條款｜隱私權政策
    confirmRule: false,
    // 確認閱讀定型化契約
    confirmCustomRule: false,
});
//

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

// 贈品選中商品 id
const selectGiftIds = ref<number | string[]>([]);

const getPageData = async () => {
    try {
        const params = { code: "standardized_contract_popup" };
        const { data } = await $api().getPageAPI(params);
        console.log("getPageData api => ", data.value);

        const pageData = (data.value as any).data.schema;
        customRuleData.value = pageData.content;
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
};

const initialVal = () => {
    formMain.value = {
        name: user.value.name,
        email: user.value.email,
        phone: user.value.phone,
        note: "",
    };
};

// 結帳
const checkout = async () => {
    const req: ReqCheckout = {
        type: props.currentTab === "type2" ? "combination" : "normal", // normal
        member_phone: formMain.value.phone,
        contact_name: formContactUser.value.name,
        contact_email: formMain.value.email,
        contact_phone: formContactUser.value.phone,
        contact_zip3: formContactUser.value.contact_zip3,
        contact_city: formContactUser.value.city,
        contact_district: formContactUser.value.area,
        contact_address: formContactUser.value.address,
        remark: formMain.value.note, // 備註
        payment_gateway: formPayment.value.paymentType,
        shipping_method: formLogistics.value.logistics,
        cart_item_id: props.selectProductIds,
        invoice_type: formInvoice.value.invoiceType,
        carrier_code: formInvoice.value.invoiceType === "mobile_carrier" || formInvoice.value.invoiceType === "natural_person_certificate" ? formInvoice.value.carrierCode : undefined,
        donation_code: formInvoice.value.invoiceType === "donation" ? formInvoice.value.donationCode : undefined,
        tax_number: formInvoice.value.invoiceType === "company" ? formInvoice.value.taxNumber : undefined,
    };
    // 訂製門扇需傳送參數
    if (props.currentTab === "type2") {
        req.reservation_date = formMeasureTheSize.value.measureSizeTime;
        req.cart_combination_id = props.selectProductIds;
        delete req.shipping_method;
        delete req.cart_item_id;
        if (formPayment.value.paymentType === "stronghold") {
            console.log("formPayment.value =>", formPayment.value);
            req.stronghold_id = formPayment.value.offlineStore;
        }
    }

    const { data } = await $api().CheckOutApi(req);
    const resData = (data.value as any).data;
    removeShoppingCar();
    if (resData.redirect) {
        window.open(resData.redirect_url, "self");
    }
    if (!resData.redirect) {
        router.push({
            name: "auth-door-slug",
            text: "訂製門扇-訂單記錄",
            params: { slug: "訂製門扇-訂單記錄" },
        });
    }
};

// 移除購物車
function removeShoppingCar() {
    if (props.currentTab === "type1") {
        shoppingCarStore.setShoppingCar(shoppingCar.value.filter((item: any) => !props.selectProductIds.includes(item.id)));
        $shoppingCarService().setShoppingCar(shoppingCar.value);
        return;
    }
    if (props.currentTab === "type2") {
        shoppingCarStore.setShoppingCustomCar(shoppingCustomCar.value.filter((item: any) => !props.selectProductIds.includes(item.id)));
        $shoppingCarService().setCustomProductShoppingCar(shoppingCustomCar.value);
    }
}

// 驗證表單
const validTest = async () => {
    if (props.currentTab === "type1") {
        const validUserForm = await formUserRef.value.$.exposed.validForm();
        const validContactUserForm = await formContactUserRef.value.$.exposed.validForm();
        const validLogisticsForm = await formLogisticsRef.value.$.exposed.validForm();
        const validPaymentForm = await formPaymentRef.value.$.exposed.validForm();
        const validInvoiceForm = await formInvoiceRef.value.$.exposed.validForm();
        if (!formConfirm.value.confirmRule) {
            showCheckWarning.value = true;
            return;
        } else {
            showCheckWarning.value = false;
        }
        // 表單驗證無問題，去結帳
        if (validUserForm && validContactUserForm && validLogisticsForm && validPaymentForm && validInvoiceForm && formConfirm.value.confirmRule) {
            checkout();
        }
    } else {
        const validUserForm = await formUserRef.value.$.exposed.validForm();
        const validContactUserForm = await formContactUserRef.value.$.exposed.validForm();
        const validPaymentForm = await formPaymentRef.value.$.exposed.validForm();
        const validInvoiceForm = await formInvoiceRef.value.$.exposed.validForm();
        const validMeasureTheSizeForm = await formMeasureTheSizeRef.value.$.exposed.validForm();
        if (!formConfirm.value.confirmCustomRule || !formConfirm.value.confirmRule) {
            console.log("work", !formConfirm.value.confirmCustomRule, !formConfirm.value.confirmRule);
            showCheckWarning.value = true;
            return;
        } else {
            showCheckWarning.value = false;
        }
        // 表單驗證無問題，去結帳
        if (validUserForm && validContactUserForm && validPaymentForm && validInvoiceForm && formConfirm.value.confirmRule && validMeasureTheSizeForm) {
            checkout();
        }
    }
};

watch(
    () => props.goCheckoutStep3,
    () => {
        validTest();
    }
);

onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
            initialVal();
            getPageData();
        }
    });
});
</script>

<style lang="scss" scoped>
:deep {
    .el-checkbox-group {
        @apply text-base leading-normal block #{!important};
    }
    .el-checkbox {
        @apply h-[18px] #{!important};
        .el-checkbox__inner {
            @apply w-[18px] h-[18px] #{!important};
            &:hover {
                @apply border-yellow-600;
            }
        }
        .is-checked {
            .el-checkbox__inner {
                @apply bg-yellow-600 border-yellow-600 after:h-[9px] after:left-[6px] after:top-[2px] #{!important};
            }
        }
    }
}
</style>
