import { useUserStore } from "~~/store/userStore";
import { useShoppingCarStore } from "~~/store/shoppingCarStore";
import { useInitializationStore } from "~/store/initializationStore";
import { storeToRefs } from "pinia";
import Cookies from "js-cookie";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const { $shoppingCarService, $api, $utils } = useNuxtApp();
    const userStore = useUserStore();
    const initializationStore = useInitializationStore();
    const shoppingCarStore = useShoppingCarStore();
    const $config = useRuntimeConfig();
    const { isAuth, user } = storeToRefs(userStore);
    const token = useCookie("token");

    async function getInitializationData() {
        try {
            const { data } = await $api().GetInitializationDatasAPI();
            if (!data.value) {
                return;
            }
            const initialData = (data.value as any).data;
            initializationStore.initializationData = initialData;
            // console.log("from =>", from.query.rand);

            // 判斷是維修狀態時 倒頁至 維修頁面
            if (initializationStore.initializationData.site.maintenance_mode) {
                // 判斷是否有傳送加密值 有傳送加密值又是維修狀態時 解密成功一樣可以正常訪問網頁
                if (from.query.rand && from.query.hash && to.name !== "maintenance") {
                    // 加密值
                    const hashData = from.query.hash as string;
                    // 解密 key 與 iv 值
                    const randData = from.query.rand as string;
                    // 將加密值存在 cookie 以防重新整理時 無法正常訪問網頁
                    Cookies.set("maintenanceHashData", hashData, { expires: 1 });
                    // 將解密 key 與 iv 值存在 cookie 以防重新整理時 無法正常訪問網頁
                    Cookies.set("maintenanceRandData", randData, { expires: 1 });
                    // 解密函示 如果有值 且為 1 代表解密成功
                    const decryptData = $utils().decryptData({ hashData, randData });
                    if (!decryptData) {
                        // 解密失敗導向維修頁
                        return navigateTo("/maintenance", { external: true });
                    }
                } else if (Cookies.get("maintenanceHashData") && Cookies.get("maintenanceRandData") && to.name !== "maintenance") {
                    // 取得 cookie 加密值
                    const hashData = Cookies.get("maintenanceHashData") as string;
                    // 取得 cookie 解密 key 值 與 iv 值
                    const randData = Cookies.get("maintenanceRandData") as string;
                    // 解密函示 如果有值 且為 1 代表解密成功
                    const decryptData = $utils().decryptData({ hashData, randData });
                    if (!decryptData) {
                        // 解密失敗導向維修頁
                        return navigateTo("/maintenance", { external: true });
                    }
                } else if (to.name !== "maintenance") {
                    return navigateTo("/maintenance", { external: true });
                }
            }

            let externalScriptSrc = ''
            let inlineScriptContent = ''
            if (initializationStore.initializationData.site.google_analytic_code) {
                const google_analytic_code = initializationStore.initializationData.site.google_analytic_code
                // 提取外部腳本的 src 屬性
                const externalScriptSrcMatch = google_analytic_code.match(/<script.*?src="(.*?)".*?><\/script>/);
                externalScriptSrc = externalScriptSrcMatch ? externalScriptSrcMatch[1] : '';

                // 提取內嵌腳本的內容
                const inlineScriptContentMatch = google_analytic_code.match(/<script>([\s\S]*?)<\/script>/);
                inlineScriptContent = inlineScriptContentMatch ? inlineScriptContentMatch[1].trim() : '';         
            }
            

            useHead({
                title: initializationStore.initializationData.site.meta_title,
                meta: [
                    {
                        hid: "description",
                        name: "description",
                        content: initializationStore.initializationData.site.meta_description,
                    },
                    { name: "keywords", content: initializationStore.initializationData.site.meta_keywords },
                    { hid: "og:url", property: "og:url", content: `${$config.public.hostURL}` },
                    { hid: "og:type", property: "og:type", content: "website" },
                    {
                        hid: "og:title",
                        property: "og:title",
                        content: initializationStore.initializationData.site.meta_title,
                    },
                    {
                        hid: "og:description",
                        property: "og:description",
                        content: initializationStore.initializationData.site.meta_description,
                    },
                    {
                        hid: "og:image",
                        property: "og:image",
                        content: initializationStore.initializationData.site.site_logo,
                    },
                ],
                script: [
                    {
                        src: externalScriptSrc,
                        async: true
                    },
                    {
                        children: inlineScriptContent,
                        type: 'text/javascript'
                    }
                ]
            });
        } catch (err) {
            console.log("GetInitializationDatasAPI err =>", err);
        }
    }
    // 判斷有值時 不請求
    await getInitializationData();
    // if (!initializationStore.initializationData) {
    //     // 預先加載初始化資料
    //     await getInitializationData();
    // } else {
    //     console.log(initializationStore.initializationData)
    // }

    if (token.value) {
        return userStore.getUserProfile();
    } else {
        if (process.client) {
            shoppingCarStore.setShoppingCar($shoppingCarService().getShoppingCar() ?? []);
            shoppingCarStore.setShoppingCustomCar($shoppingCarService().getCustomProductShoppingCar() ?? []);
        }
    }
});
