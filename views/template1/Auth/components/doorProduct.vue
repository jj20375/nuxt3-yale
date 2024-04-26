<template>
    <div
        v-for="(product, index) in order"
        :key="index"
        class="flex product-card border-gray-200 gap-4 sm:gap-9 py-[30px]"
    >
        <NuxtImg
            v-if="product.imgSrc"
            class="w-[100px] sm:w-[180px] aspect-square object-cover h-fit"
            :src="product.imgSrc"
        />
        <div class="flex-1">
            <h5 class="text-[18px] font-bold mb-4 YaleSolisW-Bd">{{ product.custom_scene }}</h5>
            <template v-if="isDoor && isMobile">
                <div class="flex items-center justify-end gap-2 mb-8 cursor-pointer h-fit">
                    <NuxtImg
                        class="w-[20px] aspect-square object-cover"
                        src="img/icons/auth/info.svg"
                    />
                    <div
                        class="underline underline-offset-2"
                        @click="handleDetail(index)"
                    >
                        查看商品詳情
                    </div>
                </div>
            </template>
            <div class="flex flex-col">
                <template
                    v-for="(item, key) in order[index]"
                    :key="key"
                >
                    <div class="grid grid-cols-2 gap-4 text-gray-700">
                        <div class="mt-2" v-if="item && item.label">{{ item.label }}</div>
                        <div class="mt-2" v-if="key === 'doorGroup'">
                            <div v-for="(item3, index3) in item">
                                <div v-if="index3 === 'types'">
                                    <div v-for="(item4, index4) in item3">
                                        <div>{{ item4.label }}</div>
                                        <div>{{ item4.value ? "是" : "否" }}</div>
                                    </div>
                                </div>
                                <div
                                    v-if="index3 === 'size'"
                                    class="flex"
                                >
                                    <div class="whitespace-nowrap">{{ item3.label }}:</div>
                                    <div class="flex flex-col gap-1">
                                        <div>{{ item3.name }}</div>
                                    </div>
                                </div>
                                <div v-if="index3 === 'door'">
                                    <!-- <div class="whitespace-nowrap">門扇</div> -->
                                    <div class="flex flex-col gap-1">
                                        <div>{{ item3.title }}</div>
                                        <div>{{ item3.style }}</div>
                                        <div>{{ item3.color.text }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-2" v-if="key === 'doorOut'">
                            <div class="flex flex-col gap-1">
                                <div>{{ item.title }}</div>
                                <div>{{ item.style }}</div>
                                <div>{{ item.color.text }}</div>
                            </div>
                        </div>
                        <div class="mt-2" v-if="key === 'lock'">
                            <div class="flex flex-col gap-1">
                                <div>{{ item.name }}</div>
                                <div>{{ item.model }}</div>
                            </div>
                        </div>
                        <div class="mt-2" v-if="item && ['currentTool1', 'currentTool2'].includes(key)">{{ item.title }}-{{ item.style }}</div>
                        <div class="mt-2" v-if="item && ['currentOther1', 'currentOther2', 'currentOther3', 'otherServices'].includes(key)">
                            <ul
                                v-if="item"
                                class="ml-2"
                            >
                                <li
                                    v-for="(item2, index2) in item.datas"
                                    :class="!['currentOther1', 'currentOther2', 'currentOther3'].includes(key) ? 'list-disc' : '-ml-2'"
                                    class="list-inside"
                                >
                                    {{ item2.name }}<span v-if="!['otherServices'].includes(key)">-</span>
                                    <span v-if="key !== 'otherServices'">{{ item2.style }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </template>
                <div class="mt-2 grid grid-cols-2 gap-4 text-gray-700">
                    <div>數量</div>
                    <div>{{ product.count }}</div>
                </div>
                <div v-if="product.rule">
                    <div
                        class="inline-block text-gray-500 text-sm px-3 py-1 border-[1px] border-gray-500"
                        v-if="product.rule.needPrice"
                    >
                        NT${{ $utils().formatCurrency(product.rule.needPrice) }}滿額贈
                    </div>
                    <div
                        class="inline-block text-gray-500 text-sm px-3 py-1 border-[1px] border-gray-500"
                        v-if="product.rule.getFree === true"
                    >
                        加價購
                    </div>
                </div>
            </div>
        </div>
        <div
            v-if="isDoor && !isMobile"
            class="flex items-center gap-2 cursor-pointer h-fit"
        >
            <NuxtImg
                class="w-[20px] aspect-square object-cover"
                src="img/icons/auth/info.svg"
            />
            <div
                class="underline underline-offset-2"
                @click="handleDetail(index)"
            >
                查看商品詳情
            </div>
        </div>
        <client-only>
            <ProductDialog
                ref="shoppingCarCustomProductDetailRefDom"
                :products="dialogData"
            />
        </client-only>
    </div>
</template>
<script setup lang="ts">
import ProductDialog from "~/views/template1/ShoppingCar/components/ShoppingCarCustomProductDetail.vue";
const { isMobile } = useWindowResize();
const { $utils } = useNuxtApp();

interface Props {
    isDoor: boolean; // 是否為訂製門扇頁面
    order: {
        name: string;
        color: string;
        doorLeaf: string[];
        doorFrame: string[];
        doorLock: string[];
        doorHanging: string[];
        doorSealStrip: string;
        doorGasket: string[];
        doorOperator: string[];
        otherService: string[];
        quantity: number;
        rule: {
            needPrice: number;
            getFree: boolean;
        };
    }[];
    dialogData: {
        title: string;
        imgUrl: string;
        data: any;
        type: string;
    };
}

const props = withDefaults(defineProps<Props>(), {
    isDoor: false,
    order: [
        {
            name: "",
            color: "",
            doorLeaf: [],
            doorFrame: [],
            doorLock: [],
            doorHanging: [],
            doorSealStrip: "",
            doorGasket: [],
            doorOperator: [],
            otherService: [],
            quantity: 1,
            price: 0,
            rule: {
                needPrice: NaN, // 滿額贈
                getFree: false, // 加價購
            },
        },
    ],
    dialogData: {
        title: "",
        imgUrl: "",
        data: "",
        type: "",
    },
});

// 欄位及變數名稱
const columns = [
    { label: "單價", prop: "price" },
    { label: "規格", prop: "color" },
    { label: "門扇", prop: "doorLeaf", type: "array" },
    { label: "門框", prop: "doorFrame", type: "array" },
    { label: "門鎖", prop: "doorLock", type: "array" },
    { label: "掛門", prop: "doorHanging", type: "array" },
    { label: "氣密條", prop: "doorSealStrip" },
    { label: "下降壓條", prop: "doorGasket", type: "array" },
    { label: "門弓器", prop: "doorOperator", type: "array" },
    { label: "額外施作服務", prop: "otherService", type: "array" },
    { label: "數量", prop: "quantity" },
];

// 商品詳情彈窗
const shoppingCarCustomProductDetailRefDom = ref<any>(null);

const dialogData = ref<any>({
    name: "",
    color: "",
    doorLeaf: [],
    doorFrame: [],
    doorLock: [],
    doorHanging: [],
    doorSealStrip: "",
    doorGasket: [],
    doorOperator: [],
    otherService: [],
    quantity: 1,
    price: 0,
    rule: {
        needPrice: NaN, // 滿額贈
        getFree: false, // 加價購
    },
})

const handleDetail = (index:Number) => {
    console.log(shoppingCarCustomProductDetailRefDom);
    dialogData.value = props.order[index]
    shoppingCarCustomProductDetailRefDom.value[0].openDialog();
};
</script>

<style lang="scss" scoped>
.product-card {
    //&:not(:last-child){
    @apply border-b-[1px] border-gray-200;
    //}
    @media screen and (min-width: 767.98px) {
        .grid {
            grid-template-columns: 150px 1fr;
        }
    }
}
</style>
