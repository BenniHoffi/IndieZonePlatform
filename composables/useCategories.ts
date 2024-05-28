import { useToast } from "primevue/usetoast"

export default async function () {
    const client = useSupabaseClient<Database>()
    const toast = useToast()

    const {
        data: categories,
        refresh: refreshCategories,
        pending: categoriesPending,
    } = await useAsyncData(
        "categories",
        async () => {
            const { data, error } = await client.from("categories").select("*").order("id").returns<Category[]>()
            if (error) {
                toast.add({
                    severity: "error",
                    summary: "Fehler beim Laden der Kategorien",
                    detail: error.message,
                    life: 3000,
                })
            }
            return data
        }
        // {
        //     transform: (data) => {
        //         console.log(data)
        //         data?.splice(0, 1)
        //         console.log(data)
        //     },
        // }
    )

    return { categories, refreshCategories, categoriesPending }
}
