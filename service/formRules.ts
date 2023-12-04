// 日期套件
import moment from "moment";
// 導入 emojiRegex 套件
import emojiRegex from "emoji-regex";

/**
 * 驗證密碼是否輸入正確
 * @param { type String(字串) } value 表單值
 * @param { type Strinr(字串) } password 第一次輸入密碼值
 */
export const useFormCheckPasswordRule = async (value: string, password: string) => {
    if (value === "") {
        return { success: false, message: "驗證密碼為必填" };
    }
    if (value !== password) {
        return { success: false, message: "驗證密碼與新密碼不符合" };
    }
    return { success: true };
};

/**
 * 電子郵件驗證
 * @param { type String(字串) } value 表單值
 */
export const formEmailCheckAlready = async (value: any, api: any) => {
    // 判斷電子郵件是否為空值 或 電子郵件格式是否正確
    if (value !== "" && /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(value)) {
        try {
            const { error }: any = await api.CheckEmailUniqueAPI(value);
            if (error.value) {
                // 判斷電子郵件重覆時 顯示的錯誤
                if (error.value.data.errors.email[0].code == "8003") {
                    return { success: false, message: "此電子郵件已有人使用" };
                }
                return { success: false, message: "電子郵件驗證錯誤" };
            }
            return { success: true };
        } catch (err) {
            return { success: false, message: "電子郵件驗證錯誤" };
        }
    } else {
        return { success: false, message: "錯誤的電子郵件格式" };
    }
};
