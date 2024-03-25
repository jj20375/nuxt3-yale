import { useUserStore } from "~~/store/userStore";
import { useShoppingCarStore } from "~~/store/shoppingCarStore";
import { useInitializationStore } from "~/store/initializationStore";
import { storeToRefs } from "pinia";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const { $shoppingCarService, $api } = useNuxtApp();
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
                        content: "/img/ogCover/home.jpg",
                    },
                ],
            });
            useSeoMeta({
                title: initializationStore.initializationData.site.meta_title,
                description: initializationStore.initializationData.site.meta_description,
                ogTitle: initializationStore.initializationData.site.meta_title,
                ogDescription: initializationStore.initializationData.site.meta_description,
                keywords: initializationStore.initializationData.site.meta_keywords.join(),
            });
        } catch (err) {
            console.log("GetInitializationDatasAPI err =>", err);
        }
    }
    // 預先加載初始化資料
    await getInitializationData();

    if (token.value && !isAuth) {
        return userStore.getUserProfile();
    } else {
        if (process.client) {
            shoppingCarStore.setShoppingCar($shoppingCarService().getShoppingCar() ?? []);
            shoppingCarStore.setShoppingCustomCar($shoppingCarService().getCustomProductShoppingCar() ?? []);
        }
    }
});
