import axios from "axios";
import qs from "qs";
export default () => {
  const {
    public: { apiNestJsUrl, apiUrl },
  } = useRuntimeConfig();
  return {
    /**
     * 註冊 facebook user
     */
    FacebookOauthRegisterAPI(data: any) {
      return useMyFetch(`${apiNestJsUrl}/auth/facebook-oauth2-register`, {
        method: "post",
        body: data,
        // facebook 登入的 access_token 戴上 header 做請求驗證 token 真實性
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });
    },
    /**
     * 綁定 facebook user
     * @param { type Object(物件) } data 綁定資料
     * @example {
     *    access_token: google access token { type String(字串 }
     *    phone: 綁定手機號碼 { type String(字串) }
     * }
     */
    FacebookOauthBindAPI(data: { access_token: string; phone: string }) {
      // facebook 登入的 access_token 戴上 header 做請求驗證 token 真實性

      return useMyFetch(`${apiNestJsUrl}/auth/facebook-oauth2-bind`, {
        method: "post",
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
        body: data,
      });
    },
    /**
     * facebook 登入或註冊
     * @param { type Object(物件) } data google 登入或註冊需傳送資料
     * @example { access_token: 第三方登入後給的 token (type String(字串)) }
     * @returns
     */
    FacebookLoginAPI(data: { access_token: string }) {
      return useMyFetch(`${apiNestJsUrl}/auth/facebook-oauth2-login`, {
        method: "post",
        // facebook 登入的 access_token 戴上 header 做請求驗證 token 真實性
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });
    },

    /**
     * 解除綁定 facebook user
     */
    FacebookOauthUnbindAPI() {
      return useMyFetch(`${apiNestJsUrl}/auth/facebook-oauth2-unbind`, {
        method: "post",
      });
    },

    /**
     * 解除綁定 google user
     */
    GoogleOauthUnbindAPI() {
      return useMyFetch(`${apiNestJsUrl}/auth/google-oauth2-unbind`, {
        method: "post",
      });
    },

    /**
     * 綁定 google user
     * @param { type Object(物件) } data 綁定資料
     * @example {
     *    @param { type String(字串) } google google access token
     *    @param { type String(字串) } phone 手機號碼 886955831666
     *    @param { type String(字串) } device 裝置類型 ex: web or app
     * }
     */
    GoogleOauthBindAPI(data: {
      access_token: string;
      phone: string;
      device: string;
    }) {
      return useMyFetch(`${apiNestJsUrl}/auth/google-oauth2-bind`, {
        method: "post",
        body: { ...data, device: "web" },
      });
    },

    /**
     * google 登入或註冊
     * @param { type Object(物件) } data google 登入或註冊需傳送資料
     * @example {
     *  access_token: 第三方登入後給的 token (type String(字串))
     * }
     * @returns
     */
    GoogleLoginAPI(data: { access_token: string }) {
      return useMyFetch(`${apiNestJsUrl}/auth/google-oauth2-login`, {
        method: "post",
        body: { ...data, device: "web" },
      });
    },

    /**
     * 註冊 google user
     */
    GoogleOauthRegisterAPI(data: any) {
      return useMyFetch(`${apiNestJsUrl}/auth/google-oauth2-register`, {
        method: "post",
        body: data,
      });
    },

    /**
     * 取得 line token api
     * @param { type Object(物件) } params line 登入後會 redirect 回來 並且帶上 code query 參數在網址列上 以及傳送請求 line 入時 redirect_uri
     * @example { code: line入後倒頁時 會帶在網址上的參數, redirect_uri: 傳給line登入時的 redirect_uri }
     * @returns
     */
    LineTokenAPI(params: { code: string; redirect_uri: string }) {
      console.log(
        "line token api => ",
        `${apiUrl}/auth/line-token?${qs.stringify(params)}`
      );
      return useMyFetch(`${apiUrl}/auth/line-token?${qs.stringify(params)}`, {
        method: "get",
      });
    },

    /**
     * line 登入或註冊
     * @param { type Object(物件) } data line 登入或註冊需傳送資料
     * @example { access_token: 第三方登入後給的 token (type String(字串)) }
     * @returns
     */
    LineLoginAPI(data: { access_token: string }) {
      return useMyFetch(`${apiNestJsUrl}/auth/line-oauth2-login`, {
        method: "post",
        body: data,
      });
    },

    /**
     * 綁定 line user
     * @param { type Object(物件) } data 綁定資料
     * @example {
     *    access_token: google access token { type String(字串 }
     *    phone: 綁定手機號碼 { type String(字串) }
     * }
     */
    LineOauthBindAPI(data: { access_token: string; phone: string }) {
      return useMyFetch(`${apiNestJsUrl}/auth/line-oauth2-bind`, {
        method: "post",
        body: data,
      });
    },

    /**
     * 解除綁定 line user
     */
    LineOauthUnbindAPI() {
      return useMyFetch(`${apiNestJsUrl}/auth/line-oauth2-unbind`, {
        method: "post",
      });
    },

    /**
     * 註冊 line user
     */
    LineOauthRegisterAPI(data: any) {
      return useMyFetch(`${apiNestJsUrl}/auth/line-oauth2-register`, {
        method: "post",
        body: data,
      });
    },

    /**
     *
     * @param { type Object(物件) } form 取得line 使用者資料傳送參數
     * @example {
     *  id_token: line 個人專屬 id token
     *  client_id: 申請line 商家 id
     * }
     */
    Axios_LineUserProfileAPI(form: { id_token: string; client_id: string }) {
      // 因為 line 發送方式 為表單發送方式 因此使用 qs 將 發送 json 值轉換成 表單發送字串格式 做發送
      return axios.post(
        "https://api.line.me/oauth2/v2.1/verify",
        qs.stringify(form),
        {
          headers: {
            // 設定 header contentType 為表單發送格式
            "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );
    },
    /**
     * apple 登入或註冊
     * @param { type Object(物件) } data apple 登入或註冊需傳送資料
     * @example { id_token: 第三方登入後給的 token (type String(字串)) }
     * @returns
     */
    async AppleLoginAPI(data: { id_token: string }) {
      return useMyFetch(`${apiNestJsUrl}/auth/apple-oauth2-login`, {
        method: "post",
        body: data,
        server: false,
      });
      // return axios.post(`${apiNestJsUrl}/auth/apple-oauth2-login`, data);
    },

    /**
     * 綁定 apple user
     * @param { type Object(物件) } data 綁定資料
     * @example {
     *    id_token: google access token { type String(字串 }
     *    phone: 綁定手機號碼 { type String(字串) }
     * }
     */
    AppleOauthBindAPI(data: { id_token: string; phone: string }) {
      return useMyFetch(`${apiNestJsUrl}/auth/apple-oauth2-bind`, {
        method: "post",
        body: data,
      });
    },

    /**
     * 解除綁定 apple user
     */
    AppleOauthUnbindAPI() {
      return useMyFetch(`${apiNestJsUrl}/auth/apple-oauth2-unbind`, {
        method: "post",
      });
    },

    /**
     * 註冊 apple user
     */
    AppleOauthRegisterAPI(data: any) {
      return useMyFetch(`${apiNestJsUrl}/auth/apple-oauth2-register`, {
        method: "post",
        body: data,
      });
    },

    /**
     * 會員註冊
     */
    RegisterAPI(data: any) {
      return useMyFetch(`${apiUrl}/member/register`, {
        method: "post",
        body: data,
      });
    },

    /**
     * 會員登入
     */
    LoginAPI(data: any) {
      return useMyFetch(`${apiUrl}/member/login`, {
        method: "post",
        body: data,
      });
    },
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
  };
};
