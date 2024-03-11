export default defineEventHandler(async (event) => {
    // handle POST requests for the `api/foo` endpoint
    const body = await getQuery(event);
    // await sendRedirect(event, "/", 301);
    return { ...body, message: "ok" };
});
