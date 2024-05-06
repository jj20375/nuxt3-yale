// 日期套件
import moment from "moment";
import CryptoJS from "crypto-js";

import { setStorage, getStorage, removeStorage } from "~/service/localstorage";
//判斷是否為空值或空物件
export const isEmpty = (value: any) => {
    return value === undefined || value === null || (typeof value === "object" && Object.keys(value).length === 0) || (typeof value === "string" && value.trim().length === 0) || value.length === 0;
};

/**
 * 判斷表單是否有輸入值
 * @param { type = Array  傳入要搜尋條件得陣列值 } val
 * @param { type = Array  傳入要搜尋條件所匹配的key } key
 * @param { type = String 傳入要回傳的物件變數 } objVar
 */
export const checkHaveSelectData = function (val: any, key: any, objVar: object) {
    val.forEach((item: any, index: never) => {
        if (isEmpty(item)) {
            delete objVar[key[index]];
        } else {
            objVar[key[index]] = item;
            console.log("objVar => ", objVar);
            return objVar;
        }
    });
};

/**
 * 判斷字元過長就出現...
 * @param { type String(字串) 要過濾的文字 } val
 * @param { type Number(數字) 要過濾的文字長度 } num
 */
export const subString = (val: string, num: number) => {
    // 判斷為 null 或 undefined 時 給空字串 否則為預設值
    let data = isEmpty(val) ? "" : val;
    if (data.length > num) {
        return data.substring(0, num) + "...";
    }
    return data;
};

// 貨幣判斷三位數增加逗號
export const formatCurrency = function (val: number) {
    let result = Math.floor(val * 100) / 100;
    let num = result.toString().replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, function (all, pre, groupOf3Digital) {
        return pre + groupOf3Digital.replace(/\d{3}/g, ",$&");
    });
    return num == "NaN" ? 0 : num;
};

//產生隨機數
export const getRandom = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * 判斷表單是否有值 如果沒有必須值 需 disabled 按鈕
 * @param { type Array(陣列) } formKeys 表單key
 * @param { type Object(物件) } form 表單資料
 */
export const checkFormDataNeedDisabled = (formKeys: string[], form: any) => {
    let isDisabled = false;
    // 沒有輸入資料的欄位 key
    let notHaveKey = [];
    formKeys.forEach((item: any) => {
        // 判斷是否有傳送表單key 且 這個值沒有 empty
        if (!form.hasOwnProperty(item) || isEmpty(form[item])) {
            notHaveKey.push(item);
            isDisabled = true;
        }
        // 判斷是否有傳送表單key
        if (form.hasOwnProperty(item)) {
            // 判斷是否有未傳送的指定 key 如果有的話 還是會讓 disabled 狀態無法解除
            isDisabled = notHaveKey.length > 0 ? true : false;
        }
    });
    return isDisabled;
};

/**
 * 判斷是否為 android 手機
 */
export const isAndroidDevice = () => {
    if (process.client) {
        // Get the user agent
        let userAgent = window.navigator.userAgent;

        // 驗證是否為 android
        let regex = new RegExp(/android/i);

        if (regex.test(userAgent)) {
            return true;
        }
        return false;
    }
};

// 將信用卡卡號 參數值 每四位數 加上空白
export const formatCardNumber = (value: any) => {
    return value ? value.match(/.{1,4}/g).join(" ") : "";
};

// 將信用卡卡號 參數值 每二位數 加上 "/" 斜線
export const formatEXP = (value: any) => {
    return value
        .replace(
            /^([1-9]\/|[2-9])$/g,
            "0$1" // 3 > 03/
        )
        .replace(
            /^(0[1-9]|1[0-2])$/g,
            "$1" // 11 > 11/
        )
        .replace(
            /^([0-1])([3-9])$/g,
            "0$1/$2" // 13 > 01/3
        )
        .replace(
            /^(0?[1-9]|1[0-2])([0-9]{2})$/g,
            "$1/$2" // 141 > 01/41
        )
        .replace(
            /^([0]+)\/|[0]+$/g,
            "0" // 0/ > 0 and 00 > 0
        )
        .replace(
            /[^\d\/]|^[\/]*$/g,
            "" // To allow only digits and `/`
        )
        .replace(
            /\/\//g,
            "/" // Prevent entering more than 1 `/`
        );
};

export const formatDateTime = (val: Date | string) => {
    // 判斷時間格式是否需要
    return moment(val).format("YYYY/MM/DD HH:mm:ss");
};

// 將日期格式轉換
export const formatToDate = (val: Date | string) => {
    // 判斷時間格式是否需要
    return moment(val).format("YYYY/MM/DD");
};

// 轉換日期格式成月份
export const formatToMonth = (val: Date | string) => {
    // 判斷時間格式是否需要
    return moment(val).format("MM");
};
// 轉換日期格式成日期號碼
export const formatToDay = (val: Date | string) => {
    // 判斷時間格式是否需要
    return moment(val).format("DD");
};

// 轉換日期格式成年月份
export const formatToYearMonth = (val: Date | string) => {
    // 判斷時間格式是否需要
    return moment(val).format("YYYY年MM月");
};

