<template>
  <v-overlay
    :model-value="true"
    class="align-center justify-center"
    persistent
  >
    <v-progress-circular
      indeterminate
      size="64"
      width="5"
      color="primary"
    >
      <v-icon size="32" color="primary">mdi-calendar</v-icon>
    </v-progress-circular>
    
    <div class="text-center mt-4">
      <div class="text-h6">{{ message }}</div>
      <div class="text-caption text-grey mt-2" v-if="subMessage">
        {{ subMessage }}
      </div>
    </div>
  </v-overlay>
</template>

<script setup lang="ts">
defineProps({
  message: {
    type: String,
    default: 'Loading...'
  },
  subMessage: {
    type: String,
    default: ''
  }
})
</script>