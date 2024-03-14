<template>
    <section class="mt-headerMb xl:mt-header mb-[60px] sm:mb-[90px] lg:mb-[120px] border-t border-gray-300">
        <div class="container">
            <ul
                v-if="currentStep == 0"
                class="flex gap-4 sm:gap-[24px] justify-center pt-[36px] sm:pt-[48px] lg:pt-[64px]"
            >
                <li
                    v-for="(tab, key) in tabs"
                    :key="key"
                    class="flex gap-3 rounded-[8px] py-4 sm:py-[20px] px-5 sm:px-[32px] border border-gray-300 cursor-pointer relative"
                    :class="[currentTab === key ? 'shadow-[inset_0_0_0_1px_rgb(255,204,0)] border-yellow-600' : '']"
                    @click="
                        currentTab = key;
                        selectProductIds = [];
                        router.push({ name: route.name, query: { tab: key } });
                    "
                >
                    <NuxtImg
                        class="w-[24px] aspect-square"
                        :src="tab.imgSrc"
                    />
                    <div class="text-[16px] text-gray-800 font-medium">{{ tab.text }}</div>
                    <div
                        v-if="tab.quality > 0"
                        class="absolute before:absolute before:bg-red-500 before:rounded-2xl before:top-[1px] before:w-full before:h-[calc(100%-2px)] before:z-[-1] text-white text-[12px] -right-[10px] -top-2 px-[7px] h-[20px] flex items-center justify-center z-[2]"
                    >
                        {{ tab.quality }}
                    </div>
                </li>
            </ul>
            <div class="flex justify-center">
                <div class="w-full sm:w-[420px]">
                    <ShoppingCarSteps v-model:step="currentStep" />
                </div>
            </div>
            <div class="lg:flex justify-center mt-[20px] lg:mt-[40px]">
                <keep-alive>
                    <component
                        ref="componentRef"
                        :is="showComponent"
                        v-model:currentTab="currentTab"
                        v-model:selectProductIds="selectProductIds"
                        :goCheckoutStep3="goCheckoutStep3"
                    />
                </keep-alive>
                <div
                    class="mt-12 lg:mt-0 w-full lg:w-[300px] xl:w-[400px]"
                    v-if="currentStep !== 2"
                >
                    <div class="lg:sticky lg:top-[111px]">
                        <ShoppingCarInputCoupon v-if="currentStep == 0" />
                        <ShoppingCarBilling
                            :class="currentStep == 0 ? 'mt-5 sm:mt-[30px] lg:mt-[20px]' : ''"
                            :selectProductIds="selectProductIds"
                            :currentTab="currentTab"
                            :currentStep="currentStep"
                        >
                            <template
                                v-if="currentStep == 0 || currentStep == 1"
                                #button
                            >
                                <div class="mt-[28px] lg:mt-[40px]">
                                    <button
                                        v-if="currentStep == 0"
                                        @click="goStepCheckout"
                                        :disabled="checkStockLimit"
                                        class="w-full yellow-btn disabled:cursor-not-allowed disabled:bg-gray-100"
                                    >
                                        下一步
                                    </button>
                                    <button
                                        v-else
                                        @click.prevent="validTest"
                                        class="w-full yellow-btn"
                                    >
                                        前往付款
                                    </button>
                                </div>
                            </template>
                            <template #total>
                                <span>
                                    {{ $utils().formatCurrency(total - salePrice - salePrice) }}
                                </span>
                            </template>
                            <template
                                v-if="currentStep == 0"
                                #deposit
                            >
                                {{ $utils().formatCurrency(Math.round(total * 0.3)) }}
                            </template>
                            <template
                                v-if="currentStep == 1"
                                #depositBig
                            >
                                {{ $utils().formatCurrency(Math.round(total * 0.3)) }}
                            </template>
                        </ShoppingCarBilling>
                        <div
                            v-if="currentStep == 1"
                            class="cursor-pointer mt-[24px] flex"
                            @click="
                                currentStep = 0;
                                showComponent = ShoppingCarStep1;
                            "
                        >
                            <NuxtImg
                                class="w-[20px]"
                                src="/img/icons/post/arrow-prev.svg"
                            />
                            <span class="ml-[8px]">返回購物車</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
