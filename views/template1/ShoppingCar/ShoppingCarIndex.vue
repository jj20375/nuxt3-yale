<template>
    <section class="min-h-screen mt-[94px] border-t border-gray-300">
        <div class="container">
            <ul class="flex justify-center pt-[64px]">
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
        </div>
    </section>
</template>

<script setup lang="ts">
import ShoppingCarSteps from "~/views/template1/ShoppingCar/components/ShoppingCarSteps.vue";

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
</script>
