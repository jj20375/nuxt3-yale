import { useUserStore } from "~~/store/userStore";
import { useShoppingCarStore } from "~~/store/shoppingCarStore";
import { storeToRefs } from "pinia";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const { $shoppingCarService } = useNuxtApp();
    const userStore = useUserStore();
    const shoppingCarStore = useShoppingCarStore();
    const { isAuth, user } = storeToRefs(userStore);
    const token = useCookie("token");

    if (token.value && !isAuth) {
        return userStore.getUserProfile();
    } else {
        if (process.client) {
            shoppingCarStore.setShoppingCar($shoppingCarService().getShoppingCar() ?? []);
            shoppingCarStore.setShoppingCustomCar($shoppingCarService().getCustomProductShoppingCar() ?? []);
        }
    }
});
