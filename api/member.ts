import { useFetchData } from "~/composables/fetch";

export default () => {
  const {
    public: { apiUrl },
  } = useRuntimeConfig();
  return {
    /**
     * 會員資料
     */
    GetUserProfileAPI() {
      return useMyFetch(`${apiUrl}/member/profile`, { method: "get" });
    },
    /**
     * 修改會員資料
     */
    ChangeProfileAPI(data: any) {
      return useMyFetch(`${apiUrl}/member/change-profile`, {
        method: "post",
        body: data,
      });
    },
    /**
     * 聯絡人資料
     */
    GetMemberContactAPI() {
      return useMyFetch(`${apiUrl}/member-address`, {
        method: "get",
      });
    },
    /**
     * 聯絡人資料(單筆)
     */
    GetMemberContactDetailAPI(params: { memberAddressId: any }) {
      return useMyFetch(`${apiUrl}/member-address/${params.memberAddressId}`, {
        method: "get",
      });
    },
    /**
     * 新增聯絡人
     */
    ADDChangeProfileAPI(data: any) {
      return useMyFetch(`${apiUrl}/member-address`, {
        method: "post",
        body: data,
      });
    },
    /**
     * 新增聯絡人
     */
    EditChangeProfileAPI(params: { memberAddressId: any }, data: any) {
      return useMyFetch(`${apiUrl}/member-address/${params.memberAddressId}`, {
        method: "post",
        body: data,
      });
    },
    /**
     * 刪除聯絡人
     */
    DeleteProfileAPI(params: { memberAddressId: any }) {
      return useMyFetch(`${apiUrl}/member-address/${params.memberAddressId}`, {
        method: "delete",
      });
    },
    /**
     * 取得收藏商品
     */
    GetProductFavoritesAPI() {
      return useMyFetch(`${apiUrl}/member/product-favorites`, {
        method: "get",
      });
    },
    /**
     * 取得商品訂單列表
     */
    GetProductOrderAPI(params: {
      per_page: number;
      page: number;
      type: string;
      order_by: string;
      order_direction: string;
    }) {
      return useMyFetch(`${apiUrl}/order/paginate`, {
        method: "get",
        query: { ...params },
      });
    },
    /**
     * 取得商品訂單詳情
     */
    GetProductOrderDetailAPI(params: { orderId: number | string }) {
      return useFetchData.get(`${apiUrl}/order/${params.orderId}`);
    },
    /**
     * 重新付款
     */
    orderRepayAPI(params: {
      orderId: any;
      orderPaymentId: any;
      redirect_url: any;
    }) {
      return useMyFetch(
        `${apiUrl}/order/${params.orderId}/repay/${params.orderPaymentId}`,
        {
          method: "post",
          body: { redirect_url: params.redirect_url },
        }
      );
    },
    /**
     * 取消付款
     */
    orderCancelAPI(params: {
      orderId: any;
    }) {
      return useMyFetch(
        `${apiUrl}/order/${params.orderId}/cancel`,
        {
          method: "post"
        }
      );
    },
  };
};
