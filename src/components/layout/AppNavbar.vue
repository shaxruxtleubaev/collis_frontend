<template>
  <!-- ======= Mobile Drawer ======= -->
  <v-navigation-drawer v-model="drawer" temporary location="right" width="300" class="mobile-drawer">
    <!-- drawer header -->
    <div class="drawer-header">
      <img src="/src/assets/xmum.svg" alt="XMUM" class="drawer-logo" />
      <div>
        <div class="drawer-brand">College Live Schedule</div>
        <div class="drawer-sub">Student Portal</div>
      </div>
    </div>

    <v-divider />

    <!-- user card inside drawer (auth only) -->
    <div v-if="authStore.user" class="drawer-user">
      <v-avatar size="40" color="primary" class="mr-3">
        <span class="text-white font-weight-bold" style="font-size:0.85rem">{{ userInitials }}</span>
      </v-avatar>
      <div>
        <div class="drawer-user-name">{{ authStore.user.fullname }}</div>
        <div class="drawer-user-role">{{ authStore.user.user_type_display }}</div>
      </div>
    </div>

    <v-divider v-if="authStore.user" />

    <v-list density="comfortable" nav class="pa-3">
      <v-list-item
        v-for="item in mobileNavItems"
        :key="item.title"
        :to="item.to"
        :prepend-icon="item.icon"
        rounded="lg"
        class="drawer-item mb-1"
        @click="drawer = false"
      >
        <v-list-item-title class="font-weight-medium">{{ item.title }}</v-list-item-title>
      </v-list-item>

      <!-- Auth-only items -->
      <template v-if="authStore.isAuthenticated">
        <v-divider class="my-2" />

        <v-list-item to="/notification" prepend-icon="mdi-bell-outline" rounded="lg" class="drawer-item mb-1" @click="drawer = false">
          <v-list-item-title class="font-weight-medium">
            Notifications
            <v-badge v-if="unreadCount > 0" :content="unreadCount" color="error" inline class="ml-2" />
          </v-list-item-title>
        </v-list-item>

        <v-list-item to="/profile" prepend-icon="mdi-account-circle-outline" rounded="lg" class="drawer-item mb-1" @click="drawer = false">
          <v-list-item-title class="font-weight-medium">My Profile</v-list-item-title>
        </v-list-item>

        <v-list-item prepend-icon="mdi-logout-variant" rounded="lg" class="drawer-item drawer-item--danger" @click="logout">
          <v-list-item-title class="font-weight-medium">Logout</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>

  <!-- ======= App Bar ======= -->
  <v-app-bar :elevation="0" color="surface" height="68" class="navbar-custom">
    <!-- Logo cluster -->
    <router-link to="/" class="logo-link">
      <img src="/src/assets/xmum.svg" alt="XMUM Logo" class="navbar-logo" />
      <div class="brand-group">
        <span class="brand-name">College Live Schedule</span>
        <span class="brand-tag">Student Portal</span>
      </div>
    </router-link>

    <v-spacer />

    <!-- Desktop nav pills -->
    <nav v-if="!isMobile" class="nav-pills">
      <router-link
        v-for="item in desktopNavItems"
        :key="item.title"
        :to="item.to"
        class="nav-pill"
        active-class="nav-pill--active"
        :exact="item.exact"
      >
        <v-icon size="18" class="nav-pill-icon">{{ item.icon }}</v-icon>
        {{ item.title }}
      </router-link>
    </nav>

    <v-spacer v-if="!isMobile" />

    <!-- Desktop right cluster -->
    <div v-if="!isMobile" class="d-flex align-center mr-6" style="gap:6px">
      <!-- Notification bell -->
      <v-btn
        v-if="authStore.isAuthenticated"
        to="/notification"
        icon
        variant="text"
        size="42"
        class="action-icon"
        title="Notifications"
      >
        <v-badge :content="unreadCount" :model-value="unreadCount > 0" color="error" overlap>
          <v-icon size="22">mdi-bell-outline</v-icon>
        </v-badge>
      </v-btn>

      <!-- User avatar menu -->
      <v-menu v-if="authStore.user" offset="8" :close-on-content-click="true">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props" class="avatar-btn" size="42">
            <v-avatar size="34" color="primary">
              <span class="text-white font-weight-bold" style="font-size:0.8rem">{{ userInitials }}</span>
            </v-avatar>
          </v-btn>
        </template>

        <v-card rounded="xl" width="220" class="user-menu-card" elevation="8">
          <div class="user-menu-header">
            <v-avatar size="42" color="primary" class="mr-3">
              <span class="text-white font-weight-bold" style="font-size:0.85rem">{{ userInitials }}</span>
            </v-avatar>
            <div>
              <div class="font-weight-bold" style="font-size:0.9rem;line-height:1.2">{{ authStore.user.fullname }}</div>
              <div class="text-medium-emphasis" style="font-size:0.75rem">{{ authStore.user.user_type_display }}</div>
            </div>
          </div>
          <v-divider />
          <v-list density="compact" nav class="pa-2">
            <v-list-item to="/profile" prepend-icon="mdi-account-circle-outline" rounded="lg">
              <v-list-item-title style="font-size:0.85rem">My Profile</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout" prepend-icon="mdi-logout-variant" rounded="lg" class="text-error">
              <v-list-item-title style="font-size:0.85rem">Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>

      <!-- Login btn for guests -->
      <v-btn
        v-if="!authStore.isAuthenticated"
        to="/login"
        color="primary"
        variant="flat"
        rounded="lg"
        size="small"
        class="login-btn"
      >
        <v-icon start size="18">mdi-login-variant</v-icon>
        Login
      </v-btn>
    </div>

    <!-- Mobile hamburger -->
    <v-btn v-if="isMobile" icon variant="text" class="mr-2" @click="drawer = !drawer">
      <v-icon size="24">{{ drawer ? 'mdi-close' : 'mdi-menu' }}</v-icon>
    </v-btn>
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

