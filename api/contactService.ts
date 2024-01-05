export default () => {
    const {
        public: { apiUrl },
    } = useRuntimeConfig();
    return {
        /**
         * 取得問答分類
         */
        FQATypeAPI() {
            return useMyFetch(`${apiUrl}/fqa-category`, { method: "get" });
        },
        /**
         * 取得問答列表
         */
        FQAListAPI(params: { fqa_category_id: number|string }) {
            return useMyFetch(`${apiUrl}/fqa`, { method: "get", query: { ...params } });
        },
        /**
         * 取得問答詳情
         */
        FQADetailAPI(params: { fqaId: number|string }) {
            return useMyFetch(`${apiUrl}/fqa/${params.fqaId}`, { method: "get" });
        },
        /**
         * 取得文件分類
         */
        DocumentTypeAPI() {
            return useMyFetch(`${apiUrl}/document-category`, { method: "get" });
        },
        /**
         * 取得文章列表
         */
        DocumentListAPI(params: { document_category_id: number|string }) {
            return useMyFetch(`${apiUrl}/document`, { method: "get", query: { ...params } });
        },
    };
};
