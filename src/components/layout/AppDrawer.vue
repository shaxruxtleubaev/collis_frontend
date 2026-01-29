<template>
  <v-navigation-drawer
    v-model="drawer"
    :temporary="isMobile"
    app
  >
    <v-list dense nav>
      <!-- User Info -->
      <v-list-item v-if="authStore.user" class="mb-4">
        <template v-slot:prepend>
          <v-avatar color="primary" size="48">
            <span class="text-white text-h6">{{ userInitials }}</span>
          </v-avatar>
        </template>
        
        <v-list-item-title class="font-weight-bold">
          {{ authStore.user.fullname }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ authStore.user.user_type_display }}
        </v-list-item-subtitle>
      </v-list-item>
      
      <v-divider />
      
      <!-- Navigation Items -->
      <v-list-item
        v-for="item in navItems"
        :key="item.title"
        :to="item.to"
        :prepend-icon="item.icon"
        :title="item.title"
        @click="isMobile && (drawer = false)"
      />
    </v-list>
    
    <!-- Footer -->
    <template v-slot:append>
      <div class="pa-4 text-center">
        <v-chip size="small" color="primary" variant="outlined">
          XMUM
        </v-chip>
        <div class="text-caption text-grey mt-1">
          Student Portal
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
  { title: 'Home', icon: 'mdi-home', to: { name: 'home' } },
  { title: 'Timetable', icon: 'mdi-calendar', to: { name: 'timetable' } },
  { title: 'Profile', icon: 'mdi-account', to: { name: 'profile' } },
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