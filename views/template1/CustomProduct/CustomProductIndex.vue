<template>
    <section class="mt-[86px] flex max-h-screen min-h-screen">
        <!-- <pre>{{ customPreviewData }}</pre> -->
        <CustomProductPrewView
            v-model:currentAngle="currentAngle"
            v-model:previewWidth="previewWidth"
            v-model:currentBgData="currentBgData"
            :productData="customPreviewData"
        />
        <div class="mx-[55px] min-w-[430px] overflow-y-auto">
            <CustomProductContent />
            <div class="border-b border-gray-300 py-[30px]">
                <div
                    @click="stepMenuShow['step1'].show = !stepMenuShow['step1'].show"
                    class="flex items-center mb-[30px] mt-[40px] cursor-pointer"
                >
                    <h3 class="flex-1 text-gray-800 text-[20px] font-medium YaleSolisW-Bd">{{ stepMenuShow["step1"].text }}</h3>
                    <font-awesome-icon
                        class="transition-all duration-500"
                        :class="!stepMenuShow['step1'].show ? 'rotate-180' : ''"
                        :icon="['fas', 'chevron-up']"
                    />
                </div>
                <div v-show="stepMenuShow['step1'].show">
                    <CustomProductBackground
                        v-model:currentBgId="currentBgId"
                        v-model:currentBgData="currentBgData"
                    />
                    <CustomProductPlan
                        class="mt-[20px]"
                        v-model:currentPlan="currentPlan"
                    />
                    <CustomProduct
                        class="mt-[20px]"
                        v-model:currentProductId="currentDoorId"
                        v-model:currentProductData="currentDoorData"
                        :products="doors"
                    />
                    <CustomProductColor
                        class="mt-[20px]"
                        v-model:currentColorId="currentDoorColorId"
                        v-model:currentColorData="currentDoorColorData"
                        :colors="doors[0].colors"
                    />
                    <CustomProductSize
                        class="mt-[20px]"
                        :sizes="doorSizes"
                        v-model:currentSizeId="currentDoorSizeId"
                        v-model:currentSizeData="currentDoorSizeData"
                    />
                </div>
            </div>
            <div class="border-b border-gray-300 pb-[30px]">
                <div
                    @click="stepMenuShow['step2'].show = !stepMenuShow['step2'].show"
                    class="flex items-center mb-[30px] mt-[30px] cursor-pointer"
                >
                    <h3 class="flex-1 text-gray-800 text-[20px] font-medium YaleSolisW-Bd">{{ stepMenuShow["step2"].text }}</h3>
                    <font-awesome-icon
                        class="transition-all duration-500"
                        :class="!stepMenuShow['step2'].show ? 'rotate-180' : ''"
                        :icon="['fas', 'chevron-up']"
                    />
                </div>
                <div v-show="stepMenuShow['step2'].show">
                    <CustomProduct
                        class="mt-[20px]"
                        v-model:currentProductId="currentDoorOutId"
                        v-model:currentProductData="currentDoorOutData"
                        :products="doorsOut"
                    />
                    <CustomProductColor
                        class="mt-[20px]"
                        v-model:currentColorId="currentDoorOutColorId"
                        v-model:currentColorData="currentDoorOutColorData"
                        :colors="doorsOut[0].colors"
                    />
                </div>
            </div>
            <div class="border-b border-gray-300 pb-[30px]">
                <div
                    @click="stepMenuShow['step3'].show = !stepMenuShow['step3'].show"
                    class="flex items-center mb-[30px] mt-[30px] cursor-pointer"
                >
                    <h3 class="flex-1 text-gray-800 text-[20px] font-medium YaleSolisW-Bd">{{ stepMenuShow["step3"].text }}</h3>
                    <font-awesome-icon
                        class="transition-all duration-500"
                        :class="!stepMenuShow['step3'].show ? 'rotate-180' : ''"
                        :icon="['fas', 'chevron-up']"
                    />
                </div>
                <CustomProductLock
                    v-show="stepMenuShow['step3'].show"
                    v-model:lockCategory="lockCategory"
                    v-model:currentLock="currentLock"
                    :locks="locks"
                />
            </div>
            <div class="border-b border-gray-300 pb-[30px]">
                <div
                    @click="stepMenuShow['step4'].show = !stepMenuShow['step4'].show"
                    class="flex items-center mb-[30px] mt-[30px] cursor-pointer"
                >
                    <h3 class="flex-1 text-gray-800 text-[20px] font-medium YaleSolisW-Bd">{{ stepMenuShow["step4"].text }}</h3>
                    <font-awesome-icon
                        class="transition-all duration-500"
                        :class="!stepMenuShow['step4'].show ? 'rotate-180' : ''"
                        :icon="['fas', 'chevron-up']"
                    />
                </div>
                <div v-show="stepMenuShow['step4'].show">
                    <CustomProduct
                        class="mt-[20px]"
                        title="掛門"
                        v-model:currentProductId="currentTool1Id"
                        v-model:currentProductData="currentTool1Data"
                        :products="doors"
                    />
                    <CustomProduct
                        class="mt-[20px]"
                        title="氣密條"
                        v-model:currentProductId="currentTool2Id"
                        v-model:currentProductData="currentTool2Data"
                        :products="doors"
                    />
                </div>
            </div>
            <div class="border-b border-gray-300 pb-[30px]">
                <div
                    @click="stepMenuShow['step5'].show = !stepMenuShow['step5'].show"
                    class="flex items-center mb-[30px] mt-[30px] cursor-pointer"
                >
                    <h3 class="flex-1 text-gray-800 text-[20px] font-medium YaleSolisW-Bd">{{ stepMenuShow["step5"].text }}</h3>
                    <font-awesome-icon
                        class="transition-all duration-500"
                        :class="!stepMenuShow['step5'].show ? 'rotate-180' : ''"
                        :icon="['fas', 'chevron-up']"
                    />
                </div>
                <div v-show="stepMenuShow['step5'].show">
                    <CustomProductOtherChoose
                        class="mt-[20px]"
                        title="下將壓條"
                        v-model:selectedProductIds="currentOther1Ids"
                        v-model:selectedProducts="currentOther1Datas"
                        :products="doors"
                    />
                    <CustomProductOtherChoose
                        class="mt-[20px]"
                        title="門弓器"
                        v-model:selectedProductIds="currentOther2Ids"
                        v-model:selectedProducts="currentOther2Datas"
                        :products="doors"
                    />
                </div>
            </div>
            <div class="border-b border-gray-300 pb-[30px]">
                <div
                    @click="stepMenuShow['step6'].show = !stepMenuShow['step6'].show"
                    class="flex items-center mb-[30px] mt-[30px] cursor-pointer"
                >
                    <h3 class="flex-1 text-gray-800 text-[20px] font-medium YaleSolisW-Bd">{{ stepMenuShow["step6"].text }}</h3>
                    <font-awesome-icon
                        class="transition-all duration-500"
                        :class="!stepMenuShow['step6'].show ? 'rotate-180' : ''"
                        :icon="['fas', 'chevron-up']"
                    />
                </div>
                <CustomProductCount
                    v-show="stepMenuShow['step6'].show"
                    v-model:count="count"
                />
            </div>
            <div class="border-b border-gray-300 pb-[30px]">
                <div
                    @click="stepMenuShow['step7'].show = !stepMenuShow['step7'].show"
                    class="flex items-center mb-[30px] mt-[30px] cursor-pointer"
                >
                    <h3 class="flex-1 text-gray-800 text-[20px] font-medium YaleSolisW-Bd">{{ stepMenuShow["step7"].text }}</h3>
                    <font-awesome-icon
                        class="transition-all duration-500"
                        :class="!stepMenuShow['step7'].show ? 'rotate-180' : ''"
                        :icon="['fas', 'chevron-up']"
                    />
                </div>

                <CustomProductOtherService
                    v-show="stepMenuShow['step7'].show"
                    v-model:selectedServiceIds="currentServiceIds"
                    v-model:selectedServiceDatas="currentServiceDatas"
                />
            </div>
            <div class="my-[30px] flex pb-[300px]">
                <div class="mr-[16px] flex-1">
                    <button
                        @click.prevent="openShoppingCarDialog"
                        class="max-w-[207px] w-full text-center py-[11px] border border-gray-600 transition-all duration-500 hover:text-white hover:bg-black rounded-full"
                    >
                        加入購物車
                    </button>
                </div>
                <button
                    @click.prevent="goToBill"
                    class="max-w-[207px] w-full text-center py-[11px] bg-yellow-500 hover:bg-yellow-600 transition-all duration-500 rounded-full"
                >
                    結帳
                </button>
            </div>
        </div>
        <div class="fixed bottom-0 flex items-center justify-end w-full text-right pr-[55px] bg-white z-[500] h-[80px] bg-opacity-80 backdrop-blur-xl">
            <ul
                v-if="previewWidth > 0"
                class="flex justify-center"
                :style="{ width: previewWidth + 'px' }"
            >
                <li
                    @click="currentAngle = angle.value"
                    class="rounded-full px-[20px] py-[8px] text-white cursor-pointer"
                    :class="[currentAngle === angle.value ? 'bg-gray-800' : 'bg-gray-300', index !== viewAngle.length - 1 ? 'mr-[12px]' : '']"
                    v-for="(angle, index) in viewAngle"
                    :key="angle.value"
                >
                    {{ angle.text }}
                </li>
            </ul>
            <div class="flex items-center justify-end flex-1 text-right">
                <div class="mr-[16px] flex items-center">
                    <p class="text-gray-600 text-[14px]">預估金額</p>
                    <div class="text-[14px] text-gray-800 flex items-center ml-2">
                        NT$ <strong class="ml-2 font-medium YaleSolisW-Bd text-[24px]">{{ $utils().formatCurrency(total) }}</strong>
                    </div>
                </div>
                <div class="flex text-gray-600">
                    <p class="text-[14px] mr-[4px]">訂金 (總價30%)</p>
                    <div class="text-[14px]">NT$ {{ $utils().formatCurrency(deposit) }}</div>
                </div>
            </div>
        </div>
        <ClientOnly>
            <AddToShoppingCarDialog
                v-model:showDialog="showSoppingCarDialog"
                :tab="'type2'"
            />
        </ClientOnly>
    </section>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
