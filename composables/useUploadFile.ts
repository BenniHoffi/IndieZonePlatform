export default async function (bucketID: string, path: string, file: File): Promise<boolean> {
    const client = useSupabaseClient<Database>()

    const { error } = await client.storage.from(bucketID).upload(path, file)
    if (error) {
        console.log(error.message)
        return false
    }
    return true
}
