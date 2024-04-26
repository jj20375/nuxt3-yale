import { defineStore } from "pinia";
import { UserInterface } from "~/interface/user.d";
import Cookies from "js-cookie";
import { ElMessage } from "element-plus";
import { useApiStore } from "./apiStore";
import { useShoppingCarStore } from "~/store/shoppingCarStore";
import { removeStorage } from "~/service/localstorage";

interface State {
    user: UserInterface;
}
export const useUserStore = defineStore({
    id: "userStore",
    persist: true,
    state: (): State | any => {
        return {
            name: "userStore",
            // 判斷是否登入
            isAuth: false,
            // 使用者資料
            user: {},
            // 判斷 401
            checkStatus401: false,
            // 判斷是否打開登入彈窗
            showLoginDialog: false,
            // 第三方登入使用者名稱
            socialMediaName: null,
            // 第三方登入使用者名稱
            ssoLogingData: null,
            // loading
            loading: false,
        };
    },
    getters: {},
    actions: {
        // 設定為登入
        setIsAuth(val: boolean) {
            this.isAuth = val;
            console.log(this.isAuth, "this.isAuth ");
        },
        // 設定使用者資料
        setUser(val: State) {
            this.user = val;
        },
        // 設定是否為第三方登入
        setIsOtherLogin(val: boolean) {
            this.isOtherLogin = val;
        },
        // 設定 401 狀態
        setCheckStatus401(val: boolean) {
            this.checkStatus401 = val;
        },
        // 設定打開登入彈窗
        setShowLoginDialog(val: boolean) {
            this.showLoginDialog = val;
        },
        // 設定 第三方登入者名稱
        setSocialMediaName(val: string) {
            this.socialMediaName = val;
        },

        // 取得使用者資料
        async getUserProfile() {
            const { $api, $shoppingCarService, $utils }: any = useNuxtApp();
            const shoppingCarStore = useShoppingCarStore();

            // 判斷有使用者資料時 無需請求
            if (Cookies.get("token") && $utils().isEmpty(this.user)) {
                try {
                    this.loading = true;
                    const { data, error }: { data: any; error: any } = await $api().GetUserProfileAPI();
                    this.loading = false;
                    // 判斷 api 錯誤
                    if (error.value) {
                        console.log("取得使用者資料失敗=>", error);
                        this.setUser({});
                        this.setIsAuth(false);
                        // ElMessage({
                        //     type: "error",
                        //     message: "取得使用者資料失敗",
                        // });
                        return;
                    }
                    if (data.value === null) {
                        data.value = {};
                    }
                    this.setUser(data.value.data);
                    this.setIsAuth(true);
                    const shoppingCar = $shoppingCarService().getShoppingCar();
                    const customProductShoppingCar = $shoppingCarService().getCustomProductShoppingCar();

                    // 判斷購物車有資料時無需請求
                    if (!shoppingCar) {
                        await shoppingCarStore.getUserShopping();
                    }
                    // 判斷訂製商品購物車有資料時無需請求
                    if (!customProductShoppingCar) {
                        await shoppingCarStore.getUserCustomShoppingCar();
                    }
                    // shoppingCarStore.syncCustomCart();
                } catch (err) {
                    this.removeLoginData();
                    console.log("GetUserProfileAPI => ", err);
                }
            }
        },
        // 重新取得使用者資料
        async reGetUserProfile() {
            const { $api, $shoppingCarService, $utils }: any = useNuxtApp();
            const shoppingCarStore = useShoppingCarStore();

            // 判斷有使用者資料時 無需請求
            if (Cookies.get("token")) {
                try {
                    this.loading = true;
                    const { data, error }: { data: any; error: any } = await $api().GetUserProfileAPI();
                    this.loading = false;
                    // 判斷 api 錯誤
                    if (error.value) {
                        console.log("取得使用者資料失敗=>", error);
                        this.setUser({});
                        this.setIsAuth(false);
                        // ElMessage({
                        //     type: "error",
                        //     message: "取得使用者資料失敗",
                        // });
                        return;
                    }
                    if (data.value === null) {
                        data.value = {};
                    }
                    this.setUser(data.value.data);
                    this.setIsAuth(true);
                    const shoppingCar = $shoppingCarService().getShoppingCar();
                    const customProductShoppingCar = $shoppingCarService().getCustomProductShoppingCar();

                    // 判斷購物車有資料時無需請求
                    if (!shoppingCar) {
                        await shoppingCarStore.getUserShopping();
                    }
                    // 判斷訂製商品購物車有資料時無需請求
                    if (!customProductShoppingCar) {
                        await shoppingCarStore.getUserCustomShoppingCar();
                    }
                    // shoppingCarStore.syncCustomCart();
                } catch (err) {
                    this.removeLoginData();
                    console.log("GetUserProfileAPI => ", err);
                }
            }
        },
        // 登出使用者
        async logOutUser(userId: string | null) {
            const { $api }: any = useNuxtApp();
            try {
                // const { error } = await $api().LogoutUserAPI();
                // if (error.value !== null) {
                //     console.log("登出失敗 =>", error);
                //     ElMessage({
                //         type: "error",
                //         message: "登出失敗",
                //     });
                //     return;
                // }
                this.removeLoginData(userId);
            } catch (err) {
                console.log("LogoutUserAPI => ", err);
            }
        },
        // 移除登入資料
        removeLoginData(userId: string | null = null) {
            const $config = useRuntimeConfig();
            const router = useRouter();
            const { $shoppingCarService } = useNuxtApp();
            const shoppingCarStore = useShoppingCarStore();
            this.setIsAuth(false);
            this.setUser({});
            Cookies.remove("token");
            console.log("logout");
            if (process.client) {
                // 清除購物車
                shoppingCarStore.clearShoppingCar();
                // 清空訂製門扇商品購物車
                $shoppingCarService().removeCustomProductShoppingCar();
                // 清空一般商品購物車
                $shoppingCarService().removeShoppingCar();
                router.push({ name: "auth-login-slug", params: { slug: "會員登入" } });
                // window.location.href = $config.public.hostURL;
            }
        },
    },
});