// 預覽圖片
import CustomProductPrewView from "~/views/template1/CustomProduct/components/CustomProductPrewView.vue";
// 選擇場景
import CustomProductBackground from "~/views/template1/CustomProduct/components/CustomProductBackground.vue";
// 選擇門扇
import CustomProduct from "~/views/template1/CustomProduct/components/CustomProduct.vue";
// 選擇顏色
import CustomProductColor from "~/views/template1/CustomProduct/components/CustomProductColor.vue";
// 選擇門鎖
import CustomProductLock from "~/views/template1/CustomProduct/components/CustomProductLock.vue";
// 內文資訊
import CustomProductContent from "~/views/template1/CustomProduct/components/CustomProductContent.vue";
// 門扇數量
import CustomProductCount from "~/views/template1/CustomProduct/components/CustomProductCount.vue";
// 額外服務
import CustomProductOtherService from "~/views/template1/CustomProduct/components/CustomProductOtherService.vue";
// 尺寸
import CustomProductSize from "~/views/template1/CustomProduct/components/CustomProductSize.vue";
// 方案
import CustomProductPlan from "~/views/template1/CustomProduct/components/CustomProducPlan.vue";
// 選擇選配區
import CustomProductOtherChoose from "~/views/template1/CustomProduct/components/CustomProductOtherChoose.vue";
// 加入購物車彈窗
import AddToShoppingCarDialog from "~/views/template1/components/AddToShoppingCarDialog.vue";
/**
 * 訂製門扇方法
 */
