export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.server) return

    const supabase = useSupabaseClient()
    const { data } = await supabase.auth.refreshSession()
    const user = data.user
    const groups = user?.app_metadata.groups

    if (!("158a70e3-64c0-49a5-b52f-37ed2b9b9b80" in groups)) {
        return navigateTo("/")
    }
})
