import { useUserStore } from "~~/store/userStore";
import { storeToRefs } from "pinia";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const userStore = useUserStore();
    const { isAuth, user } = storeToRefs(userStore);
    const token = useCookie("token");

    if (token.value) {
        return userStore.getUserProfile();
    }
});
