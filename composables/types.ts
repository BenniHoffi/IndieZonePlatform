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
