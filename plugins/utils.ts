import * as service from "~/service/utils";
import * as localstorage from "~/service/localstorage";
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
            moment,
            liff,
        },
    };
});
