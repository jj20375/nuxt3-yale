<template>
    <section
        class="relative mt-[86px] overflow-auto z-[10]"
        style="height: calc(var(--vh, 1vh) * 100 - 80px - 87px)"
    >
        <!-- <pre>{{ scenes }}</pre> -->
        <!-- <pre>{{ doors }}</pre> -->
        <!-- <pre>{{ doorSizes }}</pre> -->
        <!-- {{ !$utils().isEmpty(customPreviewData) }} -->
        <!-- {{ currentBgData }} -->
        <div class="custom-wrap">
            <CustomProductPrewView
                v-model:currentAngle="currentAngle"
                v-model:previewWidth="previewWidth"
                v-model:currentBgData="currentBgData"
                :productData="customPreviewData"
                class="left"
            />
            <div
                v-if="!$utils().isEmpty(customPreviewData)"
                class="right"
            >
                <CustomProductContent />
                <div class="border-b border-gray-300">
                    <div
                        @click="stepMenuShow['step1'].show = !stepMenuShow['step1'].show"
                        class="flex items-center mb-[30px] mt-[40px] cursor-pointer"
                        type="button"
                    >
                        <h3 class="flex-1 text-gray-800 text-[20px] font-medium YaleSolisW-Bd">{{ stepMenuShow["step1"].text }}</h3>
                        <font-awesome-icon
                            class="transition-all duration-300"
                            :class="!stepMenuShow['step1'].show ? 'rotate-180' : ''"
                            :icon="['fas', 'chevron-up']"
                        />
                    </div>
                    <div v-show="stepMenuShow['step1'].show">
                        <CustomProductBackground
                            v-model:currentBgId="currentBgId"
                            v-model:currentBgData="currentBgData"
                            :tabs="scenes"
                        />
                        <CustomProductPlan
                            class="mt-[30px]"
                            v-model:currentPlan="currentPlan"
                        />
                        <CustomProduct
                            class="mt-[30px]"
                            v-model:currentProductId="currentDoorId"
                            v-model:currentProductData="currentDoorData"
                            v-model:currentDoorColorId="currentDoorColorId"
                            v-model:currentDoorSizeId="currentDoorSizeId"
                            :products="doors"
                        />
                        <CustomProductColor
                            class="mt-[30px]"
                            v-model:currentColorId="currentDoorColorId"
                            v-model:currentColorData="currentDoorColorData"
                            :colors="doorColors"
                        />
                        <CustomProductSize
                            class="mt-[30px] mb-[30px]"
                            :sizes="doorSizes"
                            v-model:currentSizeId="currentDoorSizeId"
                            v-model:currentSizeData="currentDoorSizeData"
                        />
                    </div>
                </div>
                <div class="border-b border-gray-300">
                    <div
                        @click="stepMenuShow['step2'].show = !stepMenuShow['step2'].show"
                        class="flex items-center mb-[30px] mt-[30px] cursor-pointer"
                        type="button"
                    >
                        <h3 class="flex-1 text-gray-800 text-[20px] font-medium YaleSolisW-Bd">{{ stepMenuShow["step2"].text }}</h3>
                        <font-awesome-icon
                            class="transition-all duration-300"
                            :class="!stepMenuShow['step2'].show ? 'rotate-180' : ''"
                            :icon="['fas', 'chevron-up']"
                        />
                    </div>
                    <div v-show="stepMenuShow['step2'].show">
                        <CustomProduct
                            class="mt-[30px] mb-[30px]"
                            v-model:currentProductId="currentDoorOutId"
                            v-model:currentProductData="currentDoorOutData"
                            v-model:currentDoorColorId="currentDoorOutColorId"
                            :products="doorsOut"
                        />
                        <CustomProductColor
                            class="mt-[30px] mb-[30px]"
                            v-model:currentColorId="currentDoorOutColorId"
                            v-model:currentColorData="currentDoorOutColorData"
                            :colors="doorOutColors"
                        />
                    </div>
                </div>
                <div class="border-b border-gray-300">
                    <div
                        @click="stepMenuShow['step3'].show = !stepMenuShow['step3'].show"
                        class="flex items-center mb-[30px] mt-[30px] cursor-pointer"
                        type="button"
                    >
                        <h3 class="flex-1 text-gray-800 text-[20px] font-medium YaleSolisW-Bd">{{ stepMenuShow["step3"].text }}</h3>
                        <font-awesome-icon
                            class="transition-all duration-300"
                            :class="!stepMenuShow['step3'].show ? 'rotate-180' : ''"
                            :icon="['fas', 'chevron-up']"
                        />
                    </div>
                    <CustomProductLock
                        v-show="stepMenuShow['step3'].show"
                        v-model:lockCategory="lockCategory"
                        v-model:currentLock="currentLock"
                        v-model:currentLockId="currentLockId"
                        :locks="locks"
                    />
                </div>
                <div class="border-b border-gray-300">
                    <div
                        @click="stepMenuShow['step4'].show = !stepMenuShow['step4'].show"
                        class="flex items-center mb-[30px] mt-[30px] cursor-pointer"
                        type="button"
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
                            class="mt-[30px] mb-[30px]"
                            title="掛門"
                            v-model:currentProductId="currentTool1Id"
                            v-model:currentProductData="currentTool1Data"
                            :isTool="true"
                            :products="tool1Datas"
                        />
                        <CustomProduct
                            class="mt-[30px] mb-[30px]"
                            title="氣密條"
                            v-model:currentProductId="currentTool2Id"
                            v-model:currentProductData="currentTool2Data"
                            :isTool="true"
                            :products="tool2Datas"
                        />
                    </div>
                </div>
                <div class="border-b border-gray-300">
                    <div
                        @click="stepMenuShow['step5'].show = !stepMenuShow['step5'].show"
                        class="flex items-center mb-[30px] mt-[30px] cursor-pointer"
                        type="button"
                    >
                        <h3 class="flex-1 text-gray-800 text-[20px] font-medium YaleSolisW-Bd">{{ stepMenuShow["step5"].text }}</h3>
                        <font-awesome-icon
                            class="transition-all duration-300"
                            :class="!stepMenuShow['step5'].show ? 'rotate-180' : ''"
                            :icon="['fas', 'chevron-up']"
                        />
                    </div>
                    <div v-show="stepMenuShow['step5'].show">
                        <CustomProductOtherChoose
                            class="mt-[30px]"
                            title="下降壓條"
                            v-model:selectedProductIds="currentOther1Ids"
                            v-model:selectedProducts="currentOther1Datas"
                            :products="other1Datas"
                        />
                        <CustomProductOtherChoose
                            class="mt-[20px] mb-[16px]"
                            title="門弓器"
                            v-model:selectedProductIds="currentOther2Ids"
                            v-model:selectedProducts="currentOther2Datas"
                            :products="other2Datas"
                        />
                    </div>
                </div>
                <div class="border-b border-gray-300">
                    <div
                        @click="stepMenuShow['step6'].show = !stepMenuShow['step6'].show"
                        class="flex items-center mb-[30px] mt-[30px] cursor-pointer"
                        type="button"
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
                        v-model:limit="doorLimit"
                        class="mb-[30px]"
                    />
                </div>
                <div class="border-b border-gray-300">
                    <div
                        @click="stepMenuShow['step7'].show = !stepMenuShow['step7'].show"
                        class="flex items-center mb-[30px] mt-[30px] cursor-pointer"
                        type="button"
                    >
                        <h3 class="flex-1 text-gray-800 text-[20px] font-medium YaleSolisW-Bd">{{ stepMenuShow["step7"].text }}</h3>
                        <font-awesome-icon
                            class="transition-all duration-300"
                            :class="!stepMenuShow['step7'].show ? 'rotate-180' : ''"
                            :icon="['fas', 'chevron-up']"
                        />
                    </div>

                    <CustomProductOtherService
                        v-show="stepMenuShow['step7'].show"
                        v-model:selectedServiceIds="currentServiceIds"
                        v-model:selectedServiceDatas="currentServiceDatas"
                        :services="serviceDatas"
                        class="mb-[30px]"
                    />
                </div>
                <div class="my-[30px] flex gap-4">
                    <button
                        @click.prevent="openShoppingCarDialog"
                        class="flex-1 transparent-btn"
                    >
                        加入購物車
                    </button>
                    <button
                        @click.prevent="goToBill"
                        class="flex-1 yellow-btn"
                    >
                        結帳
                    </button>
                </div>
            </div>
        </div>
        <div class="fixed top-headerMb xl:bottom-0 w-full bg-white z-[100] h-[80px] shadow-footer sidebar-wrap">
            <div class="flex items-center justify-center">
                <ul
                    v-if="previewWidth > 0"
                    class="h-fit flex gap-[12px] justify-center"
                >
                    <li
                        @click="currentAngle = angle.value"
                        class="rounded-full px-[20px] py-[8px] text-white cursor-pointer"
                        :class="[currentAngle === angle.value ? 'bg-gray-800' : 'bg-gray-350']"
                        v-for="(angle, index) in viewAngle"
                        :key="angle.value"
                    >
                        {{ angle.text }}
                    </li>
                </ul>
            </div>
            <div class="flex items-center justify-start gap-4">
                <div class="flex items-center">
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
import { ElMessage } from "element-plus";
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