import { useCustomProdutHook } from "./hooks/CustomProductHook";

const router = useRouter();

const { $utils, $shoppingCarService } = useNuxtApp();

const stepMenuShow = ref({
    step1: {
        show: true,
        text: "01 選擇門扇",
    },
    step2: {
        show: true,
        text: "02 選擇門框",
    },
    step3: {
        show: true,
        text: "03 選擇門鎖",
    },
    step4: {
        show: true,
        text: "04 選擇基本五金",
    },
    step5: {
        show: true,
        text: "05 選配區",
    },
    step6: {
        show: true,
        text: "06 門扇數量",
    },
    step7: {
        show: true,
        text: "07 施作服務",
    },
});

// 預設選擇場景 id
const currentBgId = ref("id1");
// 預設選擇場景資料
const currentBgData = ref<any>({});
// 預設選擇方案
const currentPlan = ref("id1");
// 預設選擇門的角度
const currentAngle = ref("front");
// 預覽視窗 dom 寬度 用來計算 正面｜背面｜半開顯示位置
const previewWidth = ref(0);
const viewAngle = ref([
    {
        text: "正面",
        value: "front",
    },
    {
        text: "背面",
        value: "backend",
    },
    {
        text: "半開",
        value: "half",
    },
]);
// 預設選擇門扇 id
const currentDoorId = ref("id1");
// 預設選擇門扇資料
const currentDoorData = ref<any>({});
// 預設選擇門扇顏色 id
const currentDoorColorId = ref("id1");
// 預設選擇門扇顏色資料
const currentDoorColorData = ref<any>({});
// 預設選擇門框 id
const currentDoorOutId = ref("id1");
// 預設選擇門框資料
const currentDoorOutData = ref<any>({});
// 預設選擇門框顏色 id
const currentDoorOutColorId = ref("id1");
// 預設選擇門框顏色資料
const currentDoorOutColorData = ref<any>({});
// 選擇基本五金 掛門 id值
const currentTool1Id = ref("id1");
// 選擇基本五金 掛門資料
const currentTool1Data = ref<any>({});
// 選擇基本五金 氣密條 id值
const currentTool2Id = ref("id1");
// 選擇基本五金 氣密條資料
const currentTool2Data = ref<any>({});
// 選擇選配區 下將壓條 ids
const currentOther1Ids = ref(["id1"]);
// 選擇選配區 下將壓條資料
const currentOther1Datas = ref<any>([]);
// 選擇選配區 門弓器 ids
const currentOther2Ids = ref(["id1"]);
// 選擇選配區 門弓器資料
const currentOther2Datas = ref<any>([]);
// 預設選擇尺寸 id
const currentDoorSizeId = ref("id1");
// 預設選擇尺寸資料
const currentDoorSizeData = ref<any>({});
// 選擇得服務 ids
const currentServiceIds = ref([]);
// 選擇得服務資料
const currentServiceDatas = ref<any>([]);
// 預設選擇鎖種類 default = 水平把手; smartLock = 智慧電子鎖
const lockCategory = ref("handle");
// 訂購數量
const count = ref(1);
// 預設選擇鎖樣式
const currentLock = ref({
    imgSrc: "/img/custom-product/demo/custom-product-door-demo-1.jpg",
    id: "id1",
    style: "door R51 02 light",
    price: 20000,
});

