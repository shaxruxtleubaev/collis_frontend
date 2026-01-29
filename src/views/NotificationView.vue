<template>
  <v-container fluid class="pa-4">
    <!-- Header -->
    <v-row class="mb-4">
      <v-col cols="12">
        <div class="d-flex align-center">
          <div>
            <h1 class="text-h4 font-weight-bold">Notifications</h1>
            <p class="text-grey">
              Stay updated with schedule changes and announcements
              <span v-if="notificationStore.lastChecked" class="text-caption ml-2">
                (Last checked: {{ formatLastChecked(notificationStore.lastChecked) }})
              </span>
            </p>
          </div>
          <v-spacer />
          <v-btn
            color="primary"
            prepend-icon="mdi-check-all"
            @click="markAllAsRead"
            :disabled="notificationStore.unreadCount === 0"
          >
            Mark All as Read
          </v-btn>
        </div>
      </v-col>
    </v-row>
    
    <!-- Notification Filters -->
    <v-card class="mb-4">
      <v-card-text>
        <v-row align="center">
          <v-col cols="12" md="4">
            <v-select
              v-model="selectedType"
              :items="typeOptions"
              label="Filter by type"
              variant="outlined"
              density="compact"
              clearable
              @update:modelValue="filterNotifications"
            />
          </v-col>
          
          <v-col cols="12" md="4">
            <v-select
              v-model="selectedStatus"
              :items="statusOptions"
              label="Filter by status"
              variant="outlined"
              density="compact"
              clearable
              @update:modelValue="filterNotifications"
            />
          </v-col>
          
          <v-col cols="12" md="4">
            <v-text-field
              v-model="searchQuery"
              label="Search notifications..."
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="compact"
              clearable
              @update:modelValue="filterNotifications"
            />
          </v-col>
        </v-row>
        
        <!-- Quick Filters -->
        <div class="d-flex flex-wrap gap-2 mt-2">
          <v-chip
            v-for="filter in quickFilters"
            :key="filter.value"
            :color="activeFilter === filter.value ? 'primary' : 'default'"
            @click="setActiveFilter(filter.value)"
          >
            {{ filter.label }}
            <span v-if="filter.count !== undefined" class="ml-1">
              ({{ filter.count }})
            </span>
          </v-chip>
        </div>
      </v-card-text>
    </v-card>
    
    <!-- Notifications List -->
    <v-card>
      <v-card-title class="d-flex align-center">
        <v-icon start>mdi-bell</v-icon>
        All Notifications
        
        <v-spacer />
        
        <v-btn-toggle
          v-model="sortBy"
          mandatory
          density="compact"
          variant="outlined"
        >
          <v-btn value="-created_at">
            <v-icon start>mdi-sort-calendar-descending</v-icon>
            Newest
          </v-btn>
          <v-btn value="created_at">
            <v-icon start>mdi-sort-calendar-ascending</v-icon>
            Oldest
          </v-btn>
        </v-btn-toggle>
      </v-card-title>
      
      <v-divider />
      
      <!-- Loading State -->
      <div v-if="notificationStore.isLoading" class="text-center py-12">
        <v-progress-circular indeterminate color="primary" />
        <div class="text-grey mt-4">Loading notifications...</div>
      </div>
      
      <!-- Empty State -->
      <div v-else-if="filteredNotifications.length === 0" class="text-center py-12">
        <v-icon size="64" color="grey-lighten-2" class="mb-4">mdi-bell-off</v-icon>
        <h3 class="text-h6 mb-2">No notifications found</h3>
        <p class="text-grey">You're all caught up!</p>
      </div>
      
      <!-- Notifications List -->
      <v-list v-else lines="three">
        <v-list-item
          v-for="notification in filteredNotifications"
          :key="notification.id"
          :class="{ 'bg-grey-lighten-4': !notification.is_sent }"
          class="notification-item"
        >
          <!-- Type Icon -->
          <template v-slot:prepend>
            <v-icon
              :color="notificationStore.getMessageTypeColor(notification.message_type)"
              size="32"
              class="mr-4"
            >
              {{ notificationStore.getMessageTypeIcon(notification.message_type) }}
            </v-icon>
          </template>
          
          <!-- Content -->
          <v-list-item-title class="font-weight-medium mb-1">
            <span class="d-flex align-center">
              {{ notification.course_code }} - {{ notification.message_type_display }}
              <v-chip
                size="small"
                :color="notification.is_sent ? 'grey' : 'primary'"
                class="ml-2"
              >
                {{ notification.is_sent ? 'Read' : 'Unread' }}
              </v-chip>
            </span>
          </v-list-item-title>
          
          <v-list-item-subtitle class="mb-2">
            {{ notification.message_text }}
          </v-list-item-subtitle>
          
          <v-list-item-subtitle class="text-caption">
            <span class="d-flex align-center flex-wrap">
              <span class="mr-4">
                <v-icon size="small" class="mr-1">mdi-calendar</v-icon>
                {{ formatDate(notification.lesson_date) }}
                <template v-if="notification.lesson_time">
                  at {{ formatTime(notification.lesson_time) }}
                </template>
              </span>
              
              <span class="mr-4" v-if="notification.group_names">
                <v-icon size="small" class="mr-1">mdi-account-group</v-icon>
                {{ notification.group_names }}
              </span>
              
              <span>
                <v-icon size="small" class="mr-1">mdi-clock</v-icon>
                {{ formatTimeAgo(notification.created_at) }}
              </span>
            </span>
          </v-list-item-subtitle>
          
          <!-- Actions -->
          <template v-slot:append>
            <div class="d-flex flex-column align-end">
              <v-btn
                v-if="!notification.is_sent"
                icon
                size="small"
                color="primary"
                @click="markAsRead(notification.id)"
                class="mb-2"
              >
                <v-icon>mdi-check</v-icon>
              </v-btn>
              
              <v-btn
                v-if="notification.lesson"
                icon
                size="small"
                color="grey"
                @click="viewLesson(notification.lesson!)"
              >
                <v-icon>mdi-open-in-new</v-icon>
              </v-btn>
            </div>
          </template>
        </v-list-item>
      </v-list>
      
      <!-- Pagination -->
      <v-card-actions v-if="filteredNotifications.length > 0" class="px-4">
        <v-spacer />
        <div class="text-caption text-grey mr-4">
          Showing {{ filteredNotifications.length }} of {{ notificationStore.notifications.length }} notifications
        </div>
        <v-btn
          icon
          :disabled="page === 1"
          @click="page--"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <span class="mx-2">Page {{ page }}</span>
        <v-btn
          icon
          :disabled="filteredNotifications.length < itemsPerPage"
          @click="page++"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    
    <!-- Stats & Info -->
    <v-row class="mt-6">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Notification Statistics</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <div class="text-center">
                  <div class="text-h3 mb-2">{{ notificationStore.unreadCount }}</div>
                  <div class="text-caption text-grey">Unread</div>
                </div>
              </v-col>
              
              <v-col cols="6">
                <div class="text-center">
                  <div class="text-h3 mb-2">{{ notificationStore.notifications.length }}</div>
                  <div class="text-caption text-grey">Total</div>
                </div>
              </v-col>
            </v-row>
            
            <v-divider class="my-4" />
            
            <div class="d-flex justify-space-between mb-2">
              <span>Announcements</span>
              <span class="font-weight-medium">
                {{ notificationStore.announcementNotifications.length }}
              </span>
            </div>
            
            <div class="d-flex justify-space-between mb-2">
              <span>Cancellations</span>
              <span class="font-weight-medium">
                {{ notificationStore.cancellationNotifications.length }}
              </span>
            </div>
            
            <div class="d-flex justify-space-between">
              <span>Reschedules</span>
              <span class="font-weight-medium">
                {{ notificationStore.notifications.length - 
                   notificationStore.announcementNotifications.length - 
                   notificationStore.cancellationNotifications.length }}
              </span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Notification Settings</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon>mdi-email</v-icon>
                </template>
                <v-list-item-title>Email Notifications</v-list-item-title>
                <template v-slot:append>
                  <v-switch
                    v-model="settings.emailNotifications"
                    color="primary"
                    hide-details
                  />
                </template>
              </v-list-item>
              
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon>mdi-bell-ring</v-icon>
                </template>
                <v-list-item-title>Push Notifications</v-list-item-title>
                <template v-slot:append>
                  <v-switch
                    v-model="settings.pushNotifications"
                    color="primary"
                    hide-details
                  />
                </template>
              </v-list-item>
              
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon>mdi-cancel</v-icon>
                </template>
                <v-list-item-title>Cancellation Alerts</v-list-item-title>
                <template v-slot:append>
                  <v-switch
                    v-model="settings.cancellationAlerts"
                    color="primary"
                    hide-details
                  />
                </template>
              </v-list-item>
              
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon>mdi-calendar-sync</v-icon>
                </template>
                <v-list-item-title>Reschedule Alerts</v-list-item-title>
                <template v-slot:append>
                  <v-switch
                    v-model="settings.rescheduleAlerts"
                    color="primary"
                    hide-details
                  />
                </template>
              </v-list-item>
            </v-list>
            
            <v-alert type="info" variant="tonal" class="mt-4">
              <div class="d-flex align-center">
                <v-icon class="mr-2">mdi-sync</v-icon>
                <div>
                  <strong>Auto-refresh enabled:</strong> 
                  Notifications update automatically every 3 minutes.
                </div>
              </div>
            </v-alert>
            
            <div class="text-right mt-4">
              <v-btn color="primary" @click="saveSettings">
                Save Settings
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useNotificationStore } from '@/stores/notification'

