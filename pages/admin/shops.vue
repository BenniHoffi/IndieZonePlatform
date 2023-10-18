<template>
    <div class="flex w-full max-w-screen-xl flex-col items-center gap-4">
        <h1 class="text-display-medium font-bold">Shops</h1>
        <DataTable :value="shops" class="w-full">
            <Column field="name" header="Name des Ladens" />
            <Column field="shopowner_name" header="Name des Besitzers" />
            <Column field="city" header="Stadt" />
            <Column field="zip_code" header="Postleitzahl" />
            <Column field="street_adress" header="Straße" />
            <Column header="Verifizierungsdokument">
                <template #body="slotProps">
                    <Button label="öffnen" icon="pi pi-external-link" size="small" @click="openPDFDialog(slotProps.data.id)" />
                    <Dialog
                        v-model:visible="pdfDialogVisibility"
                        modal
                        dismissable-mask
                        :header="slotProps.data.shopname"
                        class="w-11/12 max-w-6xl">
                        <object type="application/pdf" :data="<string>pdfURL" class="h-[750px] w-full" />
                    </Dialog>
                </template>
            </Column>
            <Column header="Aktionen">
                <template #body="slotProps">
                    <Button
                        label="Löschen"
                        icon="pi pi-trash"
                        size="small"
                        class="p-button-danger"
                        @click="openDeleteDialog(slotProps.data)" />
                    <Dialog
                        v-model:visible="deleteDialogVisibility"
                        modal
                        dismissable-mask
                        header="Laden löschen"
                        class="max-w-prose">
                        <div class="flex flex-col gap-2">
                            <p>Bitte geben Sie den Namen des Ladens zur Bestätigung ein.</p>
                            <p>Das Löschen des Ladens führt zur Löschung aller Produkte dieses Ladens</p>
                            <div class="p-float-label mt-6">
                                <InputText id="shopConfirmation" v-model="shopNameConfirmation" />
                                <label for="shopConfirmation">Name des Ladens</label>
                            </div>
                            <small>Bitte "{{ shopToDeleteName }}" eingeben.</small>
                        </div>
                        <template #footer>
                            <div class="flex justify-end">
                                <Button label="Abbrechen" class="mr-2" @click="deleteDialogVisibility = false" />
                                <Button
                                    label="Löschen"
                                    class="p-button-danger"
                                    :disabled="shopNameConfirmation !== shopToDeleteName"
                                    @click="deleteShop(shopToDeleteID)" />
                            </div>
                        </template>
                    </Dialog>
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

    const client = useSupabaseClient<Database>()
    const toast = useToast()

    const pdfDialogVisibility = ref(false)
    const pdfID = ref("")

    const deleteDialogVisibility = ref(false)
    const shopToDeleteName = ref("")
    const shopToDeleteID = ref("")
    const shopNameConfirmation = ref("")

    const { data: shops, refresh: refreshShops } = await useAsyncData("shops", async () => {
        const { data, error } = await client
            .from("shops")
            .select("*")
            .eq("verified", true)
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

    const { data: pdfURL, refresh: refreshPdfUrl } = await useAsyncData(
        "pdfURL",
        async () => {
            const { data, error } = await client.storage
                .from("shopowner-verification-documents")
                .createSignedUrl(pdfID.value + "/verificationDocument.pdf", 60)
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

    function openPDFDialog(shopID: string) {
        pdfDialogVisibility.value = true
        pdfID.value = shopID
        refreshPdfUrl()
    }

    function openDeleteDialog(shop: Database["public"]["Tables"]["shops"]["Row"]) {
        deleteDialogVisibility.value = true
        shopToDeleteName.value = shop.name
        shopToDeleteID.value = shop.id
    }

    async function deleteShop(shopID: string) {
        if (shopNameConfirmation.value !== shopToDeleteName.value) {
            toast.add({
                severity: "error",
                summary: "Fehler",
                detail: "Der eingegebene Name stimmt nicht mit dem Namen des Ladens überein.",
                life: 3000,
            })
            return
        }
        const { error } = await client.from("shops").delete().eq("id", shopID)
        if (error) {
            toast.add({
                severity: "error",
                summary: "Fehler",
                detail: error.message,
                life: 3000,
            })
        } else {
            toast.add({
                severity: "success",
                summary: "Erfolgreich",
                detail: "Der Laden wurde gelöscht.",
                life: 3000,
            })
        }
        refreshShops()
        deleteDialogVisibility.value = false
        shopToDeleteID.value = ""
        shopToDeleteName.value = ""
    }
</script>
