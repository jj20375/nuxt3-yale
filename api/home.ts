export default () => {
    const {
        public: { apiUrl },
    } = useRuntimeConfig();
    return {
        /**
         * 取得前台設定顯示開關
         */
        HomeAPI() {
            return useMyFetch(`${apiUrl}/expo/web/index`, { method: "get" });
        },
        // 取得首頁下方輪播 API
        HomePageMediaAPI() {
            return useMyFetch(`${apiUrl}/expo/media`, { method: "get" });
        },
        /**
         * 取得首頁裝修實績
         */
        HomeSampleAPI(params: { per_page: number; page: number }) {
            return useMyFetch(`${apiUrl}/article/list`, { method: "get", query: { "articleCategory|type": "renovation", search_fields: "articleCategory|type:has", ...params } });
        },
        /**
         * 取得直營門市
         */
        HomeStoreCarouselAPI() {
            return useMyFetch(`${apiUrl}/stronghold`, { method: "get", query: { "stronghold_category_id": 1}});
        },
    };
};
