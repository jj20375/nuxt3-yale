import { useUserStore } from "~/store/userStore";
import Cookies from "js-cookie";
import { useShoppingCarStore } from "~/store/shoppingCarStore";
export function useMyFetch<T>(url: string, opts: any) {
    const userStore = useUserStore();
    const shoppingCarStore = useShoppingCarStore();
    const router = useRouter();
    console.log(url, opts, "url");
    return useFetch<T>(url, {
        // onResponse: transFormResponse,
        onRequest: ({ request, options }) => {
            // alert(JSON.stringify(request));
            // alert(JSON.stringify(opts));
            if (opts.headers !== undefined) {
                // 判斷 未傳送 Authorization key 時才觸發
                if (opts.headers.Authorization !== undefined) {
                    return;
                }
                return;
            }
            // const token = useCookie("token");
            const token = Cookies.get("token");
            if (token && opts.headers === undefined) {
                console.log("jwt token => ", token);
                options.headers = { Authorization: `Bearer ${token}`, Accept: "application/json" };
            }
        },

        onRequestError: ({ request, options, error }) => {
            if (error) {
                Promise.reject(error);
            }
        },
        onResponse: ({ response, error }) => {
            if (error) {
                Promise.reject(error);
            } else if (response.status >= 400) {
                console.log("onResponse error=>", error, response);
                Promise.reject(response);
            } else {
                // console.log("onResponse success=>", response);
                Promise.resolve(response);
            }
        },
        onResponseError({ request, response, options }) {
            // alert("options");
            // alert(JSON.stringify(options));
            // alert("response");
            // alert(JSON.stringify(response));
            // alert("request");
            // alert(JSON.stringify(request));
            console.log("onResponseError=>", response);
            if (response.status == 401 || response._data.message === "Unauthenticated.") {
                userStore.setIsAuth(false);
                userStore.setUser({});
                userStore.setCheckStatus401(true);
                userStore.removeLoginData();
                // 移除 token
                Cookies.remove("token");
                // 移除 refresh token time
                Cookies.remove("tokenRefreshTime");
                // 移除 firebase refresh token time
                Cookies.remove("firebaseTokenRefreshTime");
                // 移除 邀請好友分享碼
                Cookies.remove("registerInvitationCode");
                // console.log(error);
                router.push({ name: "index" });
            }
        },
        // lazy: true,
        ...opts,
    });
}
