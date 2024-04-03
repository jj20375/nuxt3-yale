export default defineNuxtRouteMiddleware(async (to, from) => {
  const route = useRoute();
  return navigateTo({
    name: "repair-warranty-slug",
    params: { slug: "保固登記" },
    query: {serial: route.query.serial}
  });
});
