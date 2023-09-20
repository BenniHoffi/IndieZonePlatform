export default async function (shopID: string) {
    const {
        data: shop,
        refresh: refreshShop,
        pending: shopPending,
    } = await useAsyncData("shop", async () => {
        const data = {
            name: "Herbert Hosen",
            rating: "3",
            intro: "Handverlesene Hosen für jeden Geschmack",
            streetAdress: "Arthur-Hoffmann-Straße 38",
            zip: "04106",
            city: "Leipzig",
            email: "nope@hosen.com",
            phone: "0341/10298301",
            description: "heftige Jeans seit 1976, mittlerweile starker Exporteur nach Bayern und Meckpo",
        }
        return data
    })
    return { shop, refreshShop, shopPending }
}
