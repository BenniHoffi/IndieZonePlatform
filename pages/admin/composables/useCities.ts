export default async function () {
    const supabase = useSupabaseClient<Database>()

    const {
        data: cities,
        refresh: refreshCities,
        pending: citiesPending,
    } = await useAsyncData("allowed_cities", async () => {
        const { data, error } = await supabase.from("allowed_cities").select("*")
        if (error) {
            console.log(error)
        }
        return data
    })

    return { cities, refreshCities, citiesPending }
}
