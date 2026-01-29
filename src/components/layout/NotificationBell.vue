<template>
  <v-menu location="bottom end">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" class="mr-2">
        <v-badge
          :content="notificationStore.unreadCount"
          :color="notificationStore.unreadCount > 0 ? 'error' : 'transparent'"
          dot
        >
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>
    </template>
    
    <v-card width="350">
      <v-toolbar color="primary" density="compact">
        <v-toolbar-title>Notifications</v-toolbar-title>
        <v-spacer />
        <v-btn 
          icon 
          size="small"
          @click="markAllAsRead"
          :disabled="notificationStore.unreadCount === 0"
        >
          <v-icon>mdi-check-all</v-icon>
        </v-btn>
      </v-toolbar>
      
      <v-list lines="two" class="pa-0">
        <template v-if="notificationStore.recentNotifications.length > 0">
          <v-list-item
            v-for="notification in notificationStore.recentNotifications.slice(0, 5)"
            :key="notification.id"
            :class="{ 'bg-grey-lighten-4': !notification.is_sent }"
          >
            <template v-slot:prepend>
              <v-icon
                :color="notificationStore.getMessageTypeColor(notification.message_type)"
              >
                {{ notificationStore.getMessageTypeIcon(notification.message_type) }}
              </v-icon>
            </template>
            
            <v-list-item-title class="font-weight-medium">
              {{ notification.course_code }} - {{ notification.message_type_display }}
            </v-list-item-title>
            
            <v-list-item-subtitle>
              {{ notification.message_text }}
            </v-list-item-subtitle>
            
            <v-list-item-subtitle class="text-caption text-grey">
              {{ formatDate(notification.created_at) }}
            </v-list-item-subtitle>
            
            <template v-slot:append>
              <v-btn
                v-if="!notification.is_sent"
                icon
                size="small"
                @click="markAsRead(notification.id)"
              >
                <v-icon size="small">mdi-check</v-icon>
              </v-btn>
            </template>
          </v-list-item>
        </template>
        
        <v-list-item v-else>
          <v-list-item-title class="text-center text-grey">
            No notifications
          </v-list-item-title>
        </v-list-item>
      </v-list>
      
      <v-divider />
      
      <v-card-actions>
        <v-btn
          block
          variant="text"
          :to="{ name: 'notifications' }"
          @click="closeMenu"
        >
          View All Notifications
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { useNotificationStore } from '@/stores/notification'

const notificationStore = useNotificationStore()

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  
  return date.toLocaleDateString()
}

function markAsRead(id: number) {
  notificationStore.markAsRead(id)
}

function markAllAsRead() {
  notificationStore.markAllAsRead()
}

function closeMenu() {
  // Menu closes automatically on navigation
}
</script>