<!-- src/src/views/HomeView.vue -->
<template>
  <v-app>
    <SideMenu :tables="tables" />
    <MainCanvas :tables="tables" />
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import SideMenu from '@/components/SideMenu.vue'
import MainCanvas from '@/components/MainCanvas.vue'

// Define the tables state
const tables = ref([])
</script>
