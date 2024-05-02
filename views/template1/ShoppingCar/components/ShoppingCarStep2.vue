<template>
    <div class="lg:mr-[30px] xl:mr-[40px] flex-1">
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
            v-if="formPayment.paymentType !== 'stronghold'"
            ref="formInvoiceRef"
            v-model:form="formInvoice"
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
                    <slot name="label"
                        ><span class="text-[14px] font-normal text-gray-800">我已閱讀並同意 </span>
                        <span
                            @click="showDialogByCustomRule = !showDialogByCustomRule"
                            class="text-gray-800 font-medium underline underline-offset-2 cursor-pointer hover:no-underline YaleSolisW-Bd text-[14px]"
                            >定型化契約</span
                        >
                    </slot>
                </el-checkbox>
            </div>
            <div class="mt-4">
                <el-checkbox
                    class="!h-fit"
                    v-model="formConfirm.confirmRule"
                    size="large"
                >
                    <slot name="label"
                        ><span class="text-[14px] font-normal text-gray-800">我已閱讀並同意 </span>
                        <NuxtLink
                            target="_blank"
                            class="font-medium YaleSolisW-Bd text-gray-800 underline cursor-pointer underline-offset-2 hover:no-underline text-[14px]"
                            :to="{
                                name: 'other-terms-slug',
                                params: { slug: '耶魯網站服務條款' },
                            }"
                            >網站服務條款</NuxtLink
                        >
                        <span class="text-[14px] font-normal text-gray-800"> 與 </span>
                        <NuxtLink
                            target="_blank"
                            class="font-medium YaleSolisW-Bd text-gray-800 underline cursor-pointer underline-offset-2 hover:no-underline text-[14px]"
                            :to="{ name: 'other-privacy-slug', params: { slug: '耶魯隱私權政權' } }"
                            >隱私權政策</NuxtLink
                        >
                    </slot>
                </el-checkbox>
            </div>
            <div
                v-if="showCheckWarning"
                class="text-pink-900 text-[12px] mt-[-5px]"
            >
                請勾選
            </div>
            <!--    原本的按鈕移動到ShoppingCarIndex   -->
            <!--            <div class="sm:flex justify-center mt-[40px]">-->
            <!--                <button-->
            <!--                    @click.prevent="validTest"-->
            <!--                    class="yellow-btn btn-lg"-->
            <!--                >-->
            <!--                    前往付款-->
            <!--                </button>-->
            <!--            </div>-->
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
// 定型化契約彈窗
import ShoppingCarStep2FormCustomProductRule from "~/views/template1/ShoppingCar/components/Step2Form/ShoppingCarStep2FormCustomProductRule.vue";
// 預約丈量時間
import ShoppingCarStep2FormMeasureTheSize from "~/views/template1/ShoppingCar/components/Step2Form/ShoppingCarStep2FormMeasureTheSize.vue";

import { useUserStore } from "~/store/userStore";
import { ReqCheckout } from "~/api/cart";
import { useShoppingCarStore } from "~/store/shoppingCarStore";
import { ElMessage, ElMessageBox } from "element-plus";

defineExpose({
    validTest,
});

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
const { giftsDataSelect } = storeToRefs(shoppingCarStore);

const { $api, $shoppingCarService } = useNuxtApp();
const $config = useRuntimeConfig();
const router = useRouter();

interface Props {
    currentTab: string;
    selectProductIds: number[];
    goCheckoutStep3: boolean;
    couponCode: boolean|null;
}

