<template>
    <section class="min-h-screen mt-[86px] border-t border-gray-300">
        <div class="container">
            <ul
                v-if="currentStep == 0"
                class="flex justify-center pt-[64px]"
            >
                <li
                    v-for="(tab, key) in tabs"
                    :key="key"
                    class="flex py-[24px] px-[36px] rounded-[8px] cursor-pointer"
                    :class="[currentTab === key ? 'border-2 border-yellow-600' : 'border border-gray-300 ', key === 'type1' ? 'mr-[24px]' : '']"
                    @click="currentTab = key"
                >
                    <div class="mr-[12px]">
                        <NuxtImg
                            class="w-[24px]"
                            :src="tab.imgSrc"
                        />
                    </div>
                    <div class="text-[16px] text-gray-800 font-medium">{{ tab.text }}</div>
                </li>
            </ul>
            <div class="flex justify-center">
                <div class="w-[420px]">
                    <ShoppingCarSteps v-model:step="currentStep" />
                </div>
            </div>
            <div class="flex justify-center">
                <component
                    :is="showComponent"
                    v-model:currentTab="currentTab"
                    v-model:selectProductIds="selectProductIds"
                ></component>
                <div
                    class="mt-[40px] w-[387px]"
                    v-if="currentStep !== 2"
                >
                    <ShoppingCarInputCoupon v-if="currentStep == 0" />
                    <ShoppingCarBilling
                        :class="currentStep == 0 ? 'mt-[20px]' : ''"
                        :selectProductIds="selectProductIds"
                    >
                        <template
                            v-if="currentStep == 0"
                            #button
                        >
                            <div class="mt-[40px]">
                                <button
                                    @click="
                                        currentStep = 1;
                                        showComponent = ShoppingCarStep2;
                                    "
                                    class="bg-yellow-600 w-[339px] py-[17px] rounded-full text-gray-800 text-[16px] text-center"
                                >
                                    下一步
                                </button>
                            </div>
                        </template>
                        <template #total>
                            <span class="text-[24px]">
                                {{ $utils().formatCurrency(total - salePrice - salePrice) }}
                            </span>
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
            <div
                class="flex justify-center mb-[100px] mt-[41px]"
                v-if="currentStep == 1"
            >
                <button
                    @click.prevent="
                        currentStep = 2;
                        showComponent = ShoppingCarStep3;
                    "
                    class="bg-yellow-600 text-gray-800 text-center py-[17px] w-[339px] rounded-full text-[16px]"
                >
                    前往付訂
                </button>
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
const { $utils } = useNuxtApp();

const shoppingCarStore = useShoppingCarStore();

// 購物種類
const tabs = ref({
    type1: {
        text: "一般產品",
        imgSrc: "/img/shopping-car/shopping-car-icon-lock.svg",
    },
    type2: {
        text: "訂製門扇",
        imgSrc: "/img/shopping-car/shopping-car-icon-door.svg",
    },
});

// 預設選擇 tab
const currentTab = ref("type1");

// 預設購物車狀態
const currentStep = ref(0);

// 購物車選中商品 id
const selectProductIds = ref<number[]>([]);

const showComponent = shallowRef<any>(ShoppingCarStep1);

// 購物車資料
const shoppingCar = computed(() => shoppingCarStore.shoppingCar);

// 總價
const total = computed(() =>
    _SumBy(
        _Filter(shoppingCar.value, (item) => selectProductIds.value.includes(item.id)),
        "price"
    )
);
// 折扣
const salePrice = computed(() => 1000);

watch(
    () => currentStep.value,
    (val) => {
        switch (val) {
            case "0":
                console.log("step0 val =>", val);
                showComponent.value = ShoppingCarStep1;
                return;
            case "1":
                console.log("step1 val =>", val);
                showComponent.value = ShoppingCarStep2;
                return;
            case "2":
                console.log("step2 val =>", val);
                showComponent.value = ShoppingCarStep3;
                return;
        }
    }
);
</script>
