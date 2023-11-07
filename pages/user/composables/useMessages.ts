export default async function (chatId: string | undefined) {
    const {
        data: messages,
        refresh: refreshMessages,
        pending: messagesPending,
    } = await useAsyncData<Message[]>("messages-" + chatId, async () => {
        const data = [
            {
                id: "1",
                from: "1",
                chat_id: "1",
                message: "HEllo",
                shop_sender_name: "Shop1",
                created_at: new Date(),
                read: false,
            },
            {
                id: "2",
                from: "2",
                chat_id: "1",
                message: "HEllo1",
                shop_sender_name: "Shop1",
                created_at: new Date(),
                read: false,
            },
            {
                id: "3",
                from: "1",
                chat_id: "1",
                message: "HEllo2",
                shop_sender_name: "Shop1",
                created_at: new Date(),
                read: false,
            },
            {
                id: "4",
                from: "2",
                chat_id: "1",
                message: "HEllo3",
                shop_sender_name: "Shop1",
                created_at: new Date(),
                read: false,
            },
            {
                id: "5",
                from: "2",
                chat_id: "1",
                message: "HEllo4",
                shop_sender_name: "Shop1",
                created_at: new Date(),
                read: false,
            },
            {
                id: "6",
                from: "2",
                chat_id: "1",
                message: "HEllo5",
                shop_sender_name: "Shop1",
                created_at: new Date(),
                read: false,
            },
        ]
        return data
    })
    return { messages, refreshMessages, messagesPending }
}
