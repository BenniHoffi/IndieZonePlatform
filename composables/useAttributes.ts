import { useToast } from "primevue/usetoast"

export default async function () {
    const client = useSupabaseClient<Database>()
    const toast = useToast()

    const {
        data: attributes,
        refresh: refreshAttributes,
        pending: attributesPending,
    } = await useAsyncData("attributes", async () => {
        const { data, error } = await client.from("attributes").select("*").order("id").returns<CategoryAttribute[]>()
        if (error) {
            toast.add({
                severity: "error",
                summary: "Fehler beim Laden der Attribute",
                detail: error.message,
                life: 3000,
            })
        }
        return data
    })

    return { attributes, refreshAttributes, attributesPending }
}