const { $api, $utils, $shoppingCarService } = useNuxtApp();
const loading = ref(false);

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
const currentDoorId = ref("");
// 預設選擇門扇資料
const currentDoorData = ref<any>({});
// 預設選擇門扇顏色 id
const currentDoorColorId = ref("");
// 預設選擇門扇顏色資料
const currentDoorColorData = ref<any>({});
// 預設選擇尺寸 id
const currentDoorSizeId = ref("");
// 預設選擇尺寸資料
const currentDoorSizeData = ref<any>({});
// 預設選擇門框 id
const currentDoorOutId = ref("");
// 預設選擇門框資料
const currentDoorOutData = ref<any>({});
// 預設選擇門框顏色 id
const currentDoorOutColorId = ref("");
// 預設選擇門框顏色資料
const currentDoorOutColorData = ref<any>({});
// 選擇基本五金 掛門 id值
const currentTool1Id = ref("");
// 選擇基本五金 掛門資料
const currentTool1Data = ref<any>({});
// 選擇基本五金 氣密條 id值
const currentTool2Id = ref("");
// 選擇基本五金 氣密條資料
const currentTool2Data = ref<any>({});
// 選擇選配區 下將壓條 ids
const currentOther1Ids = ref([""]);
// 選擇選配區 下將壓條資料
const currentOther1Datas = ref<any>([]);
// 選擇選配區 門弓器 ids
const currentOther2Ids = ref([""]);
// 選擇選配區 門弓器資料
const currentOther2Datas = ref<any>([]);
// 選擇得服務 ids
const currentServiceIds = ref<any>([]);
// 選擇得服務資料
const currentServiceDatas = ref<any>([]);
// 預設選擇鎖種類 default = 水平把手; smartLock = 智慧電子鎖
const lockCategory = ref("handle");
// 訂購數量
const count = ref(1);
// 預設選擇鎖樣式
const currentLockId = ref({});
// 預設選擇鎖樣式
const currentLock = ref({});
// 門扇資料
const doors = ref<any>([]);
// 門框資料
const doorsOut = ref<any>([]);
// 基本五金-掛門資料
const tool1Datas = ref<any>([]);
// 基本五金-氣密條資料
const tool2Datas = ref<any>([]);
// 選配五金-下將壓條
const other1Datas = ref<any>([]);
// 選配五金-門弓器
const other2Datas = ref<any>([]);
// 施作服務資料
const serviceDatas = ref<any>([]);

