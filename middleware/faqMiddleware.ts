export default defineNuxtRouteMiddleware(async (to, from) => {
    const { $api } = useNuxtApp();

    const { data } = await $api().FQATypeAPI();

    const rows = (data.value as any).data;

    return navigateTo({
        name: "faq-slug-id",
        params: { slug: "service", id: rows[0].id },
    });
});
