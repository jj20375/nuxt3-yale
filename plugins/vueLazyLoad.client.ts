import lazyPlugin from "vue3-lazy";
import spinner from "~/assets/img/spinner.gif";
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(lazyPlugin, {
        error: spinner,
        loading: spinner,
    });
});
