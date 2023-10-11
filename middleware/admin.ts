export default defineNuxtRouteMiddleware((to, from) => {
    const groups = useSupabaseUser().value?.app_metadata.groups

    if (!("158a70e3-64c0-49a5-b52f-37ed2b9b9b80" in groups)) {
        return navigateTo("/")
    }
})
