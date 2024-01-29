<template>
    <section>
        <article class="overflow-hidden bg-gray-100">
            <div class="container">
                <div class="relative pt-[140px] pb-[140px]">
                    <h2 class="font-medium text-white text-[66px] leading-none YaleSolisW-Bd">BEST SELLER</h2>
                    <h3 class="font-medium text-[40px] YaleSolisW-Bd mt-[14px] mb-8">精選商品</h3>
                    <Swiper
                        :slidesPerView="3.5"
                        :spaceBetween="30"
                        :freeMode="true"
                        :modules="modules"
                        @swiper="onSwiper"
                        @slideChange="onSlideChange"
                        class="products-swiper"
                    >
                        <SwiperSlide
                            class="min-h-[150px] min-w-[250px] w-full"
                            v-for="item in datas"
                            :key="item"
                        >
                            <ProductCard :product="item" />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </article>
    </section>
</template>

<script lang="ts" setup>
// import required modules
import { Scrollbar } from "swiper/modules";
import { current } from "tailwindcss/colors";
// 產品卡片樣板
import ProductCard from "@/views/template1/components/ProductCard.vue";
/**
 * ProductListAPIInterface: 產品分頁 api 回應值
 * ProductList: 產品分頁列表內容
 * ProductCarInterface: 產品卡片樣式參數
 */
import { ProductListAPIInterface, ProductList, ProductCarInterface } from "~/interface/product.d";

const { $api } = useNuxtApp();

const modules = ref([Scrollbar]);

function onSwiper(swiper: any) {
    console.log(swiper);
}
function onSlideChange() {
    console.log("slide change");
}

const datas = ref<ProductList[]>([]);
/**
 * 取得商品列表
 */
async function getList(params: { per_page: number; page: number }) {
    try {
        const { data } = await $api().ProductListPaginateAPI<ProductListAPIInterface>(params);
        datas.value = [];
        console.log("home sample api => ", data.value);

        const rows = (data.value as any).data.rows;
        const meta = (data.value as any).data.meta;

        rows.forEach((item: ProductCarInterface) => {
            datas.value.push({
                id: item.id,
                model: item.model,
                name: item.name,
                shape: item.shape,
                price: item.price,
                market_price: item.market_price,
                main_image: item.main_image,
            });
        });
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

await getList({ per_page: 10, page: 1 });
</script>

<style lang="scss" scoped>
.products-swiper {
    @apply overflow-visible;
}
</style>
