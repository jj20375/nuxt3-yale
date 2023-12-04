import axios from "axios";
// js 設定 cookie 方法
import Cookies from "js-cookie";
import moment from "moment";
import { isEmpty } from "./utils";

// 重取 api token
export const refreshApiToken = async () => {
    // // 取得現在時間
    const nowTime = moment().valueOf();
    // 取得 refresh token 時間
    const refreshTime = Number(Cookies.get("tokenRefreshTime"));
    // 判斷沒有refresh token 時間不執行
    if (isEmpty(refreshTime)) {
        return;
    }
    // 判斷現在時間小於 refresh token 時間不執行
    if (nowTime < refreshTime) {
        return;
    }
    try {
        // api 網址
        const apiConfig = process.env.API_CONFIG;
        // 重取 token 方法
        const { data } = await axios.post(
            `${apiConfig}/auth/refresh`,
            {},
            {
                headers: {
                    Authorization: "Bearer " + Cookies.get("token"),
                },
            }
        );
        /**
         * 設定重取 token 時間 以及更新目前 token 因為非同步問題 有可能導致時間還沒更新
         * 又觸發此條件 因此等待設定完後才能往下執行
         */
        const setTokenAndRefreshTime = function (): Promise<void> {
            return new Promise((resolve) => {
                // 設定 新的 token
                Cookies.set("token", data.access_token);
                // 設定 refresh token 時間
                Cookies.set("tokenRefreshTime", String(moment().add(7, "days").valueOf()));
                resolve();
            });
        };
        await setTokenAndRefreshTime();
        return;
    } catch (err) {
        // Message({
        //     type: "error",
        //     message: "重取token失敗"
        // });
        // 移除 refresh api token
        Cookies.remove("tokenRefreshTime");
        // 移除  refresh firebase token 時間
        Cookies.remove("firebaseTokenRefreshTime");
        return;
    }
};

/**
 * 重取 firebase token
 * @returns
 */
export const setRefreshFirebaseTokenTime = async (): Promise<void> => {
    try {
        // 設定重取 token 時間 因為非同步問題 有可能導致時間還沒更新 又觸發此條件 因此等待設定完後才能往下執行
        const setRefreshTime = function (): Promise<void> {
            return new Promise((resolve) => {
                Cookies.set("firebaseTokenRefreshTime", String(moment().add(30, "minutes").valueOf()));
                resolve();
            });
        };
        await setRefreshTime();
        return;
    } catch (err) {
        // 移除 refresh api token
        Cookies.remove("tokenRefreshTime");
        // 移除  refresh firebase token 時間
        Cookies.remove("firebaseTokenRefreshTime");
        // Message({
        //     type: "error",
        //     message: "重取firebasetoken失敗"
        // });
        return;
    }
};
