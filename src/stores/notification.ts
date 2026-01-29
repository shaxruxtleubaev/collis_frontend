import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { notificationApi, type Notification } from '@/api/notification'

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<Notification[]>([])
  const unreadNotifications = ref<Notification[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const lastChecked = ref<Date | null>(null)

  // Auto-refresh every 3 minutes
  let refreshInterval: number | null = null

  const unreadCount = computed(() => unreadNotifications.value.length)

  const recentNotifications = computed(() => {
    return [...notifications.value]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 10)
  })

  const announcementNotifications = computed(() => {
    return notifications.value.filter(n => n.message_type === 'ANNOUNCEMENT')
  })

  const cancellationNotifications = computed(() => {
    return notifications.value.filter(n => n.message_type === 'CANCELLATION')
  })

  async function fetchNotifications() {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await notificationApi.getNotifications({ ordering: '-created_at' })
      notifications.value = response.results
      updateUnreadNotifications()
      lastChecked.value = new Date()
      return response.results
    } catch (err: any) {
      error.value = err.message || 'Failed to load notifications'
      throw err
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
      // Optionally call API to mark as read on server
      notificationApi.markAsRead(id)
    }
  }

  function markAllAsRead() {
    notifications.value.forEach(n => {
      n.is_sent = true
    })
    unreadNotifications.value = []
    // Optionally call API for each notification
  }

  function startAutoRefresh(intervalMs: number = 180000) { // 3 minutes
    stopAutoRefresh()
    refreshInterval = window.setInterval(() => {
      fetchUnreadNotifications()
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
    startAutoRefresh,
    stopAutoRefresh,
    getMessageTypeIcon,
    getMessageTypeColor
  }
})