const showSoppingCarDialog = ref(false);

function openShoppingCarDialog() {
    showSoppingCarDialog.value = true;
    addToShoppingCar();
}

/**
 * 加入購物車
 */
function addToShoppingCar() {
    const data = {
        id: uuidv4(),
        name: currentBgData.value.text,
        imgSrc: currentDoorData.value.imgSrc,
        count: count.value,

        doorGloup: {
            size: { label: "尺寸", ...currentDoorSizeData.value },
            door: {
                label: "門扇",
                ...currentDoorData.value,
                color: currentDoorColorData.value,
            },
            types: {
                category1: {
                    label: "防火功能",
                    value: false,
                },
            },
        },
        doorOut: { label: "門框", ...currentDoorOutData.value, color: currentDoorOutColorData.value },
        currentTool1: { label: "掛門", ...currentTool1Data.value },
        currentTool2: { label: "氣密條", ...currentTool2Data.value },
    };
    let price = currentDoorData.value.price + currentDoorOutData.value.price + currentTool1Data.value.price + currentTool2Data.value.price;

    // 判斷是否有選擇 選擇基本五金 下將壓條
    if (!$utils().isEmpty(currentOther1Datas.value)) {
        console.log("currentOther1Datas.value >", currentOther1Datas.value);
        data["currentOther1"] = { label: "下降壓條", datas: currentOther1Datas.value };
        price = price + _SumBy(currentOther1Datas.value, "price");
    }
    // 判斷是否有選擇 選擇基本五金 門弓器
    if (!$utils().isEmpty(currentOther2Datas.value)) {
        data["currentOther2"] = { label: "門弓器", datas: currentOther2Datas.value };
        price = price + _SumBy(currentOther2Datas.value, "price");
    }
    // 判斷是否有選擇 施作服務
    if (!$utils().isEmpty(currentServiceDatas.value)) {
        data["otherServices"] = { label: "額外施作服務", datas: currentServiceDatas.value };
        price = price + _SumBy(currentServiceDatas.value, "price");
    }
    data["price"] = price * count.value;
    data["singlePrice"] = price;

    if (process.client) {
        // 加入 訂製門扇購物車
        $shoppingCarService().addCustomProductToShoppingCar(data);
    }
}

