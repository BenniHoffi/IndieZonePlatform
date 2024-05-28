export default function () {
    const shopId = useCookie<string>("shopId")
    return shopId
}
