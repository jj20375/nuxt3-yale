<template>
    <div class="mr-[40px] flex-1">
        <ShoppingCarStep2FormUser v-model:form="formMain" />
        <ShoppingCarStep2FormContactUser v-model:form="formContactUser" />
        <ShoppingCarStep2FormLogistics v-model:form="formLogistics" />
        <ShoppingCarStep2FormPayment v-model:form="formPayment" />
        <ShoppingCarStep2FormInvoice v-model:form="formInvoice" />
        <ShoppingCarStep2FormGift
            :gifts="gifts"
            v-model:form="formGift"
            v-model:selectGiftIds="selectGiftIds"
        />
        <ShoppingCarStep2FormAddPriceToBuy
            :products="addPriceBuyProducts"
            v-model:form="formAddPriceBuyProducts"
            v-model:selectProudctIds="selectAddPriceProductIds"
        />
        <ShoppingCarStep2FormCustomProductRule
            v-model:showDialog="showDialogByCustomRule"
            :customRuleData="customRuleData"
        />
        <div class="mt-[60px]">
            <div
                v-if="currentTab === 'type2'"
                class="flex items-center"
            >
                <el-checkbox
                    v-model="formConfirm.confirmCustomRule"
                    size="large"
                >
                    <div class="text-[14px] text-gray-800"></div>
                    <span class="font-normal">我已閱讀並同意</span>
                </el-checkbox>
                <span
                    @click="showDialogByCustomRule = true"
                    class="mx-2 font-medium underline cursor-pointer YaleSolisW-Bd text-[14px]"
                    >定型化契約</span
                >
            </div>
            <div>
                <el-checkbox
                    v-model="formConfirm.confirmRule"
                    size="large"
                >
                    <div class="text-[14px] text-gray-800"></div>
                    <span class="font-normal">我已閱讀並同意</span
                    ><span class="mx-2 font-medium underline YaleSolisW-Bd">
                        <NuxtLink
                            :to="{
                                name: 'other-terms-slug',
                                params: { slug: '耶魯網站服務條款' },
                            }"
                            >網站服務條款</NuxtLink
                        ></span
                    >
                    <span class="font-normal">與</span>
                    <span class="mx-2 font-medium underline YaleSolisW-Bd"> <NuxtLink :to="{ name: 'other-privacy-slug', params: { slug: '耶魯隱私權政權' } }"> 隱私權政策 </NuxtLink></span>
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
// 加價購產品
import ShoppingCarStep2FormAddPriceToBuy from "~/views/template1/ShoppingCar/components/Step2Form/ShoppingCarStep2FormAddPriceToBuy.vue";

const props = defineProps({
    currentTab: {
        type: String,
        default: "type1",
    },
});

// 顯示定型化契約彈窗
const showDialogByCustomRule = ref(false);

// 定型化契約資料
const customRuleData = ref(`
    <div class="text-gray-800">
        <h5 class="text-[16px] YaleSolisW-Bd font-medium">訂購條款</h5>
        <p class="text-[15px]">基於服務消費者之精神，本公司茲就Yale購物會員資料保護事宜，特提供使用保護聲明如下。凡欲申請加入Yale會員者，均應事先充分閱讀且瞭解本聲明書之內容，並在認同此一內容精神與同意遵守相關規定下申請加入成為Yale會員。本公司因應經營之需要得於任何時候可隨時修改本條款之 內容，將不再另行通知修改後的條款，會以公告之方式通知會員。若您於條款修改公告後仍繼續使用Yale網站，即表示您同意修改後的條款並遵守。</p>
    </div>
`);

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

// 加價購產品
const addPriceBuyProducts = ref([
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
        // 特價價格
        market_price: 100,
        count: 1,
    },
    {
        id: "id1",
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
        price: 250,
        // 特價價格
        market_price: 150,
        count: 1,
    },
]);

// 加價購表單
const formAddPriceBuyProducts = ref([
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

// 加價購商品選中 id
const selectAddPriceProductIds = ref<number | string[]>([]);

const rules = ref([]);
</script>

<style lang="scss" scoped>
:deep {
    .el-checkbox-group {
        @apply text-base leading-normal #{!important};
    }
    .is-checked {
        .el-checkbox__inner {
            @apply bg-yellow-600 border-yellow-600 #{!important};
        }
    }

    .el-checkbox {
        @apply h-auto #{!important};
    }
}
</style>
