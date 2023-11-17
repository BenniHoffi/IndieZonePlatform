<template>
    <div>
        <h1 class="mb-10 text-headline-medium font-bold">IndieZone Cities</h1>
        <Dialog v-model:visible="dialogVisibility" modal header="Add City" class="w-full max-w-lg" @hide="resetDialog()">
            <div class="flex flex-col">
                <AutoComplete
                    v-model="city"
                    inputId="city-autofill"
                    option-label="name"
                    :suggestions="suggestions"
                    @complete="search"
                    @item-select="retrieve"
                    class="mb-4 w-full"
                    :pt="{ input: 'w-full' }" />
                <div class="my-4 aspect-square w-full border border-primary">
                    <TheMap :bounds="initialMapBounds" @update:bounds="(bounds) => (mapBounds = bounds)" id="add" />
                </div>
                <Button @click="addCity()" :disabled="!selectedCity" class="self-end">
                    <Icon name="material-symbols:add" class="mr-2" />
                    Add
                </Button>
                <DevOnly>
                    <pre>mapBounds: {{ mapBounds }}</pre>
                    <pre>selected city: {{ selectedCity }}</pre>
                    <pre>suggestions: {{ suggestions }}</pre>
                </DevOnly>
            </div>
        </Dialog>
        <Button @click="dialogVisibility = true">
            <Icon name="material-symbols:add" class="mr-2" />
            Add City
        </Button>
        <DataTable :value="cities" v-model:filters="filters" filter-display="row" :loading="citiesPending">
            <Column field="name" header="Name">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                </template>
                <template #loading>
                    <ProgressSpinner />
                </template>
            </Column>
            <Column header="Map">
                <template #body="{ data }">
                    <div class="aspect-square h-[300px] border border-primary">
                        <!-- <pre>{{ data }}</pre> -->
                        <TheMap :bounds="data.bbox_json" :id="data.name" />
                    </div>
                </template>
            </Column>
            <Column>
                <template #body="{ data }">
                    <Button rounded text severity="danger" @click="deleteCity(data.id)">
                        <template #icon>
                            <Icon name="material-symbols:delete-outline" />
                        </template>
                    </Button>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script lang="ts" setup>
    import { useToast } from "primevue/usetoast"
    import { FilterMatchMode } from "primevue/api"
    import type { AutoCompleteCompleteEvent, AutoCompleteItemSelectEvent } from "primevue/autocomplete"
    import { SearchBoxCore, SearchSession } from "@mapbox/search-js-core"
    import mapboxgl from "mapbox-gl"

    definePageMeta({
        title: "IndieZone Admin",
        layout: "admin",
        middleware: ["admin"],
    })

    const toast = useToast()
    const supabase = useSupabaseClient<Database>()
    const { cities, refreshCities, citiesPending } = await useCities()

    const dialogVisibility = ref(false)
    const filters = ref({
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    })

    const city = ref()
    const suggestions = ref()
    const selectedCity = ref()
    const initialMapBounds = ref<mapboxgl.LngLatBoundsLike>()
    const mapBounds = ref<mapboxgl.LngLatBoundsLike>()

    const runtimeConfig = useRuntimeConfig()

    const cityAutofill = new SearchBoxCore({
        accessToken: runtimeConfig.public.mapboxApiToken,
        country: "de",
        language: "de",
        limit: 5,
        types: "place",
    })

    const session = new SearchSession(cityAutofill, 300)

    async function search(event: AutoCompleteCompleteEvent) {
        if (event.query.length < 4) {
            return
        }
        const results = await session.suggest(event.query)
        suggestions.value = results.suggestions
    }

    async function retrieve(event: AutoCompleteItemSelectEvent) {
        if (session.canRetrieve(event.value)) {
            selectedCity.value = (await session.retrieve(event.value)).features[0]
            initialMapBounds.value = selectedCity.value.properties.bbox
        }
    }

    async function addCity() {
        if (!mapBounds.value) return
        mapBounds.value = mapboxgl.LngLatBounds.convert(mapBounds.value)
        const { error } = await supabase.rpc("add_allowed_city", {
            name: selectedCity.value.properties.name,
            west: mapBounds.value.getWest(),
            south: mapBounds.value.getSouth(),
            east: mapBounds.value.getEast(),
            north: mapBounds.value.getNorth(),
            json: mapBounds.value.toArray(),
        })
        if (error) {
            toast.add({
                severity: "error",
                summary: "Error",
                detail: error.message,
                life: 5000,
            })
        } else {
            toast.add({
                severity: "success",
                summary: "Success",
                detail: "City added",
                life: 5000,
            })
        }
        dialogVisibility.value = false
        refreshCities()
    }

    async function deleteCity(id: string) {
        const { error } = await supabase.from("allowed_cities").delete().eq("id", id)
        if (error) {
            toast.add({
                severity: "error",
                summary: "Error",
                detail: error.message,
                life: 5000,
            })
        } else {
            toast.add({
                severity: "success",
                summary: "Success",
                detail: "City deleted",
                life: 5000,
            })
            cities.value?.splice(cities.value?.findIndex((city) => city.id === id), 1)
        }
    }

    function resetDialog() {
        city.value = ""
        mapBounds.value = undefined
        selectedCity.value = undefined
        suggestions.value = []
        initialMapBounds.value = undefined
    }
</script>
