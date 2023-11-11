export default async function () {
    const supabase = useSupabaseClient<Database>()
    const user = useSupabaseUser()
    const myshopId: string[] = user.value?.app_metadata.myshop

    const { data: myshop } = await useAsyncData("myshop", async () => {
        const { data, error } = await supabase.from("shops").select("*").eq("id", myshopId).single()
        if (error) {
            // TODO: error handling
        }
        return data
    })

    return { myshop }
}
