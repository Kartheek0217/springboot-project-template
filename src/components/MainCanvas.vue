<!-- src/components/MainCanvas.vue -->
<template>
  <v-main>
    <div class="canvas">
      <p v-if="tables.length === 0">No tables yet. Add one to get started.</p>
      <v-card v-for="table in tables" :key="table.id" class="table-box"
        :style="{ left: `${table.x}px`, top: `${table.y}px` }">
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
import { VCard, VCardTitle, VCardText, VDivider, VIcon } from 'vuetify/components';

defineProps({
  tables: Array
});
</script>

<style scoped>
.canvas {
  position: relative;
  min-height: 600px;
  background-color: #f5f5f5;
  padding: 16px;
}

.table-box {
  background: white;
  border: 1px solid #ccc;
  padding: 8px;
  position: absolute;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 250px;
  max-width: 400px;
}

.field-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
