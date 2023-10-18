export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.server) return
    await useSupabaseClient().auth.refreshSession()
})
