import { defineStore } from "pinia";
import { UserInterface } from "~/interface/user.d";
import Cookies from "js-cookie";
import { ElMessage } from "element-plus";
import { useApiStore } from "./apiStore";
interface State {
    user: UserInterface;
}
export const useUserStore = defineStore({
    id: "userStore",
    state: (): State | any => {
        return {
            name: "userStore",
            // 判斷是否登入
            isAuth: false,
            // 使用者資料
            user: {
                wallet: {
                    balance: 0,
                },
                social: {},
                acceptable_activities: {},
                experienced_skills: {},
            },
            // 判斷是否呈現供給者樣板
            isProvider: false,
            // 首頁上方搜尋條件資料
            searchValue: {},
            // 判斷 401
            checkStatus401: false,
            // 判斷是否打開登入彈窗
            showLoginDialog: false,
            // 第三方登入使用者名稱
            socialMediaName: null,
            // 判斷是否為訪客
            isVisitor: false,
            // 個人資料頁標題
            profileTitle: "個人資料設定",
            // 顯示個人資料頁組件
            showProfileComponent: "MobileAccountSetMenus",
            // 個人資料更新表單 key
            profileFormKeys: [],
        };
    },
    getters: {
        realTimeName: (state) => state.name,
        showUserAvatar: (state) => {
            // 判斷沒有大頭照時給預設圖
            if (state.user.avatar === undefined) {
                const cover = "https://cdn-dev.citybanana.com/user/cover";
                return state.user.gender === "male" ? cover + "/male_default.png" : cover + "/female_default.png";
            }
            /**
             * 判斷是使用者為男性且為男性預設大頭照時 給未縮圖版本大頭照
             * （因為縮圖機制為非同步因此需要處理時間為了避免使用者誤會大頭照傳送失敗因此多此機制判斷
             * 縮圖未完成時拿未縮圖版本大頭照)
             */
            if (state.user.gender === "male" && /male_default.png/g.test(state.user.thumbnails.avatar["360x360"])) {
                // 判斷沒有大頭照時給預設圖
                if (state.user.avatar === undefined) {
                    return "https://cdn-dev.citybanana.com/user/cover/male_default.png";
                }
                return state.user.avatar;
            }
            /**
             * 判斷是使用者為女性且為女性預設大頭照時 給未縮圖版本大頭照
             * （因為縮圖機制為非同步因此需要處理時間為了避免使用者誤會大頭照傳送失敗因此多此機制判斷
             * 縮圖未完成時拿未縮圖版本大頭照)
             */
            if (state.user.gender === "female" && /female_default.png/g.test(state.user.thumbnails.avatar["360x360"])) {
                // 判斷沒有大頭照時給預設圖
                if (state.user.avatar === undefined) {
                    return "https://cdn-dev.citybanana.com/user/cover/female_default.png";
                }
                return state.user.avatar;
            }
            return state.user.thumbnails.avatar["360x360"];
        },
    },
    actions: {
        showName() {
            return this.name;
        },
        // 設定為登入
        setIsAuth(val: boolean) {
            this.isAuth = val;
            console.log(this.isAuth, "this.isAuth ");
        },
        // 設定使用者資料
        setUser(val: State) {
            this.user = val;
        },
        // 設定供給者是否為供給者樣板
        setIsProvider(val: boolean) {
            this.isProvider = val;
        },
        // 設定首頁上方搜尋條件資料
        setSearchValue(val: object) {
            this.searchValue = val;
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
        // 設定 是否為訪客
        setIsVisitor(val: boolean) {
            this.isVisitor = val;
        },
        // 設定個人資料頁標題
        setProfileTitle(val: string) {
            this.profileTitle = val;
        },
        // 設定個人資料頁顯示組件
        setShowProfileComponent(val: string) {
            this.showProfileComponent = val;
        },
        // 更新個人資料表單 form keys
        setProfileFormKeys(val: [string]) {
            this.profileFormKeys = val;
        },
        // 取得使用者資料
        async getUserProfile() {
            const { $api }: any = useNuxtApp();
            if (Cookies.get("token")) {
                try {
                    const { data, error }: { data: any; error: any } = await $api().GetUserProfileAPI();
                    // 判斷 api 錯誤
                    if (error.value) {
                        console.log("取得使用者資料失敗=>", error);
                        this.setUser({});
                        this.setIsProvider(false);
                        this.setIsAuth(false);
                        ElMessage({
                            type: "error",
                            message: "取得使用者資料失敗",
                        });
                        return;
                    }
                    if (data.value === null) {
                        data.value = {};
                    }
                    this.setUser(data.value);
                    this.setIsAuth(true);
                    // 判斷是否為服務商 role = 0為消費者
                    if (data.value.role !== 0) {
                        this.setIsProvider(true);
                    }
                } catch (err) {
                    console.log("GetUserProfileAPI => ", err);
                }
            }
        },
        // 登出使用者
        async logOutUser(userId: string | null) {
            const { $api }: any = useNuxtApp();
            try {
                const { error } = await $api().LogoutUserAPI();
                if (error.value !== null) {
                    console.log("登出失敗 =>", error);
                    ElMessage({
                        type: "error",
                        message: "登出失敗",
                    });
                    return;
                }
                // 移除註冊分享連結代碼
                Cookies.remove("registerInvitationCode");
                this.removeLoginData(userId);
            } catch (err) {
                console.log("LogoutUserAPI => ", err);
            }
        },
        // 移除登入資料
        removeLoginData(userId: string | null = null) {
            const $config = useRuntimeConfig();
            const router = useRouter();
            if (process.client) {
                window.location.href = $config.public.hostURL;
            }
        },
    },
});
