/**
 * CustomProductGetSceneListInterface 場景列表 api 格式
 */
import { CustomProductGetSceneListInterface } from "@/interface/customProduct";

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
            return useMyFetch<CustomProductGetSceneListInterface>(`${apiUrl}/custom-scene`, { method: "get" });
        },
    };
};
