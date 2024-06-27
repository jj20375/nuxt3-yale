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
                { src: "https://www.googletagmanager.com/gtag/js?id=G-1HQ2HPE397", async: true },
                { children: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-1HQ2HPE397');
                ` },
            ],
            link: [{ rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" }],
            meta: [
                { name: 'google-site-verification', content: 'fQBLco6pQOjPC4nmN0KWEqHOUf9bFPJqYtrUxZ6TgZ8' },
            ],
        },
        // pageTransition: { name: "page", mode: "out-in" },
    },

    modules: ["@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt", "@vueuse/nuxt", "@nuxt/image-edge", "nuxt-viewport", "@nuxtjs/device", "nuxt-lodash", "vue3-carousel-nuxt", "@nuxtjs/tailwindcss", "nuxt-svgo", "@vueuse/nuxt", "nuxt3-meta-pixel", "@zadigetvoltaire/nuxt-gtm"],
    css: ["@/assets/scss/main.scss", "@fortawesome/fontawesome-svg-core/styles.css", "@/assets/scss/element-plus.scss"],

    // vu3-carousel 套件 component
    carousel: {
        prefix: "Vue3",
    },

    postcss: {
        plugins: {
            "tailwindcss/nesting": "postcss-nesting",
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
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "assets/scss/_variable.scss" as *; @use "assets/scss/_setting.scss" as *;',
                },
            },
        },
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
            // 前台網址
            hostURL: process.env.HOST_URL,
            // 第三方網址
            thirdURL: process.env.THIRD_URL,
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
            // 版本確認
            yaleVersion: process.env.VERSION,
            // reCAPTCHA_SITE_KEY
            reCAPTCHASITEKEY: process.env.VUE_APP_GOOGLE_reCAPTCHA_SITE_KEY,
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
            //     name: "product-slug-category-tag",
            //     path: "/product/:slug/:category/:tag",
            //     file: resolve(__dirname, "pages/index.vue"),
            // });
        },
    },

    facebook: {
        /* module options */
        track: 'PageView',
        pixelId: '481405971033934',
        autoPageView: true,
        disabled: false
    },
    gtm: {
        id: 'GTM-WCRL5WXL',
        defer: false, // Script can be set to `defer` to speed up page load at the cost of less accurate results (in case visitor leaves before script is loaded, which is unlikely but possible). Defaults to false, so the script is loaded `async` by default
        compatibility: false, // Will add `async` and `defer` to the script tag to not block requests for old browsers that do not support `async`
        nonce: '2726c7f26c', // Will add `nonce` to the script tag
        enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
        debug: true, // Whether or not display console logs debugs (optional)
        loadScript: true, // Whether or not to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
        enableRouterSync: true, // Pass the router instance of your app to automatically sync with router (optional)
        ignoredViews: ['homepage'], // Don't trigger events for specified router names (optional)
        trackOnNextTick: false, // Whether or not call trackView in Vue.nextTick
        devtools: true, // (optional)
    },
    

    serverMiddleware: ["~/api/payment.get.ts"],
});
