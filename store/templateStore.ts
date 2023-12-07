import { defineStore } from "pinia";
import Cookies from "js-cookie";
export const useTemplateStore = defineStore({
    id: "templateStore",
    state: (): any => {
        return {
            // 預設版型
            showTemplate: null,
            // 客戶端網址
            siteDomain: null,
            // 網站名稱
            siteName: null,
            // logo 網址
            logoUrl: null,
            // footer 資料
            footerDatas: [],
            // 服務商列表紀錄滾輪位置
            firstIn: true,
            // 目前選軸滾動位置高度
            scrollY: 0,
            // 首頁選單判斷是否固定跟出現白底
            isHomeMenuFixed: false,
        };
    },
    getters: {
        newTmp: (state) => {
            return state.showTemplate;
        },
    },
    actions: {
        // 設定樣板
        setTemplate(val: string) {
            Cookies.get("template");
            this.showTemplate = val;
        },
        // 設定網址
        setSiteDomain(val: string) {
            this.siteDomain = val;
        },
        // 設定網站名稱
        setSiteName(val: string) {
            this.siteName = val;
        },
        // 設定 logo 網址
        setLogoUrl(val: string) {
            this.logoUrl = val;
        },
        // 設定 footer 資料
        setFooterDatas(val: any) {
            this.footerDatas = val;
        },
        // 設定是否已經有暫存服務商列表資料
        setFirstIn(val: boolean) {
            this.firstIn = val;
        },
        // 設定服務商列表紀錄滾輪位置
        setScrollY(val: 0) {
            this.scrollY = val;
        },
        // 設定 首頁選單固定
        setHomeMenuFixed(val: boolean) {
            this.isHomeMenuFixed = val;
        },
    },
});
