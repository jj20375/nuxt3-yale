import qs from "qs";

export default () => {
  const {
    public: { apiNestJsUrl, apiUrl },
  } = useRuntimeConfig();
  return {
    /**
     * 取得 初始化 資料
     */
    GetInitializationDatasAPI() {
      return useMyFetch(`${apiUrl}/bootstrap`, { method: "get" });
    },
    /**
     * 取得 footer 資料
     */
    GetFooterDatasAPI() {
      return useMyFetch(`${apiUrl}/expo/web/footer`, { method: "get" });
    },
    /**
     * 上傳檔案
     */
    UploadAPI(data: any) {
      return useMyFetch(`${apiUrl}/file/upload`, {
        method: "post",
        body: data,
      });
    },
  };
};
