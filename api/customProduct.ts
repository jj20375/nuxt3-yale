/**
 * CustomProductGetSceneListAPIInterface 場景列表 api 格式
 */
import { CustomProductGetSceneListAPIInterface } from "@/interface/customProduct";

export default () => {
    const {
        public: { apiUrl },
    } = useRuntimeConfig();
    return {
        /**
         * 取得場景
         * @returns
         */
        CustomProductGetSceneListAPI() {
            return useMyFetch<CustomProductGetSceneListAPIInterface>(`${apiUrl}/custom-scene`, { method: "get" });
        },
        /**
         * 取得訂製商品列表
         */
        CustomProductGetListAPI(params: { search_relations: string }) {
            return useMyFetch(`${apiUrl}/custom-product`, { method: "get", query: { order_by: 'sort', order_direction: 'asc', ...params } });
        },
    };
};
