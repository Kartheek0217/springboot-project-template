<!-- src/components/MainCanvas.vue -->
<template>
  <v-main>
    <div class="canvas">
      <p v-if="tables.length === 0">No tables yet. Add one to get started.</p>
      <v-card v-for="table in tables" :key="table.id" class="table-box"
        :class="{ 'highlight-table': table.id === selectedTableId }"
        :style="{ left: `${table.x}px`, top: `${table.y}px` }" elevation="4" rounded="lg"
        @mousedown.stop="startDrag($event, table)" @click.stop="tablesStore.setSelectedTable(table.id)">
        <v-card-title>
          <v-icon left>mdi-table</v-icon>
          <strong>{{ table.name }}</strong>
          <span v-if="table.schema" class="text-caption ml-2">({{ table.schema }})</span>
        </v-card-title>
        <v-divider />
        <v-card-text>
          <div v-for="field in table.fields" :key="field.name" class="field-item">
            <span>{{ field.name }} <span class="text-grey-lighten-1">{{ field.type }}</span></span>
            <span class="ml-auto">
              <span v-if="field.pk" class="mr-2 text-primary">PK</span>
              <span v-if="field.notNull" class="mr-2 text-secondary">N.N.</span>
              <span v-if="field.unique" class="mr-2 text-info">UQ</span>
            </span>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-main>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTablesStore } from '@/stores/tablesStore'
import { VCard, VCardTitle, VCardText, VDivider, VIcon } from 'vuetify/components'

const tablesStore = useTablesStore()
const { tables, selectedTableId } = storeToRefs(tablesStore)

const isDragging = ref(false)
const draggedTableId = ref(null)
const dragStartX = ref(0)
const dragStartY = ref(0)
const tableStartX = ref(0)
const tableStartY = ref(0)

function startDrag(event, table) {
  isDragging.value = true
  draggedTableId.value = table.id
  dragStartX.value = event.clientX
  dragStartY.value = event.clientY
  tableStartX.value = table.x
  tableStartY.value = table.y
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
  tablesStore.setSelectedTable(table.id)
}

function onDrag(event) {
  if (!isDragging.value) return
  const dx = event.clientX - dragStartX.value
  const dy = event.clientY - dragStartY.value
  const newX = tableStartX.value + dx
  const newY = tableStartY.value + dy
  tablesStore.updateTablePosition({
    id: draggedTableId.value,
    x: newX,
    y: newY,
  })
}

function stopDrag() {
  isDragging.value = false
  draggedTableId.value = null
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}
</script>

<style scoped>
.canvas {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f0f2f5;
  overflow: hidden;
}

.table-box {
  position: absolute;
  min-width: 250px;
  max-width: 400px;
  cursor: grab;
  transition: all 0.2s ease-in-out;
  user-select: none;
}

.highlight-table {
  outline: 2px solid #1976d2;
  box-shadow: 0 0 10px rgba(25, 118, 210, 0.5);
  transform: scale(1.03);
  z-index: 10;
}
</style>
