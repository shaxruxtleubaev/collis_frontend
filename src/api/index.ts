import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const apiClient = axios.create({
  baseURL: 'https://collis.pythonanywhere.com/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Request interceptor to add token
apiClient.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    if (authStore.token && !config.url?.includes('/login/')) {
      config.headers.Authorization = `Token ${authStore.token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      const authStore = useAuthStore()
      if (authStore.refreshToken) {
        try {
          // Try to refresh token if we have refresh endpoint
          const refreshResponse = await axios.post(
            `${apiClient.defaults.baseURL}/token/refresh/`,
            { refresh: authStore.refreshToken }
          )
          
          authStore.setToken(refreshResponse.data.access)
          originalRequest.headers.Authorization = `Token ${refreshResponse.data.access}`
          
          return apiClient(originalRequest)
        } catch (refreshError) {
          authStore.logout()
          window.location.href = '/login'
          return Promise.reject(refreshError)
        }
      } else {
        authStore.logout()
        window.location.href = '/login'
      }
    }
    
    return Promise.reject(error)
  }
)

export default apiClient