<script setup lang="ts">
import { ref } from 'vue'
import { useLocationsStore } from '@/stores/locations'
import moment from 'moment-timezone'

interface LocationOption {
    value: string
    id: string
}

const locations = useLocationsStore()

const value = ref('')
const options = ref<LocationOption[]>([])
const searchTimeOut = ref<number | null>(null)

const onSearch = (searchText: string) => {
    if (searchTimeOut.value) {
        window.clearTimeout(searchTimeOut.value)
    }
    if (searchText === '') return

    searchTimeOut.value = window.setTimeout(() => {
        let service = new google.maps.places.AutocompleteService()
        service.getPlacePredictions(
            {
                input: searchText
            },
            (results) => {
                if (results) {
                    options.value = results.map((result) => {
                        return {
                            value: result.description,
                            id: result.place_id
                        }
                    })
                }
            }
        )
    }, 500)
}

const onSelect = (searchText: string, option: LocationOption) => {
    let service = new google.maps.places.PlacesService(document.createElement('div'))
    service.getDetails(
        {
            placeId: option.id,
            fields: ['geometry', 'utc_offset_minutes', 'formatted_address']
        },
        (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                locations.addLocation({
                    name: results.formatted_address ?? '',
                    lat: results.geometry?.location?.lat(),
                    lng: results.geometry?.location?.lng(),
                    utcOffset: results.utc_offset_minutes ?? 0,
                    key: 0
                })
                value.value = ''
            }
        }
    )
}

const onSearchButtonClick = () => {
    onSelect(options.value[0].value, options.value[0])
}

const onCurrentLocationClick = () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((pos) => {
            locations.addLocation({
                name: 'Current Location',
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
                utcOffset: moment.tz.guess(),
                key: 0
            })
        })
    }
}
</script>

<template>
    <div style="display: flex">
        <a-auto-complete
            v-model:value="value"
            :options="options"
            style="width: 100%; flex-grow: 1"
            placeholder="input location"
            @select="onSelect"
            @search="onSearch"
        />
        <a-button @click="onSearchButtonClick" style="margin-left: 8px">Search</a-button>
        <a-button @click="onCurrentLocationClick" style="margin-left: 16px"
            >Current Location</a-button
        >
    </div>
</template>

<style scoped></style>
