export default defineEventHandler(async (event) => {
    // handle POST requests for the `api/foo` endpoint
    const body = await readBody(event);
    // await sendRedirect(event, "/", 301);
    return { ...body, message: "ok" };
});
