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
    };
};
