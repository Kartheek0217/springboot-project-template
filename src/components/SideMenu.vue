<!-- src/components/SideMenu.vue -->
<template>
  <v-navigation-drawer app permanent width="250">
    <v-list>
      <v-list-item v-for="table in tables" :key="table.id" :class="{ 'highlight-item': table.id === selectedTableId }">
        <div class="d-flex align-center w-100">
          <v-list-item-title @click.stop="tablesStore.setSelectedTable(table.id)">
            {{ table.name }}
          </v-list-item-title>
          <v-spacer></v-spacer>
          <v-btn icon size="small" variant="text" @click.stop="tablesStore.deleteTable(table.id)">
            <v-icon color="red">mdi-delete</v-icon>
          </v-btn>
        </div>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useTablesStore } from '@/stores/tablesStore'
import {
  VNavigationDrawer,
  VList,
  VListItem,
  VListItemTitle,
  VBtn,
  VIcon,
  VSpacer,
} from 'vuetify/components'

const tablesStore = useTablesStore()
const { tables, selectedTableId } = storeToRefs(tablesStore)
</script>

<style scoped>
.highlight-item {
  background-color: #e3f2fd;
  color: #1976d2;
  font-weight: bold;
}
</style>
