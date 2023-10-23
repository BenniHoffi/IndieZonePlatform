import { useToast } from "primevue/usetoast"

export default async function () {
    const supabase = useSupabaseClient<Database>()
    const toast = useToast()

    const {
        data: roles,
        refresh: refreshRoles,
        pending: rolesPending,
    } = useAsyncData("roles", async () => {
        const { data, error } = await supabase.from("users").select("id, name, username, email, groups")
        if (error) {
            toast.add({
                severity: "error",
                summary: "Fehler beim Laden der Rollen",
                detail: error.message,
                life: 3000,
            })
        }
        return data
    })

    return { roles, refreshRoles, rolesPending }
}
