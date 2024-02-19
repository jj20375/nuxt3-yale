<template>
    <div v-if="currentLockData.detailData">
        <h3 class="text-[16px] font-medium YaleSolisW-Bd mb-[20px]">款式</h3>
        <ul class="grid grid-cols-2 gap-[12px]">
            <li
                @click="
                    lockCategoryData = category.value;
                    currentLockData = locks[lockCategoryData][0];
                    currentLockIdData = locks[lockCategoryData][0];
                "
                v-for="(category, index) in lockCategories"
                :key="index"
                class="rounded-[8px] text-[14px] py-[16px] px-[24px] border border-gray-300 cursor-pointer"
                :class="[lockCategoryData === category.value ? 'outline outline-2 outline-yellow-600 -outline-offset-2 font-medium' : 'border border-gray-300']"
            >
                {{ category.text }}
            </li>
        </ul>
        <div class="flex mt-[30px]">
            <p class="flex-1 text-[14px] font-medium YaleSolisW-Bd text-gray-800">{{ currentLockData.name }}</p>
            <div class="text-right">
                <button @click.prevent="showDialog = true">
                    <NuxtImg
                        class="w-[24px]"
                        src="/img/icons/info.svg"
                    />
                </button>
            </div>
        </div>
        <div class="flex mb-[20px]">
            <p class="text-[14px] flex-1 text-gray-800">{{ currentLockData.style }}</p>

            <p class="text-[14px] text-gray-800">+NT$ {{ $utils().formatCurrency(currentLockData.price) }}</p>
        </div>
        <div class="flex flex-col gap-[15px]">
            <div
                v-for="(showLock, index) in showLocks"
                :key="index"
            >
                <ul class="grid grid-cols-4 gap-x-[15px]">
                    <li
                        @click="currentLockData = lock"
                        v-for="(lock, index2) in showLock"
                        :class="[currentLockData.id === lock.id ? 'border-2 border-yellow-600  rounded-[8px]' : 'border-2 border-white']"
                        class="p-1 cursor-pointer"
                    >
                        <NuxtImg
                            class="w-full aspect-square object-contain rounded-[4px]"
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
        </div>
        <el-dialog
            class="custom-dialog h-[600px]"
            v-model="showDialog"
            :before-close="closeDialog"
            close-on-click-modal
            lock-scroll
            show-close
            :width="800"
            center
            align-center
            append-to-body
        >
            <div class="w-3/4 mx-auto">
                <h5 class="text-[20px] text-gray-800 YaleSolisW-Bd mb-[38px]">{{ currentLockData.shape }}-{{ currentLockData.style }}</h5>
                <CustomProductDailogCarousel
                    v-if="!$utils().isEmpty(currentLockData.detailData.carousel)"
                    :photos="currentLockData.detailData.carousel"
                />
                <p
                    class="text-[16px] text-gray-800 mt-[28px]"
                    v-html="dialogDetailHtml"
                ></p>
                <div class="flex justify-center mt-[40px]">
                    <button class="yellow-btn btn-md">加入選擇</button>
                </div>
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
    // 預設選中的鎖 id
    currentLockId: {
        type: Number,
        default: 1,
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

// 預設選中的鎖 id
const currentLockIdData = ref(props.currentLockId);

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
watch(
    () => currentLockIdData.value,
    (val) => {
        emit("update:currentLockId", val);
    }
);
watch(
    () => props.currentLockId,
    (val) => {
        currentLockIdData.value = val;
    }
);
watch(
    () => props.currentLock,
    (val) => {
        currentLockData.value = val;
    }
);
watch(
    () => props.lockCategory,
    (val) => {
        lockCategoryData.value = val;
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
