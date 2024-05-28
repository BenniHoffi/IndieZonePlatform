export default async function (shopId: string) {
    const supabase = useSupabaseClient<Database>()
    const { myshop } = await useMyshop()

    const {
        data: shopProducts,
        refresh: refreshShopProducts,
        pending: shopProductsPending,
    } = await useAsyncData("shopProducts-" + shopId, async () => {
        const { data, error } = await supabase.from("products").select("*").eq("shop_id", shopId).order("created_at")
        if (error) {
            throw error
        }
        return data
    })
    const shopProductsWithImageUrls = ref()

    watch(
        shopProducts,
        async (newData) => {
            if (!newData) {
                shopProductsWithImageUrls.value = null
                return
            }

            if (myshop.value?.verified) {
                // Generate URL for verified shops
                shopProductsWithImageUrls.value = newData.map((item) => {
                    const imgUrl = supabase.storage.from(shopId).getPublicUrl("productImgs/" + item.id + "/mainImg")
                        .data.publicUrl
                    return { ...item, imgUrl }
                })
            } else {
                const productIds = newData.map((item) => "productImgs/" + item.id + "/mainImg")
                const { data: urlData, error } = await supabase.storage.from(shopId).createSignedUrls(productIds, 3600)
                if (error) {
                    throw error
                }
                shopProductsWithImageUrls.value = newData.map((item, index) => ({ ...item, imgUrl: urlData[index].signedUrl }))
            }
        },
        { immediate: true }
    )
    return { shopProducts, shopProductsWithImageUrls, refreshShopProducts, shopProductsPending }
}
