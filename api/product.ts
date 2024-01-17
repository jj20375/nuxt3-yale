/**
 * ProductListAPIInterface: 產品分頁 api 回應值
 * ProductList: 產品分頁列表內容
 */
import { ProductListAPIInterface } from "~/views/template1/Product/interface/Product.d";

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
         * 取得商品詳細資料
         */
        ProductDetailAPI(params: { productId: any }) {
            return useMyFetch(`${apiUrl}/product/${params.productId}`, { method: "get" });
        },
    };
};
