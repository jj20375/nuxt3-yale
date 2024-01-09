<template>
    <section class="min-h-screen mt-[94px] mb-[100px]">
        <nav class="border-t border-b border-gray-300 py-[16px] pl-[122px]">
            <Breadcrumb :menus="breadcrumbs" />
        </nav>
        <div class="container mt-[60px]">
            <div class="grid grid-cols-3">
                <ProductDetailCarousel
                    class="pr-[72px] col-span-2"
                    :photos="photos"
                />
                <div class="col-span-1">
                    <h1 class="text-[24px] font-medium text-gray-800 YaleSolisW-Bd">YDM 4109A</h1>
                    <h2 class="mt-[8px] text-[16px] font-medium text-gray-300">指紋密碼鑰匙三合一</h2>
                    <div class="flex mt-[8px]">
                        <p class="text-gray-800 text-[20px] font-medium mr-[12px] YaleSolisW-Bd">NT$1,760</p>
                        <p class="text-gray-500 text-[20px] font-light line-through">NT$1,900</p>
                    </div>
                    <ul class="mt-[16px]">
                        <li
                            class="text-gray-900 list-disc list-inside text-[15px] mb-1"
                            v-for="(detail, index) in details"
                        >
                            {{ detail }}
                        </li>
                    </ul>
                    <div class="py-[30px] flex items-center">
                        <NuxtLink :to="{ name: 'product-compare-slug', params: { slug: '主鎖比較' }, query: { category: 'id1', tag: 'id1' } }">
                            <div class="mr-[20px] cursor-pointer">規格比較</div>
                        </NuxtLink>
                        <font-awesome-icon
                            class="text-gray-300 text-[20px]"
                            :icon="['far', 'heart']"
                        />
                    </div>
                    <div>
                        <h5 class="text-[16px] font-medium text-gray-800 YaleSolisW-Bd">顏色</h5>
                        <ul class="flex mt-[20px]">
                            <li
                                v-for="color in colors"
                                :key="color.id"
                                class="mr-[20px] cursor-pointer"
                                @click="currentColor = color.id"
                            >
                                <div
                                    class="p-2"
                                    :class="currentColor === color.id ? 'border border-yellow-600  rounded-full' : ''"
                                >
                                    <NuxtImg
                                        class="w-[32px]"
                                        :src="color.imgSrc"
                                    />
                                </div>
                                <p
                                    v-if="currentColor === color.id"
                                    class="text-[14px] text-gray-800 px-2 pt-[8px]"
                                >
                                    {{ color.text }}
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div class="mt-[30px]">
                        <h5 class="text-[16px] font-medium text-gray-800 mb-[20px] YaleSolisW-Bd">數量</h5>
                        <div class="flex justify-center items-center w-[188px] border border-gray-300 px-[2px] py-[10px] rounded-full">
                            <div
                                class="cursor-pointer"
                                @click="countDelete()"
                            >
                                <el-icon><Minus /></el-icon>
                            </div>
                            <div class="w-[88px] h-[28px] text-center">{{ count }}</div>
                            <div
                                class="cursor-pointer"
                                @click="countAdd()"
                            >
                                <el-icon><Plus /></el-icon>
                            </div>
                        </div>
                    </div>
                    <div class="my-[30px]">
                        <button class="max-w-[387px] w-full text-center py-[11px] border border-gray-600 transition-all duration-500 hover:text-white hover:bg-black rounded-full">加入購物車</button>
                        <div class="mt-[12px]">
                            <button class="max-w-[387px] w-full text-center py-[11px] bg-yellow-500 hover:bg-yellow-600 transition-all duration-500 rounded-full">結帳</button>
                        </div>
                    </div>
                    <div class="bg-gray-50 p-[30px] max-w-[387px] rounded-xl mb-[20px]">
                        <ul class="text-[16px]">
                            <li
                                class="mb-[6px]"
                                v-for="(sale, index) in salesDetail"
                                :key="index"
                            >
                                {{ sale }}
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul class="flex">
                            <li class="mr-[16px]">
                                <NuxtImg
                                    class="w-[20px]"
                                    src="/img/icons/medias/icon-black-1.svg"
                                />
                            </li>
                            <li>
                                <NuxtImg
                                    class="w-[20px]"
                                    src="/img/icons/medias/icon-black-3.svg"
                                />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="mt-[80px]">
                <ul class="flex justify-center">
                    <li
                        @click="currentTab = index"
                        v-for="(tab, index) in tabs"
                        :key="index"
                        class="py-[8px] w-[200px] text-[20px] text-center cursor-pointer"
                        :class="currentTab === index ? 'border-b-2 border-gray-800 text-gray-800' : 'text-gray-400'"
                    >
                        {{ tab }}
                    </li>
                </ul>
                <div
                    v-if="currentTab === 0"
                    class="min-h-[500px] text-center flex items-center justify-center"
                >
                    詳細介紹內容
                </div>
                <div
                    v-if="currentTab === 1"
                    class="min-h-[500px] text-center flex items-center justify-center"
                >
                    產品規格內容
                </div>
            </div>
            <div>
                <h3 class="text-[32px] YaleSolisW-Bd font-medium text-gray-800 text-center">相關產品</h3>
                <ProductSameCarousel :photos="photos" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
