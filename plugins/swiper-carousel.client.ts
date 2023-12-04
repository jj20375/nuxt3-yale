/**
 * Swiper 文件
 * https://swiperjs.com/vue#usage
 */

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";
import "swiper/css/effect-coverflow";
import "swiper/css/thumbs";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component("Swiper", Swiper);
    nuxtApp.vueApp.component("SwiperSlide", SwiperSlide);
});
