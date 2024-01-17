import { useUserStore } from "@/store/userStore";
import Cookies from "js-cookie";
export function useMyFetch<T>(url: string, opts: any) {
    const userStore = useUserStore();
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
            console.log(token, options, "http-request toekn");
            if (token && opts.headers === undefined) {
                options.headers = { Authorization: `Bearer ${token}`, Accept: "application/json" };
            }
        },

        onRequestError: ({ request, options, error }) => {
            if (error) {
                Promise.reject(error);
            }
        },
        onResponse: ({ response, error }) => {
            console.log("onResponse error=>", error, response);
            if (error) {
                Promise.reject(error);
            } else if (response.status >= 400) {
                console.log("onResponse2 error=>", error, response);
                Promise.reject(response);
            } else {
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
            if (response.status == 401 && response._data.message === "Unauthenticated.") {
                userStore.setIsAuth(false);
                userStore.setUser({});
                userStore.setCheckStatus401(true);
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
