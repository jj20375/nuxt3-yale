import { InternalRuleItem } from "async-validator/dist-types/interface";
import { getNumberType, isValidPhoneNumber } from "libphonenumber-js";
import parseMobile from "libphonenumber-js/mobile";
import { parsePhoneNumber } from "awesome-phonenumber";

//密碼驗證
export const validatePassword = (rule: InternalRuleItem, value: string, callback: (error?: string | Error) => void) => {
    if (value) {
        const reg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?\/\\~-]{8,}$/;
        if (!reg.test(value)) {
            callback(new Error());
        } else {
            callback();
        }
    } else {
        callback();
    }
};

//email驗證
export const validateEmail = (rule: InternalRuleItem, value: string, callback: (error?: string | Error) => void) => {
    if (value) {
        const reg = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
        if (!reg.test(value)) {
            callback(new Error());
        } else {
            callback();
        }
    } else {
        callback();
    }
};

//台灣手機號碼驗證：只能10碼 & 09開頭
export const validateTWMobileNumber = (rule: InternalRuleItem, value: string, callback: (error?: string | Error) => void) => {
    if (value) {
        if (isValidPhoneNumber(value, "TW") && parseMobile(value, "TW").getType() === "MOBILE") {
            callback();
        } else {
            callback(new Error());
        }
    } else {
        callback();
    }
};

//台灣電話號碼驗證
export const validateTelephoneNumber = (
    rule: InternalRuleItem,
    value: string,
    callback: (error?: string | Error) => void
) => {
    if (value) {
    const pn = parsePhoneNumber(value, { regionCode: "TW" });
    if (!pn.typeIsMobile && pn.valid) {
        callback();
    } else {
        callback(new Error());
    }
    } else {
        callback();
    }
};

// 陣列數量(3到5個)
export const validatePhotoArrayLength = (rule: InternalRuleItem, value: string, callback: (error?: string | Error) => void) => {
    if (Array.isArray(value) && value.length >= 3 && value.length <= 5) {
        callback();
    } else {
        callback(new Error("照片數量需3~5張"));
    }
};

// 愛心捐款碼驗證
export const validateDonationCode = async (rule: InternalRuleItem, value: string, callback: (error?: string | Error) => void) => {
    const { $api, $utils } = useNuxtApp();
    if (!$utils().isEmpty(value)) {
        try {
            const { error } = await $api().ValidatorDonationCodeAPI({ donation_code: value });
            if (error.value) {
                callback(new Error(error.value.data.message));
            } else {
                callback();
            }
        } catch (err) {
            console.log("ValidatorDonationCodeAPI => ", err);
            callback(new Error("愛心捐贈碼 驗證失敗"));
        }
        return;
    }

    callback(new Error("愛心捐贈碼 驗證失敗"));
    // if (value) {
    //     const reg = /^[0-9]{3,7}$/;
    //     if (!reg.test(value)) {
    //         callback(new Error());
    //     } else {
    //         callback();
    //     }
    // } else {
    //     callback();
    // }
};

// 手機載據驗證
export const validateMobileCarrier = async (rule: InternalRuleItem, value: string, callback: (error?: string | Error) => void) => {
    const { $api, $utils } = useNuxtApp();
    if (!$utils().isEmpty(value)) {
        try {
            const { error } = await $api().ValidatorMobileCarrierCodeAPI({ carrier_code: value });
            if (error.value) {
                callback(new Error(error.value.data.message));
            } else {
                callback();
            }
        } catch (err) {
            console.log("ValidatorDonationCodeAPI => ", err);
            callback(new Error("手機載具 驗證失敗"));
        }
        return;
    }

    callback(new Error("手機載具 驗證失敗"));
    // if (value) {
    //     const reg = /^\/[A-Z0-9\.\-\+]{7}$/;
    //     if (!reg.test(value)) {
    //         callback(new Error());
    //     } else {
    //         callback();
    //     }
    // } else {
    //     callback();
    // }
};

// 自然人憑證驗證
export const validateNaturalPerson = (rule: InternalRuleItem, value: string, callback: (error?: string | Error) => void) => {
    if (value) {
        const reg = /^[A-Z]{2}[0-9]{14}$/;
        if (!reg.test(value)) {
            callback(new Error());
        } else {
            callback();
        }
    } else {
        callback();
    }
};

//驗證checkbox為必選
export const validateSingleCheckbox = (rule: InternalRuleItem, value: string, callback: (error?: string | Error) => void) => {
    if (value === false) {
        callback(new Error());
    } else {
        callback();
    }
};

  // 驗證統一編號
const taxidCheck = (value: string) => {
    const digits = value.toString().split('').map(Number);
    const multipliers = [1, 2, 1, 2, 1, 2, 4, 1];
    let sum = 0;

    for (var i = 0; i < 8; i++) {
        let product = digits[i] * multipliers[i];
        if (Number(product) > 9) {
            const tenDigit = parseInt((product % 100)/10)
            const digit = parseInt(product % 10)
            product = tenDigit + digit
        }
        sum += product;
    }

    return sum % 5 === 0;
}

export const validateCompanyIDVal = (rule: InternalRuleItem, value: string, callback: (error?: string | Error) => void) => {
    if (value) {
        if (!taxidCheck(value)) {
        callback(new Error());
        } else {
        callback();
        }
    } else {
        callback();
    }
};
