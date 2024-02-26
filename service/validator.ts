import { InternalRuleItem } from "async-validator/dist-types/interface";
import { getNumberType, isValidPhoneNumber } from "libphonenumber-js";
import parseMobile from "libphonenumber-js/mobile";

//密碼驗證
export const validatePassword = (
  rule: InternalRuleItem,
  value: string,
  callback: (error?: string | Error) => void
) => {
  if (value) {
    const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
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
export const validateEmail = (
  rule: InternalRuleItem,
  value: string,
  callback: (error?: string | Error) => void
) => {
  if (value) {
    const reg =
      /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
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
export const validateTWMobileNumber = (
  rule: InternalRuleItem,
  value: string,
  callback: (error?: string | Error) => void
) => {
  if (value) {
    if (
      isValidPhoneNumber(value, "TW") &&
      parseMobile(value, "TW").getType() === "MOBILE"
    ) {
      callback();
    } else {
      callback(new Error());
    }
  } else {
    callback();
  }
};

// 陣列數量(3到5個)
export const validatePhotoArrayLength = (
  rule: InternalRuleItem,
  value: string,
  callback: (error?: string | Error) => void
) => {
  if (Array.isArray(value) && value.length >= 3 && value.length <= 5) {
    callback();
  } else {
    callback(new Error('照片數量需3~5張'));
  }
};


// 愛心捐款碼驗證
export const validateDonationCode = (
  rule: InternalRuleItem,
  value: string,
  callback: (error?: string | Error) => void
) => {
  if (value) {
    const reg = /^[0-9]{3,7}$/;
    if (!reg.test(value)) {
      callback(new Error());
    } else {
      callback();
    }
  } else {
    callback();
  }
};


// 手機載據驗證
export const validateMobileCarrier = (
  rule: InternalRuleItem,
  value: string,
  callback: (error?: string | Error) => void
) => {
  if (value) {
    const reg = /^\/[A-Z0-9\.\-\+]{7}$/;
    if (!reg.test(value)) {
      callback(new Error());
    } else {
      callback();
    }
  } else {
    callback();
  }
};



// 自然人憑證驗證
export const validateNaturalPerson = (
  rule: InternalRuleItem,
  value: string,
  callback: (error?: string | Error) => void
) => {
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