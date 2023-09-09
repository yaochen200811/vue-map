<script setup lang="ts">
import SearchBar from './components/SearchBar.vue'
import LocationMap from './components/LocationMap.vue'
import LocationTable from './components/LocationTable.vue'
import TimeDisplay from './components/TimeDisplay.vue'
</script>

<template>
    <TimeDisplay />
    <SearchBar />
    <a-divider />
    <a-row :gutter="[16, 16]">
        <a-col :xs="24" :md="12">
            <LocationMap />
        </a-col>
        <a-col :xs="24" :md="12">
            <LocationTable />
        </a-col>
    </a-row>
</template>

<style scoped></style>
