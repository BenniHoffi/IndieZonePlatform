export default async function (shopID: string) {
    const {
        data: shop,
        refresh: refreshShop,
        pending: shopPending,
    } = await useAsyncData("shop", async () => {
        const data = {
            name: "Herbert Hosen",
            rating: "3",
            intro: "nice hosen",
            streetAdress: "asam 9",
            zip: "12345",
            city: "Neinhausen",
            email: "nope@hosen.com",
            phone: "81623/10298301",
            description: "GIGACHADJEANS",
        }
        return data
    })
    return { shop, refreshShop, shopPending }
}
