<template>
    <section class="mt-[86px] pb-[60px]">
        <nav class="border-b border-gray-300 py-[16px] bg-white">
            <div class="container">
                <Breadcrumb :menus="breadcrumbs" />
            </div>
        </nav>
        <div class="container">
            <div class="mt-[60px] px-[60px]">
                <h3 class="font-medium text-[32px] mb-8">產品收藏清單</h3>
                <div class="grid grid-cols-4 gap-x-5 gap-y-8">
                    <div v-for="item in datas">
                        <ProductCard
                            :product="item"
                            @handleFavorite="handleFavorite"
                        />
                    </div>
                </div>
            </div>
            <Pagination class="flex justify-center mb-[95px] mt-[80px]" />
        </div>
    </section>
</template>

<script setup lang="ts">
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";
import Pagination from "~/views/template1/components/Pagination.vue";
// 產品卡片樣板
import ProductCard from "~/views/template1/components/ProductCard.vue";
/**
 * ProductListAPIInterface: 產品分頁 api 回應值
 * ProductList: 產品分頁列表內容
 */
import { ProductListAPIInterface, ProductList } from "~/interface/product.d";
import { ElMessage, ElMessageBox } from "element-plus";

const { $api } = useNuxtApp();

const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁",
    },
    {
        name: "auth-panel-slug",
        text: "會員中心",
        params: { slug: "會員中心" },
    },
    {
        name: "auth-favorite-slug",
        text: "產品收藏清單",
        params: { slug: "產品收藏清單" },
    },
]);

const datas = ref<ProductList[]>([]);

/**
 * 取得商品列表
 */
async function getList() {
    try {
        const { data } = await $api().GetProductFavoritesAPI();
        datas.value = [];

        const rows = (data.value as any).data;

        rows.forEach((item: { id: any; model: any; name: any; shape: any; price: any; market_price: any; main_image: any; other_images: any; is_favorite: boolean }) => {
            datas.value.push({
                id: item.id,
                model: item.model,
                name: item.name,
                shape: item.shape,
                price: item.price,
                market_price: item.market_price,
                main_image: item.main_image,
                is_favorite: item.is_favorite,
                tags: item.tags
            });
        });
    } catch (err) {
        console.log("ProductListPaginateAPI => ", err);
    }
}

async function handleFavorite(id: any) {
    try {
        ElMessageBox.confirm("是否取消收藏?", "警告", {
            confirmButtonText: "是",
            cancelButtonText: "否",
            type: "warning",
        })
            .then(async () => {
                const params = { productId: id };
                const { data } = await $api().ProductFavoriteAPI(params);
                const message = (data.value as any).message;

                if (message === "請求成功") {
                    const index = datas.value.findIndex((item) => item.id === id);
                    datas.value.splice(index, 1);
                } else {
                    ElMessage({
                        type: "error",
                        message: "取消失敗",
                    });
                }
            })
            .catch(() => {});
    } catch (err) {
        ElMessage({
            type: "error",
            message: "取消失敗",
        });
    }
}

onMounted(async () => {
    nextTick(async () => {
        if (process.client) {
            await getList();
        }
    });
});
</script>
