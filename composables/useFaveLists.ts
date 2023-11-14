export default async function (productId?: string) {
    const supabase = useSupabaseClient<Database>()
    const user = useSupabaseUser()

    const {
        data: lists,
        refresh: refreshLists,
        pending: listsPending,
    } = await useLazyAsyncData(
        "faveLists",
        async () => {
            const { data, error } = await supabase
                .from("users")
                .select("favorite_products")
                .eq("id", user.value!.id)
                .returns<{ favorite_products: favesLists }[]>()
                .single()
            if (error) {
                console.log(error)
            }
            setTimeout(() => {}, 2000)
            return data?.favorite_products
        },
        {
            transform(data) {
                if (!data) {
                    data = {
                        Favorites: [],
                        Merkliste: [],
                    }
                }
                return data
            },
        }
    )

    async function saveLists(lists: favesLists) {
        const { error } = await supabase.from("users").update({ favorite_products: lists }).eq("id", user.value!.id)
        if (error) {
            console.log(error)
        }
    }

    const isFavorite = computed(() => {
        if (productId) {
            for (let key in lists.value) {
                if (lists.value[key].includes(productId)) {
                    return true
                }
            }
        }
        return false
    })

    return { lists, refreshLists, listsPending, saveLists, isFavorite }
}
