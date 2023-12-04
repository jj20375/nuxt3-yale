import { useUserStore } from "~~/store/userStore";
import Cookies from "js-cookie";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const userStore = useUserStore();
    const { $utils } = useNuxtApp();

    const token = Cookies.get("token");

    // return navigateTo("/", { redirectCode: 301 });
});
