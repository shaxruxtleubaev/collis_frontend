<template>
  <!-- Mobile Navigation Drawer (Outside app-bar) -->
  <v-navigation-drawer
    v-model="drawer"
    temporary
    location="left"
    width="250"
  >
    <v-list>
      <v-list-item
        v-for="item in navItems"
        :key="item.title"
        :to="item.to"
        @click="drawer = false"
        active-color="primary"
      >
        <template v-slot:prepend>
          <v-icon>{{ item.icon }}</v-icon>
        </template>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar :elevation="2" color="surface" class="navbar-custom">
    <!-- Mobile menu button -->
    <v-app-bar-nav-icon 
      v-if="isMobile" 
      @click="drawer = !drawer"
      color="primary"
    />
    
    <!-- Logo/Title (clickable home link) -->
    <router-link to="/" class="logo-link">
      <v-toolbar-title class="d-flex align-center logo-section">
        <img
          src="/src/assets/xmum.svg"
          alt="XMUM Logo"
          class="navbar-logo mr-3"
        />
        <span class="font-weight-bold navbar-title">ColliS Student Portal</span>
      </v-toolbar-title>
    </router-link>
    
    <v-spacer />
    
    <!-- Desktop Navigation -->
    <div v-if="!isMobile" class="d-flex align-center gap-2">
      <v-btn 
        to="/"
        variant="text"
        color="primary"
        class="nav-btn"
      >
        <v-icon start>mdi-home</v-icon>
        Home
      </v-btn>
      <v-btn 
        to="/timetable"
        variant="text"
        color="primary"
        class="nav-btn"
      >
        <v-icon start>mdi-calendar</v-icon>
        Timetable
      </v-btn>
    </div>
    
    <!-- Notifications Bell -->
    <v-btn
      v-if="authStore.isAuthenticated"
      to="/notification"
      icon
      color="primary"
      class="mx-2"
      title="View notifications"
    >
      <v-badge :content="unreadCount" :value="unreadCount > 0" color="error" overlap>
        <v-icon>mdi-bell</v-icon>
      </v-badge>
    </v-btn>
    
    <!-- User Menu -->
    <v-menu v-if="authStore.user">
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-avatar size="36" color="primary">
            <span class="text-white">{{ userInitials }}</span>
          </v-avatar>
        </v-btn>
      </template>
      
      <v-list>
        <v-list-item to="/profile">
          <template v-slot:prepend>
            <v-icon>mdi-account</v-icon>
          </template>
          <v-list-item-title>My Profile</v-list-item-title>
        </v-list-item>
        
        <v-divider />
        
        <v-list-item @click="logout">
          <template v-slot:prepend>
            <v-icon>mdi-logout</v-icon>
          </template>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useNotificationStore } from '@/stores/notification'

const { mobile } = useDisplay()
const router = useRouter()
const authStore = useAuthStore()
const notificationStore = useNotificationStore()

const drawer = ref(false)
const isMobile = computed(() => mobile.value)
const unreadCount = computed(() => {
  if (authStore.isAuthenticated) {
    return notificationStore.unreadCount
  }
  return 0
})

const navItems = [
  { title: 'Home', icon: 'mdi-home', to: { name: 'home' } },
  { title: 'Timetable', icon: 'mdi-calendar', to: { name: 'timetable' } },
]

const userInitials = computed(() => {
  if (!authStore.user?.fullname) return '?'
  return authStore.user.fullname
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
})

function logout() {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.navbar-custom {
  border-bottom: 2px solid var(--primary);
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.08) !important;
}

.logo-link {
  text-decoration: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: opacity 250ms ease;
}

.logo-link:hover {
  opacity: 0.8;
}

.navbar-title {
  color: var(--text-primary);
  font-size: 1rem;
  letter-spacing: -0.5px;
  white-space: nowrap;
  display: flex;
  align-items: center;
}

.navbar-logo {
  height: 40px;
  width: 40px;
  object-fit: contain;
}

.nav-btn {
  transition: all 250ms ease !important;
}

.nav-btn:hover {
  background-color: rgba(37, 99, 235, 0.1) !important;
}

.gap-2 {
  gap: 0.5rem;
}

:deep(.v-toolbar-title) {
  display: flex;
  align-items: center !important;
  gap: 0.5rem;
}

:deep(.v-toolbar-title__placeholder) {
  display: flex;
  align-items: center;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

:deep(.v-navigation-drawer) {
  z-index: 1000 !important;
}
</style>