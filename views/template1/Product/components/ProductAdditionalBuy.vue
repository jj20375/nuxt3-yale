<template>
    <div class="w-full mt-[36px] sm:mt-[80px] px-[24px] py-[6px] bg-gray-50 mx-auto rounded-t-[2px] sm:rounded-t-[4px] border-[1px] border-gray-200">
        <h5 class="font-semibold">加價購</h5>
    </div>
    <div class="w-full px-[24px] py-[36px] bg-white mx-auto rounded-b-[12px] sm:rounded-b-[24px] border-[1px] border-gray-200">
        <div>
            <el-checkbox-group
                class="flex flex-col grid-cols-2 gap-2 md:grid"
                v-model="selectedAdditionalProducts"
            >
                <div
                    v-for="(product, index) in additionalProducts"
                    :key="index"
                    type="button"
                >
                    <div class="relative flex items-center h-full">
                        <el-checkbox
                            :label="product.id"
                            size="large"
                            class="flex-1 mx-3"
                        >
                            <br />
                        </el-checkbox>
                        <div @click="handleDetailData(index)" class="flex items-center h-full cursor-pointer">
                            <div class="flex justify-center mt-1 gap-3">
                                <NuxtImg
                                    class="w-[80px] aspect-square object-cover"
                                    :src="addSelect[index].imgUrl"
                                />
                            </div>
                            <div class="flex flex-col justify-between h-full">
                                <div class="text-base">{{ product.name }}</div>
                                <div class="flex">
                                    <el-select
                                        class="flex-3"
                                        v-model="addSelect[index].spec"
                                        @change="specChange(addSelect[index].spec, index)"
                                        placeholder="請選擇規格"
                                    >
                                        <el-option
                                            v-for="(item, optindex) in addSelect[index].specOPT"
                                            :key="optindex"
                                            :label="item.label"
                                            :value="item.value"
                                        ></el-option>
                                    </el-select>
                                    <el-select
                                        class="flex-1 ml-2"
                                        v-model="addSelect[index].count"
                                        placeholder="請選擇數量"
                                    >
                                        <el-option
                                            v-for="(item) in addSelect[index].max"
                                            :key="item"
                                            :label="item"
                                            :value="item"
                                        ></el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="flex text-base justify-center ml-5 gap-3">${{ addSelect[index].price }}</div>
                        </div>
                    </div>
                </div>
            </el-checkbox-group>
        </div>
    </div>
    <client-only>
        <el-dialog
            class="custom-dialog"
            close-on-click-modal
            lock-scroll
            show-close
            center
            align-center
            append-to-
            fullscreen
            v-model="showDetail"
        >
            <productAdditionalBuyDetail
                v-show="showDetail"
                :detailData="additionalProductsDetail"
                ref="orderDownloadHtmlRefDom"
            />
        </el-dialog>
    </client-only>
</template>

<script setup lang="ts">
import type { ProductCarInterface } from "~/interface/product";
import productAdditionalBuyDetail from "~/views/template1/Product/components/ProductAdditionalBuyDetail.vue";

interface Props {
    additionalProducts: ProductCarInterface[];
    productCount: Number
}

const props = withDefaults(defineProps<Props>(), {
    additionalProducts: [
        {
            id: 1,
            model: "",
            name: "",
            price: 0,
            market_price: 0,
            main_image: "",
            other_images: [""],
        },
    ],
    productCount: 1
});

const selectedAdditionalProducts = ref([]);

const addSelect = ref<any>([]);

addSelect.value = props.additionalProducts.map((item:any) => {
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
            console.log('optionTXT', optionTXT, key, item.productVariations[key].id)
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
        count: 1,
        spec: spec,
        specOPT: specOPT,
        price: price,
        stock: stock,
        max: props.productCount > stock ? stock : props.productCount,
        imgUrl: imgUrl
    };
});

const specChange = (value: any, index: string|number) => {
    const select = addSelect.value[index].specOPT.find((item: { value: any; }) => item.value == value)
    addSelect.value[index].imgUrl = select.imgUrl
    addSelect.value[index].price = select.price
}

// const maxStock

watch(() => props.productCount, (val) => {
    addSelect.value.map((item: any) => {
        item.max = val > item.stock ? item.stock : props.productCount
        if (item.count > val) {
            item.count = val > item.stock ? item.stock : props.productCount
        }
    })
})

const showDetail = ref(false)
const additionalProductsDetail = ref<any>(null)
const handleDetailData = (index: string|number) => {
    showDetail.value = true
    console.log('addSelect[index]', addSelect.value)
    additionalProductsDetail.value = props.additionalProducts[index]
    additionalProductsDetail.value.main_image = addSelect.value[index].imgUrl
    console.log('addSelect[index]', addSelect.value[index])
    additionalProductsDetail.value.price = addSelect.value[index].price
}

</script>

<style scoped lang="scss"></style>
