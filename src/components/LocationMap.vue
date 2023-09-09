<script setup lang="ts">
import { GoogleMap, Marker } from 'vue3-google-map'
import { useLocationsStore } from '@/stores/locations'
import { ref, watch } from 'vue'

const mapKey = import.meta.env.VITE_GOOGLE_API_KEY
const defaultCenter = { lat: 43.718, lng: -79.543 }

const locations = useLocationsStore()

const center = ref(defaultCenter)

watch(locations, (newStore) => {
    const lastLocation = newStore.lastLocation
    if (lastLocation && lastLocation.lat && lastLocation.lng) {
        center.value = { lat: lastLocation.lat, lng: lastLocation.lng }
    }
})
</script>

<template>
    <GoogleMap :api-key="mapKey" style="width: 100%; height: 500px" :zoom="15" :center="center">
        <Marker
            v-for="location in locations.locations.filter(
                (location) => location.lat && location.lng
            )"
            v-bind:key="location.name"
            :options="{
                position: { lat: location.lat ?? 0, lng: location.lng ?? 0 },
                label: location.name
            }"
        />
    </GoogleMap>
</template>

<style scoped></style>
