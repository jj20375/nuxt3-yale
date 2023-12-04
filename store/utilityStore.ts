import { ElMessage } from "element-plus";
import { defineStore } from "pinia";
export const useUtilityStore = defineStore({
    id: "utilityStore",

    state: (): any => {
        return {
            // 判斷是否固定螢幕
            needFixed: false,
            // ui 顯示設定資料
            uiSettingDatas: {
                enable_sales_to_fee: false,
            },
        };
    },
    getters: {
        // 目前更改螢幕固定狀態
        isFixed: (state) => state.needFixed,
    },
    actions: {
        // 設定是否需要固定螢幕
        setFixed(val: boolean) {
            this.needFixed = val;
        },
        // 設定 ui 顯示資料
        setUiSettingDatas(val: any) {
            this.uiSettingDatas = val;
        },
        /**
         * 取得前台顯示設定資料
         * @param {*} param0
         */
        async getClientUiSetting() {
            const { $api }: any = useNuxtApp();
            try {
                const { data, error }: any = await $api().GetClientUiSettingAPI();
                if (error.value) {
                    console.log("GetClientUiSettingAPI => ", error.value);
                    ElMessage({
                        type: "error",
                        message: "取得畫面顯示設定失敗",
                    });
                    return;
                }
                if (data.value !== null) {
                    this.setUiSettingDatas(data.value.data);
                }
                console.log("GetClientUiSwitchSettingAPI => ", data.value);
            } catch (err) {
                console.log("GetClientUiSettingAPI =>", err);
            }
        },
    },
});
