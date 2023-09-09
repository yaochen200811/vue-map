<script setup lang="ts">
import { ref } from 'vue'
import { useLocationsStore } from '@/stores/locations'
import type { Location } from '@/stores/locations'
import type { TableProps } from 'ant-design-vue'

const columns = [
    {
        title: 'Location Name',
        dataIndex: 'name',
        key: 'name'
    }
]

const locations = useLocationsStore()

const selectedRow = ref<Location[]>([])

const rowSelection: TableProps['rowSelection'] = {
    onChange: (selectedRowKeys: (string | number)[], selectedRows: Location[]) => {
        selectedRow.value = selectedRows
    }
}

const deleteLocations = () => {
    locations.removeLocations(selectedRow.value)
    selectedRow.value = []
}
</script>

<template>
    <a-button @click="deleteLocations" :disabled="!selectedRow.length">Delete</a-button>
    <a-table
        :columns="columns"
        :data-source="locations.locations"
        :row-selection="rowSelection"
        :pagination="{ pageSize: 10 }"
    />
</template>

<style scoped></style>
