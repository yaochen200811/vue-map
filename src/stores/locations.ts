import { defineStore } from 'pinia'

export interface Location {
    name: string
    lat?: number
    lng?: number
    utcOffset?: number | string
    key: number
}

export const useLocationsStore = defineStore({
    id: 'locations',
    state: () => ({
        locations: [] as Location[],
        nextKey: 0,
        lastLocation: null as Location | null
    }),
    actions: {
        addLocation(newLocation: Location) {
            newLocation.key = this.nextKey++
            this.locations.push(newLocation)
            this.lastLocation = newLocation
        },

        removeLocations(targets: Location[]) {
            this.locations = this.locations.filter(
                (location) => !targets.find((target) => target.key === location.key)
            )
        }
    }
})
