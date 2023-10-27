<template>
    <div>
        <label for="address-autofill" class="mb-1 block text-label-large font-bold">Addresssuche</label>
        <AutoComplete
            v-model="value"
            inputId="address-autofill"
            option-label="place_name"
            :suggestions="suggestions"
            @complete="search"
            @item-select="retrieve"
            class="mb-4 w-full"
            :pt="{ input: 'w-full' }" />
        <FormKit
            type="primeInputText"
            v-model="streetAddress"
            name="street_address"
            label="Straße und Hausnummer"
            validation="(200)required"
            placeholder="Straße und Hausnummer"
            class="w-full"
            disabled />
        <FormKit
            type="primeInputText"
            v-model="zipCode"
            name="zip_code"
            label="Postleitzahl"
            validation="(200)required"
            placeholder="Postleitzahl"
            class="w-full"
            disabled />
        <FormKit
            type="primeInputText"
            v-model="city"
            name="city"
            label="Ort"
            validation="(200)required"
            placeholder="Ort"
            class="w-full"
            disabled />
        <div class="h-96 w-full overflow-hidden rounded-lg border-2 border-primary">
            <ClientOnly>
                <div class="relative h-full w-full">
                    <MapboxMap
                        map-id="shopRegistrationMap"
                        class="absolute left-0 top-0"
                        :options="{
                            style: 'mapbox://styles/mapbox/streets-v12',
                            center: modelValue ? modelValue : [10.451526, 51.165691],
                            zoom: zoom,
                        }">
                        <MapboxNavigationControl position="top-right" />
                        <MapboxDefaultMarker
                            v-if="modelValue"
                            marker-id="marker"
                            :options="{ color: '#99D100', draggable: true }"
                            :lnglat="modelValue"
                            @dragend="markerDragged" />
                    </MapboxMap>
                </div>
            </ClientOnly>
        </div>
        <DevOnly>
            <pre>location: {{ modelValue }}</pre>
        </DevOnly>
    </div>
</template>

<script lang="ts" setup>
    import { AutoCompleteCompleteEvent, AutoCompleteItemSelectEvent } from "primevue/autocomplete"
    import { AddressAutofillCore, SearchSession } from "@mapbox/search-js-core"
    import mapboxgl from "mapbox-gl"

    const props = defineProps<{
        modelValue?: mapboxgl.LngLatLike
    }>()

    const emit = defineEmits<{
        (e: "update:modelValue", value: mapboxgl.LngLatLike): void
    }>()

    const value = ref()
    const streetAddress = ref()
    const zipCode = ref()
    const city = ref()
    const zoom = ref<number>(5)

    const runtimeConfig = useRuntimeConfig()

    const addressAutofill = new AddressAutofillCore({
        accessToken: runtimeConfig.public.mapboxApiToken,
        country: "de",
        language: "de",
        limit: 5,
    })

    const session = new SearchSession(addressAutofill, 300)

    const suggestions = ref()

    async function search(event: AutoCompleteCompleteEvent) {
        if (event.query.length < 4) {
            return
        }
        const results = await session.suggest(event.query)
        suggestions.value = results.suggestions
    }

    async function retrieve(event: AutoCompleteItemSelectEvent) {
        console.log(event.value)
        if (session.canRetrieve(event.value)) {
            const result = await session.retrieve(event.value)
            streetAddress.value = result.features[0].properties.address_line1
            zipCode.value = result.features[0].properties.postcode
            city.value = result.features[0].properties.place
            zoom.value = 13

            emit("update:modelValue", result.features[0].geometry.coordinates as mapboxgl.LngLatLike)
        }
    }

    function markerDragged() {
        const markerRef = useMapboxMarkerRef("marker")
        emit("update:modelValue", markerRef.value?.getLngLat().toArray() as mapboxgl.LngLatLike)
    }

    const addressSchema = [
        {
            $el: "h2",
            attrs: {
                class: "text-headline-small mb-3",
            },
            children: "Und wo können ihn deine Kunden finden?",
        },
        {
            $formkit: "primeInputText",
            name: "street_address",
            label: "Straße und Hausnummer",
            validation: "required",
            placeholder: "Straße und Hausnummer",
            class: "w-full",
        },
        {
            $formkit: "primeInputText",
            name: "zip_code",
            label: "Postleitzahl",
            validation: "required",
            placeholder: "Postleitzahl",
            class: "w-full",
        },
        {
            $formkit: "primeInputText",
            name: "city",
            label: "Ort",
            validation: "required",
            placeholder: "Ort",
            class: "w-full",
        },
    ]
</script>
