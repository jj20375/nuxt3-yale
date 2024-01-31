import { createCommonJS } from "mlly";
const { __dirname } = createCommonJS(import.meta.url);
import { resolve } from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // nitro: {
    //     preset: "vercel",
    // },
    app: {
        head: {
            script: [
                // facebook js sdk
                { src: "https://connect.facebook.net/en_US/sdk.js", async: true, defer: true, crossorigin: "anonymous" },
                // facebook js sdk
                { crossorigin: "anonymous", src: `https://connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v11.0&appId=${process.env.FACEBOOK_APP_ID}`, nonce: "t7SalSZD" },
                // google js sdk
                { src: "https://apis.google.com/js/platform.js", async: true, defer: true },
                // google js sdk
                { src: "https://apis.google.com/js/api:client.js" },
                // google js sdk
                { src: "https://accounts.google.com/gsi/client", onload: "console.log('TODO: add onload function')" },
                // google ga
                { src: "https://www.googletagmanager.com/gtag/js?id=G-R8MLETTSC3" },
            ],
            link: [{ rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" }],
        },
        // pageTransition: { name: "page", mode: "out-in" },
    },

    modules: ["@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt", "@vueuse/nuxt", "@nuxt/image-edge", "nuxt-viewport", "@nuxtjs/device", "nuxt-lodash", "vue3-carousel-nuxt", "@nuxtjs/tailwindcss", "nuxt-svgo"],
    css: ["@/assets/scss/main.scss", "@fortawesome/fontawesome-svg-core/styles.css", "@/assets/scss/element-plus.scss"],

    // vu3-carousel 套件 component
    carousel: {
        prefix: "Vue3",
    },

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    // tailwindcss: {
    //     cssPath: false,
    //     configPath: "tailwind.config",
    //     exposeConfig: false,
    //     exposeLevel: 2,
    //     injectPosition: "first",
    //     viewer: true,
    // },
    vite: {
        // css: {
        //     preprocessorOptions: {
        //         scss: {
        //             additionalData: `
        //           @import "assets/scss/element-plus.scss";
        //           `,
        //         },
        //     },
        // },
    },

    // lodash 套件
    lodash: {
        prefix: "_",
    },

    runtimeConfig: {
        public: {
            webSite: process.env.WEB_SITE,
            // php api url
            apiUrl: process.env.API_URL,
            // google recaptcha key
            googleRecaptcha2Key: process.env.GOOGLE_RECAPTCHA2_KEY,
            DEBUG: process.env.DEBUG,
            hostURL: process.env.HOST_URL,
            // goolge app id
            googleAppId: process.env.GOOGLE_APP_ID,
            // line app id
            lineAppId: process.env.LINE_APP_ID,
            // apple app id
            appleClientId: process.env.APPLE_CLIENT_ID,
            // 一般分頁 一頁載入幾筆資料
            paginationLimit: process.env.PAGINATION_LIMIT,
            // 滾動分頁 一頁載入幾筆資料
            infinitePaginationLimit: process.env.INFINITE_PAGINATION_LIMIT || "30",
        },
    },

    viewport: {
        breakpoints: {
            xs: 320,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            "2xl": 1536,
        },
        defaultBreakpoints: {
            desktop: "isDesktop",
            mobile: "isMobile",
            tablet: "isTablet",
        },
        fallbackBreakpoint: "lg",
    },

    devtools: {
        // Enable devtools (default: true)

        enabled: true,
    },

    imports: {
        dirs: ["views", "views/**", "layouts/**"],
    },

    debug: true, //设置为true开启调试模式  在服务器上打印出hook名称和时间，并在浏览器中记录hook参数
    // ssr: false,

    hooks: {
        "pages:extend"(pages) {
            // pages.push({
            //     name: "user-providerHome",
            //     path: "/user/providerHome",
            //     file: resolve(__dirname, "pages/provider/home.vue"),
            // });
        },
    },
});
