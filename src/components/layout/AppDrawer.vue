<template>
  <v-navigation-drawer
    v-model="drawer"
    :temporary="isMobile"
    app
    width="260"
    class="app-drawer"
  >
    <!-- Drawer header -->
    <div class="drawer-top">
      <img src="/src/assets/xmum.svg" alt="XMUM" class="drawer-top-logo" />
      <div>
        <div class="drawer-top-brand">College Live Schedule</div>
        <div class="drawer-top-sub">Student Portal</div>
      </div>
    </div>

    <v-divider />

    <!-- User info -->
    <v-list-item v-if="authStore.user" class="drawer-user-item my-3 mx-3" rounded="lg">
      <template v-slot:prepend>
        <v-avatar color="primary" size="42">
          <span class="text-white font-weight-bold" style="font-size:0.85rem">{{ userInitials }}</span>
        </v-avatar>
      </template>

      <v-list-item-title class="font-weight-bold" style="font-size:0.9rem">
        {{ authStore.user.fullname }}
      </v-list-item-title>
      <v-list-item-subtitle style="font-size:0.75rem">
        {{ authStore.user.user_type_display }}
      </v-list-item-subtitle>
    </v-list-item>

    <v-divider v-if="authStore.user" class="mx-3" />

    <!-- Navigation -->
    <v-list density="comfortable" nav class="pa-3">
      <v-list-item
        v-for="item in navItems"
        :key="item.title"
        :to="item.to"
        :prepend-icon="item.icon"
        :title="item.title"
        rounded="lg"
        class="drawer-nav-item mb-1"
        @click="isMobile && (drawer = false)"
      />
    </v-list>

    <!-- Footer -->
    <template v-slot:append>
      <v-divider class="mx-3" />
      <div class="pa-4 text-center">
        <v-chip size="small" color="primary" variant="tonal" class="font-weight-bold">
          <v-icon start size="14">mdi-school-outline</v-icon>
          XMUM
        </v-chip>
        <div class="text-caption mt-1" style="color:var(--text-tertiary)">
          College Live Schedule
        </div>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useAuthStore } from '@/stores/auth'

const { mobile } = useDisplay()
const authStore = useAuthStore()

const drawer = ref(false)
const isMobile = computed(() => mobile.value)

const navItems = [
  { title: 'Home', icon: 'mdi-home-outline', to: { name: 'home' } },
  { title: 'Timetable', icon: 'mdi-calendar-month-outline', to: { name: 'timetable' } },
  { title: 'Collis App', icon: 'mdi-cellphone-link', to: { name: 'collis-app' } },
  { title: 'Profile', icon: 'mdi-account-circle-outline', to: { name: 'profile' } },
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
</script>

<style scoped>
.app-drawer {
  border-right: 1px solid var(--border) !important;
}

.drawer-top {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 20px 16px;
}
.drawer-top-logo { width: 44px; height: 44px; object-fit: contain; }
.drawer-top-brand {
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: -0.3px;
  background: linear-gradient(135deg, #1E40AF, #2563EB);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.drawer-top-sub {
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.drawer-user-item {
  background: var(--bg-primary);
}

.drawer-nav-item {
  transition: background 0.2s ease;
}
</style>