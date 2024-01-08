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
     * 取得據點列表
     */
    StoreListAPI(params: { stronghold_category_id: number | string }) {
      return useMyFetch(`${apiUrl}/stronghold`, {
        method: "get",
        query: { ...params },
      });
    },
    /**
     * 取得據點列表(分頁)
     */
    StoreListPaginateAPI(params: {
      per_page: number;
      page: number;
      stronghold_category_id: number | string;
    }) {
      return useMyFetch(`${apiUrl}/stronghold/paginate`, {
        method: "get",
        query: { ...params },
      });
    },
  };
};
