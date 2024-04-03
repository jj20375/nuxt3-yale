import { useUserStore } from "~~/store/userStore";
import Cookies from "js-cookie";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const userStore = useUserStore();
    const { $utils } = useNuxtApp();

    const token = Cookies.get("token");
    const route = useRoute();
    if (process.client && $utils().isEmpty(token)) {
        return navigateTo({ name: "auth-login-slug", params: { slug: "會員登入" } });
    }
    // 下面方法會有問題 暫時先移除 用前端倒頁 不做在 middleware 會無限輪迴
    // if (process.client && $utils().isEmpty(token)) {
    //     return navigateTo({ name: "auth-login-slug", params: { slug: "會員登入" } });
    // } else if (!userStore.user.is_verified && token) {
    //     return navigateTo({
    //         path: "/auth/verification/會員中心",
    //         state: { email: userStore.user.email, state: "會員尚未完成驗證" },
    //     });
    // }
});
