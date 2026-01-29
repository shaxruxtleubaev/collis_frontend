<template>
  <v-app-bar :elevation="2" color="primary" dark>
    <!-- Mobile menu button -->
    <v-app-bar-nav-icon 
      v-if="isMobile" 
      @click="drawer = !drawer"
    />
    
    <!-- Logo/Title -->
    <v-toolbar-title class="d-flex align-center">
      <v-img
        :src="logo"
        alt="XMUM Logo"
        max-height="40"
        max-width="40"
        class="mr-3"
      />
      <span class="font-weight-bold">ColliS Student Portal</span>
    </v-toolbar-title>
    
    <v-spacer />
    
    <!-- Desktop Navigation -->
    <div v-if="!isMobile" class="d-flex align-center">
      <v-btn 
        v-for="item in navItems" 
        :key="item.title"
        :to="item.to"
        variant="text"
        color="white"
        class="mx-1"
      >
        <v-icon start>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>
    </div>
    
    <!-- User Menu -->
    <v-menu v-if="authStore.user">
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-avatar size="36" color="white">
            <span class="text-primary">{{ userInitials }}</span>
          </v-avatar>
        </v-btn>
      </template>
      
      <v-list>
        <v-list-item :to="{ name: 'profile' }">
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
import logo from '@/assets/logo.svg'

const { mobile } = useDisplay()
const router = useRouter()
const authStore = useAuthStore()

const drawer = ref(false)
const isMobile = computed(() => mobile.value)

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