const router = useRouter()
const notificationStore = useNotificationStore()

const selectedType = ref('')
const selectedStatus = ref('')
const searchQuery = ref('')
const activeFilter = ref('all')
const sortBy = ref('-created_at')
const page = ref(1)
const itemsPerPage = 20

const settings = ref({
  emailNotifications: true,
  pushNotifications: true,
  cancellationAlerts: true,
  rescheduleAlerts: true
})

const typeOptions = [
  { title: 'Announcement', value: 'ANNOUNCEMENT' },
  { title: 'Cancellation', value: 'CANCELLATION' },
  { title: 'Reschedule', value: 'RESCHEDULE' }
]

const statusOptions = [
  { title: 'Unread', value: 'unread' },
  { title: 'Read', value: 'read' }
]

const quickFilters = computed(() => [
  { label: 'All', value: 'all', count: notificationStore.notifications.length },
  { label: 'Unread', value: 'unread', count: notificationStore.unreadCount },
  { label: 'Announcements', value: 'announcements', count: notificationStore.announcementNotifications.length },
  { label: 'Cancellations', value: 'cancellations', count: notificationStore.cancellationNotifications.length },
  { label: 'Today', value: 'today', count: getTodayNotifications().length }
])

const filteredNotifications = computed(() => {
  let filtered = [...notificationStore.notifications]
  
  // Apply active filter
  if (activeFilter.value !== 'all') {
    switch (activeFilter.value) {
      case 'unread':
        filtered = filtered.filter(n => !n.is_sent)
        break
      case 'announcements':
        filtered = filtered.filter(n => n.message_type === 'ANNOUNCEMENT')
        break
      case 'cancellations':
        filtered = filtered.filter(n => n.message_type === 'CANCELLATION')
        break
      case 'today':
        filtered = getTodayNotifications()
        break
    }
  }
  
  // Apply type filter
  if (selectedType.value) {
    filtered = filtered.filter(n => n.message_type === selectedType.value)
  }
  
  // Apply status filter
  if (selectedStatus.value) {
    if (selectedStatus.value === 'unread') {
      filtered = filtered.filter(n => !n.is_sent)
    } else {
      filtered = filtered.filter(n => n.is_sent)
    }
  }
  
  // Apply search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(n =>
      n.course_code.toLowerCase().includes(query) ||
      n.course_title.toLowerCase().includes(query) ||
      n.message_text.toLowerCase().includes(query) ||
      n.group_names.toLowerCase().includes(query)
    )
  }
  
  // Apply sorting
  filtered.sort((a, b) => {
    if (sortBy.value.startsWith('-')) {
      const field = sortBy.value.substring(1)
      return new Date(b[field]).getTime() - new Date(a[field]).getTime()
    }
    return new Date(a[sortBy.value]).getTime() - new Date(b[sortBy.value]).getTime()
  })
  
  // Apply pagination
  const start = (page.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filtered.slice(start, end)
})

