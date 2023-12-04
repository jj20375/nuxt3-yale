import { defineStore } from "pinia";
import Cookies from "js-cookie";
// 導入 jwt 驗證機制
import jwt_decode from "jwt-decode";
import { getDatabase, off, ref as firebaseRef } from "firebase/database";
import { ElMessage } from "element-plus";
import { useUserStore } from "./userStore";
import { useApiStore } from "./apiStore";
import { UserInterface } from "~/interface/user.d";
import { v4 as uuidv4 } from "uuid";
import { setStorage, removeStorage, getStorage } from "~~/service/localstorage";
interface State {
    user: UserInterface;
}
export const useOauthStore = defineStore({
    id: "oauthStore",
    actions: {
        /**
         * facebook 登入 後端api 驗證身份
         * @param { type String(字串) } token facebook 登入後的 access_token
         * @param { type Boolean(布林) } needSendWelcomeMessage 判斷是否發送歡迎訊息
         */
        async facebookLoginBackend({ token, needSendWelcomeMessage = false }: { token: string; needSendWelcomeMessage?: boolean }) {
            const router = useRouter();
            const { $api } = useNuxtApp();
            const chatStore = useChatStore();
            const apiStore = useApiStore();
            const userStore = useUserStore();
            userStore.removeLoginData();
            try {
                let { data, error }: { data: any; error: any } = await $api().FacebookLoginAPI({ access_token: token });
                if (error.value) {
                    apiStore.errorCallback({ err: { response: error.value.data } });
                    // 判斷錯誤訊息 非 undefined
                    if (!useNuxtApp().$utils().isEmpty(error.value.data.error)) {
                        // 判斷狀態值為 401 且 錯誤代碼為1014 代表此第三方帳號尚未與 平台帳號綁定
                        if (error.value.statusCode === 401 && error.value.data.error.error === 1014) {
                            router.push({ name: "register-socialMedia-accessToken", params: { socialMedia: "facebook" }, query: { accessToken: token } });
                            return;
                        }
                        // 停權後導向申訴頁
                        if (error.value.data.error.error === 1009) {
                            // 用來判斷是否已經反應過 要跳轉不同畫面
                            const feedback = error.value.data.has_feedback;
                            router.push({ name: "user-suspend-userId-feedback", params: { userId: error.value.data.banana_id, feedback } });
                            return;
                        }
                    }
                    return;
                }
                // 設定使用者資料
                userStore.setUser(data.value.user);
                // 設定已登入
                userStore.setIsAuth(true);
                // 判斷是否為服務商 role = 0 為消費者
                if (data.value.user.role !== 0) {
                    userStore.setIsProvider(true);
                    router.push({ name: "user-providerHome" });
                }
                // 設定 token 到 cookie
                Cookies.set("token", data.value.access_token);
                ElMessage({
                    type: "success",
                    message: "Facebook 登入成功",
                });
                // 進行 firebase 使用者登入
                chatStore.getFirebaseToken({ needResetChatToBot: true, needSendWelcomeMessage });
            } catch (err: any) {
                console.log("FacebookLoginAPI =>", err);
            }
        },

        // 初始化 facebook 登入 按鈕
        initFacebookLoginBtn() {
            // 取得 目前facebook 的登入狀態
            FB.getLoginStatus(function (response: any) {
                // 判斷為登入時
                if (response.status === "connected") {
                    var uid = response.authResponse.userID;
                    var accessToken = response.authResponse.accessToken;
                    FB.logout(function (response: any) {
                        console.log("fb is logout", response);
                    });
                    return;
                }
                // 判斷為登入狀態 但權限失效時
                if (response.status === "not_authorized") {
                    console.log(response.status);
                    return;
                }
                // 尚未登入
                console.log("is fb not login");
            });
        },
        /**
         * google 登入 後端api 驗證身份
         * @param { type String(字串) } token google 登入後的 access_token
         * @param { type Boolean(布林)) } isBind 判斷是否為 登入中綁定 模式
         * @param { type Boolean(布林) } needSendWelcomeMessage 判斷是否發送歡迎訊息
         */
        async googleLoginBackend({ accessToken, needSendWelcomeMessage = false, isBind = false }: { accessToken: string; needSendWelcomeMessage?: boolean; isBind: boolean }) {
            const userStore = useUserStore();
            const apiStore = useApiStore();
            userStore.removeLoginData();
            const { $api, $utils } = useNuxtApp();
            const router = useRouter();
            try {
                let { data, error }: { data: any; error: any } = await $api().GoogleLoginAPI({ access_token: accessToken });
                if (error.value) {
                    apiStore.errorCallback({ err: { response: error.value.data } });
                    // 判斷錯誤訊息 非 undefined
                    if (!$utils().isEmpty(error.value.data) && !$utils().isEmpty(error.value.data.error)) {
                        console.log("error.value.data => ", error.value.statusCode, error.value.data.error.error);
                        // 判斷狀態值為 401 且 錯誤代碼為1014 代表此第三方帳號尚未與 平台帳號綁定
                        if (error.value.statusCode === 401 && error.value.data.error.error === 1014) {
                            router.push({ name: "register-socialMedia-accessToken", params: { socialMedia: "google" }, query: { accessToken: accessToken } });
                            return;
                        }
                        // 停權後導向申訴頁
                        if (error.value.data.error.error === 1009) {
                            // 用來判斷是否已經反應過 要跳轉不同畫面
                            let feedback = error.value.data.has_feedback;
                            router.push({ name: "user-suspend-userId-feedback", params: { userId: error.value.data.banana_id, feedback } });
                            return;
                        }
                    }
                    return;
                }
                // 登入中執行綁定時判斷此 google 帳號已被綁定 不往下執行 並且回傳以綁定的錯誤
                if (isBind) {
                    ElMessage({
                        type: "error",
                        message: "此 Google 帳號已被綁定",
                    });
                    return;
                }
                // 設定使用者資料
                userStore.setUser(data.value.user);
                // 設定已登入
                userStore.setIsAuth(true);
                // 判斷是否為服務商 role = 0 為消費者
                if (data.value.user.role !== 0) {
                    userStore.setIsProvider(true);
                    router.push({ name: "user-providerHome" });
                }
                // 設定 token 到 cookie
                Cookies.set("token", data.value.access_token);
                ElMessage({
                    type: "success",
                    message: "Google 登入成功",
                });
            } catch (err: any) {
                console.log("GoogleLoginAPI => ", err);
            }
        },

        /**
         * google 綁定
         * @param { type String(字串) } accessToken google access token
         * @param { type String(字串) } phone 登入者手機號碼
         */
        async googleBind({ accessToken, phone }: { accessToken: string; phone: string }) {
            const { $api } = useNuxtApp();
            const userStore = useUserStore();
            const apiStore = useApiStore();
            try {
                const { error } = await $api().GoogleOauthBindAPI({ access_token: accessToken, phone });
                if (error.value) {
                    // 判斷第三方帳號被其他平台帳號綁定時 顯示的提示錯誤
                    if (error.value.data.error.error === 1016) {
                        ElMessage({
                            type: "error",
                            message: `此 Google 帳號已被綁定`,
                        });
                        return;
                    }
                    apiStore.errorCallback({ err: { response: error.value.data } });
                    return;
                }
                userStore.getUserProfile();
                ElMessage({
                    type: "success",
                    message: "Google 綁定成功",
                });
            } catch (err: any) {
                console.log("GoogleOauthBindAPI => ", err);
            }
        },

        /**
         * 初始化 google 登入 按鈕
         * @param { type Boolean (布林值) } isBind 判斷是否為 登入中綁定 模式
         */
        initGoogleLoginBtn({ isBind = false }) {
            const userStore = useUserStore();
            const self = this;
            // 初始化 google 登入
            google.accounts.id.initialize({
                client_id: useRuntimeConfig().public.googleAppId,
                callback: handleCredentialResponse,
            });
            // 渲染 按鈕
            google.accounts.id.renderButton(
                document.getElementById("buttonDiv"),
                { type: "icon", size: "large" } // customization attributes
            );
            google.accounts.id.prompt();
            async function handleCredentialResponse(res: any) {
                if (isBind) {
                    await self.googleBind({ accessToken: res.credential, phone: userStore.user.phone });
                    return;
                }
                const payload: { name: string } = jwt_decode(res.credential);
                setStorage("userName", payload.name);
                userStore.setShowLoginDialog(false);
                userStore.setSocialMediaName(payload.name);
                // 取得 google access token 後將token 送去給後端驗證 驗證成功時 執行平台登入
                await self.googleLoginBackend({ accessToken: res.credential, isBind });
            }
        },

        /**
         * line 後端身份驗證 api
         * @param { type String(字串) } token line 登入後的 access_token
         * @param { type String(字串) } routeName 路由導向名稱
         * @param { type Object(物件) } query 路由傳送參數
         * @param { type Boolean(布林)) } isLiff 判斷是否為 Liff 模式
         * @param { type Boolean(布林)) } isBind 判斷是否為 登入中綁定 模式
         * @param { type Boolean(布林) } needSendWelcomeMessage 判斷是否發送歡迎訊息
         */
        async lineLoginBackend({ token, routeName, query = null, isLiff = false, needSendWelcomeMessage = false }: { token: string; routeName: string; query?: any | null; isLiff?: boolean; needSendWelcomeMessage?: boolean }) {
            const { $api, $utils } = useNuxtApp();
            const userStore = useUserStore();
            const apiStore = useApiStore();
            const {
                public: { hostURL, lineAppId },
            } = useRuntimeConfig();
            const router = useRouter();
            let redirect_uri = getStorage("redirect_uri");
            removeStorage("line_login_uuid");
            removeStorage("redirect_uri");
            try {
                const { data, error }: { data: any; error: any } = await $api().LineLoginAPI({ access_token: token });
                if (error.value) {
                    apiStore.errorCallback({ err: { response: error.value.data } });
                    // 判斷錯誤訊息 非 undefined
                    if (!$utils().isEmpty(error.value.data.error)) {
                        // 判斷狀態值為 401 且 錯誤代碼為1014 代表此第三方帳號尚未與 平台帳號綁定
                        if (error.value.statusCode === 401 && error.value.data.error.error === 1014) {
                            // 判斷是否走 liff 瀏覽器
                            if (isLiff) {
                                nextTick(() => {
                                    router.push({ name: "register-socialMedia-accessToken", params: { socialMedia: "line" }, query: { accessToken: token, isLiff: String(isLiff), orderId: query.id } });
                                });
                            } else {
                                nextTick(() => {
                                    router.push({ name: "register-socialMedia-accessToken", params: { socialMedia: "line" }, query: { accessToken: token } });
                                });
                            }
                            return;
                        } else if (error.value.statusCode === 412 && error.value.data.error.error === "n7018") {
                            alert("您尚未加 CityBanana 官方帳號為好友，請重新登入並新增 CityBanana 官方帳號為好友（或解除封鎖）");
                            let uuid = uuidv4();
                            if (redirect_uri == null) {
                                redirect_uri = `${hostURL}`;
                            }
                            setStorage("line_login_uuid", uuid);
                            setStorage("redirect_uri", redirect_uri);
                            let params = {
                                client_id: lineAppId,
                                redirect_uri,
                                response_type: "code",
                                scope: "openid%20profile%20picture%20email%20phone",
                                state: uuid,
                            };
                            let url = "https://access.line.me/oauth2/v2.1/authorize?";
                            url += `client_id=${params.client_id}`;
                            url += `&redirect_uri=${params.redirect_uri}`;
                            url += `&response_type=${params.response_type}`;
                            url += `&scope=${params.scope}`;
                            url += `&state=${params.state}`;
                            url += `&prompt=consent`;
                            url += `&bot_prompt=aggressive`;
                            window.location.href = url;
                            return;
                        }
                    }
                    // 停權後導向申訴頁
                    if (error.value.data.error.error === 1009) {
                        // Message({
                        //     type: "error",
                        //     message: "您已被停權"
                        // });
                        // 用來判斷是否已經反應過 要跳轉不同畫面
                        let feedback = error.value.data.has_feedback;
                        router.push({ name: "user-suspend-userId-feedback", params: { userId: error.value.data.banana_id, feedback } });
                        return;
                    }
                    return;
                }
                // 設定使用者資料
                userStore.setUser(data.value.user);
                // 設定已登入
                userStore.setIsAuth(true);
                // 判斷是否為服務商 role = 0 為消費者
                if (data.value.user.role !== 0) {
                    userStore.setIsProvider(true);
                }
                // 設定 token 到 cookie
                Cookies.set("token", data.value.access_token);
                ElMessage({
                    type: "success",
                    message: "LINE 登入成功",
                });
                // 判斷是否有路由參數
                if (query !== null) {
                    router.push({ name: routeName, query });
                } else {
                    router.push({ name: routeName });
                }
            } catch (err: any) {
                console.log("LineLoginAPI => ", err);
            }
        },
    },
});
