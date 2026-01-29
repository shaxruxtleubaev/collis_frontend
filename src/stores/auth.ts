import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi, type UserProfile } from '@/api/auth'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<UserProfile | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isStudent = computed(() => user.value?.user_type === 'STUDENT')

  async function login(username: string, password: string) {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await authApi.login({ username, password })
      
      // Save token and user data
      token.value = response.token
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response))
      
      // Set user from response
      user.value = {
        id: response.user_id,
        username: response.username,
        email: response.email,
        user_type: response.user_type,
        user_type_display: response.user_type_display,
        fullname: response.fullname,
        user_id: response.student_id || response.lecturer_id || response.username
      }
      
      return { success: true }
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Login failed. Check your Student ID and password.'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  async function loadProfile() {
    if (!token.value) return
    
    try {
      user.value = await authApi.getProfile()
    } catch (err) {
      console.error('Failed to load profile:', err)
      logout()
    }
  }

  function loadFromStorage() {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken) {
      token.value = storedToken
    }
    
    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser)
      } catch {
        localStorage.removeItem('user')
      }
    }
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  // Load from storage on store creation
  loadFromStorage()

  return {
    token,
    user,
    isLoading,
    error,
    isAuthenticated,
    isStudent,
    login,
    logout,
    loadProfile
  }
})