import { useUserStore } from "~~/store/userStore";
import Cookies from "js-cookie";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const userStore = useUserStore();
    await userStore.reGetUserProfile();

    if (process.client && userStore.user.is_verified) {
        return navigateTo({ name: "auth-panel-slug", params: { slug: "user-panel" } });
    }
});