const showSoppingCarDialog = ref(false);

/**
 * 前往結賬
 */
function goToBill() {
    addToShoppingCar();
    router.push({ name: "shopping-car-slug", params: { slug: "耶魯電子鎖購物車" }, query: { tab: "type2" } });
}

// 門扇顏色
const doorColors = computed(() => {
    let currentDoor = doors.value.find((item) => item.id === currentDoorId.value);
    if (currentDoor !== undefined) {
        return currentDoor.colors;
    }
    return [];
});

// 尺寸
const doorSizes = computed(() => {
    let currentDoor = doors.value.find((item) => item.id === currentDoorId.value);
    if (currentDoor !== undefined) {
        return currentDoor.sizes;
    }
    return [];
});

// 門框顏色
const doorOutColors = computed(() => {
    let currentDoorOut = doorsOut.value.find((item) => item.id === currentDoorOutId.value);
    if (currentDoorOut !== undefined) {
        return currentDoorOut.colors;
    }
    return [];
});

// 鎖的種類
const locks = ref<any>({
    handle: [],
    lock: [],
});

// 所有客製化需求預覽圖
const customPreviewData = computed(() => {
    if ($utils().isEmpty(currentDoorId.value)) {
        return {};
    }
    return {
        // 門扇
        door: doors.value.find((item: any) => item.id === currentDoorId.value).previewImgSrc[`option-${currentDoorColorId.value}-${currentDoorSizeId.value}`],
        // 門把
        doorOut: doorsOut.value.find((item: any) => item.id === currentDoorOutId.value).previewImgSrc[`option-${currentDoorOutColorId.value}`],
        // 鎖
        lock: locks.value[lockCategory.value].find((item: any) => item.id === currentLock.value.id).previewImgSrc,
    };
});