/**
 * 前往結賬
 */
function goToBill() {
    addToShoppingCar();
    router.push({ name: "shopping-car-slug", params: { slug: "耶魯電子鎖購物車" }, query: { tab: "type2" } });
}

// 門扇資料
const doors = ref<any>([]);
// 門扇假資料
for (let i = 1; i < 6; i++) {
    doors.value.push({
        imgSrc: "/img/custom-product/demo/custom-product-door-demo-1.jpg",
        name: "品牌/ASSA ABLOY",
        style: `YDM3109A-${i}`,
        title: `門扇款式-${i}`,
        price: 2000,
        // 特殊功能
        types: {
            // 防火功能
            category1: false,
        },
        id: `id${i}`,
        colors: [
            {
                id: "id1",
                text: "琥珀",
                imgSrc: "/img/product/demo/color-1.png",
                previewImgSrc: {
                    front: "/img/custom-product/demo/door/custom-product-door-black-close.png",
                    backend: "/img/custom-product/demo/door/custom-product-door-black-close.png",
                    half: "/img/custom-product/demo/door/custom-product-door-black-open.png",
                },
            },
            {
                id: "id2",
                text: "白色",
                imgSrc: "/img/product/demo/color-2.png",
                previewImgSrc: {
                    front: "/img/custom-product/demo/door/custom-product-door-white-close.png",
                    backend: "/img/custom-product/demo/door/custom-product-door-white-close.png",
                    half: "/img/custom-product/demo/door/custom-product-door-white-open.png",
                },
            },
            // {
            //     id: "id3",
            //     text: "黑色",
            //     imgSrc: "/img/product/demo/color-3.png",
            //     doors: doors.value,
            // },
        ],
    });
}
// 門框資料
const doorsOut = ref<any>([]);
// 門框假資料
for (let i = 1; i < 6; i++) {
    doorsOut.value.push({
        imgSrc: "/img/custom-product/demo/custom-product-door-out-demo-1.jpg",
        name: "品牌/ASSA ABLOY",
        style: `YDM3109A-${i}`,
        title: `門框款式-${i}`,
        price: 2000,
        id: `id${i}`,
        colors: [
            {
                id: "id1",
                text: "琥珀",
                imgSrc: "/img/product/demo/color-1.png",
                previewImgSrc: {
                    front: "/img/custom-product/demo/door-out/custom-product-door-out-black.png",
                    backend: "/img/custom-product/demo/door-out/custom-product-door-out-black.png",
                    half: "/img/custom-product/demo/door-out/custom-product-door-out-black.png",
                },
            },
            {
                id: "id2",
                text: "白色",
                imgSrc: "/img/product/demo/color-2.png",
                previewImgSrc: {
                    front: "/img/custom-product/demo/door-out/custom-product-door-out-white.png",
                    backend: "/img/custom-product/demo/door-out/custom-product-door-out-white.png",
                    half: "/img/custom-product/demo/door-out/custom-product-door-out-white.png",
                },
            },
            // {
            //     id: "id3",
            //     text: "黑色",
            //     imgSrc: "/img/product/demo/color-3.png",
            //     previewImgSrc: {
            //         front: "/img/custom-product/demo/door-out/custom-product-door-out-black.png",
            //         backend: "/img/custom-product/demo/door-out/custom-product-door-out-black.png",
            //         half: "/img/custom-product/demo/door-out/custom-product-door-out-black.png",
            //     },
            // },
        ],
    });
}

