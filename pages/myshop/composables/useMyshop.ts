export default async function () {
    const supabase = useSupabaseClient<Database>()
    const myshopId = useShopId()

    const {
        data: myshop,
        refresh: refreshMyshop,
        pending: myshopPending,
    } = await useAsyncData("myshop", async () => {
        const { data, error } = await supabase.from("shops").select("*").eq("id", myshopId.value).single()
        if (error) {
            throw error
        }
        return data
    })

    return { myshop, refreshMyshop, myshopPending }
}
