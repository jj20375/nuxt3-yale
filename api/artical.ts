export default () => {
    const {
        public: { apiUrl },
    } = useRuntimeConfig();
    return {
        /**
         * 取得首頁裝修實績分類
         */
        ArticalTypeAPI(params: { type: string;}) {
            return useMyFetch(`${apiUrl}/article-category`, { method: "get", query: { ...params } });
        },
        /**
         * 取得裝修實績列表
         */
        ArticalListAPI(params: { per_page: number; page: number, article_category_id: number|string, 'articleCategory|type': string }) {
            return useMyFetch(`${apiUrl}/article/list`, { method: "get", query: { search_fields: "articleCategory|type:has", ...params } });
        },
        /**
         * 取得文章詳情
         */
        SampleDetailAPI(params: { articleId: number|string }) {
            return useMyFetch(`${apiUrl}/article/${params.articleId}`, { method: "get" });
        },
    };
};
