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
  };
};
