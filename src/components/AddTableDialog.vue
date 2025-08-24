<!-- src/components/AddTableDialog.vue -->
<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">New Table</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row class="d-flex align-center">
            <v-col cols="12" sm="5">
              <v-text-field label="Table Name" v-model="tableName" persistent></v-text-field>
            </v-col>
            <v-col cols="12" sm="5">
              <v-text-field label="Schema" v-model="schemaName" persistent></v-text-field>
            </v-col>
            <v-col cols="12" sm="2">
              <v-btn color="primary" @click="addField"><v-icon icon="mdi-plus-circle" /></v-btn>
            </v-col>
          </v-row>
        </v-container>

        <v-divider class="mb-4"></v-divider>

        <div class="fields-table-container">
          <table class="fields-table">
            <thead>
              <tr class="sticky-header">
                <th>Name</th>
                <th>Type</th>
                <th class="text-center">Primary Key</th>
                <th class="text-center">Not NULL</th>
                <th class="text-center">Unique</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(field, index) in fields" :key="index">
                <td>
                  <v-text-field density="compact" hide-details v-model="field.name"></v-text-field>
                </td>
                <td>
                  <v-text-field density="compact" hide-details v-model="field.type"></v-text-field>
                </td>
                <td class="text-center">
                  <v-checkbox density="compact" hide-details v-model="field.pk"></v-checkbox>
                </td>
                <td class="text-center">
                  <v-checkbox density="compact" hide-details v-model="field.notNull"></v-checkbox>
                </td>
                <td class="text-center">
                  <v-checkbox density="compact" hide-details v-model="field.unique"></v-checkbox>
                </td>
                <td class="text-center">
                  <v-btn icon @click="removeField(index)" size="small">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" variant="text" @click="dialog = false">Cancel</v-btn>
        <v-btn color="blue darken-1" variant="text" @click="saveTable">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: Boolean
});

const emit = defineEmits(['update:modelValue', 'save']);

const dialog = ref(props.modelValue);
const tableName = ref('new_table');
const schemaName = ref('public');
const fields = ref([
  { name: 'id', type: 'bigint', pk: true, notNull: true, unique: false }
]);

watch(() => props.modelValue, (val) => {
  dialog.value = val;
});

watch(dialog, (val) => {
  if (!val) {
    emit('update:modelValue', false);
  }
});

function addField() {
  fields.value.push({ name: '', type: '', pk: false, notNull: false, unique: false });
}

function removeField(index) {
  fields.value.splice(index, 1);
}

function saveTable() {
  const newTable = {
    name: tableName.value,
    schema: schemaName.value,
    fields: fields.value
  };
  emit('save', newTable);
  dialog.value = false;
}
</script>

<style scoped>
.fields-table-container {
  max-height: 250px;
  overflow-y: auto;
}

.fields-table {
  width: 100%;
  border-collapse: collapse;
}

.fields-table th,
.fields-table td {
  padding: 8px;
  border-bottom: 1px solid #e0e0e0;
}

.sticky-header {
  position: sticky;
  top: 0;
  background-color: #f5f5f5;
  z-index: 10;
}
</style>
