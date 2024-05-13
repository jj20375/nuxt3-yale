export default defineNuxtRouteMiddleware(async (to, from) => {
    const { $api } = useNuxtApp();

    const { data } = await $api().getPageAPI({ code: "terms_of_service" });

    const seoSetting = (data.value as any).data.seoSetting;

    return navigateTo({
        name: "other-terms-slug",
        params: { slug: seoSetting?.custom_url ? seoSetting?.custom_url : '隱私權政策' },
    });
});
