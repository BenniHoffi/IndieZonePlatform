export default async function () {
    const supabase = useSupabaseClient<Database>()
    const toast = useToast()

    const {
        data: newProducts,
        refresh: refreshNewProducts,
        pending: newProductsPending,
    } = await useAsyncData("newProducts", async () => {
        const { data, error } = await supabase.from("products").select("*").order("created_at")
        if (error) {
            toast.add({
                severity: "error",
                summary: "Fehler beim Laden der neuesten Produkte",
                detail: error.message,
                life: 5000,
            })
        }
        return data
    })

    return { newProducts, refreshNewProducts, newProductsPending }
}
