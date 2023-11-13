<template>
    <div>
        <h1 class="mb-10 text-headline-medium font-bold">IndieZone Cities</h1>
        <Dialog v-model:visible="dialogVisibility" modal header="Add City" class="w-full max-w-lg">
            <ClientOnly>
                <div>
                    <AutoComplete
                        v-model="city"
                        inputId="city-autofill"
                        option-label="name"
                        :suggestions="suggestions"
                        @complete="search"
                        @item-select="retrieve"
                        class="mb-4 w-full"
                        :pt="{ input: 'w-full' }" />
                    <Button @click="addCity()" :disabled="!selectedCity"> <Icon name="material-symbols:add" /> Add </Button>
                    <div class="my-4 h-[350px] w-full">
                        <TheMap :center="mapCenter" :bounds="mapBounds" :markers="mapCenter ? [mapCenter] : []" id="add" />
                    </div>
                    <pre>
                        mapBounds: {{ mapBounds }}
                    </pre>
                    <DevOnly>
                        <pre>selected city: {{ selectedCity }}</pre>
                        <pre>suggestions: {{ suggestions }}</pre>
                    </DevOnly>
                </div>
            </ClientOnly>
        </Dialog>
        <Button label="Add City" @click="dialogVisibility = true">
            <template #icon>
                <Icon name="material-symbols:add" />
            </template>
        </Button>
        <DataTable :value="cities" v-model:filters="filters" filter-display="row">
            <Column field="name" header="Name" />
            <Column header="Map">
                <template #body="{ data }">
                    <div class="h-[300px] w-[500px]">
                        <!-- <pre>{{ data }}</pre> -->
                        <TheMap :center="data.center" :bounds="data.bbox" :markers="[data.center]" :id="data.name" />
                    </div>
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
    const mapCenter = ref<mapboxgl.LngLat>()
    const mapBounds = ref()

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
            mapCenter.value = new mapboxgl.LngLat(
                selectedCity.value.properties.coordinates.longitude,
                selectedCity.value.properties.coordinates.latitude
            )
            mapBounds.value = selectedCity.value.properties.bbox
        }
    }

    async function addCity() {
        const { error } = await supabase.from("allowed_cities").insert({
            name: selectedCity.value.properties.name,
            center: [selectedCity.value.properties.coordinates.longitude, selectedCity.value.properties.coordinates.latitude],
            bbox: selectedCity.value.properties.bbox,
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
        city.value = ""
        selectedCity.value = null
        suggestions.value = []
        refreshCities()
        dialogVisibility.value = false
    }
</script>
