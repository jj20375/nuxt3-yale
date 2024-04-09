<template>
    <el-dialog
        class="custom-dialog h-[600px]"
        close-on-click-modal
        lock-scroll
        show-close
        :width="600"
        center
        align-center
        append-to-body
        v-model="showDialog"
        :before-close="closeDialog"
    >
        <h2 class="text-gray-800 font-bold text-[24px] mb-4">商品詳情</h2>
        <div
            v-if="products.doorGroup"
            class="product-card p-5 border-gray-200 border-[1px] rounded-[8px]"
        >
            <h5 class="text-[18px] font-bold text-gray-800 mb-4">門扇</h5>
            <div class="flex flex-col gap-5 sm:flex-row">
                <div class="flex-1 order-2 sm:order-1">
                    <div class="grid gap-2 text-gray-700">
                        <!-- <div class="w-[80px]">場景</div> -->
                        <div class="w-[80px]">款式</div>
                        <!-- <div>{{ products.name }}</div> -->
                        <div class="flex flex-col gap-1">
                            <div>{{ products.doorGroup.door.title }}</div>
                            <div>{{ products.doorGroup.door.style }}</div>
                        </div>
                        <div class="w-[80px]">顏色</div>
                        <div>{{ products.doorGroup.door.color.text }}</div>
                        <div class="w-[80px]">尺寸</div>
                        <div class="flex flex-col gap-1">
                            <div>{{ products.doorGroup.size.name }}</div>
                        </div>
                    </div>
                </div>
                <NuxtImg
                    v-if="products.imgSrc"
                    class="w-[200px] aspect-square object-cover h-fit order-1 sm:order-2 mx-auto"
                    :src="products.imgSrc"
                />
            </div>
        </div>
        <div
            v-if="products.doorOut"
            class="product-card p-5 border-gray-200 border-[1px] rounded-[8px] mt-5"
        >
            <h5 class="text-[18px] font-bold text-gray-800 mb-4">門框</h5>
            <div class="flex flex-col gap-5 sm:flex-row">
                <div class="flex-1 order-2 sm:order-1">
                    <div class="grid gap-2 text-gray-700">
                        <!-- <div class="w-[80px]">場景</div> -->
                        <div class="w-[80px]">款式</div>
                        <!-- <div>{{ products.name }}</div> -->
                        <div class="flex flex-col gap-1">
                            <div>{{ products.doorOut.title }}</div>
                            <div>{{ products.doorOut.style }}</div>
                        </div>
                        <div class="w-[80px]">顏色</div>
                        <div>{{ products.doorOut.color.text }}</div>
                    </div>
                </div>
                <NuxtImg
                    v-if="products.doorOut.imgSrc"
                    class="w-[200px] aspect-square object-cover h-fit order-1 sm:order-2 mx-auto"
                    :src="products.doorOut.imgSrc"
                />
            </div>
        </div>
        <div
            v-if="products.lock"
            class="product-card p-5 border-gray-200 border-[1px] rounded-[8px] mt-5"
        >
            <h5 class="text-[18px] font-bold text-gray-800 mb-4">門鎖</h5>
            <div class="flex flex-col gap-5 sm:flex-row">
                <div class="flex-1 order-2 sm:order-1">
                    <div class="grid gap-2 text-gray-700">
                        <!-- <div class="w-[80px]">場景</div> -->
                        <div class="w-[80px]">款式</div>
                        <!-- <div>{{ products.name }}</div> -->
                        <div class="flex flex-col gap-1">
                            <div>{{ products.lock.title }}</div>
                            <div>{{ products.lock.style }}</div>
                        </div>
                        <div
                            v-if="products.lock.price > 0"
                            class="flex-1 w-[80px]"
                        >
                            加購
                        </div>
                        <div
                            v-if="products.lock.price > 0"
                            class="flex flex-col gap-1"
                        >
                            NT${{ $utils().formatCurrency(products.lock.price) }}
                        </div>
                    </div>
                </div>
                <NuxtImg
                    v-if="products.lock.imgSrc"
                    class="w-[200px] aspect-square object-cover h-fit order-1 sm:order-2 mx-auto"
                    :src="products.lock.imgSrc"
                />
            </div>
        </div>
        <div
            v-if="products.currentTool1"
            class="product-card p-5 border-gray-200 border-[1px] rounded-[8px] mt-5"
        >
            <h5 class="text-[18px] font-bold text-gray-800 mb-4">掛門</h5>
            <div class="flex flex-col gap-5 sm:flex-row">
                <div class="flex-1 order-2 sm:order-1">
                    <div class="grid gap-2 text-gray-700">
                        <!-- <div class="w-[80px]">場景</div> -->
                        <div class="w-[80px]">款式</div>
                        <!-- <div>{{ products.name }}</div> -->
                        <div class="flex flex-col gap-1">
                            <div>{{ products.currentTool1.title }}</div>
                            <div>{{ products.currentTool1.style }}</div>
                        </div>
                        <div
                            v-if="products.currentTool1.price > 0"
                            class="flex-1 w-[80px]"
                        >
                            加購
                        </div>
                        <div
                            v-if="products.currentTool1.price > 0"
                            class="flex flex-col gap-1"
                        >
                            NT${{ $utils().formatCurrency(products.currentTool1.price) }}
                        </div>
                    </div>
                </div>
                <NuxtImg
                    v-if="products.currentTool1.imgSrc"
                    class="w-[200px] aspect-square object-cover h-fit order-1 sm:order-2 mx-auto"
                    :src="products.currentTool1.imgSrc"
                />
            </div>
        </div>
        <div
            v-if="products.currentTool2"
            class="product-card p-5 border-gray-200 border-[1px] rounded-[8px] mt-5"
        >
            <h5 class="text-[18px] font-bold text-gray-800 mb-4">氣密條</h5>
            <div class="flex flex-col gap-5 sm:flex-row">
                <div class="flex-1 order-2 sm:order-1">
                    <div class="grid gap-2 text-gray-700">
                        <!-- <div class="w-[80px]">場景</div> -->
                        <div class="w-[80px]">款式</div>
                        <!-- <div>{{ products.name }}</div> -->
                        <div class="flex flex-col gap-1">
                            <div>{{ products.currentTool2.title }}</div>
                            <div>{{ products.currentTool2.style }}</div>
                        </div>
                        <div
                            v-if="products.currentTool2.price > 0"
                            class="flex-1 w-[80px]"
                        >
                            加購
                        </div>
                        <div
                            v-if="products.currentTool2.price > 0"
                            class="flex flex-col gap-1"
                        >
                            NT${{ $utils().formatCurrency(products.currentTool2.price) }}
                        </div>
                    </div>
                </div>
                <NuxtImg
                    v-if="products.currentTool2.imgSrc"
                    class="w-[200px] aspect-square object-cover h-fit order-1 sm:order-2 mx-auto"
                    :src="products.currentTool2.imgSrc"
                />
            </div>
        </div>
        <div
            v-if="products.currentOther1"
            class="product-card p-5 border-gray-200 border-[1px] rounded-[8px] mt-5"
        >
            <h5 class="text-[18px] font-bold text-gray-800 mb-4">下降壓條</h5>
            <div class="flex flex-col gap-5 sm:flex-row">
                <div class="flex-1 order-2 sm:order-1">
                    <div class="grid gap-2 text-gray-700">
                        <!-- <div class="w-[80px]">場景</div> -->
                        <div class="w-[80px]">款式</div>
                        <!-- <div>{{ products.name }}</div> -->
                        <div class="flex flex-col gap-1">
                            <div>{{ products.currentOther1.datas[0].name }}</div>
                            <div>{{ products.currentOther1.datas[0].style }}</div>
                        </div>
                        <div
                            v-if="products.currentOther1.datas[0].price > 0"
                            class="flex-1 w-[80px]"
                        >
                            加購
                        </div>
                        <div
                            v-if="products.currentOther1.datas[0].price > 0"
                            class="flex flex-col gap-1"
                        >
                            NT${{ $utils().formatCurrency(products.currentOther1.datas[0].price) }}
                        </div>
                    </div>
                </div>
                <NuxtImg
                    v-if="products.currentOther1.datas[0].imgSrc"
                    class="w-[200px] aspect-square object-cover h-fit order-1 sm:order-2 mx-auto"
                    :src="products.currentOther1.datas[0].imgSrc"
                />
            </div>
        </div>
        <div
            v-if="products.currentOther2"
            class="product-card p-5 border-gray-200 border-[1px] rounded-[8px] mt-5"
        >
            <h5 class="text-[18px] font-bold text-gray-800 mb-4">門弓器</h5>
            <div class="flex flex-col gap-5 sm:flex-row">
                <div class="flex-1 order-2 sm:order-1">
                    <div class="grid gap-2 text-gray-700">
                        <!-- <div class="w-[80px]">場景</div> -->
                        <div class="w-[80px]">款式</div>
                        <!-- <div>{{ products.name }}</div> -->
                        <div class="flex flex-col gap-1">
                            <div>{{ products.currentOther2.datas[0].name }}</div>
                            <div>{{ products.currentOther2.datas[0].style }}</div>
                        </div>
                        <div
                            v-if="products.currentOther2.datas[0].price > 0"
                            class="flex-1 w-[80px]"
                        >
                            加購
                        </div>
                        <div
                            v-if="products.currentOther2.datas[0].price > 0"
                            class="flex flex-col gap-1"
                        >
                            NT${{ $utils().formatCurrency(products.currentOther2.datas[0].price) }}
                        </div>
                    </div>
                </div>
                <NuxtImg
                    v-if="products.currentOther2.datas[0].imgSrc"
                    class="w-[200px] aspect-square object-cover h-fit order-1 sm:order-2 mx-auto"
                    :src="products.currentOther2.datas[0].imgSrc"
                />
            </div>
        </div>
        <div
            v-if="products.currentOther3"
            class="product-card p-5 border-gray-200 border-[1px] rounded-[8px] mt-5"
        >
            <h5 class="text-[18px] font-bold text-gray-800 mb-4">輔助鎖</h5>
            <div class="flex flex-col gap-5 sm:flex-row">
                <div class="flex-1 order-2 sm:order-1">
                    <div class="grid gap-2 text-gray-700">
                        <!-- <div class="w-[80px]">場景</div> -->
                        <div class="w-[80px]">款式</div>
                        <!-- <div>{{ products.name }}</div> -->
                        <div class="flex flex-col gap-1">
                            <div>{{ products.currentOther3.datas[0].name }}</div>
                            <div>{{ products.currentOther3.datas[0].style }}</div>
                        </div>
                        <div
                            v-if="products.currentOther3.datas[0].price > 0"
                            class="flex-1 w-[80px]"
                        >
                            加購
                        </div>
                        <div
                            v-if="products.currentOther3.datas[0].price > 0"
                            class="flex flex-col gap-1"
                        >
                            NT${{ $utils().formatCurrency(products.currentOther3.datas[0].price) }}
                        </div>
                    </div>
                </div>
                <NuxtImg
                    v-if="products.currentOther3.datas[0].imgSrc"
                    class="w-[200px] aspect-square object-cover h-fit order-1 sm:order-2 mx-auto"
                    :src="products.currentOther3.datas[0].imgSrc"
                />
            </div>
        </div>
        <div
            v-if="products.otherServices"
            class="p-5 mt-5 product-card"
        >
            <h5 class="text-[18px] font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">額外施作服務</h5>
            <ul>
                <li
                    v-for="(data, index) in products.otherServices.datas"
                    :key="index"
                    class="list-disc list-inside"
                >
                    <strong class="font-bold">{{ data.name }}</strong>
                    <span class="ml-5">NT${{ $utils().formatCurrency(data.price) }}</span>
                </li>
            </ul>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
defineExpose({
    openDialog,
});

const props = defineProps({
    products: {
        type: Object,
        default() {
            return {};
        },
    },
});

const { $utils } = useNuxtApp();

const showDialog = ref(false);

function openDialog() {
    showDialog.value = true;
}

function closeDialog() {
    showDialog.value = false;
}
</script>

<style lang="scss" scoped>
.product-card {
    .grid {
        grid-template-columns: 100px 1fr;
    }
}
</style>
