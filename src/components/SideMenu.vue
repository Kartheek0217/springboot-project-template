<!-- src/components/SideMenu.vue -->
<template>
  <v-navigation-drawer app permanent width="250">
    <v-list>
      <v-list-item v-for="table in tables" :key="table.id" @click="$emit('select-table', table)">
        <v-list-item-title>{{ table.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { VNavigationDrawer, VList, VListItem, VListItemTitle } from 'vuetify/components'

defineProps({
  tables: Array
});

defineEmits(['select-table']);
</script>

<style scoped>
.highlight-item {
  background-color: #e3f2fd;
  /* Light blue background */
  color: #1976D2;
  /* Primary text color */
  font-weight: bold;
}
</style>
