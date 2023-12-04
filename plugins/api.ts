import home from "~/api/home";
import utils from "~/api/utils";
import oauth from "~/api/oauth";

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            api: () => ({
                ...home(),
                ...utils(),
                ...oauth(),
            }),
        },
    };
});
