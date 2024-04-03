/**
 * ProductListAPIInterface: 產品分頁 api 回應值
 * ProductList: 產品分頁列表內容
 */
import { ProductListAPIInterface } from "~/interface/product.d";
import { useFetchData } from "~/composables/fetch";

export default () => {
    const {
        public: { apiUrl },
    } = useRuntimeConfig();
    return {
        /**
         * 取得商品分類
         */
        ProductTypeAPI() {
            return useMyFetch(`${apiUrl}/product-category`, { method: "get" });
        },
        /**
         * 取得商品分類(詳情)
         */
        ProductTypeDetailAPI(params: { productCategoryId: any }) {
            return useMyFetch(`${apiUrl}/product-category/${params.productCategoryId}`, { method: "get" });
        },
        /**
         * 取得商品列表(分頁)
         */
        ProductListPaginateAPI<T>(params: { per_page: number; page: number }) {
            return useMyFetch<ProductListAPIInterface>(`${apiUrl}/product/paginate`, {
                method: "get",
                query: { ...params },
            });
        },
        /**
         * 取得商品列表
         */
        ProductLisAPI<T>(params: any) {
            return useMyFetch<ProductListAPIInterface>(`${apiUrl}/product`, {
                method: "get",
                query: { ...params },
                lazy: true,
            });
        },
        /**
         * 取得商品詳細資料
         */
        ProductDetailAPI(params: { productId: any }) {
            return useFetchData.get(`${apiUrl}/product/${params.productId}`);
            // return useMyFetch(`${apiUrl}/product/${params.productId}`, { method: "get" });
        },
        /**
         * 商品加入收藏
         */
        ProductFavoriteAPI(params: { productId: any }) {
            return useMyFetch(`${apiUrl}/product/${params.productId}/favorite`, { method: "get" });
        },
    };
};
