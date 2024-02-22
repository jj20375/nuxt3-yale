import { useUserStore } from "~~/store/userStore";
import { storeToRefs } from "pinia";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const userStore = useUserStore();
    const { isAuth ,user } = storeToRefs(userStore);
    const token = useCookie("token");

    console.log('userMiddleware',isAuth.value , user.value)

    if(token.value && !isAuth.value) {
        return userStore.getUserProfile();
    }
    
});
