<script setup lang="ts">
import { ref, watch } from 'vue'
import { useLocationsStore } from '@/stores/locations'
import moment from 'moment-timezone'

const locations = useLocationsStore()

const time = ref('')
const timeZone = ref('')
const utcOffset = ref<string | number>('')

const updateTime = () => {
    const newTime = moment().utcOffset(utcOffset.value)
    time.value = newTime.format('YYYY-MM-DD hh:mm:ss')
    timeZone.value = newTime.format('Z')
}

window.setInterval(updateTime, 200)

watch(locations, (newStore) => {
    const lastLocation = newStore.lastLocation
    if (lastLocation && lastLocation.utcOffset) {
        utcOffset.value = lastLocation.utcOffset
        updateTime()
    }
})
</script>

<template>
    <div>
        <span>UTC{{ timeZone }}</span>
        <span>{{ time }}</span>
    </div>
</template>

<style scoped>
div {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    padding: 16px 0;
}
span {
    padding: 0 8px;
}

@media screen and (max-width: 768px) {
    span {
        display: block;
    }
}
</style>
