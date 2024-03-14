export default async function () {
    const supabase = useSupabaseClient<Database>()
    const myshopId = useShopId()

    const { data: myshop } = await useAsyncData("myshop", async () => {
        const { data, error } = await supabase.from("shops").select("*").eq("id", myshopId.value).single()
        if (error) {
            console.log(error)
        }
        return data
    })

    return { myshop }
}
