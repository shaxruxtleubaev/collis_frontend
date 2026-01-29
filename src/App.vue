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
    
    <LoadingSpinner v-if="globalLoading" />
  </v-app>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppDrawer from '@/components/layout/AppDrawer.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const route = useRoute()

const showNavbar = computed(() => !route.meta.hideNavbar)
const globalLoading = computed(() => false) // You can connect this to a global loading store
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
</style>