const userInitials = computed(() => {
  if (!authStore.user?.fullname) return '?'
  return authStore.user.fullname
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
})

const desktopNavItems = [
  { title: 'Home', icon: 'mdi-home-outline', to: '/', exact: true },
  { title: 'Timetable', icon: 'mdi-calendar-month-outline', to: '/timetable', exact: false },
  { title: 'Collis App', icon: 'mdi-cellphone-link', to: '/collis-app', exact: false },
]

const mobileNavItems = [
  { title: 'Home', icon: 'mdi-home-outline', to: '/' },
  { title: 'Timetable', icon: 'mdi-calendar-month-outline', to: '/timetable' },
  { title: 'Collis App', icon: 'mdi-cellphone-link', to: '/collis-app' },
]

function logout() {
  drawer.value = false
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
/* ===== Bar ===== */
.navbar-custom {
  border-bottom: 1px solid var(--border) !important;
  backdrop-filter: blur(12px);
  background: rgba(255,255,255,0.92) !important;
}

/* ===== Logo ===== */
.logo-link {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  margin-left: 2.5rem;
  transition: opacity 0.2s ease;
}
.logo-link:hover { opacity: 0.82; }

.navbar-logo {
  height: 52px;
  width: 52px;
  object-fit: contain;
}

.brand-group { display: flex; flex-direction: column; line-height: 1.15; }

.brand-name {
  font-size: 1.05rem;
  font-weight: 800;
  letter-spacing: -0.3px;
  background: linear-gradient(135deg, #1E40AF, #2563EB);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  white-space: nowrap;
}

.brand-tag {
  font-size: 0.6rem;
  font-weight: 600;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

/* ===== Desktop nav pills ===== */
.nav-pills {
  display: flex;
  align-items: center;
  gap: 4px;
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 4px;
}

.nav-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 16px;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: 9px;
  transition: all 0.25s ease;
  white-space: nowrap;
}
.nav-pill:hover {
  color: var(--primary);
  background: rgba(37,99,235,0.06);
}
.nav-pill--active {
  color: white !important;
  background: var(--primary) !important;
  box-shadow: 0 2px 8px rgba(37,99,235,0.3);
}
.nav-pill--active .nav-pill-icon { color: white !important; }

/* ===== Action icons ===== */
.action-icon {
  color: var(--text-secondary) !important;
  transition: color 0.2s ease;
}
.action-icon:hover { color: var(--primary) !important; }

.avatar-btn {
  border: 2px solid var(--border);
  border-radius: 50% !important;
  transition: border-color 0.2s ease;
}
.avatar-btn:hover { border-color: var(--primary); }

.login-btn {
  text-transform: none !important;
  font-weight: 700;
  letter-spacing: 0;
}

/* ===== User menu dropdown ===== */
.user-menu-card {
  border: 1px solid var(--border);
}
.user-menu-header {
  display: flex;
  align-items: center;
  padding: 14px 16px;
}

/* ===== Mobile drawer ===== */
.mobile-drawer {
  border-left: none !important;
}

.drawer-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 20px 16px;
}
.drawer-logo { width: 44px; height: 44px; object-fit: contain; }
.drawer-brand {
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: -0.3px;
  background: linear-gradient(135deg, #1E40AF, #2563EB);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.drawer-sub {
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.drawer-user {
  display: flex;
  align-items: center;
  padding: 14px 20px;
}
.drawer-user-name { font-weight: 700; font-size: 0.9rem; color: var(--text-primary); }
.drawer-user-role { font-size: 0.75rem; color: var(--text-tertiary); }

.drawer-item { transition: background 0.2s ease; }
.drawer-item--danger:hover { color: var(--error) !important; }

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .logo-link { margin-left: 1rem; gap: 10px; }
  .navbar-logo { width: 44px; height: 44px; }
  .brand-name { font-size: 0.9rem; }
}
</style>