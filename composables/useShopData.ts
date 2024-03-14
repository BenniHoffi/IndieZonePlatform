export default async function (shopId: string) {
    const supabase = useSupabaseClient<Database>()
    const toast = useToast()

    const {
        data: shop,
        refresh: refreshShop,
        pending: shopPending,
    } = await useAsyncData("shop-" + shopId, async () => {
        const { data, error } = await supabase.from("shops").select("*").eq("id", shopId).single()
        if (error) {
            toast.add({
                severity: "error",
                summary: "Fehler beim Laden des Shops",
                detail: error.message,
                life: 3000,
            })
        }
        return data
    })

    return { shop, refreshShop, shopPending }
}