// 麵包屑組件
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
// 產品描述 幻燈片
import ProductDetailCarousel from "~/views/template1/Product/components/ProductDetailCarousel.vue";
// 相關產品幻燈片
import ProductSameCarousel from "~/views/template1/Product/components/ProductSameCarousel.vue";
const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁",
    },
    {
        name: "product-slug",
        text: "產品資訊",
        params: { slug: "耶魯產品資訊" },
    },
    {
        name: "product-slug",
        text: "電子鎖",
        params: { slug: "耶魯產品資訊-電子鎖" },
        query: { category: "id1" },
    },
    {
        name: "product-slug",
        text: "主鎖",
        params: { slug: "耶魯產品資訊-電子鎖-主鎖" },
        query: { category: "id1", tag: "id1" },
    },
    {
        name: "product-slug",
        text: "YDM 4109A",
        params: { slug: "耶魯產品資訊-電子鎖-主鎖-YDM 4109A" },
        query: { category: "id1", tag: "id1" },
    },
]);

const photos = ref<{ id: string | number; imgSrc: string }[]>([]);

for (let i = 0; i < 10; i++) {
    photos.value.push({ id: i, imgSrc: "/img/product/demo/product-carousel.jpg" });
}

const details = ref(["YDM 4109A 卡片密碼鑰匙三合一電子鎖", "結合卡片、密碼功能的入門款", "建案指定使用，卡片格式相容大部分社區磁釦", "標配語音提示輕鬆設定"]);

const colors = ref([
    {
        id: 1,
        text: "琥珀",
        imgSrc: "/img/product/demo/color-1.png",
    },
    {
        id: 2,
        text: "白色",
        imgSrc: "/img/product/demo/color-2.png",
    },
    {
        id: 3,
        text: "黑色",
        imgSrc: "/img/product/demo/color-3.png",
    },
]);

// 折扣文案
const salesDetail = ref(["[活動] 滿 NT$1,700 折 NT$560", "[活動] 歡慶十週年，滿 NT$1,700 打 8 折", "[活動] 全站滿千免運"]);

// 預設選中顏色
const currentColor = ref(1);

// 數量
const count = ref(1);

/**
 * 點擊刪除數量按鈕
 */
function countDelete() {
    if (count.value <= 1) {
        count.value = 1;
        return;
    }
    count.value--;
}
/**
 * 點擊增加數量按鈕
 */
function countAdd() {
    count.value++;
}

/**
 * 詳細介紹 產品規格 tab
 */
const tabs = ["詳細介紹", "產品規格"];
/**
 * 預設選中 tab
 */
const currentTab = ref(0);
</script>
