<template>
  <transition name="slide-fade">
    <div v-if="visible" class="notification-toast">
      <div class="toast-content">
        <div class="toast-icon">
          <v-icon :color="getTypeColor()">{{ getTypeIcon() }}</v-icon>
        </div>
        
        <div class="toast-body">
          <div class="toast-title">{{ notification.message_type_display }}</div>
          <div class="toast-message">
            {{ notification.course_code }} - {{ notification.message_text.substring(0, 60) }}
            <span v-if="notification.message_text.length > 60">...</span>
          </div>
          <div class="toast-time">{{ formatTime(notification.created_at) }}</div>
        </div>
        
        <v-btn
          icon
          size="small"
          variant="text"
          class="toast-close"
          @click="close"
        >
          <v-icon size="20">mdi-close</v-icon>
        </v-btn>
      </div>
      
      <div class="toast-action">
        <v-btn
          size="small"
          color="primary"
          variant="text"
          @click="viewDetails"
        >
          View Details
        </v-btn>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Notification } from '@/api/notification'

interface Props {
  notification: Notification
  duration?: number // milliseconds before auto-disappear (0 = no auto-dismiss)
}

const props = withDefaults(defineProps<Props>(), {
  duration: 5000 // 5 seconds
})

const emit = defineEmits<{
  close: []
}>()

const router = useRouter()
const visible = ref(true)
let hideTimeout: number | null = null

function getTypeIcon(): string {
  switch (props.notification.message_type) {
    case 'ANNOUNCEMENT':
      return 'mdi-bullhorn'
    case 'CANCELLATION':
      return 'mdi-cancel'
    case 'RESCHEDULE':
      return 'mdi-calendar-sync'
    default:
      return 'mdi-information'
  }
}

function getTypeColor(): string {
  switch (props.notification.message_type) {
    case 'ANNOUNCEMENT':
      return '#2563EB' // blue
    case 'CANCELLATION':
      return '#DC2626' // red
    case 'RESCHEDULE':
      return '#F59E0B' // amber
    default:
      return '#6366F1' // indigo
  }
}

function formatTime(timestamp: string): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  
  return date.toLocaleDateString()
}

function close() {
  visible.value = false
  if (hideTimeout) clearTimeout(hideTimeout)
  emit('close')
}

function viewDetails() {
  router.push('/notification')
  close()
}

onMounted(() => {
  if (props.duration > 0) {
    hideTimeout = window.setTimeout(() => {
      close()
    }, props.duration)
  }
})

watch(
  () => props.notification.id,
  () => {
    visible.value = true
    if (hideTimeout) clearTimeout(hideTimeout)
    if (props.duration > 0) {
      hideTimeout = window.setTimeout(() => {
        close()
      }, props.duration)
    }
  }
)
</script>

<style scoped>
.notification-toast {
  position: fixed;
  top: 80px;
  right: 20px;
  width: 360px;
  max-width: calc(100vw - 40px);
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  border-left: 4px solid var(--primary);
  overflow: hidden;
  z-index: 2000;
  animation: slideIn 300ms ease;
}

@keyframes slideIn {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.toast-content {
  display: flex;
  gap: 12px;
  padding: 16px;
  align-items: flex-start;
}

.toast-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: rgba(37, 99, 235, 0.1);
}

.toast-body {
  flex: 1;
  min-width: 0;
}

.toast-title {
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.toast-message {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.4;
  word-break: break-word;
}

.toast-time {
  font-size: 0.75rem;
  color: var(--text-tertiary);
  margin-top: 6px;
}

.toast-close {
  flex-shrink: 0;
  margin: -4px -8px -4px 0;
}

.toast-action {
  padding: 0 16px 12px;
  text-align: right;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 300ms ease;
}

.slide-fade-enter-from {
  transform: translateX(400px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(400px);
  opacity: 0;
}

@media (max-width: 600px) {
  .notification-toast {
    width: calc(100vw - 40px);
    right: 20px;
    top: 70px;
  }
}
</style>
