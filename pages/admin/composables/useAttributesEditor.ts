import { useToast } from "primevue/usetoast"

export default async function () {
    const client = useSupabaseClient<Database>()
    const toast = useToast()

    const locales = ref(["de", "en"])

    const {
        data: attributes,
        refresh: refreshAttributes,
        pending: attributesPending,
    } = await useAsyncData(
        "attributes",
        async () => {
            const { data, error } = await client.from("attributes").select("*").order("id")
            if (error) {
                toast.add({
                    severity: "error",
                    summary: "Fehler beim Laden der Attribute",
                    detail: error.message,
                    life: 3000,
                })
            }
            return data
        },
        {
            transform(input) {
                input?.forEach((attribute: any) => {
                    for (const locale of locales.value) {
                        ;(<any>attribute)["name_" + locale] = attribute.name[locale]
                    }
                })
                return input
            },
        }
    )

    return { attributes, refreshAttributes, attributesPending }
}
