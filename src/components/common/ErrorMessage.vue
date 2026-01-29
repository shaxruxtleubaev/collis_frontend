<template>
  <v-alert
    :type="type"
    :title="title"
    :text="message"
    :icon="icon"
    variant="tonal"
    closable
    @click:close="$emit('close')"
    class="mb-4"
  >
    <template v-if="action" v-slot:append>
      <v-btn
        :color="type"
        variant="text"
        size="small"
        @click="action.onClick"
      >
        {{ action.text }}
      </v-btn>
    </template>
  </v-alert>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Action {
  text: string
  onClick: () => void
}

const props = defineProps<{
  type?: 'error' | 'warning' | 'info' | 'success'
  title?: string
  message: string
  action?: Action
}>()

const icon = computed(() => {
  switch (props.type) {
    case 'error': return 'mdi-alert-circle'
    case 'warning': return 'mdi-alert'
    case 'info': return 'mdi-information'
    case 'success': return 'mdi-check-circle'
    default: return 'mdi-information'
  }
})

defineEmits(['close'])
</script>