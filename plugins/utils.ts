import * as service from "~/service/utils";
import * as localstorage from "~/service/localstorage";
import * as shoppingCarService from "~/service/shoppingCar";
import liff from "@line/liff";
import moment from "moment";

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            utils: () => ({
                ...service,
            }),
            localstorage: () => ({
                ...localstorage,
            }),
            shoppingCarService: () => ({ ...shoppingCarService }),
            moment,
            liff,
        },
    };
});
