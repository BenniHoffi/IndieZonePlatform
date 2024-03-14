export default async function (shopId: string) {
    const supabase = useSupabaseClient<Database>()
    const toast = useToast()
    const {
        data: shopProducts,
        refresh: refreshShopProducts,
        pending: shopProductsPending,
    } = await useAsyncData("shopProducts", async () => {
        const { data, error } = await supabase.from("products").select("*").eq("shop_id", shopId)
        if (error) {
            toast.add({
                severity: "error",
                summary: "Fehler beim Laden der Produkte",
                detail: error.message,
                life: 3000,
            })
        }
        return data
    })
    return { shopProducts, refreshShopProducts, shopProductsPending }
}
