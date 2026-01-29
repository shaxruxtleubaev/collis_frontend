<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12">
          <!-- Header -->
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Student Login</v-toolbar-title>
            <v-spacer />
            <v-chip color="white" text-color="primary" small>
              XMUM
            </v-chip>
          </v-toolbar>
          
          <!-- Login Form -->
          <v-card-text>
            <v-form @submit.prevent="handleLogin" ref="loginForm">
              <!-- Logo -->
              <div class="text-center mb-6">
                <v-img
                  :src="logo"
                  alt="XMUM Logo"
                  max-height="80"
                  max-width="80"
                  class="mx-auto mb-4"
                />
                <h2 class="text-h5 mb-2">ColliS Student Portal</h2>
                <p class="text-caption text-grey">
                  Xiamen University Malaysia
                </p>
              </div>
              
              <!-- Error Message -->
              <v-alert
                v-if="authStore.error"
                type="error"
                variant="tonal"
                class="mb-4"
              >
                {{ authStore.error }}
              </v-alert>
              
              <!-- Student ID Field -->
              <v-text-field
                v-model="studentId"
                label="Student ID"
                prepend-inner-icon="mdi-identifier"
                variant="outlined"
                :rules="[v => !!v || 'Student ID is required']"
                required
                autofocus
                class="mb-4"
              />
              
              <!-- Password Field -->
              <v-text-field
                v-model="password"
                label="Password"
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="showPassword ? 'text' : 'password'"
                variant="outlined"
                :rules="[v => !!v || 'Password is required']"
                required
                @click:append-inner="showPassword = !showPassword"
                class="mb-4"
              />
              
              <!-- Login Info -->
              <v-alert
                type="info"
                variant="tonal"
                density="compact"
                class="mb-6"
              >
                <div class="text-caption">
                  Use the Student ID and password provided by your administrator.
                  Contact IT support if you need assistance.
                </div>
              </v-alert>
              
              <!-- Submit Button -->
              <v-btn
                type="submit"
                color="primary"
                size="large"
                block
                :loading="authStore.isLoading"
                :disabled="authStore.isLoading"
              >
                <v-icon start>mdi-login</v-icon>
                Sign In
              </v-btn>
            </v-form>
          </v-card-text>
          
          <!-- Footer -->
          <v-card-actions class="px-6 pb-6">
            <v-divider class="mb-4" />
            <div class="text-center w-100">
              <p class="text-caption text-grey">
                © {{ new Date().getFullYear() }} Xiamen University Malaysia
              </p>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import logo from '@/assets/logo.svg'

const router = useRouter()
const authStore = useAuthStore()

const studentId = ref('')
const password = ref('')
const showPassword = ref(false)
const loginForm = ref()

async function handleLogin() {
  const { valid } = await loginForm.value.validate()
  
  if (!valid) return
  
  const result = await authStore.login(studentId.value, password.value)
  
  if (result.success) {
    router.push({ name: 'timetable' })
  }
}
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
  background: linear-gradient(135deg, #1976D2 0%, #2196F3 100%);
}

.v-card {
  border-radius: 12px;
}
</style>