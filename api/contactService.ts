export default () => {
    const {
        public: { apiUrl },
    } = useRuntimeConfig();
    return {
        /**
         * 取得問答分類
         */
        fqaTypeAPI() {
            return useMyFetch(`${apiUrl}/fqa-category`, { method: "get" });
        },
        /**
         * 取得問答列表
         */
        fqaListAPI(params: { fqa_category_id: number|string }) {
            return useMyFetch(`${apiUrl}/fqa`, { method: "get", query: { ...params } });
        },
        /**
         * 取得問答詳情
         */
        fqaDetailAPI(params: { fqaId: number|string }) {
            return useMyFetch(`${apiUrl}/fqa/${params.fqaId}`, { method: "get" });
        },
    };
};
