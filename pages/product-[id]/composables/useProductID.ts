export default async function (productID: string) {
    const {
        data: product,
        refresh: refreshProduct,
        pending: productPending,
    } = await useAsyncData("product", async () => {
        const data = {
            name: "Produktname",
            rating: 2,
            intro: "Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
            shopID: "Herbert Hosen",
        }
        return data
    })
    return { product, refreshProduct, productPending }
}
