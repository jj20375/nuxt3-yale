import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import tw from "../locales/tw.json";

export default defineNuxtPlugin(({ vueApp }) => {
    const i18n = createI18n({
        locales: [
            {
                code: "en",
                iso: "en-US",
                file: "en.json",
                name: "English",
            },
            {
                code: "tw",
                iso: "zh-TW",
                file: "tw.json",
                name: "繁體中文",
            },
        ],
        legacy: false,
        globalInjection: true,
        locale: "tw",
        defaultLocale: "tw",
        strategy: "no_prefix",
        langDir: "~/locales/",

        // 當找不到語系檔時 使用英文語系
        fallbackLocale: "en",
        messages: {
            en,
            tw,
        },
    });

    vueApp.use(i18n);
});
