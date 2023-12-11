import { useUserStore } from "~~/store/userStore";
import Cookies from "js-cookie";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const userStore = useUserStore();
    const { $utils } = useNuxtApp();
    useState<boolean>("loading", () => true);

    const token = Cookies.get("token");
    console.log("user middleware");

    if (!$utils().isEmpty(token)) {
        // await userStore.getUserProfile();
    }
    return;
});
