interface UserLocation {
    place_name: string
    center: [number, number]
    bbox: [number, number, number, number]
}

interface I18n {
    [key: string]: string
    de: string
    en: string
}

interface MinMax {
    min: number
    max: number
}

interface CategoryAttribute {
    id: number
    name: I18n
    type: string
    values: I18n[] | MinMax
}

interface Category {
    id: number
    path: string
    name: I18n
    attributes?: number[]
}

interface OpeningHoursDay {
    from: string
    to: string
}

interface Chat {
    id: string
    user_id: string
    shop_id: string
    last_message: Message
    username: string
    shopname: string
}

interface Message {
    id: string
    from: string
    chat_id: string
    message: string
    shop_sender_name: string
    created_at: Date
    read: boolean
}

interface favesLists {
    [key: string]: string[]
}
