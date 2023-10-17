<template>
    <div class="w-full max-w-screen-xl p-4">
        <h1>Attributeditor</h1>
        <div class="mb-2">
            <Button label="Attribut hinzufügen" icon="pi pi-plus" @click="addAttribute()" />
        </div>
        <DataTable
            v-model:editing-rows="editingRows"
            :value="attributes"
            edit-mode="row"
            data-key="id"
            removable-sort
            :loading="attributesPending"
            @row-edit-save.prevent="onRowEditSave">
            <!-- <Column field="id" header="ID" :editable="false"></Column> -->
            <Column field="name.de" header="Name (de)" sortable filter>
                <template #editor="{ data }">
                    <InputText v-model="data.name.de" autofocus />
                </template>
            </Column>
            <!-- <Column field="name" :header="'Name (' + locale + ')'">
              <template #body="{ data, field }">
                {{ data[field][locale] }}
              </template>
              <template #editor="{ data, field }">
                <InputText v-model="data[field][locale]" />
              </template>
            </Column> -->
            <Column field="type" header="Typ">
                <template #editor="{ data, field }">
                    <Dropdown
                        v-model="data[field]"
                        :options="['text', 'number', 'select', 'min/max']"
                        @change="onTypeChange(data, field)" />
                </template>
            </Column>
            <Column field="values" header="Werte (de)">
                <template #body="{ data, field }">
                    <div v-if="data[field] === null">-</div>
                    <div v-else-if="data.type === 'min/max'">Min: {{ data[field].min }}, Max: {{ data[field].max }}</div>
                    <div v-else-if="data[field].length === 0">-</div>
                    <div v-else>
                        {{ data[field].map((value: I18n) => value.de).join(", ") }}
                    </div>
                </template>
                <template #editor="{ data, field }">
                    <div v-if="data.type === 'select'" class="flex flex-col gap-1">
                        <div v-for="(value, index) in data[field] as I18n[]" :key="index" class="flex gap-2">
                            <InputText v-model="value.de" />
                            <Button
                                rounded
                                text
                                icon="pi pi-times"
                                size="small"
                                severity="danger"
                                @click="data[field].splice(index, 1)" />
                        </div>
                        <Button rounded text class="self-start" icon="pi pi-plus" size="small" @click="addValue(data, field)" />
                    </div>
                    <div v-else-if="data['type'] === 'min/max'" class="mt-3 flex gap-2">
                        <div class="p-float-label">
                            <InputNumber id="min" v-model="data[field].min" />
                            <label for="min">Min</label>
                        </div>
                        <div class="p-float-label">
                            <InputNumber id="max" v-model="data[field].max" />
                            <label for="max">Max</label>
                        </div>
                    </div>
                </template>
            </Column>
            <Column :row-editor="true" class="w-[10%] min-w-[8rem] text-center" />
            <Column>
                <template #body="{ data }">
                    <Button rounded text icon="pi pi-trash" severity="danger" @click="deleteAttribute(data.id)" />
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
    import { DataTableFilterMeta, DataTableFilterMetaData, DataTableRowEditSaveEvent } from "primevue/datatable"
    import { FilterMatchMode } from "primevue/api"
    import { useToast } from "primevue/usetoast"

    const client = useSupabaseClient<Database>()
    const toast = useToast()

    const locale = ref("de")

    const editingRows = ref([])

    const { attributes, refreshAttributes, attributesPending } = await useAttributes()

    async function onRowEditSave(event: DataTableRowEditSaveEvent) {
        if (!attributes.value) return
        const { newData } = event
        const { error } = await client.from("attributes").upsert(newData).eq("id", newData.id)
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
                detail: "Änderungen gespeichert",
                life: 3000,
            })
        }
        refreshAttributes()
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

    function addValue(data: any, field: string) {
        if (!data[field]) data[field] = []
        data[field].push({
            de: "",
            en: "",
        })
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
