<template>
    <section>
        <article class="overflow-hidden bg-gray-100">
            <div class="container">
                <div class="relative pt-[48px] md:pt-[90px] md:pt-[140px] pb-[48px] md:pb-[72px] xl:pb-[140px]">
                    <h2 class="font-medium text-white text-center xl:text-start text-[32px] sm:text-[48px] xl:text-[66px] leading-none YaleSolisW-Bd">BEST SELLER</h2>
                    <h3 class="font-medium leading-[50px] text-[28px] sm:text-[32px] xl:text-[40px] text-center xl:text-start YaleSolisW-Bd md:mt-[14px] mb-6 md:mb-8">精選商品</h3>
                    <Swiper
                        :slidesPerView="isMobile ? 2 : isPad ? 3 : 3.5"
                        :spaceBetween="isMobile ? 16 : 30"
                        :freeMode="true"
                        :scrollbar="{ draggable: true, dragSize: 100, horizontalClass: 'horizontalClass', dragClass: 'dragClass' }"
                        :modules="modules"
                        @swiper="onSwiper"
                        @slideChange="onSlideChange"
                        class="products-swiper"
                    >
                        <SwiperSlide
                            class="aspect-square w-full mb-9 xl:mb-0"
                            v-for="item in datas"
                            :key="item"
                        >
                            <ProductCard :product="item" @handleFavorite="handleFavorite" />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </article>
    </section>
</template>

<script lang="ts" setup>
// import required modules
const { isMobile, isPad } = useWindowResize();
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
import { ElMessage } from "element-plus";

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
async function getList() {
    try {
        const params = {};
        params["search_fields"] = "tags:json_contains";
        params["tags"] = "featured";

        const { data } = await $api().ProductLisAPI<ProductListAPIInterface>(params);
        datas.value = [];
        console.log("ProductLisAPI api => ", data.value);

        const rows = (data.value as any).data;

        rows.forEach((item: ProductCarInterface) => {
            datas.value.push({
                id: item.id,
                model: item.model,
                name: item.name,
                shape: item.shape,
                price: item.price,
                market_price: item.market_price,
                main_image: item.main_image,
                is_favorite: item.is_favorite,
                tags: item.tags,
            });
        });
    } catch (err) {
        console.log("HomeSampleAPI => ", err);
    }
}

async function handleFavorite(id: any) {
    const params = { productId: id };
    const { data } = await $api().ProductFavoriteAPI(params);
    const message = (data.value as any).message;
    const is_favorite = datas.value.find((item) => item.id === id).is_favorite;
    const handleMessge = is_favorite ? "取消收藏" : "加入收藏";

    if (message === "請求成功") {
        ElMessage({
            type: "success",
            message: handleMessge,
        });
        datas.value.find((item) => item.id === id).is_favorite = !is_favorite;
    } else {
        ElMessage({
            type: "error",
            message: handleMessge + "失敗",
        });
    }
}

await getList();
</script>

<style lang="scss" scoped>
.products-swiper {
    @apply overflow-visible;
}

:deep {
    .dragClass {
        @apply xl:hidden h-[4px] bg-black rounded-lg;
    }
    .horizontalClass {
        @apply xl:hidden h-[4px];
    }
}

.store-swiper {
    @apply overflow-visible;
}
</style>
