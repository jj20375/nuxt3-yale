export default defineNuxtRouteMiddleware(async (to, from) => {
    const { $api } = useNuxtApp();

    const { data } = await $api().ArticalTypeAPI({ type: "renovation" });

    const rows = (data.value as any).data;

    return navigateTo({
        name: "sample-slug-id",
        params: { slug: rows[0].seoSetting.custom_url, id: rows[0].id },
    });
});
