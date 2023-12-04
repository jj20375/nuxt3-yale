import { ElMessage } from "element-plus";
import { defineStore } from "pinia";
// const { $utils } = useNuxtApp();

export const useApiStore = defineStore({
    id: "apiStore",
    actions: {
        errorCallback(data: { err: any; messageType?: "error" | "success" | "info" | "warning"; callback?: any }) {
            console.log("apiStore =>", data.err);
            // if (useNuxtApp().$utils().isEmpty(data.err.response)) {
            //     return ElMessage({
            //         type: "error",
            //         message: "系統內部錯誤",
            //     });
            // }
            // if (!data.err.response.hasOwnProperty("error")) {
            //     return ElMessage({
            //         type: "error",
            //         message: "系統內部錯誤",
            //     });
            // }
            // if (data.err.response.message === "Unauthenticated.") {
            //     return ElMessage({
            //         type: "error",
            //         message: "token 失效",
            //     });
            // }
            // if (data.err.response === undefined || data.err.response.error === undefined) {
            //     return ElMessage({
            //         type: "error",
            //         message: "系統內部錯誤",
            //     });
            // }
            // // 判斷有無傳入 callback
            // if (typeof data.callback === "function") {
            //     // 判斷有無錯誤代碼
            //     if (!useNuxtApp().$utils().isEmpty(data.err.response.error.error)) {
            //         return data.callback();
            //     }
            //     // 沒有錯誤代碼時回傳系統錯誤
            //     return ElMessage({
            //         type: "error",
            //         message: "系統內部錯誤",
            //     });
            // }
            // // 判斷有無錯誤代碼
            // if (!useNuxtApp().$utils().isEmpty(data.err.response.error.error)) {
            //     if (i18nStore.errorMessages[data.err.response.error.error] === undefined) {
            //         return ElMessage({
            //             type: "error",
            //             message: "尚未建立錯誤語系檔",
            //         });
            //     }

            //     return ElMessage({
            //         type: data.messageType ?? "error",
            //         message: i18nStore.errorMessages[data.err.response.error.error].message[i18nStore.locale],
            //     });
            // }
            // 沒有錯誤代碼時回傳系統錯誤
            return ElMessage({
                type: "error",
                message: "系統內部錯誤",
            });
        },
    },
});
