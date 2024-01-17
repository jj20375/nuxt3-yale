import home from "~/api/home";
import utils from "~/api/utils";
import oauth from "~/api/oauth";
import article from "~/api/artical";
import store from "~/api/store";
import contactService from "~/api/contactService";
import member from "~/api/member";
import product from "~/api/product";

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            api: () => ({
                ...home(),
                ...utils(),
                ...oauth(),
                ...article(),
                ...store(),
                ...contactService(),
                ...member(),
                ...product()
            }),
        },
    };
});
