// aos 視窗滾動動畫套件
import AOS from "aos";
import "aos/dist/aos.css";
import Vue from "vue";

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            $aos: new AOS.init(),
        },
    };
});
