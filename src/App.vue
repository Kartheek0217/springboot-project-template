<!-- src/App.vue -->
<template>
  <v-app>
    <Header @add-table="showAddTableDialog" @import-sql="importSQL" @import-dbml="importDBML" @export-sql="exportSQL"
      @export-dbml="exportDBML" @export-webp="exportWebP" @export-springboot="exportSpringBoot" />
    <SideMenu :tables="tables" @select-table="editTable" />
    <MainCanvas :tables="tables" />

    <AddTableDialog v-model="showDialog" :table-to-edit="editingTable" @save="saveTable" />
  </v-app>
</template>

<style scoped></style>

<script setup>
import { ref } from 'vue'
import Header from '@/components/HeaderComponent.vue'
import SideMenu from '@/components/SideMenu.vue'
import MainCanvas from '@/components/MainCanvas.vue'
import AddTableDialog from '@/components/AddTableDialog.vue'

const tables = ref([])
const showDialog = ref(false)
const editingTable = ref(null)

function showAddTableDialog() {
  editingTable.value = null
  showDialog.value = true
}

function editTable(table) {
  editingTable.value = table
  showDialog.value = true
}

function saveTable(updatedTable) {
  if (editingTable.value) {
    // Find the table by its ID and update it
    const index = tables.value.findIndex(t => t.id === updatedTable.id)
    if (index !== -1) {
      tables.value[index] = updatedTable
    }
  } else {
    // Add a new table with a unique ID and random position
    const newTableWithCoords = {
      ...updatedTable,
      id: Date.now(),
      x: Math.random() * 500 + 50,
      y: Math.random() * 300 + 50
    }
    tables.value.push(newTableWithCoords)
  }
  showDialog.value = false
  editingTable.value = null
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
