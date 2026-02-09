import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { notificationApi, type Notification } from '@/api/notification'
import { useAuthStore } from '@/stores/auth'

export const useNotificationStore = defineStore('notification', () => {
  const authStore = useAuthStore()
  const notifications = ref<Notification[]>([])
  const unreadNotifications = ref<Notification[]>([])
  const newNotifications = ref<Notification[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const lastChecked = ref<Date | null>(null)
  const lastNotificationIds = ref<Set<number>>(new Set())

  // Auto-refresh every 20 seconds
  let refreshInterval: number | null = null

  const unreadCount = computed(() => unreadNotifications.value.length)

  // Filter notifications by user's group (for students only)
  const filteredNotifications = computed(() => {
    if (!authStore.isAuthenticated) {
      return []
    }
    
    // Lecturers and admins see all notifications
    if (authStore.user?.user_type !== 'STUDENT') {
      return notifications.value
    }
    
    // For students: filter by their group
    const userGroup = authStore.user?.group_name
    if (!userGroup) {
      // No group assigned, show no notifications
      return []
    }
    
    return notifications.value.filter(n => {
      // Check if this notification is for the student's group
      // group_names in notification is a comma-separated string like "BCS4-1, BCS4-2"
      const notificationGroups = n.group_names
        .split(',')
        .map(g => g.trim())
        .filter(g => g.length > 0)
      
      return notificationGroups.includes(userGroup)
    })
  })

  const recentNotifications = computed(() => {
    return [...filteredNotifications.value]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 10)
  })

  const announcementNotifications = computed(() => {
    return filteredNotifications.value.filter(n => n.message_type === 'ANNOUNCEMENT')
  })

  const cancellationNotifications = computed(() => {
    return filteredNotifications.value.filter(n => n.message_type === 'CANCELLATION')
  })

  async function fetchNotifications() {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await notificationApi.getNotifications({ ordering: '-created_at' })
      
      // Detect new notifications
      const currentIds = new Set(response.results.map(n => n.id))
      const newOnes = response.results.filter(n => !lastNotificationIds.value.has(n.id))
      
      if (newOnes.length > 0) {
        newNotifications.value = newOnes
        console.log(`Found ${newOnes.length} new notifications`)
      }
      
      lastNotificationIds.value = currentIds
      notifications.value = response.results
      updateUnreadNotifications()
      lastChecked.value = new Date()
      return response.results
    } catch (err: any) {
      error.value = err.message || 'Failed to load notifications'
      console.error('Error fetching notifications:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchUnreadNotifications() {
    try {
      unreadNotifications.value = await notificationApi.getUnreadNotifications()
      lastChecked.value = new Date()
    } catch (err) {
      console.error('Failed to fetch unread notifications:', err)
    }
  }

  function updateUnreadNotifications() {
    unreadNotifications.value = notifications.value.filter(n => !n.is_sent)
  }

  function markAsRead(id: number) {
    const notification = notifications.value.find(n => n.id === id)
    if (notification) {
      notification.is_sent = true
      updateUnreadNotifications()
      notificationApi.markAsRead(id)
    }
  }

  function markAllAsRead() {
    notifications.value.forEach(n => {
      n.is_sent = true
    })
    unreadNotifications.value = []
  }

  function clearNewNotifications() {
    newNotifications.value = []
  }

  function startAutoRefresh(intervalMs: number = 20000) { // 20 seconds
    console.log('Starting auto-refresh with interval:', intervalMs)
    stopAutoRefresh()
    
    // Fetch immediately on start
    fetchNotifications()
    
    refreshInterval = window.setInterval(() => {
      fetchNotifications()
    }, intervalMs)
  }

  function stopAutoRefresh() {
    if (refreshInterval) {
      clearInterval(refreshInterval)
      refreshInterval = null
    }
  }

  // Format notification message type with icon
  function getMessageTypeIcon(type: string): string {
    switch (type) {
      case 'ANNOUNCEMENT': return 'mdi-bullhorn'
      case 'CANCELLATION': return 'mdi-cancel'
      case 'RESCHEDULE': return 'mdi-calendar-sync'
      default: return 'mdi-information'
    }
  }

  function getMessageTypeColor(type: string): string {
    switch (type) {
      case 'ANNOUNCEMENT': return 'info'
      case 'CANCELLATION': return 'error'
      case 'RESCHEDULE': return 'warning'
      default: return 'primary'
    }
  }

  return {
    notifications,
    unreadNotifications,
    newNotifications,
    unreadCount,
    recentNotifications,
    announcementNotifications,
    cancellationNotifications,
    isLoading,
    error,
    lastChecked,
    fetchNotifications,
    fetchUnreadNotifications,
    markAsRead,
    markAllAsRead,
    clearNewNotifications,
    startAutoRefresh,
    stopAutoRefresh,
    getMessageTypeIcon,
    getMessageTypeColor
  }
})