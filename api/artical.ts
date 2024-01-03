export default () => {
    const {
        public: { apiUrl },
    } = useRuntimeConfig();
    return {
        /**
         * 取得首頁裝修實績分類
         */
        SampleTypeAPI() {
            return useMyFetch(`${apiUrl}/article-category`, { method: "get", query: { "type": 'renovation' } });
        },
        /**
         * 取得裝修實績列表
         */
        SampleListAPI(params: { per_page: number; page: number, article_category_id: number|string }) {
            return useMyFetch(`${apiUrl}/article/list`, { method: "get", query: { "articleCategory|type": "renovation", search_fields: "articleCategory|type:has", ...params } });
        },
        /**
         * 取得文章詳情
         */
        SampleDetailAPI(params: { articleId: number|string }) {
            return useMyFetch(`${apiUrl}/article/${params.articleId}`, { method: "get" });
        },
    };
};