onMounted(async () => {
  await notificationStore.fetchNotifications()
  notificationStore.startAutoRefresh()
})

onUnmounted(() => {
  notificationStore.stopAutoRefresh()
})

function filterNotifications() {
  page.value = 1
}

function setActiveFilter(filter: string) {
  activeFilter.value = filter
  page.value = 1
}

function markAsRead(id: number) {
  notificationStore.markAsRead(id)
}

function markAllAsRead() {
  if (confirm('Mark all notifications as read?')) {
    notificationStore.markAllAsRead()
  }
}

function viewLesson(lessonId: number) {
  // Navigate to timetable with lesson focused
  router.push({
    name: 'timetable',
    query: { lesson: lessonId.toString() }
  })
}

function saveSettings() {
  localStorage.setItem('notificationSettings', JSON.stringify(settings.value))
  alert('Notification settings saved!')
}

function getTodayNotifications() {
  const today = new Date().toISOString().split('T')[0]
  return notificationStore.notifications.filter(n => {
    const notificationDate = new Date(n.created_at).toISOString().split('T')[0]
    return notificationDate === today
  })
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-MY', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

function formatTime(timeString: string): string {
  return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-MY', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

function formatTimeAgo(dateString: string): string {
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

function formatLastChecked(date: Date | null): string {
  if (!date) return 'Never'
  return date.toLocaleTimeString('en-MY', {
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.notification-item {
  transition: background-color 0.3s;
}

.notification-item:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.gap-2 {
  gap: 8px;
}
</style>