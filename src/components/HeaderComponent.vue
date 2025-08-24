<!-- src/components/HeaderComponent.vue -->
<template>
  <v-app-bar color="primary" dark>
    <v-toolbar-title>Schema Designer</v-toolbar-title>
    <v-spacer />

    <v-btn icon @click="$emit('add-table')">
      <v-icon>mdi-table-plus</v-icon>
    </v-btn>
    <v-btn @click="$emit('import-sql')">Import SQL</v-btn>
    <v-btn @click="$emit('import-dbml')">Import DBML</v-btn>
    <v-btn @click="$emit('export-sql')">Export SQL</v-btn>
    <v-btn @click="$emit('export-dbml')">Export DBML</v-btn>
    <v-btn @click="$emit('export-webp')">Export WebP</v-btn>
    <v-btn @click="$emit('export-springboot')">Export SpringBoot</v-btn>
  </v-app-bar>
</template>

<script setup>
import { VAppBar, VToolbarTitle, VSpacer, VBtn, VIcon } from 'vuetify/components'
</script>
