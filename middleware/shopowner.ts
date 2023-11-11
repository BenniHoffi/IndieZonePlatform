export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.server) return

    const user = useSupabaseUser()

    const { myshop } = await useMyshop()

    if (!user.value?.app_metadata.shops && !myshop.value) {
        return navigateTo("/")
    }
})
