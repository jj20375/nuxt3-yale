import { InternalRuleItem } from "async-validator/dist-types/interface";
import { getNumberType, isValidPhoneNumber } from "libphonenumber-js";
import parseMobile from "libphonenumber-js/mobile";

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
