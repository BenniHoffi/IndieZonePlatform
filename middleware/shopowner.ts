export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.server) return

    const user = useSupabaseUser()
    const shopId = useShopId()

    if (!shopId.value) {
        if (user.value?.app_metadata.shops?.length === 1) {
            shopId.value = user.value.app_metadata.shops[0]
        } else {
            return navigateTo("/myshop/selectShop")
        }
    }

    const { myshop } = await useMyshop()

    if (!user.value?.app_metadata.shops && !myshop.value) {
        return navigateTo("/")
    }
})
