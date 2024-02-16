<template>
    <div class="mr-[40px] flex-1">
        <ShoppingCarStep2FormUser v-model:form="formMain" />
        <ShoppingCarStep2FormContactUser v-model:form="formContactUser" />
        <ShoppingCarStep2FormLogistics v-if="currentTab === 'type1'" v-model:form="formLogistics" />
        <ShoppingCarStep2FormPayment v-model:form="formPayment" />
        <ShoppingCarStep2FormMeasureTheSize v-if="currentTab === 'type2'" v-model:form="formPayment" />
        <ShoppingCarStep2FormInvoice v-model:form="formInvoice" />
        <ShoppingCarStep2FormGift
            :gifts="gifts"
            v-model:form="formGift"
            v-model:selectGiftIds="selectGiftIds"
        />
        <ShoppingCarStep2FormCustomProductRule
            v-model:showDialog="showDialogByCustomRule"
            :customRuleData="customRuleData"
        />

        <div class="flex flex-col gap-2 mt-[30px]">
            <div
                v-if="currentTab === 'type2'"
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
                    @click="showDialogByCustomRule = true"
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
                    <span class="font-normal">我已閱讀並同意</span
                    ><span class="mx-2 font-medium underline underline-offset-2 cursor-pointer hover:no-underline YaleSolisW-Bd">
                        <NuxtLink
                            class="text-gray-800" target="_blank"
                            :to="{
                                name: 'other-terms-slug',
                                params: { slug: '耶魯網站服務條款' },
                            }"
                            >網站服務條款</NuxtLink
                        ></span
                    >
                    <span class="font-normal">與</span>
                    <span class="mx-2 font-medium underline underline-offset-2 cursor-pointer hover:no-underline YaleSolisW-Bd"> <NuxtLink
                        class="text-gray-800" target="_blank" :to="{ name: 'other-privacy-slug', params: { slug: '耶魯隱私權政權' } }"> 隱私權政策 </NuxtLink></span>
                </el-checkbox>
            </div>
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
// 滿額贈
import ShoppingCarStep2FormGift from "~/views/template1/ShoppingCar/components/Step2Form/ShoppingCarStep2FormGift.vue";
// 定型化契約彈窗
import ShoppingCarStep2FormCustomProductRule from "~/views/template1/ShoppingCar/components/Step2Form/ShoppingCarStep2FormCustomProductRule.vue";
// 預約丈量時間
import ShoppingCarStep2FormMeasureTheSize from "~/views/template1/ShoppingCar/components/Step2Form/ShoppingCarStep2FormMeasureTheSize.vue";

const { $api } = useNuxtApp();
const props = defineProps({
    currentTab: {
        type: String,
        default: "type1",
    },
});

// 顯示定型化契約彈窗
const showDialogByCustomRule = ref(false);

// 定型化契約資料
const customRuleData = ref<any>(``);

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
    // 加入常用聯絡人
    saveContctUser: false,
    // 選擇預設聯繫人
    chooseDefaultContactUser: false,
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
    confirmRule: true,
    // 確認閱讀定型化契約
    confirmCustomRule: true,
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

const rules = ref([]);

async function getPageData() {
    try {
        const params = { code: "standardized_contract_popup" };
        const { data } = await $api().getPageAPI(params);
        console.log("getPageData api => ", data.value);

        const pageData = (data.value as any).data.schema;
        customRuleData.value = pageData.content;
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
            await getPageData();
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
            &:hover{
                @apply border-yellow-600;
            }
        }
        .is-checked{
            .el-checkbox__inner {
                @apply bg-yellow-600 border-yellow-600 after:h-[9px] after:left-[6px] after:top-[2px] #{!important};
            }
        }
    }
}
</style>