async function openShoppingCarDialog() {
    showSoppingCarDialog.value = true;
    await addToShoppingCar();
}

/**
 * 加入購物車
 */
async function addToShoppingCar() {
    const data = {
        id: uuidv4(),
        name: currentBgData.value.text,
        imgSrc: currentDoorData.value.imgSrc,
        count: count.value,

        doorGroup: {
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
        lock: { label: "門鎖", ...currentLock.value },
        currentTool1: { label: "掛門", ...currentTool1Data.value },
        currentTool2: { label: "氣密條", ...currentTool2Data.value },
    };

    let doorPrice = 0;
    if (!$utils().isEmpty(currentDoorColorId.value) && !$utils().isEmpty(currentDoorSizeId.value)) {
        doorPrice = currentDoorData.value.price[`option-${currentDoorColorId.value}-${currentDoorSizeId.value}`];
        data.doorGroup["optionId"] = currentDoorData.value.optionId[`option-${currentDoorColorId.value}-${currentDoorSizeId.value}`];
    }

    let doorOutPrice = 0;

    if (!$utils().isEmpty(currentDoorOutColorId.value)) {
        doorOutPrice = currentDoorOutData.value.price[`option-${currentDoorOutColorId.value}`];
        data.doorOut["optionId"] = currentDoorOutData.value.optionId[`option-${currentDoorOutColorId.value}`];
    }

    let price = doorPrice + doorOutPrice + currentTool1Data.value.price + currentTool2Data.value.price;

    // 判斷是否有選擇 選擇基本五金 下將壓條
    if (!$utils().isEmpty(currentOther1Datas.value)) {
        data["currentOther1"] = { label: "下降壓條", datas: currentOther1Datas.value };
        let other1Price = 0;
        other1Price = _SumBy(other1Datas.value, (item: any) => {
            if (currentOther1Ids.value.includes(item.id)) {
                return item.price;
            }
        });
        price = price + other1Price;
    }
    // 判斷是否有選擇 選擇基本五金 門弓器
    if (!$utils().isEmpty(currentOther2Datas.value)) {
        data["currentOther2"] = { label: "門弓器", datas: currentOther2Datas.value };
        let other2Price = 0;
        other2Price = _SumBy(other2Datas.value, (item: any) => {
            if (currentOther2Ids.value.includes(item.id)) {
                return item.price;
            }
        });
        price = price + other2Price;
    }
    // 判斷是否有選擇 施作服務
    if (!$utils().isEmpty(currentServiceDatas.value)) {
        data["otherServices"] = { label: "額外施作服務", datas: currentServiceDatas.value };
        let servicePrice = 0;
        servicePrice = _SumBy(serviceDatas.value, (item: any) => {
            if (currentServiceIds.value.includes(item.id)) {
                return item.price;
            }
        });
        price = price + servicePrice;
    }
    data["price"] = price * count.value;
    data["singlePrice"] = price;
    data["doorLimit"] = doorLimit.value;

    try {
        await addToCustomCarAPI(data);
        if (process.client) {
            // 加入 訂製門扇購物車
            $shoppingCarService().addCustomProductToShoppingCar(data);
        }
    } catch (err) {
        console.log("addToCustomCarAPI => ", err);
    }
    // await addToCustomCarAPI(data);
    // if (process.client) {
    //     // 加入 訂製門扇購物車
    //     $shoppingCarService().addCustomProductToShoppingCar(data);
    // }
}

/**
 * 加入訂製門扇 api
 */
async function addToCustomCarAPI(data: any) {
    loading.value = true;
    const setCustomCarDatas: any = {
        items: [],
        quantity: count.value,
    };
    setCustomCarDatas.items.push({
        productable_id: data.doorGroup.door.id,
        product_variationable_id: data.doorGroup.optionId,
        quantity: count.value,
    });
    setCustomCarDatas.items.push({
        productable_id: data.doorOut.id,
        product_variationable_id: data.doorOut.optionId,
        quantity: count.value,
    });
    setCustomCarDatas.items.push({
        productable_id: data.lock.id,
        quantity: count.value,
    });
    setCustomCarDatas.items.push({
        productable_id: data.currentTool1.id,
        quantity: count.value,
    });
    setCustomCarDatas.items.push({
        productable_id: data.currentTool2.id,
        quantity: count.value,
    });
    if (!$utils().isEmpty(data["currentOther1"])) {
        currentOther1Datas.value.forEach((item: any) => {
            setCustomCarDatas.items.push({
                productable_id: item.id,
                quantity: count.value,
            });
        });
    }
    if (!$utils().isEmpty(data["currentOther2"])) {
        currentOther2Datas.value.forEach((item: any) => {
            setCustomCarDatas.items.push({
                productable_id: item.id,
                quantity: count.value,
            });
        });
    }
    if (!$utils().isEmpty(data["otherServices"])) {
        currentServiceDatas.value.forEach((item: any) => {
            setCustomCarDatas.items.push({
                productable_id: item.id,
                quantity: count.value,
            });
        });
    }
    console.log("setCustomCarDatas =>", setCustomCarDatas);
    try {
        await $api().AddToCustomCarAPI(setCustomCarDatas);
        return true;
    } catch (err) {
        console.log("addToCustomCarAPI 2 err => ", err);
        ElMessage({
            type: "error",
            message: "加入購物車失敗",
        });
        return false;
    } finally {
        loading.value = false;
    }
}

// 總價
const total = computed(() => {
    let doorPrice = 0;
    if (!$utils().isEmpty(currentDoorColorId.value) && !$utils().isEmpty(currentDoorSizeId.value)) {
        doorPrice = currentDoorData.value.price[`option-${currentDoorColorId.value}-${currentDoorSizeId.value}`];
    }
    let doorOutPrice = 0;

    if (!$utils().isEmpty(currentDoorOutColorId.value)) {
        doorOutPrice = currentDoorOutData.value.price[`option-${currentDoorOutColorId.value}`];
    }
    const lockPrice = currentLock.value.price;
    const tool1Price = currentTool1Data.value.price;
    const tool2Price = currentTool2Data.value.price;

    let other1Price = 0;
    if (currentOther1Ids.value.length > 0) {
        other1Price = _SumBy(other1Datas.value, (item: any) => {
            if (currentOther1Ids.value.includes(item.id)) {
                return item.price;
            }
        });
    }
    let other2Price = 0;
    if (currentOther2Ids.value.length > 0) {
        other2Price = _SumBy(other2Datas.value, (item: any) => {
            if (currentOther2Ids.value.includes(item.id)) {
                return item.price;
            }
        });
    }
    let servicePrice = 0;
    if (currentServiceIds.value.length > 0) {
        servicePrice = _SumBy(serviceDatas.value, (item: any) => {
            if (currentServiceIds.value.includes(item.id)) {
                return item.price;
            }
        });
    }

    return (doorPrice + doorOutPrice + lockPrice + tool1Price + tool2Price + other1Price + other2Price + servicePrice) * count.value;
});
// 訂金
const deposit = computed(() => total.value * 0.3);

// 選擇商品 庫存最少數量上限
const doorLimit = computed(() => {
    let doorStock = 0;
    if (!$utils().isEmpty(currentDoorColorId.value) && !$utils().isEmpty(currentDoorSizeId.value)) {
        doorStock = currentDoorData.value.stock[`option-${currentDoorColorId.value}-${currentDoorSizeId.value}`];
    }

    let doorOutStock = 0;
    if (!$utils().isEmpty(currentDoorOutColorId.value)) {
        doorOutStock = currentDoorOutData.value.stock[`option-${currentDoorOutColorId.value}`];
    }
    const lockStock = currentLock.value.stock;
    const tool1Stock = currentTool1Data.value.stock;
    const tool2Stock = currentTool2Data.value.stock;

    let other1Stock = null;
    if (currentOther1Ids.value.length > 0) {
        other1Stock = _MinBy(other1Datas.value, (item: any) => {
            if (currentOther1Ids.value.includes(item.id)) {
                return item.stock;
            }
        }).stock;
    }
    let other2Stock = null;
    if (currentOther2Ids.value.length > 0) {
        other2Stock = _MinBy(other2Datas.value, (item: any) => {
            if (currentOther2Ids.value.includes(item.id)) {
                return item.stock;
            }
        }).stock;
    }

    const stocks = [doorStock, doorOutStock, lockStock, tool1Stock, tool2Stock, other1Stock, other2Stock];
    return _Min(stocks);
});

const { getCustomProductList, customProductList, getCustomProductSceneList, scenes } = useCustomProdutHook();

async function init(id: number) {
    // 取得場景
    await getCustomProductSceneList();
    currentBgId.value = scenes.value[0].id;
    // 取得訂製門扇商品
    await getCustomProductList(id);
    doors.value = customProductList.value.doors;
    doorsOut.value = customProductList.value.doorsOut;
    locks.value = {
        handle: customProductList.value.handles,
        lock: customProductList.value.locks,
    };
    tool1Datas.value = customProductList.value.tool1Datas;
    tool2Datas.value = customProductList.value.tool2Datas;
    other1Datas.value = customProductList.value.other1Datas;
    other2Datas.value = customProductList.value.other2Datas;
    serviceDatas.value = customProductList.value.serviceDatas;
    if (doors.value && doors.value[0]) {
        lockCategory.value = "handle";
        currentDoorId.value = doors.value[0].id;
        currentDoorData.value = doors.value[0];
        currentDoorColorId.value = doors.value[0].colors[0].id;
        currentDoorSizeId.value = doors.value[0].sizes[0].id;
        currentDoorOutId.value = doorsOut.value[0].id;
        currentDoorOutData.value = doorsOut.value[0];
        currentDoorOutColorId.value = doorsOut.value[0].colors[0].id;
        currentLockId.value = locks.value.handle[0].id;
        currentLock.value = {
            id: locks.value.handle[0].id,
            style: locks.value.handle[0].style,
            price: locks.value.handle[0].price,
            detailData: locks.value.handle[0].detailData,
            name: locks.value.handle[0].name,
            shape: locks.value.handle[0].shape,
            stock: locks.value.handle[0].stock,
            model: locks.value.handle[0].model,
        };
        currentTool1Id.value = tool1Datas.value[0].id;
        currentTool1Data.value = tool1Datas.value[0];
        currentTool2Id.value = tool2Datas.value[0].id;
        currentTool2Data.value = tool2Datas.value[0];
        currentOther1Ids.value = [];
        currentOther2Ids.value = [];
        currentServiceIds.value = [];

        console.log("init currentLock.value => ", currentLock.value);
    }
}

// await init();

await init(1);

watch(
    () => currentBgId.value,
    async (val) => {
        console.log("val currentBgId =>", val);
        await init(val);
    }
);

watch(
    () => currentDoorId.value,
    (val) => {
        currentDoorColorId.value = doors.value.find((item: any) => item.id === val).colors[0].id;
        currentDoorSizeId.value = doors.value.find((item: any) => item.id === val).sizes[0].id;
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

<style lang="scss" scoped>
.custom-wrap {
    @apply relative block xl:grid min-h-screen;
    grid-template: 1fr/4fr minmax(430px, 1fr);
    grid-gap: 0 55px;
    padding-inline-end: 55px;
    @media screen and (max-width: 1280px) {
        grid-gap: 0;
        padding-inline-start: 1.5rem;
        padding-inline-end: 1.5rem;
    }
    .left {
        @apply sticky top-0 overflow-hidden;
        max-height: calc(var(--vh, 1vh) * 100 - 80px - 87px);
    }
    .right {
        @apply relative overflow-visible py-12;
    }
}

.sidebar-wrap {
    @apply grid;
    grid-template: 1fr/4fr minmax(430px, 1fr);
    grid-gap: 0 55px;
    padding-inline-end: 55px;
}
</style>
