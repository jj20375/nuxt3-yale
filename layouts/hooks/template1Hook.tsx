import { ElMessage } from "element-plus";
import { setStorage, removeStorage, getStorage } from "~~/service/localstorage";
import { useApiStore } from "~~/store/apiStore";
import { useOauthStore } from "~~/store/oauthStore";
import { useUserStore } from "~~/store/userStore";
export function useLineLogin() {
    const { $utils, $api } = useNuxtApp();
    const {
        public: { lineAppId, hostURL },
    } = useRuntimeConfig();
    const userStore = useUserStore();
    const oauthStore = useOauthStore();
    const apiStore = useApiStore();
    // 導回首頁
    function redirectRightHome() {
        removeStorage("line_login_uuid");
        removeStorage("redirect_uri");
        window.location.href = hostURL;
    }
    /**
     * 取得使用者資料
     * @param { type String(字串) } idToken 用來取得line使用者資料的 token
     * @param { type String(字串) } accessToken 用來跟後端驗證 line 身份的 token
     */
    async function getLineUserProfile(idToken: string, accessToken: string) {
        try {
            const { data } = await $api().Axios_LineUserProfileAPI({
                client_id: lineAppId,
                id_token: idToken,
            });
            userStore.setSocialMediaName(data.name);
            try {
                await oauthStore.lineLoginBackend({ token: accessToken, routeName: "index" });
            } catch (err) {
                redirectRightHome();
            }
        } catch (err) {
            ElMessage({
                type: "error",
                message: "取得 LINE 使用者資料失敗",
            });
        }
    }
    /**
     * 取得line token
     * @param { type Object(物件) } params line 登入後會 redirect 回來 並且帶上 code query 參數在網址列上 以及傳送請求 line 入時 redirect_uri
     * @example { code: line入後倒頁時 會帶在網址上的參數, redirect_uri: 傳給line登入時的 redirect_uri }
     */
    async function getLineToken(params: { code: string; redirect_uri: string }) {
        try {
            const { data, error }: { data: any; error: any } = await $api().LineTokenAPI(params);

            if (error.value) {
                console.log(error, "get line token error");
                apiStore.errorCallback({ err: { response: error.value.data } });
                setTimeout(() => {
                    redirectRightHome();
                }, 500);
                return;
            }
            if (data.value !== null) {
                // 取得 access token 後 執行後端 第三方 api 登入身份驗證
                await getLineUserProfile(data.value.id_token, data.value.access_token);
            }
        } catch (err) {
            console.log("LineTokenAPI =>", err);
        }
    }
    // 判斷網址列上是否有 line 登入後的導頁參數
    async function checkUrlQuery() {
        // 取的目前網址列上網址
        let url = new URL(window.location.href);
        // 取得網址列上 code query 的參數
        let code = url.searchParams.get("code");
        // 取得網址列上 code state 的參數
        let state = url.searchParams.get("state");
        // 判斷是否有取得到 code 參數 以及 localstorage 是否有 line_login_uuid 參數
        if (code !== null && !$utils().isEmpty(getStorage("line_login_uuid"))) {
            // console.log("line_login_uuid => ", code, getStorage("line_login_uuid"));
            // 判斷 state 是否等於我們瀏覽器中 localstorage 的 line_login_uuid 參數值
            if (state === getStorage("line_login_uuid")) {
                // 取得 line 的 access_token 後續跟後端驗證 line 身份以及登入使用
                await getLineToken({
                    redirect_uri: getStorage("redirect_uri"),
                    code: code,
                });
                // 移除 line 當初傳送登入api時 所設定給 state 的 uuid值
                removeStorage("line_login_uuid");
                // 移除 line 當初傳送登入api時 所設定給 line 的 redirect uri 網址
                removeStorage("redirect_uri");
            } else {
                redirectRightHome();
            }
        }
    }

    return {
        redirectRightHome,
        getLineUserProfile,
        getLineToken,
        checkUrlQuery,
    };
}