const props: Props = withDefaults(defineProps<Props>(), {
    currentTab: "",
    selectProductIds: () => [],
    goCheckoutStep3: false,
    couponCode: null,
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
    fee: 0
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

// 確認閱讀合約
const formConfirm = ref({
    // 網站服務條款｜隱私權政策
    confirmRule: false,
    // 確認閱讀定型化契約
    confirmCustomRule: false,
});

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
    const hostUrl = $config.public.hostURL;
    // 判斷要不要加入聯繫人
    const is_add_to_contact = formContactUser.value.saveContctUser && !formContactUserRef.value.contact_exist
    const discount_gifts = <any>[]
    giftsDataSelect.value.forEach((item: { is_single_variation: number; discount_id: any; count: any; id: any; spec: any; }) => {
        if (item.is_single_variation == 0) {
            discount_gifts.push({
                discount_id: item.discount_id,
                productable_id: item.id,
                product_variationable_id: item.spec
            })
        } else {
            discount_gifts.push({
                discount_id: item.discount_id,
                productable_id: item.id,
            })
        }
    })
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
        is_add_to_contact: is_add_to_contact,
        remark: formMain.value.note, // 備註
        payment_gateway: formPayment.value.paymentType,
        shipping_method: formLogistics.value.logistics,
        cart_item_id: props.selectProductIds,
        discount_gifts: discount_gifts,
        // 發票類型
        invoice_type: formInvoice.value.invoiceType,
        // 載具編號
        carrier_code: formInvoice.value.invoiceType === "mobile_carrier" || formInvoice.value.invoiceType === "natural_person_certificate" ? formInvoice.value.carrierCode : undefined,
        // 捐款碼
        donation_code: formInvoice.value.invoiceType === "donation" ? formInvoice.value.donationCode : undefined,
        // 統一編號
        tax_number: formInvoice.value.invoiceType === "company" ? formInvoice.value.taxNumber : undefined,
        // 優惠券
        coupon_code: props.couponCode ? props.couponCode : undefined,
        redirect_url: props.currentTab === "type2" ? `${hostUrl}/order/combination` : `${hostUrl}/order/normal`,
    };
    // 訂製門扇需傳送參數
    if (props.currentTab === "type2") {
        req.reservation_date = formMeasureTheSize.value.measureSizeTime;
        req.cart_combination_id = props.selectProductIds;
        delete req.shipping_method;
        delete req.cart_item_id;
        if (formPayment.value.paymentType === "stronghold") {
            req.stronghold_id = formPayment.value.offlineStore;
            // 線下付款發票參數寫死 offline
            req.invoice_type = "offline";
            delete req.carrier_code;
            delete req.donation_code;
            delete req.tax_number;
        }
    }

    const { data } = await $api().CheckOutApi(req);
    const resData = (data.value as any).data;
    // 討論之後前端不清除購物車商品
    // removeShoppingCar();
    // 重取購物車資料
    await shoppingCarStore.getUserShopping();
    await shoppingCarStore.getUserCustomShoppingCar();
    if (resData.redirect) {
        window.open(resData.redirect_url, "self");
        router.push({
            name: "auth-panel-slug",
            params: { slug: "會員中心" },
        });
    }
    if (!resData.redirect) {
        router.push({
            name: "order-slug",
            params: { slug: ["combination"] },
            query: { status: "success" },
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
async function validTest() {
    if (props.currentTab === "type1") {
        const validUserForm = await formUserRef.value.$.exposed.validForm();
        const validContactUserForm = await formContactUserRef.value.$.exposed.validForm();
        const validLogisticsForm = await formLogisticsRef.value.$.exposed.validForm();
        const validPaymentForm = await formPaymentRef.value.$.exposed.validForm();
        const validInvoiceForm = await formInvoiceRef.value.$.exposed.validForm();
        if (!(validUserForm && validContactUserForm && validLogisticsForm && validPaymentForm && validInvoiceForm)) {
            ElMessage({
                type: "error",
                message: "尚有欄位未填",
            });
            return;
        } else if (!formConfirm.value.confirmRule) {
            ElMessage({
                type: "error",
                message: "請勾選同意",
            });
            showCheckWarning.value = true;
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
        const validMeasureTheSizeForm = await formMeasureTheSizeRef.value.$.exposed.validForm();
        if (!(formConfirm.value.confirmCustomRule && formConfirm.value.confirmRule && validUserForm && validContactUserForm)) {
            ElMessage({
                type: "error",
                message: "尚有欄位未填",
            });
            showCheckWarning.value = true;
            return;
        } else {
            showCheckWarning.value = false;
        }

        // 非線下結帳時 需驗證發票
        if (formPayment.value.paymentType !== "stronghold") {
            const validInvoiceForm = await formInvoiceRef.value.$.exposed.validForm();
            // 表單驗證無問題，去結帳
            if (validUserForm && validContactUserForm && validPaymentForm && validInvoiceForm && formConfirm.value.confirmRule && validMeasureTheSizeForm) {
                checkout();
            }
        } else {
            // 判斷線下結帳 時 無需驗證是否輸入 發票
            // 表單驗證無問題，去結帳
            if (validUserForm && validContactUserForm && validPaymentForm && formConfirm.value.confirmRule && validMeasureTheSizeForm) {
                checkout();
            }
        }
    }
}

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
:deep(.el-checkbox-group) {
    @apply text-base leading-normal block #{!important};
}
:deep(.el-checkbox) {
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
</style>
