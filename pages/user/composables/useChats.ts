export default async function () {
    const user = useSupabaseUser()
    const supabase = useSupabaseClient()

    const {
        data: chats,
        refresh: refreshChats,
        pending: chatsPending,
    } = useAsyncData<Chat[]>("chats", async () => {
        return [
            {
                id: "1",
                user_id: "1",
                shop_id: "1",
                last_message: {
                    id: "1",
                    from: "1",
                    chat_id: "1",
                    message: "HEllo",
                    shop_sender_name: "Shop1",
                    created_at: new Date(),
                    read: false,
                },
                username: "User1",
                shopname: "Shop1",
            },
        ]
    })

    return { chats, refreshChats, chatsPending }
}
