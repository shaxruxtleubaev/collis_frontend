<template>
  <v-app>
    <AppNavbar v-if="showNavbar" />
    <AppDrawer v-if="showNavbar" />
    
    <v-main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
    
    <!-- Notification Toasts -->
    <transition-group name="list">
      <NotificationToast
        v-for="notification in activeToasts"
        :key="notification.id"
        :notification="notification"
        @close="removeToast(notification.id)"
      />
    </transition-group>
    
    <LoadingSpinner v-if="globalLoading" />
  </v-app>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useNotificationStore } from '@/stores/notification'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppDrawer from '@/components/layout/AppDrawer.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import NotificationToast from '@/components/notifications/NotificationToast.vue'

const route = useRoute()
const authStore = useAuthStore()
const notificationStore = useNotificationStore()

const showNavbar = computed(() => !route.meta.hideNavbar)
const globalLoading = computed(() => false)
const activeToasts = ref<any[]>([])

function removeToast(notificationId: number) {
  activeToasts.value = activeToasts.value.filter(t => t.id !== notificationId)
}

// Watch for new notifications
watch(
  () => notificationStore.newNotifications,
  (newNotifications) => {
    if (newNotifications.length > 0) {
      // Add each new notification as a toast
      newNotifications.forEach(notification => {
        // Check if toast already exists
        if (!activeToasts.value.find(t => t.id === notification.id)) {
          activeToasts.value.push(notification)
        }
      })
      // Clear the new notifications array after processing
      notificationStore.clearNewNotifications()
    }
  },
  { deep: true }
)

// Initialize notification polling when user is authenticated
onMounted(() => {
  if (authStore.isAuthenticated) {
    notificationStore.startAutoRefresh(20000) // 20 seconds
  }
})

onUnmounted(() => {
  notificationStore.stopAutoRefresh()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(400px);
}
</style>