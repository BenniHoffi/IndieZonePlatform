<template>
    <div>
        <h1 class="text-heading-large">Einstellungen</h1>
        <ConfirmDialog group="confirm-delete">
            <!-- <template #container="{ message, acceptCallback, rejectCallback }"> </template> -->
        </ConfirmDialog>
        <Button label="Shop löschen" severity="danger" @click="deleteShop" />
    </div>
</template>

<script lang="ts" setup>
    import { useConfirm } from "primevue/useconfirm"

    definePageMeta({
        title: "Mein Shop - Einstellungen",
        layout: "myshop",
        middleware: ["shopowner"],
    })

    const confirm = useConfirm()

    function deleteShop() {
        confirm.require({
            group: "confirm-delete",
            message: "Möchtest du deinen Shop wirklich löschen?",
            accept: () => {
                console.log("Shop löschen")
            },
        })
    }
</script>
