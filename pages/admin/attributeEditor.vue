<template>
    <div class="flex w-full flex-col items-center gap-4 p-4">
        <h1 class="text-display-medium font-bold">Attribute Editor</h1>
        <div class="w-full space-y-6">
            <div class="flex items-center gap-4">
                <Button label="Add Attribute" icon="pi pi-plus" @click="addAttribute()" />
                <MultiSelect
                    v-model="filteredLocales"
                    :options="locales"
                    :pt="{ label: 'p-2', header: 'py-1 px-3', item: 'py-1 px-3' }" />
            </div>
            <DataTable
                class="w-full"
                :value="attributes"
                v-model:editing-rows="editingRows"
                v-model:filters="filters"
                edit-mode="row"
                filter-display="row"
                data-key="id"
                removable-sort
                :loading="attributesPending"
                @row-edit-save="onRowEditSave">
                <template #loading>
                    <div class="flex h-full w-full items-center justify-center">
                        <ProgressSpinner />
                    </div>
                </template>
                <!-- <Column field="id" header="ID" :editable="false" /> -->
                <Column
                    v-for="locale in filteredLocales"
                    :key="locale"
                    :field="'name_' + locale"
                    :header="'Name (' + locale + ')'"
                    sortable>
                    <template #body="{ data, field }">
                        {{ data[field] }}
                    </template>
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" class="p-2" />
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText
                            v-model="filterModel.value"
                            type="text"
                            @input="filterCallback()"
                            placeholder="Search"
                            class="p-2" />
                    </template>
                </Column>
                <Column field="type" header="Type">
                    <template #editor="{ data, field }">
                        <Dropdown
                            v-model="data[field]"
                            :options="['text', 'number', 'select', 'min/max']"
                            @change="onTypeChange(data, field)"
                            :pt="{ input: 'p-2' }" />
                    </template>
                </Column>
                <Column field="values" header="Values">
                    <template #body="{ data, field }">
                        <div v-if="data[field] === null">-</div>
                        <div v-else-if="data.type === 'min/max'">Min: {{ data[field].min }}, Max: {{ data[field].max }}</div>
                        <div v-else-if="data[field].length === 0">-</div>
                        <div v-else class="flex gap-4">
                            <div v-for="locale in filteredLocales">
                                <div class="font-bold">{{ locale }}:</div>
                                {{ data[field].map((value: I18n) => value[locale]).join(", ") }}
                            </div>
                        </div>
                    </template>
                    <template #editor="{ data, field }">
                        <AttributeValueEditor v-model="data[field]" :locales="filteredLocales" :type="data.type" />
                    </template>
                </Column>
                <Column :row-editor="true" class="p-2 text-center" />
                <Column class="p-2 text-center">
                    <template #body="{ data }">
                        <Button rounded text icon="pi pi-trash" severity="danger" @click="deleteAttribute(data.id)" />
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { DataTableRowEditSaveEvent } from "primevue/datatable"
    import { FilterMatchMode } from "primevue/api"
    import { useToast } from "primevue/usetoast"

    const client = useSupabaseClient<Database>()
    const toast = useToast()

    const locales = ref(["de", "en"])
    const filteredLocales = ref(["de"])

    const editingRows = ref<any[]>([])
    const filters = ref({
        name_de: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        name_en: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    })

    const { attributes, refreshAttributes, attributesPending } = await useAttributesEditor()

    async function onRowEditSave(event: DataTableRowEditSaveEvent) {
        if (!attributes.value) return
        const { newData, index } = event
        newData.name = {
            de: newData.name_de,
            en: newData.name_en,
        }
        attributes.value[index] = { ...newData }
        for (const locale of locales.value) {
            delete newData["name_" + locale]
        }
        const { error } = await client.from("attributes").upsert(newData).eq("id", newData.id)
        if (error) {
            toast.add({
                severity: "error",
                summary: "Fehler",
                detail: error.message,
                life: 3000,
            })
            refreshAttributes()
        } else {
            toast.add({
                severity: "success",
                summary: "Erfolgreich",
                detail: "Änderungen gespeichert",
                life: 3000,
            })
        }
    }

    async function addAttribute() {
        const { error } = await client.from("attributes").insert([
            {
                name: {
                    de: "Neues Attribut",
                    en: "New Attribute",
                },
                type: "text",
                values: null,
            },
        ])
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
                detail: "Attribut hinzugefügt",
                life: 3000,
            })
        }
        refreshAttributes()
    }

    async function deleteAttribute(id: number) {
        const { error } = await client.from("attributes").delete().eq("id", id)
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
                detail: "Attribut gelöscht",
                life: 3000,
            })
        }
        refreshAttributes()
    }

    function onTypeChange(data: any, field: string) {
        if (data[field] === "select") {
            data.values = []
        } else if (data[field] === "min/max") {
            data.values = {
                min: 0,
                max: 0,
            }
        } else {
            data.values = null
        }
    }

    definePageMeta({
        layout: "admin",
        middleware: ["admin"],
    })
</script>
