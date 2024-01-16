<template>
    <div>
        <h3 class="text-[16px] font-medium YaleSolisW-Bd mb-[20px]">款式</h3>
        <ul class="flex">
            <li
                @click="
                    lockCategoryData = category.value;
                    currentLock = locks[lockCategoryData][0];
                "
                v-for="(category, index) in lockCategories"
                :key="index"
                class="text-[14px] text-gray-800 rounded-[8px] py-[16px] px-[24px] w-[209px] cursor-pointer"
                :class="[lockCategoryData === category.value ? 'font-medium YaleSolisW-Bd border-2 border-yellow-600' : 'border border-gray-300', index === 0 ? 'mr-[12px]' : '']"
            >
                {{ category.text }}
            </li>
        </ul>
        <div class="flex mt-[30px]">
            <p class="text-[14px] font-medium YaleSolisW-Bd text-gray-800">水平把手不銹鋼白鐵水平門鎖 (搭配歐規鎖具)</p>
            <div class="flex-1 text-right">
                <button @click.prevent="showDialog = true">
                    <NuxtImg
                        class="w-[24px]"
                        src="/img/icons/info.svg"
                    />
                </button>
            </div>
        </div>
        <div class="flex mb-[20px] mt-[8px]">
            <p class="text-[14px] flex-1 text-gray-800">{{ currentLockData.style }}</p>

            <p class="text-[14px] text-gray-800">$NT {{ $utils().formatCurrency(currentLockData.price) }}</p>
        </div>
        <div
            v-for="(showLock, index) in showLocks"
            :key="index"
        >
            <ul class="flex justify-start">
                <li
                    @click="currentLockData = lock"
                    v-for="(lock, index2) in showLock"
                    :class="[currentLockData.id === lock.id ? 'border-2 border-yellow-600  rounded-[8px]' : 'border-2 border-white', showLock.length - 1 !== index2 ? 'mr-[16px]' : '']"
                    class="p-1 cursor-pointer"
                >
                    <NuxtImg
                        class="w-[84px]"
                        :src="lock.imgSrc"
                    />
                </li>
                <li
                    v-show="showLock.length < 4"
                    v-for="(lock, index2) in 4 - showLock.length"
                    :key="index2"
                >
                    <div class="w-[84px] opacity-0">
                        {{ lock }}
                    </div>
                </li>
            </ul>
        </div>
        <el-dialog
            v-model="showDialog"
            :before-close="closeDialog"
            :show-close="false"
        >
            <div class="text-right">
                <button @click="closeDialog">
                    <el-icon :size="30"><Close /></el-icon>
                </button>
            </div>
            <h5 class="text-[20px] text-gray-800 YaleSolisW-Bd mb-[38px]">卡片密碼電子鎖-YDM 3109+</h5>
            <CustomProductDailogCarousel :photos="photos" />
            <p
                class="text-[16px] text-gray-800 mt-[28px]"
                v-html="dialogDetailHtml"
            ></p>
            <div class="flex justify-center mt-[40px]">
                <button class="bg-yellow-600 text-gray-800 rounded-full w-[140px] py-[11px] text-center hover:bg-yellow-700 text-[16px]">加入選擇</button>
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
// 導入細節彈窗 幻燈片
import CustomProductDailogCarousel from "~/views/template1/CustomProduct/components/CustomProductDailogCarousel.vue";

const { $utils } = useNuxtApp();

const emit = defineEmits(["update:lockCategory", "update:currentLock"]);

const props = defineProps({
    lockCategory: {
        type: String,
        default: "handle",
    },
    // 預設選中的鎖
    currentLock: {
        type: Object,
        default() {
            return {
                style: "door R51 02 light",
                price: 1000,
                id: "id1",
            };
        },
    },
    // 鎖
    locks: {
        type: Array,
        default() {
            return [
                {
                    imgSrc: "/img/custom-product/demo/custom-product-lock-demo-1.jpg",
                    price: 2000,
                    style: "door R51 02 light",
                    id: "id1",
                },
            ];
        },
    },
});

const lockCategories = ref([
    {
        text: "水平把手",
        value: "handle",
    },
    {
        text: "智慧電子鎖",
        value: "lock",
    },
]);

// 選中鎖的分類
const lockCategoryData = ref(props.lockCategory);

// 預設選中的鎖
const currentLockData = ref(props.currentLock);

watch(
    () => lockCategoryData.value,
    (val) => {
        emit("update:lockCategory", val);
        currentLockData.value = props.locks[val][0];
        emit("update:currentLock", props.locks[val][0]);
    }
);

watch(
    () => currentLockData.value,
    (val) => {
        emit("update:currentLock", val);
    }
);

// 顯示 電子鎖 得規則 因為 4個顏色要換行 因此加上此演算法
const showLocks = computed(() => {
    // 一行顯示幾個
    const rowShowTotal = 4;
    var datas = props.locks[props.lockCategory];

    // 可被整除的數字 (取出可被 4 整除的最大公倍數，當陣列數小於 4 時 給予預設值 1)
    const divisble = datas.length / rowShowTotal < 0 ? 1 : datas.length / rowShowTotal;
    // 需要更新的所有路徑 (將陣列資料 以 4 筆 為單位 拆成 二維陣列資料方式存入)
    const datasTotal: any = [];
    // 判斷最大公倍數有多少執行回圈多少次
    for (let i = 0; i < divisble; i++) {
        datasTotal[i] = datas.slice(i * rowShowTotal, (i + 1) * rowShowTotal);
    }
    // 陣列數 / 4 如果未整除時 將剩餘陣列資料塞入 datasToatal 中
    if (datas.length / rowShowTotal > divisble) {
        // 新增一筆陣列資料將最後剩餘的資料塞入
        datasTotal[divisble] = datas.splice(divisble * rowShowTotal, datas.length);
    }
    return datasTotal;
});

// 細節彈窗幻燈片圖
const photos = ref<{ id: string | number; imgSrc: string }[]>([]);

for (let i = 0; i < 10; i++) {
    photos.value.push({ id: i, imgSrc: "/img/product/demo/product-carousel.jpg" });
}

const dialogDetailHtml = ref(`
經典款式再升級！支援藍芽開門及遠端開門系統整合，手機也可以設定電子鎖。 <br /><br />
 熱感應輕觸式數位鍵盤，美觀便捷，且以手掌觸碰開啟有效避免指紋與密碼外洩。隱藏式機械鑰匙孔，緊急情況下，可以使用備用機械鑰匙。
`);

// 顯示彈窗
const showDialog = ref(false);

/**
 * 關閉彈窗
 */

function closeDialog() {
    showDialog.value = false;
}
</script>

<style lang="scss" scoped>
:deep {
    .el-dialog__body {
        @apply mx-10;
    }
    .el-dialog {
        @apply rounded-[20px];
    }
}
</style>