// 顯示月日 小時：分
export const formatToMonthAndDayTime = (val: any) => {
    // 判斷沒有時間時回傳空值
    if (val === 0 || val === undefined || val === null) {
        return null;
    }
    // 判斷時間格式是否需要
    return moment(val).format("MM/DD HH:mm");
};

// 取得月份加日期
export const formatToMonthAndDay = (val: any) => {
    return moment(val).format("MM / DD");
};

// 取得 小時 加 分
export const formatToHourAndMinute = (val: any) => {
    return moment(val).format("HH : mm");
};

// 計算千位數轉成k方式顯示
export const formatMillion = (val: any) => {
    // 判斷沒有值時 不執行
    if (val === undefined) {
        return;
    }
    // 判斷大於 1000時 將數字轉換成 k單位
    if (val >= 1000000) {
        const k = parseInt(String(val / 1000));
        const num = k.toString().replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, function (all: any, pre: any, groupOf3Digital: any) {
            return pre + groupOf3Digital.replace(/\d{3}/g, ",$&");
        });
        return num + "K";
    }
    // 一般情況下超過千位數 加上一個逗號
    const num = val.toString().replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, function (all: any, pre: any, groupOf3Digital: any) {
        return pre + groupOf3Digital.replace(/\d{3}/g, ",$&");
    });
    return num;
};

/**
 * 判斷是否為 image 的 file
 * @param { type String(字串) } type 檔案類型
 */
export const isImageType = (type: string) => {
    switch (type) {
        case "image/jpeg":
            return true;
        case "image/jpg":
            return true;
        case "image/png":
            return true;
        case "image/gif":
            return true;
        default:
            return false;
    }
};

/**
 * 判斷是否為 video 的 file
 * @param { type String(字串) } type 檔案類型
 */
export const isVideoType = (type: string) => {
    switch (type) {
        case "video/mp4":
            return true;
        case "video/avi":
            return true;
        case "video/msvideo":
            return true;
        case "video/x-msvideo":
            return true;
        case "video/quicktime":
            return true;
        case "video/x-ms-wmv":
            return true;
        default:
            return false;
    }
};

/**
 * 儲存麵包屑值
 */
export const saveBreadcrumbsData = (datas: any) => {
    setStorage("breadcrumbs", datas);
};

/**
 * 取得麵包屑值
 */
export const getBreadcrumbsData = () => {
    return getStorage("breadcrumbs");
};

/**
 * 開啟新視窗
 */
export const openNewWindow = (url: string | URL | undefined, pageWidth = 500, pageHeight = 500) => {
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    // 計算居中所需的左上角座標
    const left = (screenWidth - pageWidth) / 2 + dualScreenLeft;
    const top = (screenHeight - pageHeight) / 2 + dualScreenTop;

    window.open(url, "newwindow", `height=${pageHeight}, width=${pageWidth}, left=${left}, top=${top}`);
};

/**
 * 訂單狀態
 */
export const orderStatus = (status: string) => {
    switch (status) {
        case "unpaid":
            return "未付款";
        case "paid":
            return "已付款";
        case "process":
            return "處理中";
        case "shipped":
            return "已出貨";
        case "cancel":
            return "已取消";
        case "waiting_refund":
            return "待退款";
        case "refund":
            return "已退款";
        case "return":
            return "已退貨";
        case "complete":
            return "訂單完成";
        case "waiting_deposit":
            return "待付訂金";
        case "deposited":
            return "已付訂金";
        case "measure_dispatch":
            return "丈量派工中";
        case "measure_complete":
            return "丈量完成";
        case "waiting_final_payment":
            return "待付尾款";
        case "final_payment":
            return "已付尾款";
        case "door_finish":
            return "門扇製作完成";
        case "install_dispatch":
            return "安裝派工中";
        case "install_complete":
            return "安裝完成";
        default:
            return "";
    }
};

/**
 * 發票狀態
 */
export const receiptStatus = (status: string) => {
    switch (status) {
        case "unissued":
            return "未開立";
        case "issued":
            return "已開立";
        case "cancelled":
            return "已作廢";
        case "issued_failed":
            return "開立失敗";
        case "cancelled_failed":
            return "作廢失敗";
        default:
            return "";
    }
};

/**
 * 手機格式轉換
 */
export const cellphoneFormat = (phone: string) => {
    // 移除所有非數字字符
    const sanitizedValue = phone.replace(/\D/g, "");
    // 將數字格式化為 XXXX-XXX-XXX 的形式
    const formatted = sanitizedValue.replace(/(\d{4})(\d{3})(\d{3})/, "$1-$2-$3");

    return formatted;
};

/**
 * 解密網址判斷是否可以查看非維護狀態中的網站
 */
export const decryptData = ({ hashData, randData }: any) => {
    const encryptData = hashData as string;
    const key = CryptoJS.enc.Utf8.parse(randData.slice(0, 32) as string);
    const iv = CryptoJS.enc.Utf8.parse(randData.slice(32, 48) as string);

    const decryptData = CryptoJS.AES.decrypt(encryptData, key, {
        mode: CryptoJS.mode.CBC,
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
    });
    return decryptData.toString(CryptoJS.enc.Utf8);
};
