import qs from "qs";

export default () => {
    const {
        public: { apiNestJsUrl, apiUrl },
    } = useRuntimeConfig();
    return {
        /**
         * 取得 footer 資料
         */
        GetFooterDatasAPI() {
            return useMyFetch(`${apiUrl}/expo/web/footer`, { method: "get" });
        },
    };
};
