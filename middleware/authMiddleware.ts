import { useUserStore } from "~~/store/userStore";
import Cookies from "js-cookie";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const userStore = useUserStore();
    const { $utils } = useNuxtApp();

    const token = Cookies.get("token");

    if (process.client && $utils().isEmpty(token)) {
        return navigateTo({ name: 'auth-login-slug', params: { slug: '會員登入' } });
    } else if (!userStore.user.is_verified) {
        return navigateTo({
            path: "/auth/verification/會員中心",
            state: { email: userStore.user.email, state: '會員尚未完成驗證' }
        });
    }
});
