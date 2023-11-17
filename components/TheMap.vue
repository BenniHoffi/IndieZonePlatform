<template>
    <div class="relative h-full w-full">
        <MapboxMap
            :map-id="'map' + id"
            class="absolute left-0 top-0"
            :options="{
                style: 'mapbox://styles/mapbox/streets-v12',
                center: center,
                bounds: bounds,
                zoom: zoom,
            }"
            @zoomend="$emit('update:bounds', mapRef?.getBounds())"
            @dragend="$emit('update:bounds', mapRef?.getBounds())">
            <MapboxGeocoder v-if="geocoder" position="top-left" />
            <MapboxGeolocateControl v-if="geolocation" position="top-right" />
            <MapboxNavigationControl position="top-right" />
            <MapboxDefaultMarker
                v-for="(marker, index) in markers"
                :marker-id="'marker' + index"
                :options="{ color: '#99D100', draggable: false }"
                :lnglat="marker">
                <!-- <template #marker>
                    <Icon name="material-symbols:location-on" />
                </template> -->
            </MapboxDefaultMarker>
        </MapboxMap>
    </div>
</template>

<script setup lang="ts">
    import mapboxgl from "mapbox-gl"

    const {
        center = [10.451526, 51.165691],
        zoom = 5,
        markers,
        geolocation = false,
        geocoder = false,
        id,
    } = defineProps<{
        center?: mapboxgl.LngLatLike
        zoom?: number
        markers?: mapboxgl.LngLatLike[]
        geolocation?: boolean
        geocoder?: boolean
        id?: string
    }>()

    const mapRef = useMapboxRef("map" + id)
    const bounds = defineModel<mapboxgl.LngLatBoundsLike>("bounds")
</script>
