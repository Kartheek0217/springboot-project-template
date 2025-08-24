// src/stores/tablesStore.js
import { defineStore } from 'pinia'

export const useTablesStore = defineStore('tables', {
  state: () => ({
    tables: [],
    selectedTableId: null,
  }),
  actions: {
    addTable(newTable) {
      const newTableWithCoords = {
        ...newTable,
        id: Date.now(),
        x: Math.random() * 500 + 50,
        y: Math.random() * 300 + 50,
      }
      this.tables.push(newTableWithCoords)
    },
    updateTable(updatedTable) {
      const index = this.tables.findIndex((t) => t.id === updatedTable.id)
      if (index !== -1) {
        this.tables[index] = updatedTable
      }
    },
    deleteTable(tableId) {
      this.tables = this.tables.filter((t) => t.id !== tableId)
    },
    updateTablePosition(payload) {
      const table = this.tables.find((t) => t.id === payload.id)
      if (table) {
        table.x = payload.x
        table.y = payload.y
      }
    },
    setSelectedTable(tableId) {
      this.selectedTableId = tableId
    },
  },
})
