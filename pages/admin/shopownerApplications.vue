<template>
    <div class="w-full">
        <h1>Shopowner Applications</h1>
        <DataTable :value="unverifiedShops">
            <Column field="name" header="Name des Ladens" />
            <Column field="shopowner_name" header="Name des Inhabers" />
            <Column field="street_adress" header="Straße & Hausnr." />
            <Column field="zip_code" header="PLZ" />
            <Column field="city" header="Stadt" />
            <Column field="country" header="Land" />
            <Column header="Verifizierungsdokument">
                <template #body="slotProps">
                    <Button label="öffnen" icon="pi pi-external-link" size="small" @click="openDialog(slotProps.data.id)" />
                    <Dialog
                        v-model:visible="dialogVisibility"
                        modal
                        dismissable-mask
                        :header="slotProps.data.shopname"
                        class="w-11/12 max-w-6xl">
                        <object :data="pdfURL" type="application/pdf" class="h-[750px] w-full" />
                    </Dialog>
                </template>
            </Column>
            <Column header="Aktionen">
                <template #body="slotProps">
                    <div class="flex gap-2">
                        <Button icon="pi pi-check" severity="success" rounded size="small" @click="accept(slotProps.data.id)" />
                        <Button icon="pi pi-times" severity="danger" rounded size="small" />
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
    import { useToast } from "primevue/usetoast"

    definePageMeta({
        layout: "admin",
        middleware: ["admin"],
    })

    const toast = useToast()
    const client = useSupabaseClient<Database>()
    const dialogVisibility = ref(false)
    const pdfID = ref("")

    const { data: pdfURL, refresh: refreshPdfUrl } = await useAsyncData(
        "pdfURL",
        async () => {
            const { data, error } = await client.storage
                .from("shopowner-verification-documents")
                .createSignedUrl(pdfID.value + ".pdf", 60)
            if (error) {
                toast.add({
                    severity: "error",
                    summary: "Fehler",
                    detail: error.message,
                    life: 3000,
                })
            }
            return data?.signedUrl
        },
        { immediate: false }
    )

    const { data: unverifiedShops, refresh: refreshUnverifiedShops } = useAsyncData("unverifiedShops", async () => {
        const { data, error } = await client
            .from("shops")
            .select("*")
            .eq("verified", false)
            .order("created_at", { ascending: false })
        if (error) {
            toast.add({
                severity: "error",
                summary: "Fehler",
                detail: error.message,
                life: 3000,
            })
        }
        return data
    })

    function openDialog(shopID: string) {
        dialogVisibility.value = true
        pdfID.value = shopID
        refreshPdfUrl()
    }

    async function accept(shopID: string) {
        const { error } = await client.from("shops").update({ verified: true }).eq("id", shopID)
        if (error) {
            toast.add({
                severity: "error",
                summary: "Fehler",
                detail: error.message,
                life: 3000,
            })
        }
        refreshUnverifiedShops()
    }
</script>
