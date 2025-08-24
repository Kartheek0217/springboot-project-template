<!-- src/App.vue -->
<template>
  <v-app>
    <Header @add-table="showAddTableDialog" @import-sql="importSQL" @import-dbml="importDBML" @export-sql="exportSQL"
      @export-dbml="exportDBML" @export-webp="exportWebP" @export-springboot="exportSpringBoot" />
    <SideMenu />
    <MainCanvas />
    <AddTableDialog v-model="showDialog" :table-to-edit="selectedTable" @save="saveTable" />
  </v-app>
</template>

<style scoped></style>

<script setup>
import { ref, computed } from 'vue'
import { useTablesStore } from '@/stores/tablesStore'
import Header from '@/components/HeaderComponent.vue'
import SideMenu from '@/components/SideMenu.vue'
import MainCanvas from '@/components/MainCanvas.vue'
import AddTableDialog from '@/components/AddTableDialog.vue'

const tablesStore = useTablesStore()

const showDialog = ref(false)

const selectedTable = computed(() => {
  if (tablesStore.selectedTableId) {
    return tablesStore.tables.find((t) => t.id === tablesStore.selectedTableId)
  }
  return null
})

function showAddTableDialog() {
  tablesStore.setSelectedTable(null)
  showDialog.value = true
}

function saveTable(updatedTable) {
  if (updatedTable.id) {
    tablesStore.updateTable(updatedTable)
  } else {
    tablesStore.addTable(updatedTable)
  }
  tablesStore.setSelectedTable(null)
  showDialog.value = false
}

function importSQL() {
  alert('Import from SQL not implemented yet.')
}
function importDBML() {
  alert('Import from DBML not implemented yet.')
}
function exportSQL() {
  alert('Export to SQL not implemented yet.')
}
function exportDBML() {
  alert('Export to DBML not implemented yet.')
}
function exportWebP() {
  alert('Export canvas to WebP not implemented yet.')
}
function exportSpringBoot() {
  alert('Export to SpringBoot template not implemented yet.')
}
</script>