// 訂單狀態
import ShoppingCarSteps from "~/views/template1/ShoppingCar/components/ShoppingCarSteps.vue";
import ShoppingCarStep1 from "~/views/template1/ShoppingCar/components/ShoppingCarStep1.vue";
import ShoppingCarStep2 from "~/views/template1/ShoppingCar/components/ShoppingCarStep2.vue";
import ShoppingCarStep3 from "~/views/template1/ShoppingCar/components/ShoppingCarStep3.vue";
// 輸入優惠券
import ShoppingCarInputCoupon from "~/views/template1/ShoppingCar/components/ShoppingCarInputCoupon.vue";
// 訂單金額
import ShoppingCarBilling from "~/views/template1/ShoppingCar/components/ShoppingCarBilling.vue";
import { useShoppingCarStore } from "~/store/shoppingCarStore";
import { useUserStore } from "~/store/userStore";

import { storeToRefs } from "pinia";
import { ShoppingCarInterface, ShoppingCarCustomInterface } from "~/interface/shoppingCar";
import { ElMessage } from "element-plus";
const { $utils } = useNuxtApp();

const route = useRoute();
const router = useRouter();
const { $api } = useNuxtApp();

const shoppingCarStore = useShoppingCarStore();
// 一般商品購物車
const { shoppingCar } = storeToRefs(shoppingCarStore);
// 訂製門扇購物車
const { shoppingCustomCar } = storeToRefs(shoppingCarStore);
const goCheckoutStep3 = ref(false);
const userStore = useUserStore();

// 購物種類
const tabs = computed(() => ({
    type1: {
        text: "一般產品",
        imgSrc: "/img/shopping-car/shopping-car-icon-lock.svg",
        quality: shoppingCar.value.length,
    },
    type2: {
        text: "訂製門扇",
        imgSrc: "/img/shopping-car/shopping-car-icon-door.svg",
        quality: shoppingCustomCar.value.length,
    },
}));

// 預設選擇 tab
const currentTab = ref("type1");

// 預設購物車狀態
const currentStep = ref(0);

// 購物車選中商品 id
const selectProductIds = ref<number[]>([]);

// 確認商品數量
const checkStockLimit = computed(() => {
    const haveStockLimit = shoppingCar.value.filter((item: any) => item.count > item.stock);
    return haveStockLimit.length > 0 ? true : false;
});

const componentRef = ref<any>(null);
const showComponent = shallowRef<any>(ShoppingCarStep1);

// 總價
const total = computed(() => {
    if (currentTab.value === "type1") {
        return _SumBy(
            _Filter(shoppingCar.value, (item: ShoppingCarInterface) => (item.id ? selectProductIds.value.includes(item.id) : false)),
            "totalPrice"
        );
    } else {
        return _SumBy(
            _Filter(shoppingCustomCar.value, (item: ShoppingCarCustomInterface) => (item.id ? selectProductIds.value.includes(item.id) : false)),
            "totalPrice"
        );
    }
});
// 折扣
const salePrice = computed(() => 0);
// go step2
const goStepCheckout = () => {
    if (selectProductIds.value.length === 0) {
        ElMessage({
            type: "error",
            message: "請先選擇商品",
        });
        return;
    }
    if (userStore.isAuth) {
        currentStep.value = 1;
        showComponent.value = ShoppingCarStep2;
    } else {
        ElMessage({
            type: "error",
            message: "請先登入",
        });
    }
};

/**
 * 表單驗證
 */
async function validTest() {
    if (componentRef.value) {
        await componentRef.value.validTest();
    }
}

watch(
    () => currentStep.value,
    (val) => {
        window.scrollTo({ top: 0, left: 0 });
        switch (val) {
            case 0:
                console.log("step0 val =>", val);
                showComponent.value = ShoppingCarStep1;
                return;
            case 1:
                console.log("step1 val =>", val);
                showComponent.value = ShoppingCarStep2;
                return;
            case 2:
                console.log("step2 val =>", val);
                showComponent.value = ShoppingCarStep3;
                return;
        }
    }
);

onMounted(async () => {
    currentTab.value = route.query.tab as string;
});

onActivated(() => {
    currentTab.value = route.query.tab as string;
});
</script>
