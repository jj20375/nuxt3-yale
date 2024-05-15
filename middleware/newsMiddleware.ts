export default defineNuxtRouteMiddleware(async (to, from) => {
    const { $api } = useNuxtApp();

    const { data } = await $api().ArticalTypeAPI({ type: "news" });

    const rows = (data.value as any).data;

    return navigateTo({
        name: "news-slug-id",
        params: { slug: rows[0].seoSetting.custom_url, id: rows[0].id },
    });
});
