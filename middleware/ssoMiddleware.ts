import { useUserStore } from "~~/store/userStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const userStore = useUserStore();
    if (!userStore.ssoLogingData) {
        return navigateTo({ name: 'auth-login-slug', params: { slug: '會員登入' } });
    }
});