// 鎖的種類
const locks = ref<any>({
    handle: [],
    lock: [],
});

for (let i = 1; i < 20; i++) {
    if (i === 2) {
        locks.value.handle.push({
            imgSrc: "/img/custom-product/demo/custom-product-lock-demo-1.jpg",
            previewImgSrc: {
                front: "/img/custom-product/demo/handle/custom-product-handle-white-close.png",
                backend: "/img/custom-product/demo/handle/custom-product-handle-white-close.png",
                half: "/img/custom-product/demo/handle/custom-product-handle-white-open.png",
            },
            style: `default lock-${i}`,
            price: 1000 + i,
            id: `id${i}`,
        });
    } else {
        locks.value.handle.push({
            imgSrc: "/img/custom-product/demo/custom-product-lock-demo-1.jpg",
            previewImgSrc: {
                front: "/img/custom-product/demo/handle/custom-product-handle-black-close.png",
                backend: "/img/custom-product/demo/handle/custom-product-handle-black-close.png",
                half: "/img/custom-product/demo/handle/custom-product-handle-black-open.png",
            },
            style: `default lock-${i}`,
            price: 1000 + i,
            id: `id${i}`,
        });
    }
    locks.value.lock.push({
        imgSrc: "/img/custom-product/demo/custom-product-lock-demo-1.jpg",
        previewImgSrc: {
            front: "/img/custom-product/demo/lock/custom-product-lock-close.png",
            backend: "/img/custom-product/demo/lock/custom-product-lock-close.png",
            half: "/img/custom-product/demo/lock/custom-product-lock-open.png",
        },
        style: `smart lock-${i}`,
        price: 2000 + i,
        id: `id${i}`,
    });
}

// 尺寸
const doorSizes = ref<any>([]);

for (let i = 1; i < 5; i++) {
    doorSizes.value.push({
        id: `id${i}`,
        // 門高
        height: "200cm-215cm",
        // 門寬
        width: "100cm",
        // 門厚
        bold: "7cm",
    });
}

// 所有客製化需求預覽圖
const customPreviewData = computed(() => {
    return {
        // 門扇
        door: doors.value.find((item) => item.id === currentDoorId.value).colors.find((item) => item.id === currentDoorColorId.value).previewImgSrc,
        // 門把
        doorOut: doorsOut.value.find((item) => item.id === currentDoorOutId.value).colors.find((item) => item.id === currentDoorOutColorId.value).previewImgSrc,
        // 鎖
        lock: locks.value[lockCategory.value].find((item) => item.id === currentLock.value.id).previewImgSrc,
    };
});

// 總價
const total = computed(() => 650000);
// 訂金
const deposit = computed(() => total.value * 0.3);

const customProductHook = useCustomProdutHook();

const customProductList = ref<any>([]);

async function init(id: number) {
    await customProductHook.getCustomProductList(id);
    customProductList.value = customProductHook.customProductList.value;
    console.log("customProductList.value  =>", customProductList.value);
}

watch(
    () => currentBgData.value,
    async (val) => {
        await init(val.id);
    }
);

onMounted(() => {
    nextTick(() => {
        const bodyDom = document.querySelector("body");
        console.log("bodyDom =>", bodyDom);
        disableBodyScroll(bodyDom);
    });
});

onBeforeUnmount(() => {
    const bodyDom = document.querySelector("body");

    enableBodyScroll(bodyDom);
});
</script>
