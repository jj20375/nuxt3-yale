/**
 * 參考文件
 * https://wlada.github.io/vue-carousel-3d/examples/
 */
import Carousel3D from "vue3-carousel-3d";
import "vue3-carousel-3d/dist/index.css";
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Carousel3D);
});
