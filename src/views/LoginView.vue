<template>
  <div class="login-container">
    <!-- Animated background -->
    <div class="background-elements">
      <div class="gradient-blob blob-1"></div>
      <div class="gradient-blob blob-2"></div>
      <div class="gradient-blob blob-3"></div>
    </div>

    <!-- Login card -->
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" lg="5" xl="4">
          <v-card class="login-card">
            <!-- Logo Section -->
            <div class="logo-section">
              <div class="logo-circle">
                <v-icon size="64" color="primary">mdi-school</v-icon>
              </div>
              <h1 class="text-h5 font-weight-600 mt-4">College Live Schedule</h1>
              <p class="text-secondary text-caption">Xiamen University Malaysia — Student Portal</p>
            </div>

            <!-- Form Section -->
            <v-card-text class="form-section">
              <!-- Error Alert -->
              <transition name="slide">
                <v-alert
                  v-if="authStore.error"
                  type="error"
                  variant="tonal"
                  class="mb-6"
                  closable
                  @click:close="authStore.error = null"
                >
                  <v-icon start>mdi-alert-circle</v-icon>
                  {{ authStore.error }}
                </v-alert>
              </transition>

              <v-form @submit.prevent="handleLogin" ref="loginForm">
                <!-- Student ID Field -->
                <div class="field-wrapper">
                  <label class="field-label">Student ID</label>
                  <v-text-field
                    v-model="studentId"
                    variant="outlined"
                    density="comfortable"
                    placeholder="Enter your student ID"
                    prepend-inner-icon="mdi-identifier"
                    :rules="[v => !!v || 'Student ID is required']"
                    required
                    autofocus
                    class="modern-field"
                  />
                </div>

                <!-- Password Field -->
                <div class="field-wrapper mt-6">
                  <label class="field-label">Password</label>
                  <v-text-field
                    v-model="password"
                    variant="outlined"
                    density="comfortable"
                    placeholder="Enter your password"
                    prepend-inner-icon="mdi-lock"
                    :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="showPassword ? 'text' : 'password'"
                    :rules="[v => !!v || 'Password is required']"
                    required
                    @click:append-inner="showPassword = !showPassword"
                    class="modern-field"
                  />
                </div>

                <!-- Info Box -->
                <v-card class="info-box mt-8" color="surface-light">
                  <v-card-text class="py-3 px-4">
                    <div class="d-flex gap-3">
                      <v-icon size="20" color="primary" class="flex-shrink-0">mdi-information</v-icon>
                      <div>
                        <p class="text-caption text-secondary mb-0">
                          Use your Student ID and auto-generated password provided by your administrator.
                        </p>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>

                <!-- Login Button -->
                <v-btn
                  type="submit"
                  color="primary"
                  size="large"
                  block
                  class="mt-8 login-btn"
                  :loading="authStore.isLoading"
                  :disabled="authStore.isLoading"
                >
                  <template v-if="!authStore.isLoading">
                    <v-icon start>mdi-login</v-icon>
                    Sign In
                  </template>
                  <template v-else>
                    Signing in...
                  </template>
                </v-btn>
              </v-form>
            </v-card-text>

            <!-- Footer -->
            <v-divider />
            <v-card-text class="footer-section">
              <p class="text-caption text-tertiary text-center mb-0">
                © {{ currentYear }} Xiamen University Malaysia. All rights reserved.
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const studentId = ref('')
const password = ref('')
const showPassword = ref(false)
const loginForm = ref()
const currentYear = new Date().getFullYear()

async function handleLogin() {
  if (!loginForm.value) return

  const { valid } = await loginForm.value.validate()
  if (!valid) return

  const result = await authStore.login(studentId.value, password.value)
  if (result.success) {
    await router.push({ name: 'timetable' })
  }
}
</script>

<style scoped>
.login-container {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #F8FAFC 0%, #E0E7FF 100%);
  overflow: hidden;
}

.background-elements {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.gradient-blob {
  position: absolute;
  border-radius: 50%;
  opacity: 0.3;
  animation: float 20s ease-in-out infinite;
  filter: blur(40px);
}

.blob-1 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #2563EB, #60A5FA);
  top: -100px;
  right: -100px;
  animation-delay: 0s;
}

.blob-2 {
  width: 250px;
  height: 250px;
  background: linear-gradient(135deg, #3B82F6, #93C5FD);
  bottom: -50px;
  left: -50px;
  animation-delay: 2s;
}

.blob-3 {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #1E40AF, #3B82F6);
  top: 50%;
  left: 10%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  25% { transform: translateY(-20px) translateX(10px); }
  50% { transform: translateY(-40px) translateX(0px); }
  75% { transform: translateY(-20px) translateX(-10px); }
}

:deep(.v-container) {
  position: relative;
  z-index: 1;
}

.login-card {
  backdrop-filter: blur(10px) !important;
  border-radius: 16px !important;
}

.logo-section {
  text-align: center;
  padding: 2rem 1.5rem 1rem;
  border-bottom: 1px solid var(--border);
  background: linear-gradient(135deg, rgba(255,255,255,0.8), rgba(248,250,252,0.5));
}

.logo-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #DBEAFE, #EFF6FF);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: 0 4px 15px rgba(37, 99, 235, 0.15);
}

.form-section {
  padding: 2rem 1.5rem;
}

.field-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
}

:deep(.modern-field .v-field) {
  border-radius: 8px !important;
  background: var(--bg-secondary) !important;
  border: 1px solid var(--border) !important;
  transition: all 250ms ease !important;
}

:deep(.modern-field .v-field:hover) {
  border-color: var(--primary) !important;
  background: white !important;
}

:deep(.modern-field.v-input--focused .v-field) {
  border-color: var(--primary) !important;
  background: white !important;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1) !important;
}

.info-box {
  border: 1px solid var(--border) !important;
  border-radius: 8px !important;
  background: linear-gradient(135deg, #F0F9FF 0%, #F8FAFC 100%) !important;
}

.login-btn {
  font-weight: 600 !important;
  height: 48px !important;
  box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3) !important;
}

:deep(.login-btn:hover) {
  box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4) !important;
}

.footer-section {
  padding: 1.5rem;
  text-align: center;
}

.fill-height {
  min-height: 100vh;
}

.text-tertiary {
  color: var(--text-tertiary);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 250ms ease;
}

.slide-enter-from {
  transform: translateX(-20px);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

@media (max-width: 600px) {
  .login-card {
    margin: 0 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
  }

  .logo-section {
    padding: 1.5rem 1rem 0.75rem;
  }

  .form-section {
    padding: 1.5rem 1rem;
  }
}
</style>
