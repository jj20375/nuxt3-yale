export default () => {
    const {
        public: { apiUrl },
    } = useRuntimeConfig();
    return {
        /**
         * 取得據點分類
         */
        StoreTypeAPI() {
            return useMyFetch(`${apiUrl}/stronghold-category`, { method: "get" });
        },
        /**
         * 取得裝修實績列表
         */
        StoreListAPI(params: { per_page: number; page: number, stronghold_category_id: number|string }) {
            return useMyFetch(`${apiUrl}/stronghold`, { method: "get", query: { ...params } });
        },
    };
};
