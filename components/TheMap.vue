<template>
    <div class="relative h-full w-full">
        <MapboxMap
            map-id="map"
            class="absolute left-0 top-0"
            :options="{
                style: 'mapbox://styles/mapbox/streets-v12',
                center: center,
                bounds: bounds,
                zoom: zoom,
            }">
            <MapboxGeocoder v-if="geocoder" position="top-left" />
            <MapboxGeolocateControl v-if="geolocation" position="top-right" />
            <MapboxNavigationControl position="top-right" />
            <MapboxDefaultMarker
                v-for="(marker, index) in markers"
                :marker-id="'marker' + index"
                :options="{ color: '#99D100', draggable: false }"
                :lnglat="marker" />
        </MapboxMap>
    </div>
</template>

<script setup lang="ts">
    import mapboxgl from "mapbox-gl"

    const {
        center = [10.451526, 51.165691],
        bounds,
        zoom = 5,
        markers,
        geolocation = false,
        geocoder = false,
    } = defineProps<{
        center?: mapboxgl.LngLatLike
        bounds?: mapboxgl.LngLatBoundsLike
        zoom?: number
        markers?: mapboxgl.LngLatLike[]
        geolocation?: boolean
        geocoder?: boolean
    }>()
</script>
