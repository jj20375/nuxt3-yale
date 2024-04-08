<template>
    <div class="mt-[30px] sm:mt-[60px]">
        <h5 v-if="giftsData.length > 0" class="bg-gray-50 py-[8px] pl-[16px] font-medium YaleSolisW-Bd w-full mb-[30px]">滿額贈品</h5>
        <el-form class="custom-form">
            <div
                v-for="(gift, index) in giftsData"
                class="flex border-gray-300 pb-4 sm:pb-6 lg:pb-[30px]"
                :class="giftsData.length - 1 === index ? 'pt-4 sm:pt-6 lg:pt-[30px]' : 'border-b'"
            >
                <div class="flex gap-2 sm:gap-4">
                    <NuxtImg
                        class="w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] lg:w-[180px] lg:h-[180px] aspect-square object-cover cursor-pointer"
                        v-if="giftsDataSelect[index].imgUrl"
                        :src="giftsDataSelect[index].imgUrl"
                    />
                </div>
                <div class="flex-1">
                    <h5 class="text-[16px] sm:text-[18px] text-gray-800 YaleSolisW-Bd font-medium mb-[12px]">{{ gift.name }}</h5>
                    <el-select
                        v-if="giftsDataSelect[index].specOPT.length > 0"
                        class="flex-3"
                        v-model="giftsDataSelect[index].spec"
                        @change="specChange(giftsDataSelect[index].spec, index)"
                        placeholder="請選擇規格"
                    >
                        <el-option
                            v-for="(item, optindex) in giftsDataSelect[index].specOPT"
                            :key="optindex"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <div class="flex mt-[20px]">
                        <div class="text-[14px] text-gray-800 mr-[4px]">
                            <span>原價</span><span class="line-through">NT$ {{ $utils().formatCurrency(giftsDataSelect[index].price) }}</span>
                        </div>
                        <div class="text-pink-900 text-[14px]">
                            <span>滿額贈</span>
                            <span>NT$ 0</span>
                        </div>
                    </div>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
const { $utils } = useNuxtApp();
import { useShoppingCarStore } from "~/store/shoppingCarStore";

const shoppingCarStore = useShoppingCarStore();

const emit = defineEmits(["update:selectGiftIds"]);

const { giftsDataSelect } = storeToRefs(shoppingCarStore);

shoppingCarStore.giftsDataSelect = shoppingCarStore.discount_gifts.map((item:any) => {
    const specOPT = []
    let spec = ''
    let imgUrl = item.main_image
    let price = item.price
    let stock = item.stock
    if (item.is_single_variation == 1) {
        specOPT.push({
            label: '單一規格',
            value: '單一規格'
        })
        spec = '單一規格'
    } else {
        console.log(item.productVariations)
        Object.keys(item.productVariations).forEach((key, keyIndex) => {
            let optionTXT = ''
            const variations = key.split('-')
            item.productOptions.forEach((variation: { values: any[]; }, index: number) => {
                if (index == 0) {
                    optionTXT = variation.values.find((item: { id: string; }) => item.id == variations[index + 1]).name
                } else {
                    optionTXT += `, ${variation.values.find((item: { id: string; }) => item.id == variations[index + 1]).name}`
                }
            })
            specOPT.push({
                label: optionTXT,
                value: item.productVariations[key].id,
                imgUrl: item.productVariations[key].image,
                stock: item.productVariations[key].stock,
                price: item.productVariations[key].price
            })
            if (keyIndex == 0) {
                spec = item.productVariations[key].id
                price = item.productVariations[key].price
                imgUrl = item.productVariations[key].image
                stock = item.productVariations[key].stock
            }
        })
    }

    return { 
        id: item.id,
        discount_id: item.discount_id,
        count: 1,
        spec: spec,
        specOPT: specOPT,
        price: price,
        stock: stock,
        imgUrl: imgUrl,
        is_single_variation: item.is_single_variation
    };
});

const giftsData = computed(() => {
    shoppingCarStore.discount_gifts.forEach(item => {
        item.imgUrl = item.main_image
    })
    return shoppingCarStore.discount_gifts
})

watch(giftsData, (discount_gifts) => {
    shoppingCarStore.giftsDataSelect = discount_gifts.map((item:any) => {
        const specOPT = []
        let spec = ''
        let imgUrl = item.imgUrl
        let price = item.price
        let stock = item.stock
        if (item.is_single_variation == 0) {
            console.log(item.productVariations)
            Object.keys(item.productVariations).forEach((key, keyIndex) => {
                let optionTXT = ''
                const variations = key.split('-')
                item.productOptions.forEach((variation: { values: any[]; }, index: number) => {
                    if (index == 0) {
                        optionTXT = variation.values.find((item: { id: string; }) => item.id == variations[index + 1]).name
                    } else {
                        optionTXT += `, ${variation.values.find((item: { id: string; }) => item.id == variations[index + 1]).name}`
                    }
                })
                specOPT.push({
                    label: optionTXT,
                    value: item.productVariations[key].id,
                    imgUrl: item.productVariations[key].image ? item.productVariations[key].image : imgUrl,
                    stock: item.productVariations[key].stock,
                    price: item.productVariations[key].price
                })
                if (keyIndex == 0) {
                    spec = item.productVariations[key].id
                    price = item.productVariations[key].price
                    imgUrl = item.productVariations[key].image ? item.productVariations[key].image : imgUrl
                    stock = item.productVariations[key].stock
                }
            })
        }

        return { 
            id: item.id,
            discount_id: item.discount_id,
            count: 1,
            spec: spec,
            specOPT: specOPT,
            price: price,
            stock: stock,
            imgUrl: imgUrl,
            is_single_variation: item.is_single_variation
        };
    });
});

const specChange = (value: any, index: string|number) => {
    const select = shoppingCarStore.giftsDataSelect[index].specOPT.find((item: { value: any; }) => item.value == value)
    shoppingCarStore.giftsDataSelect[index].imgUrl = select.imgUrl
    shoppingCarStore.giftsDataSelect[index].price = select.price
}

// 選中資料
const checkList = ref([]);

function init() {
    // 設定購物車商品全選
    emit("update:selectGiftIds", checkList.value);
}
init();
</script>

<style lang="scss" scoped>
:deep(.el-checkbox) {
    .el-checkbox__label {
        @apply hidden #{!important};
    }
    .el-checkbox__inner {
        @apply w-[18px] h-[18px] #{!important};
        &:hover {
            @apply border-yellow-600;
        }
    }
    .is-checked {
        .el-checkbox__inner {
            @apply bg-yellow-600 border-yellow-600 after:h-[9px] after:left-[6px] after:top-[2px] #{!important};
        }
    }
}
</style>
